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
    return html`
      <div>
        <div class="lp-transfer__process-header-wrapper">
          <div class="lp-transfer__process-text">Amount to pay:</div>
          <div class="lp-transfer__process-text-bold">231.46 USDT</div>
        </div>
        <lp-checkout-loader></lp-checkout-loader>
        <div class="lp-transfer__process-text-payment">Processing payment</div>
        <div class="lp-transfer__process-payment-wrapper">
          <div class="lp-transfer__process-text-desc">
            Your transaction is processing, we’ll confirm payment shortly.
          </div>
        </div>
        <div class="lp-transfer__process-payment-wrapper">
          <div class="lp-transfer__process-text-footer">
            If the amount paid is more than the required amount, contact
            <a class="lp-transfer__link" href="mailto:support@lazerpay.finance">support@lazerpay.finance</a> with your
            Name, Email and Wallet address for a refund.
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-fourth-step': LazerpayCheckoutTransferFourthStep
  }
}
