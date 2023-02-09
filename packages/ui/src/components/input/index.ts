import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'

@customElement('lz-input')
class LazerpayInput extends LitElement {
  public static styles = [styles]

  @property() public placeholder: string | undefined

  protected render() {
    return html`<div class="lz-search-box">
      ${SvgIcons('search-icon')}
      <input placeholder=${this.placeholder ? this.placeholder : 'Search'} />
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lz-input': LazerpayInput
  }
}
