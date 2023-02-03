import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'

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

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div @click=${this.next}>
        <div class="lp-transfer__header">Selet a transfer Network</div>
        <div class="lp-transfer__subheader">
          <div class="lp-transfer__question">${SvgIcons('QUESTION')}</div>
          <div class="lp-transfer__sub">Selet a transfer Network</div>
        </div>
        <div class="lp-transfer__box-wrapper">
          ${items.map(
            (item) =>
              html`
                <lp-checkout-box
                  .description=${item.description}
                  .icon=${item.icon}
                  .title=${item.title}
                ></lp-checkout-box>
              `
          )}
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
