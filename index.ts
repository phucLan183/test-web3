import Web3 from 'web3'
import { CONTRACT_ABI, ADDRESS_CONTRACT_BNB } from './contract'
import { connectMongo, BusdCollection } from './mongodb';
import dotenv from 'dotenv'
dotenv.config()

connectMongo()

var web3 = new Web3('https://bsc-dataseed.binance.org/')
if (web3) console.log('Connect to BSC mainnet');


const main = async (startBlock: number = 124241) => {
  try {
    // Contract
    const bnbContract = new web3.eth.Contract(CONTRACT_ABI, ADDRESS_CONTRACT_BNB)

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
            value: event.returnValues.value / (10 ** 18),
            timestamp: dataBlock.timestamp
          })
        } catch (error) {
          console.log(error);
        }
      }
    }
    startBlock = stepBlock
    setTimeout(() => {
      main(startBlock)
    }, 5000)
  } catch (error) {
    console.log(error);
  }
}
main()

