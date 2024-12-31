import React, { useEffect } from 'react'
import { SafeArea } from 'seedsui-react'

const { hasSafeArea, setRootSafeArea, setPickerSafeArea } = SafeArea
console.log(SafeArea)
export default () => {
  useEffect(() => {
    let isSafeArea = hasSafeArea()
    console.log('是否需要安全区:', isSafeArea)
  }, [])

  return (
    <>
      You can test it on mobile, if you can see a red rectangle, the mobile needs a safe area
      <SafeArea style={{ backgroundColor: 'red' }} />
      Use root stage safe area
      <div>
        {`If you want to set root safe area, you can invoke:
        setRootSafeArea()`}
      </div>
      <div>
        {`If you want to set part safe area, you can invoke
          1.Actionsheet and DatePicker etc. controls: setPickerSafeArea()
          2.Layout: pass safeArea={true}, It will help you decide use safe area
        `}
      </div>
    </>
  )
}
