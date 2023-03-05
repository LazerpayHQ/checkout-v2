/* eslint-disable func-style */
/* eslint-disable no-console */
import { CoreUtil } from '../utils'
import { proxy } from 'valtio/vanilla'
import type { PageParams, WalletCtrlState, Wallet, Listing } from '../types/ControllerTypes'

const projectId = '08fc834cc8959c233c8514026f6f4834'

// -- initial state ------------------------------------------------ //
const state = proxy<WalletCtrlState>({
  allWallets: [],
  recommendedWallets: [],
  selectedWallet: undefined,
  selectedChain: undefined,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refactorResponse = (listings: Listing[]) => {
  const wallets: Wallet[] = []

  for (const [, value] of Object.entries(listings)) {
    wallets.push({
      id: value.id,
      name: value.name,
      imageUrl: value.image_url.md,
      url: value.homepage,
      links: {
        native: value.mobile.native,
        universal: value.mobile.universal,
      },
      isMobile: Boolean(value.mobile),
    })
  }
  state.recommendedWallets = wallets

  return wallets
}

export const WalletConnectCtrl = {
  state,
  async getRecomendedWallets() {
    const { listings } = await CoreUtil.fetchWallets(projectId, { page: 1, entries: 7 })

    const response = refactorResponse(listings)

    return response
  },
  async getPaginatedWallets(params: PageParams) {
    const { listings } = await CoreUtil.fetchWallets(projectId, params)

    const response = refactorResponse(listings)
    state.recommendedWallets = response

    return response
  },

  setSelectedWallet(wallet: Wallet) {
    state.selectedWallet = wallet
  },

  setSelectedChain(chain: number) {
    state.selectedChain = chain
  },
}
