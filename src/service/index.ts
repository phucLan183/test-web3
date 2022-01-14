import { PrlCollection } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { prlContract, web3 } from '../web3'
import { STEPBLOCK } from '../config'

export const saveDatabase = async (startBlock: number) => {
  try {
    const latestBlock = await web3.eth.getBlockNumber()
    const toBlock = startBlock + STEPBLOCK + 1
    let options = { fromBlock: startBlock, toBlock }

    if (startBlock >= latestBlock) startBlock = latestBlock

    // if (toBlock >= latestBlock) options.toBlock = latestBlock + 1

    const transferEvent = await prlContract.getPastEvents('Transfer', options)
    console.table({ transferEvent: transferEvent.length, startBlock: startBlock, toBlock: toBlock, latestBlock: latestBlock });
    
    if (transferEvent.length > 0) {
      for (const event of transferEvent) {
        const dataBlock = await web3.eth.getBlock(event.blockNumber)

        await PrlCollection.insertOne({
          blockNumber: event.blockNumber,
          address: {
            from: event.returnValues.from.toLowerCase(),
            to: event.returnValues.to.toLowerCase()
          },
          balance: new Decimal128(event.returnValues.value),
          timestamp: dataBlock.timestamp
        })
      }
    }
    latestBlock > toBlock ? startBlock = toBlock + 1 : startBlock = toBlock - 1000 + 1
  } catch (error) {
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 3000)
  } finally {
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 3000)
  }
}