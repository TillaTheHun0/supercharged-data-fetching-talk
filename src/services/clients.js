import _case from 'case'
import { connect } from 'hyper-connect'

const { kebab } = _case
/**
 * A simple wrapper that will count the accesses
 * to each key on the supplied object and exposes
 * that as a 'calls' field on the obj
 */
const Monitor = (obj) => {
  const calls = {}
  return new Proxy(
    obj,
    {
      get (_, prop) {
        if (prop === 'calls') {
          return calls
        }

        calls[prop] = calls[prop] || 0
        calls[prop] += 1

        return Reflect.get(...arguments)
      }
    }
  )
}

const PokeClient = ({ baseUrl }) => ({
  async findMoveByName (name) {
    return fetch(`${baseUrl}/move/${kebab(name)}`)
      .then(res => res.ok ? res.json() : undefined)
  }
})

export const addClientsContext = (context) => ({
  ...context,
  clients: {
    pokeClient: Monitor(PokeClient(context.config.pokeClient)),
    hyper: Monitor(connect(context.config.hyper))
  }
})
