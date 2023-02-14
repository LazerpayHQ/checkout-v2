import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-wallet-sixth-step')
export class LazerpayCheckoutWalletSixthStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property({ type: Function }) public next: () => void = () => {}
  @state() private transactionStatus = {
    title: 'Waiting for payment',
    desc: 'Please open your wallet and confirm the payment to continue.',
  }

  public constructor() {
    super()
    setTimeout(() => {
      this.transactionStatus = { title: 'Confirming Payment', desc: 'We are confirming the status of your transaction' }
      setTimeout(()=>{
        this.next()
      },2000)
    }, 2000)
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__process-header-wrapper">
          <div class="lp-transfer__process-text">Amount to pay:</div>
          <div class="lp-transfer__process-text-bold">231.46 USDT</div>
        </div>
        <lp-checkout-loader></lp-checkout-loader>
        <div class="lp-transfer__process-text-payment">${this.transactionStatus.title}</div>
        <div class="lp-transfer__process-payment-wrapper">
          <div class="lp-transfer__process-text-desc">${this.transactionStatus.desc}</div>
        </div>
        <div class="lp-transfer__process-payment-wrapper">
          <a href="#" class="lp-transfer__link">View on block explorer</a>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-sixth-step': LazerpayCheckoutWalletSixthStep
  }
}
