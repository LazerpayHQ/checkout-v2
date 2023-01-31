import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
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

@customElement('lp-checkout-transfer-first-step')
export class LazerpayCheckoutTransferFirstStep extends LitElement {
  public static styles = [styles]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__header center">What do you want to pay with?</div>
        <div class="lp-transfer__box-wrapper">
          ${items.map((item) => html` <lp-checkout-box .icon=${item.icon} .title=${item.title}></lp-checkout-box> `)}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-first-step': LazerpayCheckoutTransferFirstStep
  }
}
