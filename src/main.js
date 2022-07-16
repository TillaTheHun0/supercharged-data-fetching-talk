import express from 'express'

import { addConfigContext } from './config.js'
import { addClientsContext } from './services/clients.js'
import { addDataloadersContext } from './services/dataloaders.js'
import { handler } from './graphql/handler.js'
import { addApisContext } from './services/apis.js'

const contexters = [addConfigContext, addClientsContext, addDataloadersContext, addApisContext]

export const app = express()
app.use(express.json())
// Inject Context
app.use(async (req, res, next) => {
  req.context = await contexters.reduce(
    async (acc, contexter) => contexter(await acc),
    Promise.resolve({ req, res })
  )
  next()
})
app.use('/graphql', handler)

export function start (port) {
  app.listen(port, () => {
    console.log(`GraphQL server is running at http://localhost:${port}/graphql`)
  })
}
