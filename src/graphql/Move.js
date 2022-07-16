import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Move {
    name: String!
    pp: Int!
    power: Int
    accuracy: Int
    pokemon: [Pokemon!]!
  }
`

export const resolvers = {
  Move: {}
}
