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
      const withPokemon = await Promise.all(trainers.map(async t => {
        t.pokemon = await PokeApi.findPokemonsByTrainerId(t._id)
        t.pokemon = await Promise.all(t.pokemon.map(async p => {
          p.moves = await Promise.all(p.moves.map(m => {
            return PokeApi.findMoveByName({ pokemonId: p._id, moveName: m.name })
          }))

          return p
        }))

        return t
      }))

      return withPokemon
    },
    pokemons: async (_, _args, { apis: { PokeApi } }) => {
      const pokemons = await PokeApi.listPokemon()
      return pokemons
    }
  }
}
