import { BusdCollection } from '../../../database/mongodb'

export const getGreatestValueBlock = async (parent: any, args: any) => {
  try {
    const dataBusd = await BusdCollection.find().sort({ value: -1 }).limit(1).toArray()
    const newDataBusd = dataBusd.map((data: any) => ({
      _id: data._id,
      addressFrom: data.addressFrom,
      addressTo: data.addressTo,
      value: data.value.toString(),
      timestamp: data.timestamp
    }))
    return newDataBusd
  } catch (error) {
    throw error
  }
}

