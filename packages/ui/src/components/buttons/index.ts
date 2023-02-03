import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import styles from './style.css'
import 'lit-icon'
import { SvgIcons } from '../../utils/SvgUtil'

@customElement('lp-checkout-button')
export class LazerpayCheckoutButton extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public outline: boolean = false
  @property() public title: string = ''

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-box__outline': this.outline,
    }
    return html` <button type="button" class="lp-button ${classMap(classes)}">${this.title}</button> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-button': LazerpayCheckoutButton
  }
}
