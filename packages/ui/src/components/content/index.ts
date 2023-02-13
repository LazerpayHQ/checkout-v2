import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js'
import styles from './style.css'

@customElement('lp-checkout-content')
export class LazerpayCheckoutContent extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public activeTab: number | undefined

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="lp-content">
        <div class="lp-content__wrapper">
          <div class="lp-content__inner-wrapper">
            ${choose(
              this.activeTab,
              [
                [0, () => html`<lp-checkout-transfer-flow @nextHeader=${this.nextStep}></lp-checkout-transfer-flow>`],
                [1, () => html`<lp-checkout-wallet-flow></lp-checkout-wallet-flow>`],
              ],
              () => html`<lp-checkout-transfer-flow></lp-checkout-transfer-flow>`
            )}
          </div>
        </div>
      </div>
    `
  }

  private nextStep() {
    this.dispatchEvent(
      new CustomEvent('nextStep', {
        bubbles: true,
        composed: true,
      })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-content': LazerpayCheckoutContent
  }
}
