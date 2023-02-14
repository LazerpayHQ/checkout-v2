import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-wallet-fourth-step')
export class LazerpayCheckoutWalletFourthStep extends LitElement {
  public static styles = [styles]

  @property() public next: () => void = () => {};

  protected render() {
    return html` <div class="fourth-step">
      <h3 class="fourth-step-header">Authenticate with Coinbase</h3>
      <div class="fourth-step-sub-header">
        <img src="/images/coinbase.png" width="28" height="28" alt="coinbase" />
        <p>Coinbase Wallet</p>
      </div>
      <a class="fourth-step-link">https://coinbase.com</a>
      <ol class="fourth-step-list">
        <li>Select continue to open coinbase’s browser wallet</li>
        <li>Authenticate through Coinbase</li>
      </ol>
      <div class="fourth-step-actions">
        <div>
          <lp-checkout-button .outline=${false} title="Continue" @action=${this.next}></lp-checkout-button>
        </div>
        <lp-checkout-button .outline=${true} title="Connect with mobile app"></lp-checkout-button>
      </div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-fourth-step': LazerpayCheckoutWalletFourthStep
  }
}
