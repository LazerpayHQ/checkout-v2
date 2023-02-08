import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('lp-checkout-wallet-flow')
export class LazerpayCheckoutWalletFlow extends LitElement {

  // -- state & properties ------------------------------------------- //
  @state() public step = 1

  public nextStep = () => {
    this.step += 1
  }
  
  protected render() {
    return html`<p>this makes sense</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-wallet-flow': LazerpayCheckoutWalletFlow
  }
}
