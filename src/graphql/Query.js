import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    trainers: [Trainer!]!
    pokemons: [Pokemon!]!
  }
`

export const resolvers = {
  Query: {
    trainers: async (_, { name }, { apis: { PokeApi } }) => {
      const trainers = await PokeApi.listTrainers(name)
      return trainers
    },
    pokemons: async (_, _args, { apis: { PokeApi } }) => {
      const pokemons = await PokeApi.listPokemon()
      return pokemons
    }
  }
}
