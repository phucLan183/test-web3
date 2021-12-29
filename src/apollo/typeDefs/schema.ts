import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Block {
    _id: String
    addressFrom: String
    addressTo: String
    value: String
    timestamp: Float
  }

  type Query {
    getGreatestValueBlock: [Block] 
  }
`