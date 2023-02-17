import type { ListingResponse, PageParams } from './types/ControllerTypes'

export const CoreUtil = {
  WALLETCONNECT_DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',

  isHttpUrl(url: string) {
    return url.startsWith('http://') || url.startsWith('https://')
  },

  formatNativeUrl(appUrl: string, wcUri: string, name: string): string {
    if (CoreUtil.isHttpUrl(appUrl)) {
      return this.formatUniversalUrl(appUrl, wcUri, name)
    }
    let safeAppUrl = appUrl
    if (!safeAppUrl.includes('://')) {
      safeAppUrl = appUrl.replaceAll('/', '').replaceAll(':', '')
      safeAppUrl = `${safeAppUrl}://`
    }
    this.setWalletConnectDeepLink(safeAppUrl, name)
    const encodedWcUrl = encodeURIComponent(wcUri)

    return `${safeAppUrl}wc?uri=${encodedWcUrl}`
  },
  formatUniversalUrl(appUrl: string, wcUri: string, name: string): string {
    if (!CoreUtil.isHttpUrl(appUrl)) {
      return this.formatNativeUrl(appUrl, wcUri, name)
    }
    let plainAppUrl = appUrl
    if (appUrl.endsWith('/')) {
      plainAppUrl = appUrl.slice(0, -1)
    }
    this.setWalletConnectDeepLink(plainAppUrl, name)
    const encodedWcUrl = encodeURIComponent(wcUri)

    return `${plainAppUrl}/wc?uri=${encodedWcUrl}`
  },
  formatParams(params: PageParams) {
    const stringParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, value]) => typeof value !== 'undefined' && value !== null && value !== '')
        .map(([key, value]) => [key, value.toString()])
    )

    return new URLSearchParams(stringParams).toString()
  },

  async fetchWallets(projectId: string, params: PageParams): Promise<ListingResponse> {
    const urlParams = this.formatParams(params)
    const fetcUrl = `https://explorer-api.walletconnect.com/v3/wallets?projectId=${projectId}&${urlParams}`
    const fetched = await fetch(fetcUrl)

    return fetched.json()
  },

  formatImageUrl(projectId: string, imageId: string) {
    return `https://explorer-api.walletconnect.com/v3/logo/lg/${imageId}?projectId=${projectId}`
  },
  openHref(href: string, target = '_self') {
    window.open(href, target, 'noreferrer noopener')
  },
  setWalletConnectDeepLink(href: string, name: string) {
    localStorage.setItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href, name }))
  },

  setWalletConnectAndroidDeepLink(wcUri: string) {
    const [href] = wcUri.split('?')

    localStorage.setItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href, name: 'Android' }))
  },

  removeWalletConnectDeepLink() {
    localStorage.removeItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE)
  },
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
