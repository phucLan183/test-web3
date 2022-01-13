import { PrlCollection } from '../../../database/mongodb'
import { getBalancePrl } from '../../../web3/currency'
import { ADDRESS_CONTRACT_PRL } from '../../../config'
import BigNumber from 'bn.js'

export const getBalanceOfParallel = async (parent: any, args: any) => {
  try {
    const prlBalance = await getBalancePrl(ADDRESS_CONTRACT_PRL)
    return { prlBalance }
  } catch (error) {
    throw error
  }
}

export const getHistoryTransfers = async (parent: any, args: any) => {
  try {
    const { address, limit } = args
    const dataBlockIn = await PrlCollection.find({
      "address.to": address.toLowerCase()
    }).sort({ _id: -1 }).toArray()
    const dataBlockOut = await PrlCollection.find({
      "address.from": address.toLowerCase()
    }).sort({ _id: -1 }).toArray()
    return {
      blockIn: dataBlockIn.slice(0, limit),
      blockOut: dataBlockOut.slice(0, limit),
    }
  } catch (error) {
    throw error
  }
}

const TotalBalance = (dataBlock: any) => {
  const data = dataBlock.map((item: any) => item.balance.toString())
  const totalData = data.reduce((pre: any, cur: any) => new BigNumber(pre).add(new BigNumber(cur)), 0)
  return totalData
}

const FormatDataBlock = (dataBlock: any, limit: number) => {
  return dataBlock.map((item: any) => ({
    blockNumber: item.blockNumber,
    address: {
      from: item.address.from,
      to: item.address.to
    },
    balance: item.balance.toString(),
    timestamp: item.timestamp
  })).slice(0, limit)
}

export const getTotalBalanceTransfer = async (parent: any, args: any) => {
  try {
    const { address } = args
    const dataBlockIn = await PrlCollection.find({
      "address.to": address.toLowerCase()
    }).sort({ _id: -1 }).toArray()
    const dataBlockOut = await PrlCollection.find({
      "address.from": address.toLowerCase()
    }).sort({ _id: -1 }).toArray()
    const prlBalance = await getBalancePrl(address)
    const totalBalanceInOut = new BigNumber(TotalBalance(dataBlockOut)).add(new BigNumber(TotalBalance(dataBlockIn)))
    return {
      parallelBalance: prlBalance,
      totalIn: dataBlockIn.length,
      totalOut: dataBlockOut.length,
      totalBalanceInOut: totalBalanceInOut.toString()
    }
  } catch (error) {
    throw error
  }
}