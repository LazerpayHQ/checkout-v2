import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import 'lit-icon'

@customElement('lp-checkout-content')
export class LazerpayCheckoutContent extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private activeTab = 3

  private tabs = [
    {
      title: 'Transfer',
    },
    {
      title: 'Wallet',
    },
  ]

  // -- render ------------------------------------------------------- //
  protected render() {
    return html` <div class="lp-content"></div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-content': LazerpayCheckoutContent
  }
}
