import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import './first-step'
import './second-step'
import './third-step'
import './fourth-step'

@customElement('lp-checkout-transfer-flow')
export class LazerpayCheckoutTransferFlow extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() public step: number = 5

  public nextStep = () => {
    this.step = this.step + 1
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    // this.next()
    const components = [
      html`<lp-checkout-transfer-first-step .next=${this.nextStep}></lp-checkout-transfer-first-step>`,
      html`<lp-checkout-transfer-second-step .next=${this.nextStep}></lp-checkout-transfer-second-step>`,
      html`<lp-checkout-transfer-third-step .next=${this.nextStep}></lp-checkout-transfer-third-step>`,
      html`<lp-checkout-transfer-fourth-step .next=${this.nextStep}></lp-checkout-transfer-fourth-step>`,
      html`<lp-checkout-states .status=${'pending'}></lp-checkout-states>`,
    ]

    return html` <div class="lp-transfer">${components[this.step - 1]}</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-flow': LazerpayCheckoutTransferFlow
  }
}
