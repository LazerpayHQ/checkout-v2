/* eslint-disable no-new */
import { LazerpayCheckout } from '@lazerpay-checkout/html'

const paymentButton = document.getElementById('payment-button')
const data = {
  apiKey: 'pk_test_5f5b5c5c-5f5b5c5c-5f5b5c5c-5f5b5c5c',
  customerEmail: 'jsj@gmail.com',
  customerName: 'Justice',
  amount: '2000',
  reference: 'string',
  metadata: {},
  acceptPartialPayment: false,
  currency: 'USD',
  businessLogo: '',
  paymentButtonId: '',
  paymentLinkId: '',
}
new LazerpayCheckout(data)
paymentButton.addEventListener('click', () => {
  const lazerpayCheckout = new LazerpayCheckout(data)
})
