import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { WalletConnectCtrl } from '@lazerpay-checkout/core'
import styles from './style.css'
import FONT_FACES from '../../assets/fonts/index'
import { SvgIcons } from '../../utils/SvgUtil'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false
  @state() public activeTab = 0

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
    this.setupFontFaces()
  }

  private async onCloseModal(event: PointerEvent) {
    this.open = false
    const wallets = await WalletConnectCtrl.getPaginatedWallets({ entries: 20 })
    console.log(wallets)
  }

  /** Load styles */
  private setupFontFaces() {
    if (document.querySelector('style[title="__LazerpayStyle__"]')) {
      return
    }
    const style = document.createElement('style')
    style.title = '__LazerpayStyle__'

    style.appendChild(document.createTextNode(FONT_FACES))
    document.head.appendChild(style)
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-overlay': true,
      'lp-open': this.open,
    }

    return html`
      <div id="lp-modal-container" class=${classMap(classes)} role="alertdialog" aria-modal="true">
        <div class="lp-modal">
          <div @click=${this.onCloseModal} class="lp-modal__close">${SvgIcons('CANCEL_ICON')}</div>
          <div class="lp-container">
            ${this.open ? html` <lp-checkout-sidebar .activeTab=${this.activeTab} @tab-changed=${this.swithTab}> </lp-checkout-sidebar> ` : null}
            <div>
              <lp-checkout-header .activeStep=${this.activeTab}> </lp-checkout-header>
              <lp-checkout-content .activeTab=${this.activeTab}> </lp-checkout-content>
            </div>
          </div>
        </div>
      </div>
    `
  }

  public swithTab(e: CustomEvent) {
    this.activeTab = e.detail.tab;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-modal-container': LazerpayModalContainer
  }
}
