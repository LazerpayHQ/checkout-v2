/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ClientCtrl, WalletConnectCtrl } from '@lazerpay-checkout/core'
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
  @state() public breadcrumbs: string[] = []

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
    this.setupFontFaces()
  }
  protected firstUpdated() {
    console.log(this.getWallets())
  }
  private async getWallets() {
    await WalletConnectCtrl.getRecomendedWallets()
  }
  private onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.open = false
    }
    this.confirmModalOpen = !this.confirmModalOpen
  }

  private nextStep(breadcrumb: any) {
    const title = breadcrumb?.detail
    this.activeHeaderStep += 1
    let crumbs = [...this.breadcrumbs]

    if (this.activeHeaderStep === 2) {
      crumbs.push(title)
      crumbs.push('Network')
    } else if (this.activeHeaderStep === 3) {
      crumbs[1] = title
      if (this.activeTab === 0) {
        crumbs.push('Send Funds')
      } else {
        crumbs.push('Token')
      }
    } else {
      crumbs = []
    }

    this.breadcrumbs = crumbs
  }

  private prevStep() {
    this.activeHeaderStep -= 1
    let crumbs = [...this.breadcrumbs]

    if (this.activeHeaderStep === 2) {
      crumbs.pop()
      crumbs[1] = 'Network'
    } else if (this.activeHeaderStep === 1) {
      crumbs = []
    } else {
      crumbs = []
    }

    this.breadcrumbs = crumbs
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
          <div @click=${this.onCloseModal} class="lp-modal__close">${SvgIcons('CANCEL_ICON')}</div>
          <div class="lp-container">
            <lp-checkout-sidebar .activeTab=${this.activeTab} @tab-changed=${this.swithTab}> </lp-checkout-sidebar>
            <div>
              <lp-checkout-header .activeTab=${this.activeTab} .activeHeaderStep=${this.activeHeaderStep}>
              </lp-checkout-header>
              <lp-checkout-content
                @nextStep=${this.nextStep}
                @prevStep=${this.prevStep}
                .breadcrumbs=${this.breadcrumbs}
                .activeTab=${this.activeTab}
                .activeHeaderStep=${this.activeHeaderStep}
              >
              </lp-checkout-content>
            </div>
          </div>
        </div>
      </div>
    `
  }

  public swithTab(e: CustomEvent) {
    this.activeTab = e.detail.tab
    this.activeHeaderStep = 1
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-modal-container': LazerpayModalContainer
  }
}
