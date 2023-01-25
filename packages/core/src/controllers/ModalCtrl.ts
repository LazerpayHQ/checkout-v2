import type { ModalCtrlState } from '../types/controllerTypes'
import { proxy, subscribe as valtioSub } from 'valtio/vanilla'

// -- initial state ------------------------------------------------ //
const state = proxy<ModalCtrlState>({
  open: false,
})

export const ModalCtrl = {
  state,
  subscribe(callback: (newState: ModalCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  open() {
    state.open = true
  },
  close() {
    state.open = false
  },
}
