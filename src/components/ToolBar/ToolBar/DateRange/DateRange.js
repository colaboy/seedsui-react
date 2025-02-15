import React, { forwardRef, useState } from 'react'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
import DatePicker from './../../../DatePicker'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast, DatePicker } from 'seedsui-react'
测试使用-end */

const getDefaultRanges = DatePicker.getDefaultRanges

const DateRangeBar = ({ ranges, ...props }, ref) => {
  if (ranges === undefined) {
    // eslint-disable-next-line
    ranges = getDefaultRanges()
  }
  const [icon, setIcon] = useState('toolbar-dropdown-arrow')
  return (
    <DatePicker.RangeCombo
      ref={ref}
      style={{ height: 44 }}
      ranges={ranges}
      titles={{
        custom: LocaleUtil.locale('自定义选择'),
        selector: LocaleUtil.locale('快捷选择')
      }}
      className="toolbar-dropdown"
      // 自定义渲染
      combo={({ displayValue }) => {
        return (
          <>
            <span className="toolbar-dropdown-title">
              {displayValue ||
                LocaleUtil.locale('自定义区间', 'library.51024203e56c956c2ea5f50e61220f62')}
            </span>
            <i className={`toolbar-dropdown-arrow`} />
          </>
        )
      }}
      modalProps={{
        maskProps: {
          className: 'dropdown-mask',
          style: {
            zIndex: 99
          }
        },
        onVisibleChange: (visible) => {
          if (visible) {
            setIcon('shape-triangle-up')
          } else {
            setIcon('shape-triangle-down')
          }
        }
      }}
      onError={(err) =>
        Toast.show({
          content: err.errMsg || '',
          maskClickable: true
        })
      }
      {...props}
    ></DatePicker.RangeCombo>
  )
}

export default forwardRef(DateRangeBar)
