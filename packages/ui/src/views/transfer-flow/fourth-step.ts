import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-transfer-fourth-step')
export class LazerpayCheckoutTransferFourthStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    return html` <div></div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-fourth-step': LazerpayCheckoutTransferFourthStep
  }
}
