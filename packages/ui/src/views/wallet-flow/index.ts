import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import './first-step'
import './second-step'

@customElement('lp-checkout-wallet-flow')
export class LazerpayCheckoutWalletFlow extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() public step = 1

  public nextStep = () => {
    this.step += 1
  }

  protected render() {
    const components = [
      html`<lp-checkout-wallet-first-step .next=${this.nextStep}></lp-checkout-wallet-first-step>`,
      html`<lp-checkout-wallet-second-step .next=${this.nextStep}></lp-checkout-wallet-second-step>`,
    ]

    return html` <div class="lp-transfer">${components[this.step - 1]}</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-flow': LazerpayCheckoutWalletFlow
  }
}
