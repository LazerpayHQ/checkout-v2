/* eslint-disable no-console */
import { proxy } from 'valtio/vanilla'
import type { ApiCtrlState } from '../types/ControllerTypes'

// -- initial state ------------------------------------------------ //
const state = proxy<ApiCtrlState>({
  isTestnet: false,
  apiKey: undefined,
  payloadData: undefined,
  initializePayload: undefined,
})

const API_URL = 'https://dev-api.lazerpay.engineering/api/v1'

// -- controller -- As function to enable correct ssr handling
export const ApiCtrl = {
  state,
  setApiKey(apiKey: ApiCtrlState['apiKey']) {
    // Set api key globally and store session in OptionsCtrl
    const IS_TESTNET = apiKey.includes('test')
    state.isTestnet = IS_TESTNET
    state.apiKey = apiKey
  },
  async getNetwork() {
    // Logic for getting network
    const fetched = await fetch(`${API_URL}/blockchains`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
    })

    console.log(fetched)

    return fetched.json()
  },
  async getCoin(blockchain: string) {
    // Logic for getting coins
    const urlParams = new URLSearchParams({ blockchain }).toString()
    const url = `${API_URL}/coins${urlParams}`
    const fetched = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
    })
    console.log(fetched)

    return fetched.json()
  },

  async initiatePayment() {
    // Logic for initiating payment
    const fetched = await fetch(`${API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': state.apiKey,
      },
      body: JSON.stringify({
        ...state.payloadData,
      }),
    })

    console.log(fetched)
    state.initializePayload = fetched.json()

    return fetched.json()
  },
  async verifyPayment() {
    // Logic for confirming payment
  },

  setPayloadData(payload: ApiCtrlState['payloadData']) {
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
