import { useEffect, useState, useCallback } from 'react'

// 用于使用最新的state或者redux的值
// 使用方法:
/*
handleChange = () => {
  setCount(1)
  readCount()
}
const readCount = useSyncCallback(() => {
  console.log(count) // => 1
})
*/

const useSyncCallback = (callback) => {
  const [proxyState, setProxyState] = useState({ current: false })

  const memoizedFunc = useCallback(() => {
    setProxyState({ current: true })
  }, [proxyState]) // eslint-disable-line

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false })
  }, [proxyState])

  useEffect(() => {
    proxyState.current && callback()
  })

  return memoizedFunc
}

export default useSyncCallback
