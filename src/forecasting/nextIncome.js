/**
 * 
 * @param {import("../model/accounts").RegularPayment[]} regularPayments 
 * @returns {import("../model/accounts").RegularPayment}
 */
const identifyNextIncome = (regularPayments) => {
  // Identify the next incoming payment
  return regularPayments
    .filter(payment => payment.type === 'income').at(0);
}