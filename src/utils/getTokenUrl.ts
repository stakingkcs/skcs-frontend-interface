export function getTokenUrl(tokenNameOrAddress: string) {
  let tokenName = tokenNameOrAddress
  return `https://cdn.jsdelivr.net/gh/kcc-community/tokens-info@main/icons/${tokenName.toLowerCase()}.png`
}
