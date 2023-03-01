import { ApiCtrl } from '@lazerpay-checkout/core'
import type { ICoinResponse, ICoins } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-checkout-transfer-first-step')
export class LazerpayCheckoutTransferFirstStep extends LitElement {
  public static styles = [styles]

  // -- lifecycle ------------------------------------------- //
  protected firstUpdated() {
    this.getCoins()
  }

  // -- state & properties ------------------------------------------- //
  @state() public coins: ICoins[] = []
  @property() public next: (item?: object) => void = () => {}

  private readonly getCoins = async () => {
    const response: ICoinResponse = await ApiCtrl.getCoins('binance_smart_chain')
    this.coins = response.data
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    if (this.coins.length === 0) {
      return html`<div class="lp-transfer__loader"><lp-checkout-loader full=${true}></lp-checkout-loader></div>`
    }

    return html`
      <div>
        <div class="lp-transfer__header center">What do you want to pay with?</div>
        <div class="lp-transfer__box-wrapper">
          ${this.coins.map(
            (item) =>
              html`
                <lp-checkout-box
                  @click=${() => this.next(item)}
                  .icon=${item.symbol}
                  .title=${item.name}
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
    'lp-checkout-transfer-first-step': LazerpayCheckoutTransferFirstStep
  }
}
