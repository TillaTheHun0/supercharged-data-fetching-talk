import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Trainer {
    name: String!
    pokemon: [Pokemon!]!
  }
`

export const resolvers = {
  Trainer: {}
}
