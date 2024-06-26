/* eslint-disable no-new */
import { LazerpayCheckout } from '@lazerpay-checkout/html'

const paymentButton = document.getElementById('payment-button')
const data = {
  apiKey: 'pk_live_NUulPuy1UjqQOD6O6XnEi17S9QhLCfSjalIZQnvJlmGjVvBDgY',
  customerEmail: 'jsj@gmail.com',
  customerName: 'Justice',
  amount: '0.1',
  reference: 'string',
  metadata: {},
  acceptPartialPayment: false,
  currency: 'USD',
  businessLogo: '',
  paymentButtonId: '',
  paymentLinkId: '',
  businessName: "Justice's Store",
}
new LazerpayCheckout(data)
paymentButton.addEventListener('click', () => {
  new LazerpayCheckout(data)
})
