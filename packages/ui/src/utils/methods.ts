/* eslint-disable func-style */
export const truncateAddress = (value: string) => {
  const truncatedAddress = value.length > 10 ? `${value.slice(0, 5)}....${value.slice(-5)}` : value

  return truncatedAddress
}

export const formatPrice = (value: number | string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
