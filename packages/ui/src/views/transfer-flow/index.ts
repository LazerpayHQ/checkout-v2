/* eslint-disable no-console */
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
  @state() public step: number = 1

  public next = () => {
    this.step = this.step + 1
    this.nextHeader()
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const components = [
      html`<lp-checkout-transfer-first-step .next=${this.next}></lp-checkout-transfer-first-step>`,
      html`<lp-checkout-transfer-second-step .next=${this.next}></lp-checkout-transfer-second-step>`,
      html`<lp-checkout-transfer-third-step .next=${this.next}></lp-checkout-transfer-third-step>`,
      html`<lp-checkout-transfer-fourth-step .next=${this.next}></lp-checkout-transfer-fourth-step>`,
      html`<lp-checkout-states .status=${'success'}></lp-checkout-states>`,
    ]

    return html` <div class="lp-transfer">${components[this.step - 1]}</div> `
  }

  private nextHeader() {
    this.dispatchEvent(
      new CustomEvent('nextHeader', {
        bubbles: true,
        composed: true,
      })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-flow': LazerpayCheckoutTransferFlow
  }
}
