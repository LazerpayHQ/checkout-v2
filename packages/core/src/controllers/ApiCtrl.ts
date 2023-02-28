/* eslint-disable no-console */
import { proxy } from 'valtio/vanilla'
import type { ApiCtrlState } from '../types/ControllerTypes'

// -- initial state ------------------------------------------------ //
const state = proxy<ApiCtrlState>({
  isTestnet: false,
  apiKey: undefined,
})

// -- controller -- As function to enable correct ssr handling
export const ApiCtrl = {
  setApiKey(apiKey: ApiCtrlState['apiKey']) {
    // Set api key globally and store session in OptionsCtrl
    const IS_TESTNET = apiKey.includes('test')
    state.isTestnet = IS_TESTNET
    state.apiKey = apiKey
  },
  async getNetwork() {
    // Logic for getting network
  },
  async getCoin() {
    // Logic for getting coins
  },

  async initiatePayment() {
    // Logic for initiating payment
  },
  async confirmPayment() {
    // Logic for confirming payment
  },

  isTestnet() {
    if (state.apiKey) {
      return state.isTestnet
    }
    throw new Error('ApiCtrl has no key set')
  },
}
