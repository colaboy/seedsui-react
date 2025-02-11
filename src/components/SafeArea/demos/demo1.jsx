import React, { useEffect } from 'react'
import { SafeArea } from 'seedsui-react'

export default () => {
  useEffect(() => {
    SafeArea.autoSafeArea()
    console.log('是否需要安全区:', SafeArea.needsSafeArea())
  }, [])

  return (
    <div
      className="flex position-absolute full"
      data-safe-area="auto-border-bottom"
      style={{ backgroundColor: 'green', borderColor: 'red' }}
    >
      You can test it on mobile, if you can see a red rectangle, the mobile needs a safe area
      <SafeArea style={{ backgroundColor: 'red' }} />
      Use root stage safe area
      <div>{`1. If you want to adapt to the safe area, you can invoke: SafeArea.autoSafeArea()`}</div>
      <div>{`2. If you want to root safe area, you can invoke: SafeArea.autoSafeArea('auto-safe-area-root')`}</div>
      <div>{`3. If you want to custom safe area, you can extend class: .auto-safe-area-children {...your class}`}</div>
    </div>
  )
}
