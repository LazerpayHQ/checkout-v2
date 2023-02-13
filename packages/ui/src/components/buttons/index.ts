import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import styles from './style.css'

@customElement('lp-checkout-button')
export class LazerpayCheckoutButton extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public outline = false
  @property() public error = false
  @property() public title = ''
  @property() public class = ''
  // @property() public action: () => void = () => {}

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-box__outline': this.outline,
      'lp-box__error': this.error,
      [this.class]: true
    }

    return html`
      <button @click=${this.action} type="button" class="lp-button ${classMap(classes)}">${this.title}</button>
    `
  }

  private action() {
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
      })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-button': LazerpayCheckoutButton
  }
}
