import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './style.css'
import 'lit-icon'
import { classMap } from 'lit/directives/class-map.js'

// I WILL NEED TO REFACTOR THIS LATER. THIS IS JUST A QUICK FIX
// IT THROWS AN ERROR WHEN I TRY TO DYNAICALLY RENDER FILL
const icon = (active: boolean, index: number) => {
  if (index === 0) {
    if (active) {
      return html`
        <lit-icon icon="transfer1-icon" iconset="iconset"></lit-icon>
        <lit-iconset iconset="iconset">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <g id="transfer1-icon">
                <path d="M0.5 10.5C0.5 13.2499 2.74996 15.4999 5.49991 15.4999V8L0.5 10.5Z" fill="#0F172A" />
                <path
                  d="M11.7498 15.4997L19.2496 8.14986L11.7498 0.5V5.49991H5.49991C2.74996 5.49991 0.5 7.74986 0.5 10.4998H11.7498V15.4997Z"
                  fill="#125BC9"
                />
              </g>
            </defs>
          </svg>
        </lit-iconset>
      `
    } else {
      return html`
        <lit-icon icon="transfer2-icon" iconset="iconset"></lit-icon>
        <lit-iconset iconset="iconset">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <g id="transfer2-icon">
                <path d="M0.5 10.5C0.5 13.2499 2.74996 15.4999 5.49991 15.4999V8L0.5 10.5Z" fill="#0F172A" />
                <path
                  d="M11.7498 15.4997L19.2496 8.14986L11.7498 0.5V5.49991H5.49991C2.74996 5.49991 0.5 7.74986 0.5 10.4998H11.7498V15.4997Z"
                  fill="#0F172A"
                />
              </g>
            </defs>
          </svg>
        </lit-iconset>
      `
    }
  } else {
    if (active) {
      return html`
        <lit-icon icon="wallet1-icon" iconset="iconset"></lit-icon>
        <lit-iconset iconset="iconset">
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <g id="wallet1-icon">
                <rect
                  x="0.164062"
                  y="8.68457"
                  width="16.1284"
                  height="11.5438"
                  rx="0.933318"
                  transform="rotate(-29.1316 0.164062 8.68457)"
                  fill="#D9E7FC"
                />
                <rect
                  x="0.714844"
                  y="8.74219"
                  width="18.7617"
                  height="13.9793"
                  rx="0.933318"
                  fill="linear-gradient(117.6deg, #125BC9 4.7%, #16A3B9 95.33%)"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.4804 10.8827C19.4056 11.083 19.262 11.2587 19.0606 11.3709L6.60293 18.3138C6.15268 18.5647 5.58426 18.4031 5.33332 17.9528L0.71875 9.67285C0.720181 9.15861 1.13749 8.74219 1.65206 8.74219H18.5471C18.5882 8.74219 18.6287 8.74485 18.6684 8.75L19.4215 10.1013C19.4446 10.1427 19.4642 10.1852 19.4804 10.2283V10.8827Z"
                  fill="#1E293B"
                />
                <circle cx="16.5337" cy="16.2837" r="1.28756" fill="white" />
              </g>
            </defs>
          </svg>
        </lit-iconset>
      `
    } else {
      return html`
        <lit-icon icon="wallet2-icon" iconset="iconset"></lit-icon>
        <lit-iconset iconset="iconset">
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <g id="wallet2-icon">
                <rect
                  x="0.164062"
                  y="8.68457"
                  width="16.1284"
                  height="11.5438"
                  rx="0.933318"
                  transform="rotate(-29.1316 0.164062 8.68457)"
                  fill="#D9E7FC"
                />
                <rect x="0.714844" y="8.74219" width="18.7617" height="13.9793" rx="0.933318" fill="#64748B" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.4804 10.8827C19.4056 11.083 19.262 11.2587 19.0606 11.3709L6.60293 18.3138C6.15268 18.5647 5.58426 18.4031 5.33332 17.9528L0.71875 9.67285C0.720181 9.15861 1.13749 8.74219 1.65206 8.74219H18.5471C18.5882 8.74219 18.6287 8.74485 18.6684 8.75L19.4215 10.1013C19.4446 10.1427 19.4642 10.1852 19.4804 10.2283V10.8827Z"
                  fill="#1E293B"
                />
                <circle cx="16.5337" cy="16.2837" r="1.28756" fill="white" />
              </g>
            </defs>
          </svg>
        </lit-iconset>
      `
    }
  }
}

@customElement('lp-checkout-sidebar')
export class LazerpayCheckoutSideBar extends LitElement {
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
    const classes = (active: boolean) => {
      return {
        'lp-sidebar__active': active,
        'lp-sidebar__inactive': !active,
      }
    }
    return html`
      <div class="lp-sidebar">
        <div class="lp-sidebar__header">
          <div class="lp-sidebar__header__title">Pay with</div>
        </div>
        <div class="lp-sidebar__content">
          ${this.tabs.map(
            (tab, index) => html`<div
              class="lp-sidebar__content-inner ${classMap(classes(index === this.activeTab))}"
              @click=${() => (this.activeTab = index)}
            >
              <div class="lp-sidebar__tab__icon">${icon(index === this.activeTab, index)}</div>
              <div class="lp-sidebar__tab__title">${tab.title}</div>
            </div>`
          )}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-sidebar': LazerpayCheckoutSideBar
  }
}
