import { fetchWallets, initWalletConnect } from '../utils'
import type { PageParams } from '../types/ControllerTypes'

const projectId = '08fc834cc8959c233c8514026f6f4834'

export const WalletConnectCtrl = {
  async handleConnection(signClient, methods?: string, chains?: [], connectionEvent?: string) {
    console.log(signClient, 'sign client')
    const proposalNamespace = {
      methods: ['eth_sign'],
      chains: ['eip155:1', 'eip155:97'],
      events: ['connect'],
    }
    const data = await signClient.connect({ requiredNamespaces: { eip155: proposalNamespace } })

    console.log(data)
    const session = await data.approval()
    console.log(session)
  },

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
