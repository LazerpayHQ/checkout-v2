import { svg } from 'lit-html'

export const SvgUtil = {
  TRANSFER_ICON_COLORED: svg`

           <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <g>
                <path d="M0.5 10.5C0.5 13.2499 2.74996 15.4999 5.49991 15.4999V8L0.5 10.5Z" fill="#0F172A" />
                <path
                  d="M11.7498 15.4997L19.2496 8.14986L11.7498 0.5V5.49991H5.49991C2.74996 5.49991 0.5 7.74986 0.5 10.4998H11.7498V15.4997Z"
                  fill="#0F172A"
                />
              </g>
            </defs>
          </svg>
  `,
  TRANSFER_ICON: svg`
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
                <path d="M0.5 10.5C0.5 13.2499 2.74996 15.4999 5.49991 15.4999V8L0.5 10.5Z" fill="#0F172A" />
                <path
                  d="M11.7498 15.4997L19.2496 8.14986L11.7498 0.5V5.49991H5.49991C2.74996 5.49991 0.5 7.74986 0.5 10.4998H11.7498V15.4997Z"
                  fill="#125BC9"
                />
                 </defs>
          </svg>
  `,
  WALLET_ICON_COLORED: svg`
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g>
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
        </svg>`,
  WALLET_ICON: svg`
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
        `,
}
