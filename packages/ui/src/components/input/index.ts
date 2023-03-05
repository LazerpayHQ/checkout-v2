/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'

@customElement('lz-input')
class LazerpayInput extends LitElement {
  public static styles = [styles]

  @property() private readonly placeholder: string | undefined
  @property() public readonly submit: (keyword: string) => void = () => {}
  @state() public keyword = ''

  private handleInput(evt: any) {
    const { value } = evt.target
    this.keyword = value
    this.submit(value)
  }

  protected render() {
    return html`<div class="lz-search-box">
      ${SvgIcons('search-icon')}
      <input
        .value=${this.keyword}
        @change=${this.handleInput}
        @blur=${this.handleInput}
        @input=${this.handleInput}
        placeholder=${this.placeholder ? this.placeholder : 'Search'}
      />
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lz-input': LazerpayInput
  }
}
