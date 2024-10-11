'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.get('/leaderboard', async function (request, reply) {
    return { username: 'Patryk' }
  })
}
