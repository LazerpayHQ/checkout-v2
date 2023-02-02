import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import type { WalletConnectProviderOpts } from './types/ControllerTypes'
import type { ListingResponse, PageParams } from '../types/controllerTypes'
import SignClient from '@walletconnect/sign-client'

// -- constants ------------------------------------------------------- //
export const NAMESPACE = 'eip155'
export const EXPLORER_API = 'https://explorer-api.walletconnect.com'

// -- providers ------------------------------------------------------- //
export function walletConnectProvider({ projectId }: WalletConnectProviderOpts) {
  return jsonRpcProvider({
    rpc: (chain) => {
      const supportedChains = [
        1, 3, 4, 5, 10, 42, 56, 69, 97, 100, 137, 420, 42161, 42220, 43114, 80001, 421611, 421613, 1313161554,
        11297108109,
      ]

      if (supportedChains.includes(chain.id)) {
        return {
          http: `https://rpc.walletconnect.com/v1/?chainId=${NAMESPACE}:${chain.id}&projectId=${projectId}`,
        }
      }

      return {
        http: chain.rpcUrls.default.http[0],
        webSocket: chain.rpcUrls.default.webSocket?.[0],
      }
    },
  })
}
function formatParams(params: PageParams) {
  const stringParams = Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => typeof value !== 'undefined' && value !== null && value !== '')
      .map(([key, value]) => [key, value.toString()])
  )

  return new URLSearchParams(stringParams).toString()
}

export async function fetchWallets(projectId: string, params: PageParams): Promise<ListingResponse> {
  const urlParams = formatParams(params)
  const fetcUrl = `${EXPLORER_API}/v3/wallets?projectId=${projectId}&${urlParams}`
  const fetched = await fetch(fetcUrl)

  return fetched.json()
}

export function formatImageUrl(projectId: string, imageId: string) {
  return `${EXPLORER_API}/v3/logo/lg/${imageId}?projectId=${projectId}`
}
export async function initWalletConnect() {
  const signClient = await SignClient.init({
    projectId: '08fc834cc8959c233c8514026f6f4834',

    metadata: {
      name: 'Example Dapp',
      description: 'Example Dapp',
      url: '#',
      icons: ['https://walletconnect.com/walletconnect-logo.png'],
    },
  })
  console.log(signClient, 'from utils')

  return signClient
}
