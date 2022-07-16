import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Trainer {
    name: String!
    pokemon: [Pokemon!]!
  }
`

export const resolvers = {
  Trainer: {
    name: async ({ _id }, _args, { apis: { PokeApi } }) => {
      const trainer = await PokeApi.findTrainerById(_id)
      return trainer.name
    },
    pokemon: async ({ _id }, _args, { apis: { PokeApi } }) => {
      const pokemons = await PokeApi.findPokemonsByTrainerId(_id)
      return pokemons
    }
  }
}
