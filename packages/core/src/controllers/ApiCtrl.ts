/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { proxy } from 'valtio/vanilla'
import type { ApiCtrlState, ICoins, INetworks, IPayload, IPusherEvent } from '../types/ControllerTypes'
import { defaultCoin, defaultNetwork, defaultPayload } from '../types/defaultValues'

// -- initial state ------------------------------------------------ //
const state = proxy<ApiCtrlState>({
  isTestnet: false,
  apiKey: '',
  payloadData: defaultPayload,
  initializePayload: undefined,
  coins: [],
  networks: [],
  selectedCoin: defaultCoin,
  selectedNetwork: defaultNetwork,
  successfulPayment: false,
})

const API_URL = 'https://dev-api.lazerpay.engineering/api/v2'
let pusher: { subscribe: (arg0: string) => any }
// Load pusher
// eslint-disable-next-line @typescript-eslint/init-declarations
const pusherSrc = 'https://js.pusher.com/7.0.3/pusher.min.js'
const pusherScript = document.createElement('script')
pusherScript.src = pusherSrc
pusherScript.title = '__LazerpayScript__'
pusherScript.async = true

// eslint-disable-next-line func-style
const onPusherScriptLoad = () => {
  pusher = new Pusher('be52401726705f906656', {
    cluster: 'ap2',
  })
}

// eslint-disable-next-line func-style
const onPusherScriptError = () => {
  console.log('::::Error connecting Pusher::::')
}

pusherScript.addEventListener('load', onPusherScriptLoad)
pusherScript.addEventListener('complete', onPusherScriptLoad)
pusherScript.addEventListener('error', onPusherScriptError)
document.body.appendChild(pusherScript)

// -- controller -- As function to enable correct ssr handling
export const ApiCtrl = {
  state,
  // Set api key globally and store session in OptionsCtrl
  setApiKey(apiKey: string) {
    const IS_TESTNET = apiKey.includes('test')
    state.isTestnet = IS_TESTNET
    state.apiKey = apiKey
  },

  /**
   * @dev Interacts with the server to get networks
   * @returns The server response
   * @example const networks = await ApiCtrl.getNetworks();
   */
  async getNetworks() {
    if (state.networks.length > 0) {
      return state.networks
    }
    const fetched = await fetch(`${API_URL}/blockchains`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
    })

    const response: any = fetched.json()
    state.networks = response

    return response
  },

  /**
   * @dev Interacts with the server to get coins
   * @param blockchain Optional blockchain to filter coins
   * @returns The server response
   * @example const record = await ApiCtrl.getCoins('ETH');
   */
  async getCoins(blockchain?: string) {
    const urlParams = blockchain && new URLSearchParams({ blockchain }).toString()
    const url = `${API_URL}/coins?${urlParams}`
    const fetched = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
    })
    const response: any = fetched.json()
    state.coins = response

    return response
  },

  /**
   * @dev Interacts with the state to set selected coin
   * @param data The coin object to set
   * @example const record = await ApiCtrl.setCoin(data);
   */
  setCoin(data: ICoins) {
    state.selectedCoin = data
  },

  /**
   * @dev Interacts with the state to set selected network
   * @param data The network object to set
   * @example const record = await ApiCtrl.setNetwork(data);
   */
  setNetwork(data: INetworks) {
    state.selectedNetwork = data
  },

  /**
   * @dev Interacts with the server to initiate a transaction
   * @param paymentChannel The payment channel to use
   * @returns The server response
   * @example const record = await ApiCtrl.initiateTransaction(transfer);
   */
  async initiateTransaction(paymentChannel: string) {
    const fetched = await fetch(`${API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
      body: JSON.stringify({
        coin: state.selectedCoin.symbol,
        blockchain: state.selectedNetwork.id,
        apiKey: '',
        customer_name: state.payloadData.customerName,
        customer_email: state.payloadData.customerEmail,
        accept_partial_payment: state.payloadData.acceptPartialPayment,
        channel: paymentChannel,
        currency: state.payloadData.currency,
        amount: state.payloadData.amount,
      }),
    })

    return fetched.json()
  },

  subscribeToPusherEvent(address: string) {
    const channel = pusher.subscribe('DEPOSIT_EVENT')

    channel.bind(address, (data: IPusherEvent) => {
      console.log(':::::Pusher Event:::::', data)
      this.verifyPayment(data.address)
    })
  },

  async verifyPayment(address: string) {
    const url = `${API_URL}/transaction/verify/${address}`
    const fetched = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
    })
    state.successfulPayment = true

    return fetched.json()
  },

  setPayloadData(payload: IPayload) {
    state.payloadData = payload
  },
  getCurrency() {
    if (state.payloadData.currency) {
      return {
        NGN: '₦',
        ngn: '₦',
        AED: 'د.إ',
        aed: 'د.إ',
        USD: '$',
        usd: '$',
        GBP: '£',
        gpb: '£',
        EUR: '€',
        eur: '€',
        GHS: 'gh₵',
        ghs: 'gh₵',
        UGX: 'USh',
        ugx: 'USh',
        KES: 'ksh',
        kes: 'ksh',
      }[state.payloadData.currency]
    }

    return '$'
  },
  isTestnet() {
    if (state.apiKey) {
      return state.isTestnet
    }
    throw new Error('ApiCtrl has no key set')
  },
}
