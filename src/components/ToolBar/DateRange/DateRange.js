import React, { forwardRef, useState } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
import DatePicker from './../../DatePicker'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast, DatePicker } from 'seedsui-react'
测试使用-end */

const getDefaultRanges = DatePicker.getDefaultRanges

const DateRangeBar = ({ title, ranges, ...props }, ref) => {
  if (ranges === undefined) {
    // eslint-disable-next-line
    ranges = getDefaultRanges()
  }
  const [active, setActive] = useState(false)
  return (
    <DatePicker.RangeCombo
      ref={ref}
      style={{ height: 44 }}
      ranges={ranges}
      titles={{
        custom: LocaleUtil.locale('自定义选择', 'SeedsUI_date_range_custom_title'),
        selector: LocaleUtil.locale('快捷选择', 'SeedsUI_date_range_selector_title')
      }}
      className={`toolbar-dropdown${active ? ' active' : ''}`}
      onVisibleChange={(visible) => {
        props?.onBeforeChange && props?.onBeforeChange?.(visible)

        let toolbarDOM = ref.current?.comboDOM?.closest?.('.toolbar')
        if (!toolbarDOM) return

        if (visible) {
          toolbarDOM.classList.add('active')
        } else {
          toolbarDOM.classList.remove('active')
        }
      }}
      // 自定义渲染
      combo={({ displayValue }) => {
        return (
          <>
            <span className="toolbar-dropdown-title">
              {title ||
                displayValue ||
                LocaleUtil.locale('自定义区间', 'SeedsUI_toolbar_date_range_default_display_value')}
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
          setActive(visible)
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
