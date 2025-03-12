import React, { forwardRef, useContext } from 'react'
import FormContext from './../FormContext'
import CommonItem from './Item'
import VirtualItem from './VirtualItem'

// layout: horizontal | vertical | inline
const Item = forwardRef(({ height, ...props }, ref) => {
  const { virtual } = useContext(FormContext)

  if (virtual?.observer && height) {
    return <VirtualItem ref={ref} height={height} {...props} />
  }

  return <CommonItem ref={ref} {...props} />
})

export default Item
