import { useCallback, useRef } from 'react'

// 用于使用最新的state的值
const useRefFunction = (callback) => {
  const ref = useRef(null)
  ref.current = callback
  return useCallback((...res) => {
    return ref.current?.(...res)
  }, [])
}

export default useRefFunction
