/* eslint-disable func-style */
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import { classMap } from 'lit/directives/class-map.js'
import '../buttons'

@customElement('lp-checkout-modal')
export class LazerpayCheckoutModal extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public open: boolean = false
  @property() public title: string = ''
  @property() public content: string = ''
  @property() public close: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-modal__open': this.open,
    }

    const btnTitle = 'Ok, I understand'

    return html`
      <div class="lp-modal ${classMap(classes)}">
        <div class="lp-modal__wrapper">
          <div class="lp-modal__inner-wrapper">
            <div class="lp-modal__title">${this.title}</div>
            <div class="lp-modal__content">${this.content}</div>
          </div>
          <div class="lp-modal__button-wrapper">
            <lp-checkout-button .outline=${true} title=${btnTitle} @click=${this.close}></lp-checkout-button>
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-modal': LazerpayCheckoutModal
  }
}
