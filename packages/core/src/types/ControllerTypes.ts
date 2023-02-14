import type { Chain, EthereumClient } from '../Ethereum/client'
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
