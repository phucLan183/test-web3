import Web3 from 'web3'
import { CONTRACT_ABI, ADDRESS_CONTRACT_BNB } from './contract'

export let web3: any
export let bnbContract: any

export const connectWeb3 = (provider: string) => {
  try {
    console.log('WEB3_PROVIDER: ', provider);
    web3 = new Web3(new Web3.providers.HttpProvider(provider))
    bnbContract = new web3.eth.Contract(CONTRACT_ABI, ADDRESS_CONTRACT_BNB)
    if (web3) console.log('Connect to BSC mainnet');
  } catch (error) {
    throw error
  }
}