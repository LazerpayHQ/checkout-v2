import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'

const items = [
  {
    icon: 'USDT',
    title: 'Tether (USDT)',
  },
  {
    icon: 'USDC',
    title: 'USD Coin',
  },
  {
    icon: 'BUSD',
    title: 'Binance USD',
  },
  {
    icon: 'DAI',
    title: 'DAI Stablecoin ',
  },
]

@customElement('lp-checkout-wallet-third-step')
export class LazerpayCheckoutWalletThirdStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}
  @state() private modalOpen = false

  private toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  private goToNext() {
    this.toggleModal()
    this.next()
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
          @close-modal=${this.goToNext}
        ></lp-checkout-modal>
        <div class="lp-transfer__header center">Select currency</div>
        <div class="lp-transfer__box-wrapper">
          ${items.map(
            (item) =>
              html`
                <lp-checkout-box .icon=${item.icon} .title=${item.title} @click=${this.toggleModal}></lp-checkout-box>
              `
          )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-third-step': LazerpayCheckoutWalletThirdStep
  }
}
