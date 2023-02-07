import { html, LitElement } from 'lit'
import QRCodeStyling from 'qr-code-styling'
import { customElement, property } from 'lit/decorators.js'
import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'
import { createRef, Ref, ref } from 'lit/directives/ref.js'

import '../../components/modal'
import { truncateAddress } from '../../utils/methods'

const qrCode = new QRCodeStyling({
  width: 172,
  height: 172,
  type: 'svg',
  data: '0x6Ad870d1dD2Fac9b21b0110330e55414324C03aa',
  image: 'https://res.cloudinary.com/njokuscript/image/upload/v1644612600/logo_eqnl6x.svg',
  dotsOptions: {
    color: '#0E49A1',
    type: 'rounded',
  },
  cornersSquareOptions: {
    color: '#F18971',
  },
  backgroundOptions: {
    color: '#fff',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 8,
  },
})

@customElement('lp-checkout-transfer-third-step')
export class LazerpayCheckoutTransferThirdStep extends LitElement {
  public static styles = [styles]
  qrcodeRef: Ref<HTMLElement> = createRef()

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}

  // -- lifecycle ---------------------------------------------------- //
  firstUpdated() {
    qrCode.append(this.qrcodeRef.value)
    // qrCode.update({data: '0x6Ad870d1dD2Fac9b21b0110330e55414324C03aa'})
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class="lp-transfer__wrapper">
          <div>
            <div class="lp-transfer__text">Amount to pay:</div>
            <div class="lp-transfer__amount">231.46 USDT</div>
          </div>
          <div class="lp-transfer__time-wrapper"></div>
        </div>
        <div class="lp-transfer__network-wrapper">
          <div class="lp-transfer__network-text"><div>NETWORK</div></div>
          <div class="lp-transfer__network">
            ${SvgIcons('BNB', '20', '20')}
            <div class="lp-transfer__network-name">BEP20</div>
          </div>
        </div>
        <div class="lp-transfer__desc-wrapper">
          <div class="lp-transfer__desc">Scan the QR code or copy the merchant’s wallet address to pay</div>
        </div>
        <div class="lp-transfer__qrcode-wrapper">
          <div ${ref(this.qrcodeRef)}></div>
        </div>
        <div class="lp-transfer__address-wrapper">
          <div>
            <div class="lp-transfer__address-text">Address</div>
            <div class="lp-transfer__address">${truncateAddress('0x6Ad870d1dD2Fac9b21b0110330e55414324C03aa')}</div>
          </div>
          <div class="lp-transfer__copy-wrapper">
            ${SvgIcons('COPY')}
            <div class="lp-transfer__copy-text">Copy</div>
          </div>
        </div>
        <div class="lp-transfer__footer">
          ${SvgIcons('NOTICE')}
          <div class="lp-transfer__footer-text">
            To avoid losing your deposit, please ensure you’re sending from a
            <span class="lp-transfer__footer-text-bold">BEP20 Network.</span>
          </div>
        </div>
        <div class="lp-transfer__btn-wrapper">
          <lp-checkout-button title="I’ve made payment" @click=${this.next} action=${this.next}></lp-checkout-button>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lp-checkout-transfer-third-step': LazerpayCheckoutTransferThirdStep
  }
}
