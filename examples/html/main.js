/* eslint-disable no-new */
import { LazerpayCheckout } from '@lazerpay-checkout/html'

const paymentButton = document.getElementById('payment-button')
new LazerpayCheckout()
paymentButton.addEventListener('click', () => {
  const lazerpayCheckout = new LazerpayCheckout()
})
