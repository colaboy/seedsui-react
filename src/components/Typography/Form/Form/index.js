import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import FormContext from './../FormContext'

// layout: horizontal | vertical | inline
const Form = forwardRef(
  (
    {
      virtual,
      layout = 'horizontal',
      labelCol,
      mainCol,
      scrollerDOM,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    return (
      <FormContext.Provider value={{ layout, labelCol, mainCol, scrollerDOM: scrollerDOM }}>
        <div
          ref={rootRef}
          className={`form-items form-layout-${layout}${className ? ' ' + className : ''}`}
          {...props}
        >
          {children}
        </div>
      </FormContext.Provider>
    )
  }
)

export default Form
