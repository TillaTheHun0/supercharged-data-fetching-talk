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
  Move: {
    name: async ({ name, parent }, _args, { apis: { PokeApi } }) => {
      const move = await PokeApi.findMoveByName({ pokemonId: parent, moveName: name })
      return move.name
    },
    pp: async ({ name, parent }, _args, { apis: { PokeApi } }) => {
      const move = await PokeApi.findMoveByName({ pokemonId: parent, moveName: name })
      return move.pp
    },
    power: async ({ name, parent }, _args, { apis: { PokeApi } }) => {
      const move = await PokeApi.findMoveByName({ pokemonId: parent, moveName: name })
      return move.power
    },
    accuracy: async ({ name, parent }, _args, { apis: { PokeApi } }) => {
      const move = await PokeApi.findMoveByName({ pokemonId: parent, moveName: name })
      return move.accuracy
    },
    pokemon: async ({ name }, _args, { apis: { PokeApi } }) => {
      return PokeApi.findPokemonsByMoveName(name)
    }
  }
}
