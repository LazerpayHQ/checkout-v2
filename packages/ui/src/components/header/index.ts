/* eslint-disable func-style */
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './style.css'
import { classMap } from 'lit/directives/class-map.js'
import { IPayload } from '@lazerpay-checkout/core/src/types/ControllerTypes'
import { defaultPayload } from '@lazerpay-checkout/core/src/types/defaultValues'
import { ApiCtrl } from '@lazerpay-checkout/core'
import { formatPrice } from '../../utils/methods'

@customElement('lp-checkout-header')
export class LazerpayCheckoutHeader extends LitElement {
  public static styles = [styles]

  // -- lifecycle ---------------------------------------------------- //
  protected firstUpdated() {
    this.getPayload()
  }

  // -- state & properties ------------------------------------------- //
  @property() public activeHeaderStep = 1
  @property() public activeTab = 0
  @state() private payload: IPayload = defaultPayload

  private readonly getPayload = () => {
    this.payload = ApiCtrl.state.payloadData
  }

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
          <h1 class="lp-header__title">${this.payload.businessName}</h1>
          <div class="lp-header__detail">
            <div class="lp-header-text">falolasheyie@gmail.com</div>
            <div class="lp-header__detail-inner">
              <div class="lp-header-text">Amount:</div>
              <div class="lp-header-amount">${this.payload.currency} ${formatPrice(this.payload.amount)}</div>
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
