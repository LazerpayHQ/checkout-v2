/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletConnectCtrl } from '@lazerpay-checkout/core'
import type { Wallet } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'

const items = [
  {
    icon: 'METAMASK',
    title: 'Metamask',
  },
  {
    icon: 'COINBASE',
    title: 'Coinbase Wallet',
  },
  {
    icon: 'BUSD',
    title: 'Binance Wallet',
  },
  {
    icon: 'TRUSTWALLET',
    title: 'Trust Wallet',
  },
]

@customElement('lp-checkout-wallet-first-step')
export class LazerpayCheckoutWalletFirstStep extends LitElement {
  public static styles = [styles]

  protected firstUpdated() {
    this.getWallets()
  }

  // -- state & properties ------------------------------------------- //
  @property() public next: (breadcrumb: string) => void = () => {}
  @state() public wallets: Wallet[] = []

  private async getWallets() {
    const response = await WalletConnectCtrl.getRecomendedWallets()
    console.log(response)
    this.wallets = response
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__header center">Search for your wallet</div>
        <lz-input placeholder="Search"></lz-input>
        <div class="lp-transfer__box-wrapper">
          ${this.wallets.map(
            (item) =>
              html`
                <lp-checkout-box
                  .imageUrl=${item.imageUrl}
                  .title=${item.name}
                  @click=${() => this.next(item.name)}
                ></lp-checkout-box>
              `
          )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-first-step': LazerpayCheckoutWalletFirstStep
  }
}
