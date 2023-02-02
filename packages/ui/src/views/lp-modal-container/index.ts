import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { WalletConnectCtrl } from '@lazerpay-checkout/core'
import { initWalletConnect } from '@lazerpay-checkout/core'
import styles from './style.css'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false
  @state() public activeTab = 1
  @state() public client

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
  }
  private async initializeWallet() {
    this.client = await initWalletConnect()
  }

  private async connectWallet() {
    console.log(this.client, 'client ')
    await WalletConnectCtrl.handleConnection(this.client)
  }

  private async onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.open = false
    }
    await this.initializeWallet(this.client)
    await this.connectWallet()
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
            <lp-checkout-content .activeTab=${this.activeTab}> </lp-checkout-content>
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
