import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { SvgIcons, SvgUtil } from '../../../utils/SvgUtil'
import styles from './style.css'

@customElement('lp-checkout-wallet-fifth-step')
export class LazerpayCheckoutWalletFifthStep extends LitElement {
  public static styles = [styles]

  @property() public next: () => void = () => {}
  @state() private modalOpen = true

  private toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  public goToNext() {
    this.toggleModal()
    this.next()
  }

  protected render() {
    return html`<div class="fifth-step">
      <lp-checkout-modal
        .open=${this.modalOpen}
        .errorModal=${true}
        title="Cancel payment?"
        content="Please note that if you cancel this payment, all unfinished transactions will be lost."
        @close-modal=${this.goToNext}
      ></lp-checkout-modal>
      <div class="fifth-step-overview">
        <div class="fifth-step-overview__left">
          <p>Amount to pay:</p>
          <p>231.35 USDT</p>
        </div>
        <div></div>
      </div>
      <hr />
      <div class="fifth-step-network">
        <div class="fifth-step-network__left">
          ${SvgIcons('ETH-COLORED')}
          <p>Ethereum</p>
        </div>
        <div class="fifth-step-network__right">
          <p>Connected</p>
          <span></span>
        </div>
      </div>
      <div class="fifth-step-balance">
        <div class="fifth-step-balance__left">
          <p>Balance</p>
          <div class="fifth-step-balance-content">
            ${SvgIcons('USDT-small')}
            <p>1,566.50 USDT</p>
          </div>
        </div>
        <div>${SvgUtil.PAYMENT_ICON}</div>
      </div>
      <lp-checkout-button .outline=${false} title="Pay 231.35 USDT" @action=${this.next}></lp-checkout-button>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-fifth-step': LazerpayCheckoutWalletFifthStep
  }
}
