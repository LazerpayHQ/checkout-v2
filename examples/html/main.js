import { LazerpayCheckout } from '@lazerpay-checkout/html'

const paymentButton = document.getElementById('payment-button')

paymentButton.addEventListener('click', () => {
  const lazerpayCheckout = new LazerpayCheckout()
})
