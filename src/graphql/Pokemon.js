import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Pokemon {
    name: String!
    moves: [Move!]!
    trainer: Trainer!
  }
`

export const resolvers = {
  Pokemon: {
    name: async ({ _id }, _args, { apis: { PokeApi } }) => {
      const pokemon = await PokeApi.findPokemonById(_id)
      return pokemon.name
    },
    moves: async ({ _id }, _args, { apis: { PokeApi } }) => {
      return PokeApi.findMovesByPokemonId(_id)
    },
    trainer: async ({ _id }, _args, { apis: { PokeApi } }) => {
      const pokemon = await PokeApi.findPokemonById(_id)
      return { _id: pokemon.parent }
    }
  }
}
