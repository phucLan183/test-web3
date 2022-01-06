import { getBalanceOfParallel, getHistoryContract } from '../resolvers/Queries'

export const resolvers = {
  Query: {
    getBalanceOfParallel,
    getHistoryContract
  },
}