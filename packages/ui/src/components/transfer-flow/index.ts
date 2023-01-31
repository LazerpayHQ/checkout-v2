import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'
import './first-step'

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

@customElement('lp-checkout-transfer-flow')
export class LazerpayCheckoutTransferFlow extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public activeStep: number | undefined
  @state() private step: number = 1

  private components = [html`<lp-checkout-transfer-first-step></lp-checkout-transfer-first-step>`]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html` <div class="lp-transfer">${this.components[this.step - 1]}</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-flow': LazerpayCheckoutTransferFlow
  }
}
