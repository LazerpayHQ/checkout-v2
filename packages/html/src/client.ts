/* eslint-disable no-console */
import { configureChains, createClient } from '@wagmi/core'
import { goerli, mainnet, bscTestnet, bsc, polygon, polygonMumbai } from '@wagmi/core/chains'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
  ClientCtrl,
  OptionsCtrl,
} from '@lazerpay-checkout/core'

export class LazerpayCheckout {
  /**
   * TODO: Should accept API Key as parameter
   * TODO: Should setup WalletConnect
   */
  public constructor() {
    const projectId = '08fc834cc8959c233c8514026f6f4834'
    const { chains, provider } = configureChains(
      [mainnet, goerli, bscTestnet, bsc, polygon, polygonMumbai],
      [walletConnectProvider({ projectId })]
    )
    const wagmiClient = createClient({
      autoConnect: true,
      connectors: [...modalConnectors({ appName: 'lazerpayModal', chains, projectId })],
      provider,
    })
    const ethereumClient = new EthereumClient(wagmiClient, chains)

    ClientCtrl.setEthereumClient(ethereumClient)
    this.initalizeUi()
    OptionsCtrl.setIsUiLoaded(true)
  }

  private async initalizeUi() {
    if (typeof window !== 'undefined') {
      await import('@lazerpay-checkout/ui')
      const modal = document.createElement('lp-modal-container')
      document.body.insertAdjacentElement('beforeend', modal)
    }
  }
}
