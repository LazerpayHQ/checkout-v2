export interface Wallet {
  name: string
  id?: string
  image?: string
  links?: {
    native?: string
    universal?: string
  }
}
