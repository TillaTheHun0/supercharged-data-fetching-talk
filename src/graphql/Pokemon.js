import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Pokemon {
    name: String!
    moves: [Move!]!
    trainer: Trainer!
  }
`

export const resolvers = {
  Pokemon: {}
}
