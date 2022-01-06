import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import { ABI_PARALLEL } from './contract';
import { ADDRESS_CONTRACT_PRL } from '../config'

export let web3: any
export let prlContract: Contract

export const connectWeb3 = (provider: string) => {
  try {
    console.log('WEB3_PROVIDER: ', provider);
    web3 = new Web3(new Web3.providers.HttpProvider(provider))
    prlContract = new web3.eth.Contract(ABI_PARALLEL, ADDRESS_CONTRACT_PRL)
    if (web3) console.log('Connect to BSC mainnet');
  } catch (error) {
    throw error
  }
}