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

  type DetailsHistoryContract {
    blockIn: [Block]
    blockOut: [Block]
    totalIn: Int
    totalOut: Int
    totalBalanceInOut: String
  }

  type Query {
    getBalanceOfParallel: CurrentBalanceParallel
    getHistoryContract(address: String!, limit: Int!): DetailsHistoryContract
  }
`