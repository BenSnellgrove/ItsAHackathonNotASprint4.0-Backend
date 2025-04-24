// ESM
import Fastify from 'fastify'
import routes from './routes/routes.js'
import dbPlugin from './plugins/database.plugin.js'

import 'dotenv/config'
import fastifyCors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCors, {
  origin: '*'
})

fastify.register(routes);
fastify.register(dbPlugin)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: process.env.PORT || 8000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()