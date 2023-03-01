import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { OptionsCtrlState } from '../types/ControllerTypes'
import { ClientCtrl } from './ClientCtrl'

// -- initial state ------------------------------------------------ //
const state = proxy<OptionsCtrlState>({
  selectedChain: undefined,
  chains: undefined,
  standaloneChains: undefined,
  standaloneUri: undefined,
  address: undefined,
  balanceLoading: false,
  balance: undefined,
  isConnected: false,
  isStandalone: false,
  isCustomDesktop: false,
  isCustomMobile: false,
  isDataLoaded: false,
  isUiLoaded: false,
})

// -- controller --------------------------------------------------- //
export const OptionsCtrl = {
  state,

  subscribe(callback: (newState: OptionsCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  setChains(chains?: OptionsCtrlState['chains']) {
    state.chains = chains
  },

  setStandaloneChains(standaloneChains: OptionsCtrlState['standaloneChains']) {
    state.standaloneChains = standaloneChains
  },

  setStandaloneUri(standaloneUri: OptionsCtrlState['standaloneUri']) {
    state.standaloneUri = standaloneUri
  },

  getSelectedChain() {
    const selectedChain = ClientCtrl.client().getNetwork().chain
    if (selectedChain) {
      state.selectedChain = selectedChain
    }

    return state.selectedChain
  },

  setSelectedChain(selectedChain: OptionsCtrlState['selectedChain']) {
    state.selectedChain = selectedChain
  },

  setIsStandalone(isStandalone: OptionsCtrlState['isStandalone']) {
    state.isStandalone = isStandalone
  },

  setIsCustomDesktop(isCustomDesktop: OptionsCtrlState['isCustomDesktop']) {
    state.isCustomDesktop = isCustomDesktop
  },

  setIsCustomMobile(isCustomMobile: OptionsCtrlState['isCustomMobile']) {
    state.isCustomMobile = isCustomMobile
  },

  getAccount() {
    const account = ClientCtrl.client().getAccount()
    state.address = account.address
    state.isConnected = account.isConnected
  },

  setAddress(address: OptionsCtrlState['address']) {
    state.address = address
  },

  setIsConnected(isConnected: OptionsCtrlState['isConnected']) {
    state.isConnected = isConnected
  },

  setBalanceLoading(balanceLoading: OptionsCtrlState['balanceLoading']) {
    state.balanceLoading = balanceLoading
  },

  setBalance(balance: OptionsCtrlState['balance']) {
    state.balance = balance
  },

  setIsDataLoaded(isDataLoaded: OptionsCtrlState['isDataLoaded']) {
    state.isDataLoaded = isDataLoaded
  },

  setIsUiLoaded(isUiLoaded: OptionsCtrlState['isUiLoaded']) {
    state.isUiLoaded = isUiLoaded
  },

  resetBalance() {
    state.balance = undefined
  },

  resetAccount() {
    state.address = undefined
    OptionsCtrl.resetBalance()
  },
}
