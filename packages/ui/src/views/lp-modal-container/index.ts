import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ClientCtrl } from '@lazerpay-checkout/core'
import { UiUtil } from '../../utils/UiUtil'
import styles from './style.css'
import FONT_FACES from '../../assets/fonts/index'
import { SvgIcons } from '../../utils/SvgUtil'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false
  @state() public activeTab = 0
  @state() private confirmModalOpen = false
  @state() public activeHeaderStep = 1

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
    this.setupFontFaces()
    this.connectWallet()
    console.log(ClientCtrl.client().getAccount(), 'yo')
  }

  private async connectWallet() {
    await UiUtil.handleConnectorConnection('rainbow')
  }
  private async disconnectWallet() {
    await ClientCtrl.client().disconnect()
  }

  private onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.open = false
    }
    this.confirmModalOpen = !this.confirmModalOpen
  }

  private nextStep() {
    this.activeHeaderStep += 1
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

    const modalContent = 'Please note that if you cancel this payment, all unfinished transactions will be lost.'

    return html`
      <div id="lp-modal-container" class=${classMap(classes)} role="alertdialog" aria-modal="true">
        <lp-checkout-modal
          .open=${this.confirmModalOpen}
          title="Cancel payment?"
          content=${modalContent}
          errorModal=${true}
          @close-modal=${this.onCloseModal}
        ></lp-checkout-modal>

        <div class="lp-modal">
          <div @click=${this.confirmCloseModal} class="lp-modal__close">${SvgIcons('CANCEL_ICON')}</div>
          <div class="lp-container">
            <lp-checkout-sidebar .activeTab=${this.activeTab} @tab-changed=${this.swithTab}> </lp-checkout-sidebar>
            <div>
              <lp-checkout-header .activeTab=${this.activeTab} .activeHeaderStep=${this.activeHeaderStep}>
              </lp-checkout-header>
              <lp-checkout-content @nextStep=${this.nextStep} .activeTab=${this.activeTab}> </lp-checkout-content>
            </div>
          </div>
        </div>
      </div>
    `
  }

  public swithTab(e: CustomEvent) {
    this.activeTab = e.detail.tab
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-modal-container': LazerpayModalContainer
  }
}
