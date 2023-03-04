/* eslint-disable no-negated-condition */
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'

@customElement('lp-checkout-content')
export class LazerpayCheckoutContent extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public activeTab: number | undefined
  @property() public breadcrumbs: string[] = []
  @property() public activeHeaderStep = 1

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="lp-content">
        ${this.breadcrumbs.length > 0
          ? html`<div class="lp-content__breadcrumb">
              <div @click=${this.prevStep} class="lp-content__back">${SvgIcons('BACK-ARROW')}</div>
              ${this.breadcrumbs.map(
                (crumb, index) =>
                  html`<div class="lp-content__crumb-wrapper">
                    <div class="lp-content__crumb ${index === this.breadcrumbs.length - 1 && 'lp-content__crumb-blue'}">
                      ${crumb}
                    </div>
                    ${index !== this.breadcrumbs.length - 1
                      ? html`<div class="lp-content__crumb-direction">></div>`
                      : html`<div></div>`}
                  </div>`
              )}
            </div>`
          : html`<div></div>`}
        <div class="lp-content__wrapper">
          <div class="lp-content__inner-wrapper">
            ${choose(
              this.activeTab,
              [
                [
                  0,
                  () =>
                    html`<lp-checkout-transfer-flow
                      .step=${this.activeHeaderStep}
                      @nextHeader=${this.nextStep}
                    ></lp-checkout-transfer-flow>`,
                ],
                [
                  1,
                  () =>
                    html`<lp-checkout-wallet-flow
                      .step=${this.activeHeaderStep}
                      @nextHeader=${this.nextStep}
                    ></lp-checkout-wallet-flow>`,
                ],
              ],
              () => html`<lp-checkout-transfer-flow></lp-checkout-transfer-flow>`
            )}
          </div>
        </div>
      </div>
    `
  }

  private nextStep(breadcrumb: any) {
    this.dispatchEvent(
      new CustomEvent('nextStep', {
        bubbles: true,
        composed: true,
        detail: breadcrumb?.detail,
      })
    )
  }

  private prevStep() {
    this.dispatchEvent(
      new CustomEvent('prevStep', {
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
