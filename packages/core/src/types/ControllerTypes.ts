import type { Chain } from '@wagmi/core'
import type { EthereumClient } from '../Ethereum/client'
// -- ModalCtrl --------------------------------------- //
export interface ModalCtrlState {
  open: boolean
}

export interface WalletConnectProviderOpts {
  projectId: string
}
export interface PageParams {
  page?: number
  search?: string
  entries?: number
  version?: number
  device?: 'android' | 'ios' | 'mac'
  order?: 'asc' | 'desc'
  chains?: string
}

export interface PlatformInfo {
  native: string
  universal: string
}

export interface Listing {
  id: string
  name: string
  description: string
  homepage: string
  chains: string[]
  versions: string[]
  app_type: string
  image_id: string
  image_url: {
    sm: string
    md: string
    lg: string
  }
  app: {
    browser: string
    ios: string
    android: string
    mac: string
    window: string
    linux: string
  }
  mobile: PlatformInfo
  desktop: PlatformInfo
  metadata: {
    shortName: string
    colors: {
      primary: string
      secondary: string
    }
  }
}

export interface ListingResponse {
  listings: Listing[]
  total: number
}
// -- ClientCtrl ------------------------------------------- //
export interface ClientCtrlState {
  initialized: boolean
  ethereumClient?: EthereumClient
}
// -- ApiCtrl ---------------- //

export interface IInitializePayload {
  id: string
  reference: string
  businessName: string
  businessEmail: string
  businessLogo: string
  customerName: string
  customerEmail: string
  address: string
  coin: string
  cryptoAmount: number
  currency: string
  fiatAmount: number
  feeInCrypto: number
  network: string
  acceptPartialPayment: boolean
  fiatRate: number
  cryptoRate: number
  channel: string
  blockchain: string
}

export enum TransactionStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  ABANDONED = 'abandoned',
  INCOMPLETE = 'incomplete',
  REVERSED = 'reversed',
  EMPTY = '',
}

export interface IInitializeResponsePayload {
  id: string
  reference: string
  senderAddress: string
  recipientAddress: string
  actualAmount: number
  amountPaid: number
  amountPaidFiat: number
  fiatAmount: number
  amountReceived: number
  amountReceivedFiat: number
  coin: string
  currency: string
  hash: string
  blockNumber: string
  type: string
  acceptPartialPayment: boolean
  status: TransactionStatusEnum
  paymentType: string
  network: string
  paymentChannel: string
  blockchain: string
  fiatRate: number
  cryptoRate: number
  feeInCrypto: number
}

export interface IPayload {
  customerEmail: string
  customerName: string
  amount: number | string
  reference: string
  metadata?: object
  acceptPartialPayment?: boolean
  currency?: string
  businessLogo?: string
  paymentButtonId?: string
  paymentLinkId?: string
  businessName: string
}
export interface ApiCtrlState {
  isTestnet?: boolean
  apiKey: string
  initializePayload: IInitializeResponsePayload
  payloadData: IPayload
  coins: ICoins[]
  networks: INetworks[]
  selectedCoin: ICoins
  selectedNetwork: INetworks
}

export interface WalletCtrlState {
  allWallets?: Wallet[]
  recommendedWallets: Wallet[]
  selectedWallet?: Wallet
  defaultChain?: number
  selectedChain?: number
}
export interface Wallet {
  name: string
  id?: string
  imageUrl?: string
  url?: string
  links?: {
    native?: string
    universal?: string
  }
  isMobile?: boolean
  isInjected?: boolean
  injectedId?: string
}
// -- OptionsCtrl --------------------------------------- //
export interface OptionsCtrlState {
  selectedChain?: Chain
  chains?: EthereumClient['chains']
  standaloneChains?: string[]
  standaloneUri?: string
  address?: `0x${string}`
  isConnected: boolean
  isStandalone: boolean
  isCustomDesktop: boolean
  isCustomMobile: boolean
  isDataLoaded: boolean
  isUiLoaded: boolean
  balanceLoading?: boolean
  balance?: { amount: string; symbol: string }
}

export interface ICoins {
  address: string
  blockchain: string
  decimal: number
  id: string
  logo: string
  name: string
  network: string
  status: string
  symbol: string
}

export interface INetworks {
  id: string
  logo: string
  name: string
  network: string
  symbol: string
  tag: string
  isActive: boolean
}

export interface ICoinResponse {
  data: ICoins[]
  message: string
  status: string
  statusCode: number
}

export interface INetworkResponse {
  data: INetworks[]
  message: string
  status: string
  statusCode: number
}

export interface IInitializeResponse {
  data: IInitialize
  message: string
  status: string
  statusCode: number
}

export interface IInitialize {
  acceptPartialPayment: boolean
  address: string
  blockchain: string
  businessEmail: string
  businessLogo: string
  businessName: string
  channel: string
  coin: string
  cryptoAmount: number
  cryptoRate: number
  currency: string
  customerEmail: string
  customerName: string
  feeInCrypto: number
  fiatAmount: number
  fiatRate: number
  id: string
  network: string
  reference: string
}

export interface IPusherEvent {
  address: string
  amount: string
  coin: string
  message: string
  status: string
}
