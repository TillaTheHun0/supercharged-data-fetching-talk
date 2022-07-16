import { compose, mergeLeft, pick, propEq } from 'ramda'

class PokeApi {
  constructor (context) {
    this.context = context
  }

  async listTrainers () {
    const { dataloaders: { findByTypeDataloader } } = this.context
    const trainers = await findByTypeDataloader.load('trainer')
    return trainers
  }

  async findTrainerById (id) {
    const { dataloaders: { findByIdDataloader } } = this.context
    const trainer = await findByIdDataloader.load(id)
    return trainer
  }

  async listPokemons () {
    const { dataloaders: { findByTypeDataloader } } = this.context
    const pokemons = await findByTypeDataloader.load('pokemon')
    return pokemons
  }

  async findPokemonById (id) {
    const { dataloaders: { findByIdDataloader } } = this.context
    const pokemon = await findByIdDataloader.load(id)
    return pokemon
  }

  async findPokemonsByTrainerId (trainerId) {
    const { dataloaders: { findByParentDataloader } } = this.context
    const pokemons = await findByParentDataloader.load(trainerId)
    return pokemons
  }

  async findPokemonsByMoveName (moveName) {
    const { dataloaders: { findPokemonsByMoveNameDataloader } } = this.context
    const pokemons = await findPokemonsByMoveNameDataloader.load(moveName)
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
    const { dataloaders: { findByIdDataloader, findMoveMetaByNameDataloader } } = this.context

    const [move, moveMeta] = await Promise.all([
      findByIdDataloader.load(pokemonId).then(p => p.moves.find(propEq('name', moveName))),
      findMoveMetaByNameDataloader.load(moveName)
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
