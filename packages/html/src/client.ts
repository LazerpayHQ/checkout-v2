export class LazerpayCheckout {
  /**
   * TODO: Should accept API Key as parameter
   * TODO: Should setup WalletConnect
   */
  public constructor() {
    this.initalizeUi()
  }

  private async initalizeUi() {
    if (typeof window !== 'undefined') {
      await import('@lazerpay-checkout/ui')
      const modal = document.createElement('lp-modal-container')
      document.body.insertAdjacentElement('beforeend', modal)
    }
  }
}