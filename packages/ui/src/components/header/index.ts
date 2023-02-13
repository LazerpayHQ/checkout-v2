/* eslint-disable func-style */
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import { classMap } from 'lit/directives/class-map.js'

@customElement('lp-checkout-header')
export class LazerpayCheckoutHeader extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public activeHeaderStep = 1
  @property() public activeTab: number = 0

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = (active: boolean) => {
      return {
        'lp-header__active': active,
        'lp-header__inactive': !active,
      }
    }
    const headerLines = this.activeTab === 0 ? 5 : 5

    return html`
      <div class="lp-header">
        <div class="lp-header__wrapper">
          <h1 class="lp-header__title">Lazerpay Ventures</h1>
          <div class="lp-header__detail">
            <div class="lp-header-text">falolasheyie@gmail.com</div>
            <div class="lp-header__detail-inner">
              <div class="lp-header-text">Amount:</div>
              <div class="lp-header-amount">USD 231.30</div>
            </div>
          </div>
        </div>
        <div class="lp-header__steps">
          ${Array.from(Array(headerLines).keys())?.map(
            (step, index) =>
              html` <div class="lp-header__line ${classMap(classes(index + 1 <= this.activeHeaderStep))}"></div> `
          )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-header': LazerpayCheckoutHeader
  }
}
