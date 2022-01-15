import { PrlCollection, mongoClient } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { prlContract, web3 } from '../web3'
import { STEPBLOCK } from '../config'

export const intervalConsume = async (startBlock: number) => {
  try {
    const latestBlock = await web3.eth.getBlockNumber()
    if (startBlock >= latestBlock) startBlock = latestBlock

    let options = getPastEventsOptions(startBlock, latestBlock)

    console.table({ startBlock: options.fromBlock, toBlock: options.toBlock, latestBlock: latestBlock });

    await getParallelBalanceTransfer(options)

    startBlock = options.toBlock
  } catch (error) {
    throw error
  } finally {
    setTimeout(() => {
      intervalConsume(startBlock)
    }, 3000)
  }
}

const getPastEventsOptions = (startBlock: number, latestBlock: number) => {
  const currentBlockWithStepBlock = startBlock + STEPBLOCK
  let toBlock = currentBlockWithStepBlock >= latestBlock ? latestBlock : currentBlockWithStepBlock
  return { fromBlock: startBlock, toBlock }
}

const getParallelBalanceTransfer = async (options: any) => {
  const session = mongoClient.startSession()
  try {
    const transferEvent = await prlContract.getPastEvents('Transfer', options)
    console.log(transferEvent.length);

    if (transferEvent.length > 0) {
      for (const event of transferEvent) {
        const dataBlock = await web3.eth.getBlock(event.blockNumber)
        await session.withTransaction(async () => {
          const dataParallel = await PrlCollection.findOne({ transactionHash: event.transactionHash })
          if (!dataParallel) {
            await PrlCollection.insertOne({
              blockNumber: event.blockNumber,
              address: {
                from: event.returnValues.from.toLowerCase(),
                to: event.returnValues.to.toLowerCase()
              },
              transactionHash: event.transactionHash,
              balance: new Decimal128(event.returnValues.value),
              timestamp: dataBlock.timestamp
            }, { session })
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    throw error;
  } finally {
    await session.endSession()
  }
}