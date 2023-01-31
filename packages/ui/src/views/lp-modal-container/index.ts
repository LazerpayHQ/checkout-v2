import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { WalletConnectCtrl } from '@lazerpay-checkout/core'
import styles from './style.css'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false
  @state() public activeTab = 1

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
  }

  private async onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.open = false
    }
    const wallets = await WalletConnectCtrl.getPaginatedWallets({ entries: 20 })
    console.log(wallets)
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-overlay': true,
      'lp-open': this.open,
    }

    return html`
      <div
        id="lp-modal-container"
        @click=${this.onCloseModal}
        class=${classMap(classes)}
        role="alertdialog"
        aria-modal="true"
      >
        <div class="lp-container">
          ${this.open ? html` <lp-checkout-sidebar .activeTab=${this.activeTab}> </lp-checkout-sidebar> ` : null}
          <div>
            <lp-checkout-header .activeStep=${this.activeTab}> </lp-checkout-header>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-modal-container': LazerpayModalContainer
  }
}
