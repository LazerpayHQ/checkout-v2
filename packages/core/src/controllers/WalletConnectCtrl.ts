import { fetchWallets } from '../utils'

const projectId = process.env.WALLET_CONNECT_ID

export const WalletConnect = {
  async getRecomendedWallets() {
    const { listings } = await fetchWallets(projectId, { page: 1, entries: 6 })

    return listings
  },

  async getPaginatedWallets(params: PageParams) {
    const { listings: listingsObj, total } = await fetchWallets(projectId, params)
    const listings = Object.values(listingsObj)

    return { listings, total }
  },
}
