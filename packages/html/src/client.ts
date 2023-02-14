/* eslint-disable no-console */
import { configureChains, createClient } from '@wagmi/core'
import { goerli, mainnet } from '@wagmi/core/chains'
import { EthereumClient, modalConnectors, walletConnectProvider, ClientCtrl } from '@lazerpay-checkout/core'

const projectId = '08fc834cc8959c233c8514026f6f4834'
const chains = [mainnet, goerli]
const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: [...modalConnectors({ appName: 'lazerpayModal', chains }), new SafeConnector({ chains })],
  provider,
})
console.log(wagmiClient, 'wagmi Client')

export class LazerpayCheckout {
  /**
   * TODO: Should accept API Key as parameter
   * TODO: Should setup WalletConnect
   */
  public constructor() {
    ClientCtrl.setEthereumClient(wagmiClient)
    this.initalizeUi()
  }

  private async initalizeUi() {
    if (typeof window !== 'undefined') {
      await import('@lazerpay-checkout/ui')
      const modal = document.createElement('lp-modal-container')
      document.body.insertAdjacentElement('beforeend', modal)
    }
  }
}
