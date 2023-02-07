import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import 'lit-icon'

@customElement('lp-checkout-loader')
export class LazerpayCheckoutLoader extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @property() public primary: boolean = false
  @property() public secondary: boolean = false
  @property() public icon: string = ''
  @property() public title: string = ''
  @property() public description: string = ''

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div class="lp-loader">
        <img
          src="https://res.cloudinary.com/djzeufu4j/image/upload/v1675805082/loader_yfgrth.gif"
          alt="Lazerpay loading"
          width="70"
          height="70"
        />
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-loader': LazerpayCheckoutLoader
  }
}
