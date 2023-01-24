import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-sidebar')
export class LazerpayCheckoutSideBar extends LitElement {
  public static styles = [styles]
  // -- render ------------------------------------------------------- //
  protected render() {
    return html` <div class="lp-sidebar">Pay with</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-sidebar': LazerpayCheckoutSideBar
  }
}
