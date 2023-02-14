export const truncateAddress = (value: string) => {
  const truncatedAddress = value?.length > 10 ? value?.slice(0, 5) + '....' + value?.slice(-5) : value

  return truncatedAddress
}
