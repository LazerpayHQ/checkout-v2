import type { LitElement } from 'lit'

export const UiUtil = {
  MOBILE_BREAKPOINT: 600,
  getShadowRootElement(root: LitElement, selector: string) {
    const el = root.renderRoot.querySelector(selector)
    if (!el) {
      throw new Error(`${selector} not found`)
    }

    return el as HTMLElement
  },
  isMobileAnimation() {
    return window.innerWidth <= UiUtil.MOBILE_BREAKPOINT
  },
}
