/* eslint-disable no-console */
import { CoreUtil } from '../utils'
import { proxy } from 'valtio/vanilla'
import type { PageParams, WalletCtrlState, Wallet } from '../types/ControllerTypes'

const projectId = '08fc834cc8959c233c8514026f6f4834'

// -- initial state ------------------------------------------------ //
const state = proxy<WalletCtrlState>({
  allWallets: [],
  recommendedWallets: [],
  selectedWallet: undefined,
  selectedChain: undefined,
})

export const WalletConnectCtrl = {
  state,
  async getRecomendedWallets() {
    const { listings } = await CoreUtil.fetchWallets(projectId, { page: 1, entries: 5 })
    console.log(listings, 'listings')

    return listings
  },

  async getPaginatedWallets(params: PageParams) {
    const { listings: listingsObj, total } = await CoreUtil.fetchWallets(projectId, params)
    const listings = Object.values(listingsObj)

    return { listings, total }
  },

  setSelectedWallet(wallet: Wallet) {
    state.selectedWallet = wallet
  },
  setSelectedChain(chain: number) {
    state.selectedChain = chain
  },
}
