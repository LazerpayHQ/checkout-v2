/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import styles from './style.css'
import './first-step'
import './second-step'
import './third-step'
import './fourth-step'
import { ApiCtrl } from '@lazerpay-checkout/core'

@customElement('lp-checkout-transfer-flow')
export class LazerpayCheckoutTransferFlow extends LitElement {
  public static styles = [styles]

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
  }

  // -- state & properties ------------------------------------------- //
  @property() public step = 1

  public next = (breadcrumb: string, data: any) => {
    if (this.step === 1) {
      ApiCtrl.setCoin(data)
    }
    if (this.step === 2) {
      ApiCtrl.setNetwork(data)
    }
    this.nextHeader(breadcrumb)
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const components = [
      html`<lp-checkout-transfer-first-step .next=${this.next}></lp-checkout-transfer-first-step>`,
      html`<lp-checkout-transfer-second-step .next=${this.next}></lp-checkout-transfer-second-step>`,
      html`<lp-checkout-transfer-third-step .next=${this.next}></lp-checkout-transfer-third-step>`,
      html`<lp-checkout-transfer-fourth-step .next=${this.next}></lp-checkout-transfer-fourth-step>`,
      html`<lp-checkout-states></lp-checkout-states>`,
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
    'lp-checkout-transfer-flow': LazerpayCheckoutTransferFlow
  }
}
