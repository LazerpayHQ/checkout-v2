import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
    icon: 'DAI',
    title: 'DAI Stablecoin ',
  },
]

@customElement('lp-checkout-wallet-first-step')
export class LazerpayCheckoutWalletFirstStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div @click=${this.next}>
        <div class="lp-transfer__header center">Search for your wallet</div>
        <div class="lp-transfer__box-wrapper">
          ${items.map((item) => html` <lp-checkout-box .icon=${item.icon} .title=${item.title}></lp-checkout-box> `)}
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
