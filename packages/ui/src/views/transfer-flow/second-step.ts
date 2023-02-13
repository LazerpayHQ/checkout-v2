import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'
import '../../components/modal'

const items = [
  {
    icon: 'BNB',
    title: 'BNB Smart Chain (BEP20)',
    description: 'Estimated confirmation time = 5 mins',
  },
  {
    icon: 'ETH',
    title: 'Ethereum (ERC20)',
    description: 'Estimated confirmation time = 5 mins',
  },
  {
    icon: 'TRON',
    title: 'Tron (TRC20)',
    description: 'Estimated confirmation time = 7 mins',
  },
  {
    icon: 'MATIC',
    title: 'Polygon - MATIC',
    description: 'Estimated confirmation time = 5 mins',
  },
]

@customElement('lp-checkout-transfer-second-step')
export class LazerpayCheckoutTransferSecondStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}
  @state() private modalOpen = false

  private toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const modalContent =
      'Some cryptocurrencies may be built on more than one network. To protect your funds, it’s important to select the right one. For cryptocurrencies with just one network, the default network has been preselected for you.'
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
            ${items.map(
              (item) =>
                html`
                  <lp-checkout-box
                    @click=${this.next}
                    .description=${item.description}
                    .icon=${item.icon}
                    .title=${item.title}
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
