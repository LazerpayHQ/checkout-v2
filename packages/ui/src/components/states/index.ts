import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import 'lit-icon'
import { SvgIcons } from '../../utils/SvgUtil'

@customElement('lp-checkout-states')
export class LazerpayCheckoutStates extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() private status: string = 'success'

  // -- render ------------------------------------------------------- //
  protected render() {
    if (this.status === 'success') {
      return html`
        <div>
          <div class="lp-states">
            <div class="lp-states__icon-wrapper">
              <div class="lp-states__icon">${SvgIcons('CHECK')}</div>
            </div>
            <div class="lp-states__amount">231.46 USDT</div>
            <div class="lp-states__text-wrapper">
              <div class="lp-states__text">You have successfully sent $231.30 to Lazer Technologies</div>
            </div>
            <div class="lp-states__text-wrapper lp-states__footer-wrapper">
              <div>
                If the amount sent is more than the required amount, the deficit will be returned back to your wallet.
              </div>
            </div>
          </div>
          <lp-checkout-button title="All good" @click=${() => null}></lp-checkout-button>
        </div>
      `
    }

    if (this.status === 'pending') {
      return html`
        <div>
          <div class="lp-states">
            ${SvgIcons('PENDING')}
            <div class="lp-states__no-payment">No payment received</div>
            <div class="lp-states__text-wrapper">
              <div class="lp-states__text">We’re constantly monitoring the network and didn’t detect any payment.</div>
            </div>
            <div class="lp-states__text-wrapper lp-states__footer-wrapper">
              <div>
                If you already made the payment, you can leave this page and you will get notified once payment has been
                confirmed. If not, please try again.
              </div>
            </div>
          </div>
          <lp-checkout-button title="All good" @click=${() => null}></lp-checkout-button>
        </div>
      `
    }

    if (this.status === 'partial') {
      return html`
        <div>
          <div class="lp-states">
            ${SvgIcons('PARTIAL')}
            <div class="lp-states__amount">150.00 USDT</div>
            <div class="lp-states__text-wrapper">
              <div class="lp-states__text">Partial payment paid to Lazer Technologies</div>
            </div>
            <div class="lp-states__summary-wrapper">
              <div class="lp-states__summary">
                <div class="lp-states__summary-title">Total order amount</div>
                <div class="lp-states__summary-value">231.46 USDT</div>
              </div>
              <div class="lp-states__summary">
                <div class="lp-states__summary-title">Amount to balance</div>
                <div class="lp-states__summary-value balance">81.46 USDT</div>
              </div>
            </div>
            <div class="lp-states__text-wrapper lp-states__footer-wrapper small">
              <div>To complete this transaction, click on the button below.</div>
            </div>
          </div>
          <lp-checkout-button title="Pay balance" @click=${() => null}></lp-checkout-button>
        </div>
      `
    }

    return html`<div></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-states': LazerpayCheckoutStates
  }
}
