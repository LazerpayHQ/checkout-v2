/* eslint-disable require-unicode-regexp */
/* eslint-disable prefer-named-capture-group */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable func-style */
export const truncateAddress = (value: string) => {
  const truncatedAddress = value.length > 10 ? `${value.slice(0, 5)}....${value.slice(-5)}` : value

  return truncatedAddress
}

export const formatPrice = (value: number | string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const debounce = (func: Function, wait: number) => {
  let timeout: any

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
