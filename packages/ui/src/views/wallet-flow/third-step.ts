import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'

const items = [
  {
    icon: 'USDT',
    title: 'Tether (USDT)',
  },
  {
    icon: 'USDC',
    title: 'USD Coin',
  },
  {
    icon: 'BUSD',
    title: 'Binance USD',
  },
  {
    icon: 'DAI',
    title: 'DAI Stablecoin ',
  },
]

@customElement('lp-checkout-wallet-third-step')
export class LazerpayCheckoutWalletThirdStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__header center">Select currency</div>
        <div class="lp-transfer__box-wrapper">
          ${items.map((item) => html` <lp-checkout-box .icon=${item.icon} .title=${item.title} @click=${this.next}></lp-checkout-box> `)}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-third-step': LazerpayCheckoutWalletThirdStep
  }
}
