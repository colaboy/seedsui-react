import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import _ from 'lodash'

import Result from './../../Result'

// 内库使用-start
import List from './../../List'
import Checkbox from './../../Checkbox'
// 内库使用-emd

// Main
const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main
      value,
      multiple,
      allowClear,
      onChange,

      list,

      checkbox = function ({ checked }) {
        return <Checkbox checked={checked} icon={<span className={`checkbox-icon tick`} />} />
      },
      checkboxPosition,
      ...props
    },
    ref
  ) => {
    // Expose
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        mainDOM: mainRef.current,
        getMainDOM: () => mainRef.current
      }
    })

    return (
      <div
        {...props}
        className={`modal-selectmodal-main select-main${
          props?.className ? ' ' + props.className : ''
        }`}
        ref={mainRef}
      >
        {_.isEmpty(list) && <Result className="select-main-result" status="empty" />}

        {/* 列表 */}
        <List
          allowClear={allowClear}
          multiple={multiple}
          value={value}
          list={list}
          onChange={onChange}
          checkbox={checkbox}
          checkboxPosition={checkboxPosition}
        />
      </div>
    )
  }
)

export default Main
