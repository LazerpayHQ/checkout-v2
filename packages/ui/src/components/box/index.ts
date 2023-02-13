import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import styles from './style.css'
import { SvgIcons } from '../../utils/SvgUtil'

@customElement('lp-checkout-box')
export class LazerpayCheckoutBox extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public primary: boolean = false
  @property() public secondary: boolean = false
  @property() public icon: string = ''
  @property() public title: string = ''
  @property() public description: string = ''

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-box__primary': this.primary,
      'lp-box__secondary': this.secondary,
    }
    return html`
      <div class="lp-box ${classMap(classes)}">
        <div class="lp-box__wrapper">${SvgIcons(this.icon)}</div>
        <div>
          <div class="lp-box__title">${this.title}</div>
          ${this.description && html`<div class="lp-box__description">${this.description}</div>`}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-box': LazerpayCheckoutBox
  }
}
