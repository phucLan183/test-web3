import { PrlCollection } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { prlContract, web3 } from '../web3'
import BN from 'bn.js'

export const saveDatabase = async (startBlock: number) => {
  try {
    const toBlock = startBlock + 1000
    const latestBlock = await web3.eth.getBlockNumber()
    let options = { fromBlock: startBlock, toBlock }

    if (startBlock >= latestBlock) startBlock = latestBlock

    if (latestBlock <= toBlock) options.fromBlock = latestBlock

    const transferEvent = await prlContract.getPastEvents('Transfer', options)
    
    console.log({ transferEvent: transferEvent.length, startBlock: startBlock, toBlock: toBlock });
    if (transferEvent.length > 0) {
      for (const event of transferEvent) {
        const dataBlock = await web3.eth.getBlock(event.blockNumber)
        const formatBalance = web3.utils.fromWei(new BN(event.returnValues.value), "ether")
        
        await PrlCollection.insertOne({
          blockNumber: event.blockNumber,
          address: {
            from: event.returnValues.from.toLowerCase(),
            to: event.returnValues.to.toLowerCase()
          },
          balance: formatBalance,
          timestamp: dataBlock.timestamp
        })
      }
    }
    latestBlock > toBlock ? startBlock += 1000 : startBlock = latestBlock 
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 3000)
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 3000)
  }
}