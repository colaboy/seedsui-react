import React, { forwardRef } from 'react'

let Lists = forwardRef(({ lists }, ref) => {
  return (
    <div ref={ref} className="picker-slotbox">
      {(lists || []).map((list, index) => {
        return (
          <ul
            key={index}
            // 槽数
            slotindex={index}
            className="picker-slot text-center"
          >
            {(list || []).map((item, itemIndex) => {
              return <li key={item.id || itemIndex}>{item.name}</li>
            })}
          </ul>
        )
      })}
    </div>
  )
})

export default Lists
