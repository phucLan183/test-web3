import { gql } from 'apollo-server'

export const typeDefs = gql`
  type CurrentBalanceParallel {
    prlBalance: String
  }

  type Address {
    from: String
    to: String
  }

  type Block {
    blockNumber: Float
    address: Address
    balance: String
    timestamp: Float
  }

  type HistoryTransfers {
    totalIn: Int
    totalOut: Int
    blockIn: [Block]
    blockOut: [Block]
  }

  type TotalTransfer {
    totalInAndOut: String
    parallelBalance: String
  }

  type Query {
    getBalanceOfParallel: CurrentBalanceParallel
    getHistoryTransfers(address: String!, limit: Int!): HistoryTransfers
    getTotalBalanceTransfer(address: String!): TotalTransfer
  }
`