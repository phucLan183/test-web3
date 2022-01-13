import { web3, prlContract } from './index'
import BN from 'bn.js'

export const formatBalance = (balance: any) => web3.utils.fromWei(new BN(balance), "ether")

export const getBalanceBnb = async (address: string) => {
  try {
    const balanceInBnb = await web3.eth.getBalance(address)
    return formatBalance(balanceInBnb)
  } catch (error) {
    throw error
  }
}

export const getBalancePrl = async (address: string) => {
  try {
    const balanceInPrl = await prlContract.methods.balanceOf(address).call()
    return formatBalance(balanceInPrl)
  } catch (error) {
    throw error
  }
}
