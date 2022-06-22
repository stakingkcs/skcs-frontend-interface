import { useContext } from 'react'
import { RefreshContext } from 'contexts/RefreshContext'

const useRefresh = () => {
  const { fast, slow, priceInterval } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow, priceReresh: priceInterval }
}

export default useRefresh
