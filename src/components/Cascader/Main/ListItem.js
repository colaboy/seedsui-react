import React, { Fragment, forwardRef } from 'react'

// 内库使用-start
import locale from '../../../utils/locale'
import Notice from './../../../deprecated/Notice'
import IndexBar from './../../IndexBar'
// 内库使用-end

/* 测试使用-start
import { locale, Notice, IndexBar } from 'seedsui-react'
测试使用-end */

const ListItem = forwardRef(
  (
    {
      optionProps,
      // 选中列表
      list,
      value,
      // 修改
      onSelect,
      ...props
    },
    ref
  ) => {
    // 显示分栏
    const indexs = {}

    if (Array.isArray(list) && !list.length) {
      // eslint-disable-next-line
      list = locale('暂无数据', 'SeedsUI_no_data')
    }

    return (
      <div
        {...props}
        className={`picker-main${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {typeof list === 'string' && <Notice caption={list} />}
        {Array.isArray(list) &&
          list.map((item, index) => {
            // 字母分栏
            let anchorBar = null
            if (item.anchor && !indexs[item.anchor]) {
              indexs[item.anchor] = true
              anchorBar = (
                <IndexBar.Anchor name={item.anchor}>
                  <p className="indexbar-list-header">{item.anchor}</p>
                </IndexBar.Anchor>
              )
            }

            return (
              <Fragment key={item.id}>
                {anchorBar}
                <div
                  {...optionProps}
                  className={`cascader-option${
                    optionProps.className ? ' ' + optionProps.className : ''
                  }${
                    value?.some((selected) => {
                      return selected.id === item.id
                    })
                      ? ' active'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(item)
                  }}
                >
                  <p className="cascader-option-caption">{item.name}</p>
                  <i className="cascader-option-icon"></i>
                </div>
              </Fragment>
            )
          })}
      </div>
    )
  }
)

export default ListItem
