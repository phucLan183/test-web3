import { web3, prlContract } from './index'

export const getBalanceBnb = async (address: string) => {
  try {
    const balanceInBnb = await web3.eth.getBalance(address)
    return balanceInBnb
  } catch (error) {
    throw error
  }
}

export const getBalancePrl = async (address: string) => {
  try {
    const balanceInPrl = await prlContract.methods.balanceOf(address).call()
    return balanceInPrl
  } catch (error) {
    throw error
  }
}
