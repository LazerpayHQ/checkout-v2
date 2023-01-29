import { fetchWallets } from '../utils'

const projectId = '08fc834cc8959c233c8514026f6f4834'

export const WalletConnectCtrl = {
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
