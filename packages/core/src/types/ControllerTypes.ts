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
export interface ApiCtrlState {
  isTestnet?: boolean
  apiKey: string
  initializePayload: {
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
  payloadData: {
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
  }
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
