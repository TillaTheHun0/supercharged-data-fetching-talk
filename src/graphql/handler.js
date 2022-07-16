import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResult
} from 'graphql-helix'
import chalk from 'chalk'

import { combineSchemas, createSchema } from './utils.js'
import * as Query from './Query.js'
import * as Pokemon from './Pokemon.js'
import * as Trainer from './Trainer.js'
import * as Move from './Move.js'

const { typeDefs, resolvers, middlewares } = combineSchemas([Query, Pokemon, Trainer, Move])
const schema = createSchema({ typeDefs, resolvers, middlewares })

export async function handler (req, res) {
  // Create a generic Request object that can be consumed by Graphql Helix's API
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query
  }

  // Determine whether we should render GraphiQL instead of returning an API response
  if (shouldRenderGraphiQL(request)) {
    res.send(renderGraphiQL())
  } else {
    // Extract the Graphql parameters from the request
    const { operationName, query, variables } = getGraphQLParameters(request)

    // Validate and execute the query
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      contextFactory: () => req.context,
      schema
    })

    console.log('Calls to hyper:', chalk.blue(JSON.stringify(req.context.clients.hyper.calls, null, 2)))
    console.log('Calls to pokeClient:', chalk.green(JSON.stringify(req.context.clients.pokeClient.calls, null, 2)))

    sendResult(result, res)
  }
}
