import React, { useEffect } from 'react'
import { SafeArea } from 'seedsui-react'
import needsSafeArea from './needsSafeArea'

console.log(SafeArea)
export default () => {
  useEffect(() => {
    console.log('是否需要安全区:', needsSafeArea())
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
          1.ActionSheet and DatePicker etc. controls: setPickerSafeArea()
          2.Layout: pass safeArea={true}, It will help you decide use safe area
        `}
      </div>
    </>
  )
}
