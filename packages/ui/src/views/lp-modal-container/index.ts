import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import styles from './style.css'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]
  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div id="lp-modal-container" class="lp-overlay" role="alertdialog" aria-modal="true">
        <div class="lp-container">
          <lp-checkout-sidebar />
          <div>Njoku is a boy</div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-modal-container': LazerpayModalContainer
  }
}
