import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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

@customElement('lp-checkout-wallet-second-step')
export class LazerpayCheckoutWalletSecondStep extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div>
          <div class="lp-transfer__header">Selet a transfer Network</div>
          <div class="lp-transfer__subheader">
            <div class="lp-transfer__question">${SvgIcons('QUESTION')}</div>
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
    'lp-checkout-wallet-second-step': LazerpayCheckoutWalletSecondStep
  }
}
