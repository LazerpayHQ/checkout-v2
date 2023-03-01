/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement } from 'lit'
import QRCodeStyling from 'qr-code-styling'
import { customElement, property, state } from 'lit/decorators.js'
import type {
  ICoins,
  IInitialize,
  IInitializeResponse,
  INetworkResponse,
  INetworks,
  IPayload,
} from '@lazerpay-checkout/core/src/types/ControllerTypes'

import { SvgIcons } from '../../utils/SvgUtil'
import styles from './style.css'
import { createRef, Ref, ref } from 'lit/directives/ref.js'

import '../../components/modal'
import { truncateAddress } from '../../utils/methods'
import { ApiCtrl } from '@lazerpay-checkout/core'
import { defaultInitResponse, defaultNetwork } from '@lazerpay-checkout/core/src/types/defaultValues'

const qrCode = new QRCodeStyling({
  width: 172,
  height: 172,
  type: 'svg',
  data: '',
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
  public qrcodeRef: Ref<HTMLElement> = createRef()

  // -- lifecycle ------------------------------------------- //
  protected firstUpdated() {
    qrCode.append(this.qrcodeRef.value)
    this.getPayload()
  }

  // -- state & properties ------------------------------------------- //
  @property() public next: () => void = () => {}
  @state() private payload: IInitialize = defaultInitResponse
  @state() private network: INetworks = defaultNetwork

  private readonly getPayload = async () => {
    const initPayload: IInitializeResponse = await ApiCtrl.initiateTransaction('transfer')
    const networkPayload = ApiCtrl.getSelectedNetwork()

    this.payload = initPayload.data
    this.network = networkPayload
    qrCode.update({ data: initPayload.data.address })
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    return html`
      <div>
        <div class=${this.network !== defaultNetwork ? 'hide' : 'lp-transfer__loader'}>
          <lp-checkout-loader></lp-checkout-loader>
        </div>
        <div class=${this.network === defaultNetwork && 'lp-transfer__hide'}>
          <div class="lp-transfer__wrapper">
            <div>
              <div class="lp-transfer__text">Amount to pay:</div>
              <div class="lp-transfer__amount">${this.payload.cryptoAmount} ${this.payload.coin}</div>
            </div>
            <div class="lp-transfer__time-wrapper"></div>
          </div>
          <div class="lp-transfer__network-wrapper">
            <div class="lp-transfer__network-text"><div>NETWORK</div></div>
            <div class="lp-transfer__network">
              ${SvgIcons(this.network.symbol, '20', '20')}
              <div class="lp-transfer__network-name">${this.network.symbol}</div>
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
              <div class="lp-transfer__address">${truncateAddress(this.payload.address)}</div>
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
              <span class="lp-transfer__footer-text-bold">${this.network.tag} Network.</span>
            </div>
          </div>
          <div class="lp-transfer__btn-wrapper">
            <lp-checkout-button title="I’ve made payment" @click=${this.next} action=${this.next}></lp-checkout-button>
          </div>
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
