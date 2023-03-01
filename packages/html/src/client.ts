/* eslint-disable no-console */
import { configureChains, createClient } from '@wagmi/core'
import { goerli, mainnet, bscTestnet, bsc, polygon, polygonMumbai } from '@wagmi/core/chains'
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
  ClientCtrl,
  OptionsCtrl,
  ApiCtrl,
} from '@lazerpay-checkout/core'

export class LazerpayCheckout {
  /**
   * TODO: Should accept API Key and PayloadData as parameter
   * /*
   *   {
   *     customerEmail: undefined,
   *     customerName: undefined,
   *     amount: undefined,
   *     reference: undefined,
   *     metadata: undefined,
   *     acceptPartialPayment: false,
   *     currency: undefined,
   *     businessLogo: undefined,
   *     paymentButtonId: undefined,
   *     paymentLinkId: undefined,
   *   },
   *
   * TODO: Should setup WalletConnect
   */

  public constructor(data: {
    apiKey: string
    customerEmail: string
    customerName: string
    amount: number | string
    reference: string
    metadata?: object
    acceptPartialPayment?: false
    currency?: string
    businessLogo?: string
    paymentButtonId?: string
    paymentLinkId?: string
  }) {
    console.log('API KEYs', data.apiKey)
    // Set payload data and apikey
    ApiCtrl.setApiKey(data.apiKey)

    ApiCtrl.setPayloadData({ ...data })
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
    console.log(provider, 'provider instance')
    const ethereumClient = new EthereumClient(wagmiClient, chains)
    console.log(ethereumClient, 'client')

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
