/* eslint-disable func-style */
/* eslint-disable newline-before-return */
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'
import '../../components/modal'
import type { INetworkResponse, INetworks } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { ApiCtrl } from '@lazerpay-checkout/core'

const items = (symbol: string) => {
  switch (symbol) {
    case 'BNB':
      return 'BNB Smart Chain (BEP20)'
    case 'ETH':
      return 'Ethereum (ERC20)'
    case 'MATIC':
      return 'Polygon (Matic)'
    default:
      return 'BNB Smart Chain (BEP20)'
  }
}

@customElement('lp-checkout-transfer-second-step')
export class LazerpayCheckoutTransferSecondStep extends LitElement {
  public static styles = [styles]

  // -- lifecycle ------------------------------------------- //
  protected firstUpdated() {
    this.getNetworks()
  }

  // -- state & properties ------------------------------------------- //
  @property() public next: (item?: object) => void = () => {}
  @state() private modalOpen = false
  @state() public networks: INetworks[] = []

  private toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  private readonly getNetworks = async () => {
    const response: INetworkResponse = await ApiCtrl.getNetworks()
    this.networks = response.data
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const modalContent =
      'Some cryptocurrencies may be built on more than one network. To protect your funds, it’s important to select the right one. For cryptocurrencies with just one network, the default network has been preselected for you.'

    if (this.networks.length === 0) {
      return html`<div class="lp-transfer__loader"><lp-checkout-loader full=${true}></lp-checkout-loader></div>`
    }

    return html`
      <div>
        <lp-checkout-modal
          .open=${this.modalOpen}
          title="Why select a Network?"
          content=${modalContent}
          @close-modal=${this.toggleModal}
        ></lp-checkout-modal>
        <div>
          <div class="lp-transfer__header">Selet a transfer Network</div>
          <div class="lp-transfer__subheader">
            <div @click=${this.toggleModal} class="lp-transfer__question">${SvgIcons('QUESTION')}</div>
            <div class="lp-transfer__sub">Why select a network?</div>
          </div>
          <div class="lp-transfer__box-wrapper">
            ${this.networks.map(
              (item) =>
                html`
                  <lp-checkout-box
                    @click=${() => this.next(item)}
                    .description=${'Estimated confirmation time = 5 mins'}
                    .icon=${item.symbol}
                    .title=${items(item.symbol)}
                  ></lp-checkout-box>
                `
            )}
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-second-step': LazerpayCheckoutTransferSecondStep
  }
}
