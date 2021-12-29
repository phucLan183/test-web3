import { BusdCollection } from '../database/mongodb';
import { Decimal128 } from 'mongodb';
import { bnbContract, web3 } from '../web3'
import { BigNumber } from 'bignumber.js';

export const saveDatabase = async (startBlock: number) => {
  try {
    const stepBlock = startBlock + 4000
    const transferEvent = await bnbContract.getPastEvents('Transfer', {
      fromBlock: startBlock,
      toBlock: stepBlock
    })
    // console.log({ transferEvent: transferEvent.length, startBlock: startBlock, toBlock: stepBlock });
    if (transferEvent.length > 0) {
      for (const event of transferEvent) {
        try {
          const dataBlock = await web3.eth.getBlock(event.blockNumber)
          await BusdCollection.insertOne({
            blockNumber: event.blockNumber,
            addressFrom: event.returnValues.from,
            addressTo: event.returnValues.to,
            value: new Decimal128(event.returnValues.value),
            timestamp: dataBlock.timestamp
          })
        } catch (error) {
          console.log(error);
        }
      }
    }
    startBlock = stepBlock
    setTimeout(() => {
      saveDatabase(startBlock)
    }, 5000)
  } catch (error) {
    console.log(error);
  }
}