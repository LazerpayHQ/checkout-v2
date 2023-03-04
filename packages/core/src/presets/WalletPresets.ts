export const enum InjectedId {
  metaMask = 'metaMask',
  trust = 'trust',
  phantom = 'phantom',
  brave = 'brave',
  coinbaseWallet = 'coinbaseWallet',
  ledger = 'ledger',
}

export const WalletPresets = {
  [InjectedId.metaMask]: {
    name: 'MetaMask',
    id: 'metaMask',
    image: '0528ee7e-16d1-4089-21e3-bbfb41933100',
    url: 'https://metamask.io/',
    links: {
      native: 'metamask:',
      universal: 'https://metamask.app.link/',
    },
    isInjected: true,
    InjectedId: InjectedId.metaMask,
  },
  [InjectedId.trust]: {
    name: 'Trust Wallet',
    id: 'tust',
    image: '0528ee7e-16d1-4089-21e3-bbfb41933100',
    url: 'https://trustwallet.com/',
    links: {
      native: 'trust:',
      universal: 'https://link.trustwallet.com/',
    },
    isInjected: true,
    InjectedId: InjectedId.trust,
  },
  [InjectedId.brave]: {
    name: 'Brave',
    id: 'brave',
    image: '125e828e-9936-4451-a8f2-949c119b7400',
    url: 'https://brave.com/',
    links: {
      native: 'brave:',
      universal: 'https://brave.com/download/',
    },
    isInjected: true,
    InjectedId: InjectedId.brave,
  },
  [InjectedId.coinbaseWallet]: {
    name: 'Coinbase Wallet',
    id: 'coinbase',
    image: 'f8068a7f-83d7-4190-1f94-78154a12c600',
    url: 'https://wallet.coinbase.com/',
    links: {
      native: 'coinbase:',
      universal: 'https://go.cb-w.com/',
    },
    isInjected: true,
    InjectedId: InjectedId.coinbaseWallet,
  },
  [InjectedId.ledger]: {
    name: 'Ledger',
    id: 'ledger',
    image: 'a7f416de-aa03-4c5e-3280-ab49269aef00',
    url: 'https://www.ledger.com/',
    links: {
      native: 'ledger:',
      universal: 'https://www.ledger.com/',
    },
    isInjected: true,
    InjectedId: InjectedId.ledger,
  },
}
