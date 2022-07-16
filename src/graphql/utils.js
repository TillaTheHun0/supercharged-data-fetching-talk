import { mergeDeepRight } from 'ramda'
import { makeExecutableSchema } from '@graphql-tools/schema'
/**
 * See https://www.graphql-tools.com/docs/resolvers-composition
 * technically more of a middleware pattern, and not composition,
 * but yea
 */
import { composeResolvers } from '@graphql-tools/resolvers-composition'

export const combineSchemas = (miniSchemas = []) => {
  const { typeDefs, resolvers, middlewares } = miniSchemas.reduce(
    (acc, { typeDefs, resolvers = {}, middlewares = {} }) => ({
      typeDefs: [...acc.typeDefs, ...(Array.isArray(typeDefs) ? typeDefs : [typeDefs])],
      resolvers: mergeDeepRight(acc.resolvers, resolvers),
      middlewares: mergeDeepRight(acc.middlewares, middlewares)
    }),
    { typeDefs: [], resolvers: {}, middlewares: {} }
  )

  return { typeDefs, resolvers, middlewares }
}

export function createSchema ({ typeDefs, resolvers, middlewares }) {
  return makeExecutableSchema({
    typeDefs,
    resolvers: composeResolvers(resolvers, middlewares),
    inheritResolversFromInterfaces: true
  })
}
