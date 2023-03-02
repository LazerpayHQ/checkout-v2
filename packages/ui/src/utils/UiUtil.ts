/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LitElement } from 'lit'
import type { Wallet } from './TypesUtil'
import { ClientCtrl, ConfigCtrl, CoreUtil, OptionsCtrl } from '@lazerpay-checkout/core'

export const UiUtil = {
  LP_RECENT_WALLET: 'LP_RECENT_WALLET',

  async handleMobileLinking(wallet: Wallet) {
    const { standaloneUri, selectedChain } = OptionsCtrl.state
    const { links, name } = wallet

    function onRedirect(uri: string) {
      let href = ''
      if (links?.universal) {
        href = CoreUtil.formatUniversalUrl(links.universal, uri, name)
      } else if (links?.native) {
        href = CoreUtil.formatNativeUrl(links.native, uri, name)
      }
      CoreUtil.openHref(href)
    }

    if (standaloneUri) {
      onRedirect(standaloneUri)
    } else {
      await ClientCtrl.client().connectWalletConnect((uri) => {
        onRedirect(uri)
      }, selectedChain?.id)
    }
    UiUtil.setRecentWallet(wallet)
  },

  async handleAndroidLinking() {
    const { standaloneUri, selectedChain } = OptionsCtrl.state

    if (standaloneUri) {
      CoreUtil.openHref(standaloneUri)
    } else {
      await ClientCtrl.client().connectWalletConnect((uri) => {
        CoreUtil.setWalletConnectAndroidDeepLink(uri)
        CoreUtil.openHref(uri)
      }, selectedChain?.id)
    }
  },

  async handleConnectorConnection(id: string, onError?: () => void) {
    try {
      console.log(id)
      const { selectedChain } = OptionsCtrl.state
      console.log(selectedChain, 'selectedChain')

      const data = await ClientCtrl.client().connectConnector(id)
      console.log(data)
    } catch (error) {
      if (onError) {
        onError()
      } else {
        console.log(error)
        throw new Error(error)
      }
    }
  },
  truncate(value: string, strLen = 8) {
    if (value.length <= strLen) {
      return value
    }

    return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
  },
  setRecentWallet(wallet: Wallet) {
    localStorage.setItem(UiUtil.LP_RECENT_WALLET, JSON.stringify(wallet))
  },

  getRecentWallet() {
    const wallet = localStorage.getItem(UiUtil.LP_RECENT_WALLET)
    if (wallet) {
      return JSON.parse(wallet) as Wallet
    }

    return undefined
  },
}
