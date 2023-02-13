import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import './first-step'
import './second-step'
import './third-step'
import './fourth-step'
import './fifth-step'
import './sixth-step'

@customElement('lp-checkout-wallet-flow')
export class LazerpayCheckoutWalletFlow extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() public step = 6

  public nextStep = () => {
    this.step += 1
  }

  protected render() {
    const components = [
      html`<lp-checkout-wallet-first-step .next=${this.nextStep}></lp-checkout-wallet-first-step>`,
      html`<lp-checkout-wallet-second-step .next=${this.nextStep}></lp-checkout-wallet-second-step>`,
      html`<lp-checkout-wallet-third-step .next=${this.nextStep}></lp-checkout-wallet-third-step>`,
      html`<lp-checkout-wallet-fourth-step .next=${this.nextStep}></lp-checkout-wallet-fourth-step>`,
      html`<lp-checkout-wallet-fifth-step .next=${this.nextStep}></lp-checkout-wallet-fifth-step>`,
      html`<lp-checkout-wallet-sixth-step .next=${this.nextStep}></lp-checkout-wallet-sixth-step>`,
    ]

    return html` <div class="lp-transfer">${components[this.step - 1]}</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-flow': LazerpayCheckoutWalletFlow
  }
}
