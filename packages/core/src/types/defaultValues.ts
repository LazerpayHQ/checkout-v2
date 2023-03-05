import { TransactionStatusEnum } from './ControllerTypes'

export const defaultPayload = {
  customerEmail: '',
  customerName: '',
  amount: '',
  reference: '',
  metadata: {},
  acceptPartialPayment: false,
  currency: '',
  businessLogo: '',
  paymentButtonId: '',
  paymentLinkId: '',
  businessName: '',
}

export const defaultCoin = {
  address: '',
  blockchain: '',
  decimal: 0,
  id: '',
  logo: '',
  name: '',
  network: '',
  status: '',
  symbol: '',
}

export const defaultNetwork = {
  id: '',
  logo: '',
  name: '',
  network: '',
  symbol: '',
  tag: '',
  isActive: false,
}

export const defaultInitResponse = {
  acceptPartialPayment: false,
  address: '',
  blockchain: '',
  businessEmail: '',
  businessLogo: '',
  businessName: '',
  channel: '',
  coin: '',
  cryptoAmount: 0,
  cryptoRate: 0,
  currency: '',
  customerEmail: '',
  customerName: '',
  feeInCrypto: 0,
  fiatAmount: 0,
  fiatRate: 0,
  id: '',
  network: '',
  reference: '',
}

export const defaultResponsePayload = {
  id: '',
  reference: '',
  senderAddress: '',
  recipientAddress: '',
  actualAmount: 0,
  amountPaid: 0,
  amountPaidFiat: 0,
  fiatAmount: 0,
  amountReceived: 0,
  amountReceivedFiat: 0,
  coin: '',
  currency: '',
  hash: '',
  blockNumber: '',
  type: '',
  acceptPartialPayment: false,
  status: TransactionStatusEnum.EMPTY,
  paymentType: '',
  network: '',
  paymentChannel: '',
  blockchain: '',
  fiatRate: 0,
  cryptoRate: 0,
  feeInCrypto: 0,
}

export const defaultWallet = {
  name: '',
  id: '',
  imageUrl: '',
  url: '',
  links: {
    native: '',
    universal: '',
  },
  isMobile: false,
  isInjected: false,
  injectedId: '',
}
