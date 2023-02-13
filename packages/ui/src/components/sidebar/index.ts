/* eslint-disable func-style */
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './style.css'
import { SvgUtil } from '../../utils/SvgUtil'
import { classMap } from 'lit/directives/class-map.js'

/*
 * I WILL NEED TO REFACTOR THIS LATER. THIS IS JUST A QUICK FIX
 * IT THROWS AN ERROR WHEN I TRY TO DYNAICALLY RENDER FILL
 */
const icon = (active: boolean, index: number) => {
  if (index === 0) {
    if (active) {
      return SvgUtil.TRANSFER_ICON_COLORED
    }

    return SvgUtil.TRANSFER_ICON
  }
  if (active) {
    return SvgUtil.WALLET_ICON_COLORED
  }

  return SvgUtil.WALLET_ICON
}

@customElement('lp-checkout-sidebar')
export class LazerpayCheckoutSideBar extends LitElement {
  public static styles = [styles]

  // -- state & properties ------------------------------------------- //

  @property() public activeTab: number | undefined

  private readonly tabs = [
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
              @click=${() => this.changeTab(index)}
            >
              <div class="lp-sidebar__tab__icon">${icon(index === this.activeTab, index)}</div>
              <div class="lp-sidebar__tab__title">${tab.title}</div>
            </div>`
          )}
        </div>
      </div>
    `
  }


  private changeTab(index: number) {
    this.dispatchEvent(new CustomEvent('tab-changed', {
      detail: {tab: index},
      bubbles: true,
      cancelable: true
    }))
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-sidebar': LazerpayCheckoutSideBar
  }
}
