import { useEffect, useRef } from 'react'

// 获取上一次的值, 用于比较上一次的值
// 使用方法:
/*
const prevValue = usePrevious(value)
*/

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
