import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
  @property() public step = 1

  public next = (breadcrumb: string) => {
    this.nextHeader(breadcrumb)
  }

  protected render() {
    const components = [
      html`<lp-checkout-wallet-first-step .next=${this.next}></lp-checkout-wallet-first-step>`,
      html`<lp-checkout-wallet-second-step .next=${this.next}></lp-checkout-wallet-second-step>`,
      html`<lp-checkout-wallet-third-step .next=${this.next}></lp-checkout-wallet-third-step>`,
      html`<lp-checkout-wallet-fourth-step .next=${this.next}></lp-checkout-wallet-fourth-step>`,
      html`<lp-checkout-wallet-fifth-step .next=${this.next}></lp-checkout-wallet-fifth-step>`,
      html`<lp-checkout-wallet-sixth-step .next=${this.next}></lp-checkout-wallet-sixth-step>`,
      html`<lp-checkout-states .status=${'success'}></lp-checkout-states>`,
    ]

    return html` <div class="lp-transfer">${components[this.step - 1]}</div> `
  }

  private nextHeader(breadcrumb: string) {
    this.dispatchEvent(
      new CustomEvent('nextHeader', {
        bubbles: true,
        composed: true,
        detail: breadcrumb,
      })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-flow': LazerpayCheckoutWalletFlow
  }
}
