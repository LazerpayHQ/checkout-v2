import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import 'lit-icon'

@customElement('lp-checkout-content')
export class LazerpayCheckoutContent extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public activeStep: number | undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="lp-content">
        <div class="lp-content__wrapper">
          <div class="lp-content__inner-wrapper">
            <lp-checkout-transfer-flow></lp-checkout-transfer-flow>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-content': LazerpayCheckoutContent
  }
}
