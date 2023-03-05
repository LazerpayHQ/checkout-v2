/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletConnectCtrl } from '@lazerpay-checkout/core'
import type { Wallet } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-wallet-first-step')
export class LazerpayCheckoutWalletFirstStep extends LitElement {
  public static styles = [styles]

  protected firstUpdated() {
    this.getWallets()
  }

  protected updated(changedProperties: Map<number | string | symbol, unknown>) {
    if (changedProperties.has('value')) {
      this.searchWallets()
    }
  }

  // -- state & properties ------------------------------------------- //
  @property() public next: (breadcrumb: string) => void = () => {}
  @state() private wallets: Wallet[] = []
  @state() private value = ''

  private async getWallets() {
    let response: Wallet[] = WalletConnectCtrl.state.recommendedWallets
    if (response.length === 0) {
      response = await WalletConnectCtrl.getRecomendedWallets()
    }
    this.wallets = response
  }

  private async searchWallets() {
    const data = { search: this.value, page: 1, entries: 7 }
    const resp = await WalletConnectCtrl.getPaginatedWallets(data)
    const newArr = [...resp]

    this.wallets = newArr
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__header center">Search for your wallet</div>
        <lz-input .submit=${(value: string) => (this.value = value)} .placeholder="Search"></lz-input>
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
