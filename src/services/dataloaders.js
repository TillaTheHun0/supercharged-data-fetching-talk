import Dataloader from 'dataloader'
import { propEq } from 'ramda'

const findByTypeDataloader = (context) => new Dataloader(
  async (types) => {
    const { clients: { hyper } } = context

    const docs = await hyper.data.query({
      type: { $in: types }
    }).then(res => res.docs)

    return types.map(type => docs.filter(propEq('type', type)))
  }
)

const findByIdDataloader = (context) => new Dataloader(
  async (ids) => {
    const { clients: { hyper } } = context

    const docs = await hyper.data.query({
      _id: { $in: ids }
    }).then(res => res.docs)

    return ids.map(id => docs.find(propEq('_id', id)))
  }
)

const findPokemonsByMoveNameDataloader = (context) => new Dataloader(
  async (names) => {
    const { clients: { hyper } } = context

    const docs = await hyper.data.query({
      type: 'pokemon',
      moves: {
        $elemMatch: {
          name: { $in: names }
        }
      }
    }).then(res => res.docs)

    return names.map(name => docs.filter(doc => doc.moves.find(propEq('name', name))))
  }
)

const findMoveMetaByNameDataloader = (context) => new Dataloader(
  async (names) => {
    const { clients: { pokeClient } } = context

    const meta = await Promise.all(names.map(n => pokeClient.findMoveByName(n)))

    return meta
  }
)

const findByParentDataloader = (context) => new Dataloader(
  async (parents) => {
    const { clients: { hyper } } = context

    const docs = await hyper.data.query({
      parent: { $in: parents }
    }).then(res => res.docs)

    return parents.map(id => docs.filter(propEq('parent', id)))
  }
)

export const addDataloadersContext = (context) => {
  const newContext = {
    ...context
  }

  /**
   * * There is some sleight of hand happening here
   * * We pass the context object into createDataloaders()
   *
   * * We are adding a reference to dataloaders that we just created to that same object.
   * * Since Dataloaders access the context object lazily, they all now have a reference to each other
   * * which is why we pass the context to begin with :)
   */
  newContext.dataloaders = {
    findByIdDataloader: findByIdDataloader(context),
    findMoveMetaByNameDataloader: findMoveMetaByNameDataloader(context),
    findByParentDataloader: findByParentDataloader(context),
    findPokemonsByMoveNameDataloader: findPokemonsByMoveNameDataloader(context),
    findByTypeDataloader: findByTypeDataloader(context)
  }

  return newContext
}
