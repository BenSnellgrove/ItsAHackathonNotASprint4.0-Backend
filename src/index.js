// ESM
import Fastify from 'fastify'
import routes from './routes/routes.js'
import dbPlugin from './plugins/database.plugin.js'

import 'dotenv/config'

const fastify = Fastify({
  logger: true
})

fastify.register(routes);
fastify.register(dbPlugin)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 8000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()