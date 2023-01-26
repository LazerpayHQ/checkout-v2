import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { UiUtil } from '../../utils/UiUtil'
import styles from './style.css'

@customElement('lp-modal-container')
export class LazerpayModalContainer extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //
  @state() private open = false

  // -- lifecycle ------------------------------------------- //
  public constructor() {
    super()
    this.open = true
  }

  private onCloseModal(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.open = false
    }
  }

  private get overlayEl() {
    return UiUtil.getShadowRootElement(this, '.lp-overlay')
  }

  private get containerEl() {
    return UiUtil.getShadowRootElement(this, '.lp-container')
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const classes = {
      'lp-overlay': true,
      'lp-open': this.open,
    }

    return html`
      <div
        id="lp-modal-container"
        @click=${this.onCloseModal}
        class=${classMap(classes)}
        role="alertdialog"
        aria-modal="true"
      >
        <div class="lp-container">
          ${this.open
            ? html`
                <lp-checkout-sidebar />
                <div>Njoku is a boy</div>
              `
            : null}
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
