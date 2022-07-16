import { compose, mergeLeft, pick, propEq } from 'ramda'

class PokeApi {
  constructor (context) {
    this.context = context
  }

  async listTrainers () {
    const { clients: { hyper } } = this.context

    const trainers = await hyper.data.query({
      type: 'trainer'
    }).then(res => res.docs)

    return trainers
  }

  async findTrainerById (id) {
    const { clients: { hyper } } = this.context
    const trainer = await hyper.data.get(id)
    return trainer.status === 404 ? null : trainer
  }

  async listPokemons () {
    const { clients: { hyper } } = this.context

    const pokemons = await hyper.data.query({
      type: 'pokemon'
    }).then(res => res.docs)

    return pokemons
  }

  async findPokemonById (id) {
    const { clients: { hyper } } = this.context
    const pokemon = await hyper.data.get(id)
    return pokemon.status === 404 ? null : pokemon
  }

  async findPokemonsByTrainerId (trainerId) {
    const { clients: { hyper } } = this.context

    const pokemons = await hyper.data.query({
      type: 'pokemon',
      parent: trainerId
    }).then(res => res.docs)

    return pokemons
  }

  async findPokemonsByMoveName (moveName) {
    const { clients: { hyper } } = this.context

    const pokemons = await hyper.data.query({
      type: 'pokemon',
      moves: {
        $elemMatch: {
          name: moveName
        }
      }
    }).then(res => res.docs)

    return pokemons
  }

  async findMovesByPokemonId (id) {
    const pokemon = await this.findPokemonById(id)

    return Promise.all(
      pokemon.moves.map(async m => ({
        ...await this.findMoveByName({ pokemonId: pokemon._id, moveName: m.name }),
        parent: pokemon._id
      }))
    )
  }

  async findMoveByName ({ pokemonId, moveName }) {
    const { clients: { hyper, pokeClient } } = this.context

    const [move, moveMeta] = await Promise.all([
      hyper.data.get(pokemonId).then(p => p.moves.find(propEq('name', moveName))),
      pokeClient.findMoveByName(moveName)
    ])

    return compose(
      mergeLeft(move),
      pick(['power', 'pp', 'accuracy'])
    )(moveMeta)
  }
}

export const addApisContext = (context) => {
  const newContext = {
    ...context
  }

  newContext.apis = {
    PokeApi: new PokeApi(newContext)
  }

  return newContext
}
