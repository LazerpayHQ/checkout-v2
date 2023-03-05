import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import { SvgIcons } from '../../utils/SvgUtil'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IInitializeResponsePayload, TransactionStatusEnum } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { ApiCtrl } from '@lazerpay-checkout/core'

@customElement('lp-checkout-states')
export class LazerpayCheckoutStates extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private readonly payload: IInitializeResponsePayload = ApiCtrl.state.initializePayload

  // -- render ------------------------------------------------------- //
  protected render() {
    const isOverPaid =
      this.payload.status === TransactionStatusEnum.CONFIRMED &&
      this.payload.amountReceived > this.payload.actualAmount + this.payload.feeInCrypto

    return html`
      <div>
        <div class=${this.payload.id ? 'hide' : 'lp-checkout__loader'}>
          <lp-checkout-loader></lp-checkout-loader>
        </div>
        <div class=${this.payload.id ? 'lp-checkout__display' : 'lp-checkout__hide'}>
          <div
            class=${this.payload.status === TransactionStatusEnum.CONFIRMED
              ? 'lp-checkout__display'
              : 'lp-checkout__hide'}
          >
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

          <div
            class=${this.payload.status === TransactionStatusEnum.PENDING
              ? 'lp-checkout__display'
              : 'lp-checkout__hide'}
          >
            <div>
              <div class="lp-states">
                ${SvgIcons('PENDING')}
                <div class="lp-states__no-payment">No payment received</div>
                <div class="lp-states__text-wrapper">
                  <div class="lp-states__text">
                    We’re constantly monitoring the network and didn’t detect any payment.
                  </div>
                </div>
                <div class="lp-states__text-wrapper lp-states__footer-wrapper">
                  <div>
                    If you already made the payment, you can leave this page and you will get notified once payment has
                    been confirmed. If not, please try again.
                  </div>
                </div>
              </div>
              <lp-checkout-button title="All good" @click=${() => null}></lp-checkout-button>
            </div>
          </div>

          <div
            class=${this.payload.status === TransactionStatusEnum.INCOMPLETE
              ? 'lp-checkout__display'
              : 'lp-checkout__hide'}
          >
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
          </div>

          <div class=${isOverPaid ? 'lp-checkout__display' : 'lp-checkout__hide'}>
            <div>
              <div class="lp-states">
                ${SvgIcons('REFUND')}
                <div class="lp-states__no-payment">Refund requested</div>
                <div class="lp-states__text-wrapper">
                  <div class="lp-states__text">
                    Your transaction was successful but you overpaid Lazer Technologies.
                  </div>
                </div>
                <div class="lp-states__text-wrapper lp-states__footer-wrapper">
                  <div>
                    We’re currently processing your payment refund, if you need any other assistance, contact us at
                    <a class="lp-states__link" href="mailto:support@lazerpay.finance">support@lazerpay.finance</a>
                  </div>
                </div>
              </div>
              <lp-checkout-button title="Close" @click=${() => null}></lp-checkout-button>
            </div>
          </div>

          <div
            class=${this.payload.status === TransactionStatusEnum.CANCELLED
              ? 'lp-checkout__display'
              : 'lp-checkout__hide'}
          >
            <div>
              <div class="lp-states">
                ${SvgIcons('REJECTED')}
                <div class="lp-states__no-payment">Transaction cancelled</div>
                <div class="lp-states__text-wrapper cancelled">
                  <div class="lp-states__text">
                    This transaction was cancelled by the merchant. The amount paid has been returned to the originating
                    wallet.
                  </div>
                </div>
              </div>
              <lp-checkout-button title="Close" @click=${() => null}></lp-checkout-button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-states': LazerpayCheckoutStates
  }
}
