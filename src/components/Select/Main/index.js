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

      leftIcon = function ({ checked }) {
        return <Checkbox checked={checked} icon={<span className={`checkbox-icon tick`} />} />
      },
      rightIcon,
      ...props
    },
    ref
  ) => {
    // Expose
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current
      }
    })

    return (
      <div
        {...props}
        className={`select-main${props?.className ? ' ' + props.className : ''}`}
        ref={mainRef}
      >
        {_.isEmpty(list) && <Result />}

        {/* 列表 */}
        <List
          allowClear={allowClear}
          multiple={multiple}
          value={value}
          list={list}
          onChange={onChange}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      </div>
    )
  }
)

export default Main
