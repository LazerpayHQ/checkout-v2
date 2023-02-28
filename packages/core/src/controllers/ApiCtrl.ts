/* eslint-disable no-console */
import { proxy } from 'valtio/vanilla'
import type { ApiCtrlState } from '../types/ControllerTypes'

// -- controller -- As function to enable correct ssr handling
export const ApiCtrl = {
  setApiKey(apiKey: ApiCtrlState['apiKey']) {
    // Set api key globally and store session in OptionsCtrl
    console.log(apiKey)
  },

  async initiatePayment() {
    // Logic for initiating payment
  },
  async confirmPayment() {
    // Logic for confirming payment
  },
}
