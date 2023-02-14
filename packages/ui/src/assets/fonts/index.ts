import { html, LitElement } from 'lit'

const FONT_FACES = `
    @font-face {
      font-family: "proxima";
      font-style: normal;
      font-weight: 400;
      font-stretch: normal;
      src: url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Regular.woff2') format('woff2'), 
           url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Regular.woff') format('woff');
    }
    
    @font-face {
      font-family: "proxima";
      font-style: normal;
      font-weight: 600;
      font-stretch: normal;
      src: url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Semibold.woff2') format('woff2'), 
           url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Semibold.woff') format('woff');
    }
    
    @font-face {
      font-family: "proxima";
      font-style: normal;
      font-weight: 700;
      font-stretch: normal;
      src: url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Bold.woff2') format('woff2'), 
           url('https://cdn.jsdelivr.net/gh/LazerPay-Finance/lazer-font@main/fonts/proxima/ProximaNovaA-Bold.woff') format('woff');
    }
  `

export default FONT_FACES
