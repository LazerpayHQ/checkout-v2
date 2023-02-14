export interface WalletConnectProviderOpts {
  projectId: string
}

export type ConnectorId = 'coinbaseWallet' | 'injected' | 'metaMask' | 'walletConnect'
export interface ModalConnectorsOpts {
  appName: string
  chains: Chain[]
  version?: '1' | '2'
  projectId?: string
}
