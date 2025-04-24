/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
import { forecastBalance } from "../forecasting/forecastBalance.js";
import { getAccount, getRegularPayments } from "../model/accounts.js";

function routes (fastify, options) {
  fastify.get('/account/:accountId', async (request, reply) => {
    try {
      const account = await getAccount(fastify.dbClient, request.params.accountId);
      fastify.log.info({account}, 'Account found');

      const payments = await getRegularPayments(fastify.dbClient, request.params.accountId);
      fastify.log.info({payments}, 'Payments found');

      const incoming = payments.filter(payment => payment.type === 'income');
      const expenses = payments.filter(payment => payment.type === 'expense');

      const nextIncomingPayment = incoming.at(0);

      return {
        account_id: account.account_id,
        balance: account.balance,
        account_name: account.account_name,
        forecast_balance: forecastBalance(account.balance, nextIncomingPayment.next_due_date, expenses),
        next_incoming_payment: nextIncomingPayment,
      }
    } catch (error) {
      reply.status(404).send({ error: 'Account not found' });
    }
  })

  fastify.get('/account/:accountId/forecast', async (request, reply) => {
    return {
      reductions: [
        {
          name: 'Takeaways',
          amount: '100.20',
        }
      ]
    };
  });
}

export default routes;