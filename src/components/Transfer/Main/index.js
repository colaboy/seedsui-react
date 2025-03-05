import React, { useImperativeHandle, forwardRef, useRef } from 'react'
// import Sortable from 'sortablejs'
import { ReactSortable } from 'react-sortablejs'
import LocaleUtil from './../../../utils/LocaleUtil'

import Card from './../../Card'
import Item from './Item'

// 穿梭框
const Transfer = (
  {
    // Modal
    visible,

    // Main: common
    value,
    allowClear,
    onChange,

    list,
    titles,
    ...props
  },
  ref
) => {
  // 容器
  const mainRef = useRef(null)

  // 暴露方法
  useImperativeHandle(ref, () => {
    return {
      mainDOM: mainRef.current,
      getMainDOM: () => mainRef.current
    }
  })

  // 删除
  function handleDelete(item, index) {
    if (onChange) {
      onChange(
        value.filter((selected) => {
          return selected.id !== item.id
        })
      )
    }
  }

  // 添加
  function handleAdd(item, index) {
    for (let originItem of list) {
      if (originItem.id === item.id) {
        if (onChange) {
          onChange([...value, item])
        }
        break
      }
    }
  }

  // 未选列表
  let unSelectedList = list?.filter(
    (item, index) => !value?.some((selected) => selected.id === item.id)
  )

  return (
    <>
      <div
        {...props}
        className={`modal-selectmodal-main transfer-main${
          props?.className ? ' ' + props.className : ''
        }`}
        ref={mainRef}
      >
        {/* 已添加列表 */}
        {value?.length ? (
          <>
            <div className="transfer-title">
              <div className="transfer-title-content">
                {titles?.selected || LocaleUtil.locale('已添加', 'SeedsUI_added')}
              </div>
              {`${value.length}/${list?.length || 0}`}
            </div>
            <ReactSortable
              className="card transfer-card"
              list={value}
              setList={(newValue) => {
                // 如果值未发生变化则不触发onChange
                if (
                  JSON.stringify(value.map((item) => item.id)) ===
                  JSON.stringify(newValue.map((item) => item.id))
                ) {
                  return
                }
                if (onChange) {
                  onChange(newValue)
                }
              }}
            >
              {value.map((item, index) => {
                return (
                  <Item key={item.id} onDelete={() => handleDelete(item, index)} sortable>
                    {item?.name || ''}
                  </Item>
                )
              })}
            </ReactSortable>
          </>
        ) : null}

        {/* 未添加列表 */}
        {unSelectedList?.length ? (
          <>
            <div className="transfer-title">
              <div className="transfer-title-content">
                {titles?.unSelected || LocaleUtil.locale('未添加', 'SeedsUI_not_added')}
              </div>
              {`${unSelectedList.length}/${list?.length || 0}`}
            </div>
            <Card className="transfer-card">
              {unSelectedList.map((item, index) => {
                return (
                  <Item key={item.id} onAdd={() => handleAdd(item, index)}>
                    {item?.name || ''}
                  </Item>
                )
              })}
            </Card>
          </>
        ) : null}
      </div>
    </>
  )
}

export default forwardRef(Transfer)
