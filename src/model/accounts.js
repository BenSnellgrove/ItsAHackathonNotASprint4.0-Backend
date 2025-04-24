/**
 * @typedef {Object} Account
 * @property {number} account_id - The unique identifier for the account.
 * @property {string} account_name - The name of the account.
 * @property {number} balance - The current balance of the account.
 */

/**
 * @typedef {Object} RegularPayment
 * @property {string} type - The type of payment (incoming or outgoing).
 * @property {number} amount - The amount of the regular payment.
 * @property {Date} next_due_date - The next due date of the regular payment.
 */

/**
 * 
 * @param {*} dbClient 
 * @param {*} accountId 
 * @returns {Account}
 */
const getAccount = async (dbClient, accountId) => {
  const result = await dbClient.query(`SELECT * FROM accounts WHERE account_id=${accountId}`);

  if (result.recordset.length > 0) {
    return result.recordset[0];
  } else {
    throw Error('Account not found');
  }
}

/**
 * 
 * @param {*} dbClient 
 * @param {*} accountId 
 * @returns {RegularPayment[]}
 */
const getRegularPayments = async (dbClient, accountId) => {
  const result = await dbClient.query(`SELECT * FROM regular_payments WHERE account_id=${accountId} ORDER BY next_due_date ASC`);

  return result.recordset;
}

const getForecastSuggestions = async (dbClient, accountId) => {
  const result = await dbClient.query(`SELECT * FROM forecast_suggestions WHERE account_id=${accountId}`);

  return result.recordset;
}

export { getAccount, getRegularPayments, getForecastSuggestions };