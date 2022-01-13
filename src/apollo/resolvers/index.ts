import { getBalanceOfParallel, getHistoryTransfers, getTotalBalanceTransfer } from '../resolvers/Queries'

export const resolvers = {
  Query: {
    getBalanceOfParallel,
    getHistoryTransfers,
    getTotalBalanceTransfer
  },
}