import { PrlCollection } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { prlContract, web3 } from '../web3'

export const saveDatabase = async (startBlock: number) => {
  try {
    const stepBlock = startBlock + 1000
    const latestBlock = await web3.eth.getBlockNumber()
    const transferEvent = await prlContract.getPastEvents('Transfer', {
      fromBlock: startBlock,
      toBlock: stepBlock
    })

    console.log({ transferEvent: transferEvent.length, startBlock: startBlock, toBlock: stepBlock });
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
    startBlock >= latestBlock ? startBlock = latestBlock : startBlock = stepBlock
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 5000)
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 5000)
  }
}