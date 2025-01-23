import React, { forwardRef } from 'react'
import Block from './Block'

const TabBar = ({ length, animated = true, tabProps = {}, ...props }, ref) => {
  return (
    <div className={`skeleton-tabs`} ref={ref} {...props}>
      {Array.from({ length: length || 4 }).map((_, index) => (
        <Block
          key={index}
          animated={animated}
          {...tabProps}
          className={`skeleton-tab skeleton-block-darken${
            tabProps.className ? ' ' + tabProps.className : ''
          }`}
        />
      ))}
    </div>
  )
}

export default forwardRef(TabBar)
