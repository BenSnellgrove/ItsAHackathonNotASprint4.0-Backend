/**
 * 
 * @param {number} currentBalance 
 * @param {Date} nextIncomingPaymentDate
 * @param {RegularPayment[]} regularPayments 
 * @returns 
 */
const forecastBalance = (currentBalance, nextIncomingPaymentDate, regularPayments) => {
  if (regularPayments.length === 0) {
    return currentBalance;
  }
  
  // Subtract all outgoing payments between now and the next incoming payment
  const outgoingPayments = regularPayments
    .filter(payment => payment.next_due_date <= nextIncomingPaymentDate);
  const outgoingTotal = outgoingPayments.reduce((acc, payment) => acc + payment.amount, 0);
  return Math.round(currentBalance - outgoingTotal, 2);
}

export { forecastBalance}