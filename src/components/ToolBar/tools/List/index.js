import React, { useEffect, useRef } from 'react'
import { closeAllDropdown } from './../utils'

import List from './List'
import Grid from './Grid'
import Dropdown from './Dropdown'

// 下拉项
function ListBar({
  portal,
  type,
  name,
  value,
  list,
  // 布局方式: list, grid
  layout = 'list',
  // 自定义渲染
  arrow,
  titleRender,
  // 事件
  onBeforeChange,
  onChange,
  ...props
}) {
  const dropdownRef = useRef(null)

  // let [value, setValue] = useState(originValue)

  // 将所有dropdown合并到一个数组里, 用于全量关闭
  useEffect(() => {
    if (!window.dropdownRefs) window.dropdownRefs = []
    window.dropdownRefs.push(dropdownRef)
    // eslint-disable-next-line
  }, [])

  // 伸展时, 若已经展开了dropdown, 则隐藏
  function handleBeforeOpen() {
    if (document.querySelector('.dropdown-mask.active')) {
      closeAllDropdown()
      return false
    }
    return true
  }

  // 修改
  async function handleChange(item) {
    // eslint-disable-next-line
    value = [item]
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(value)
      if (!goOn) return
    }
    if (onChange) onChange(value)
    // setValue(value)
    close()
  }

  // 获取标题
  function getTitle() {
    if (typeof titleRender === 'function') {
      return titleRender({
        type,
        value: value,
        list: list,
        id: id,
        title: title,
        visible: dropdownRef.visible
      })
    }
    if (name) {
      return name
    }
    return title
  }

  // 隐藏
  function close(dRef) {
    if (!dRef) {
      // eslint-disable-next-line
      dRef = dropdownRef
    }
    if (dRef?.current?.close) {
      dRef.current.close()
    }
  }

  // 取标题和id
  let title = ''
  let id = ''
  if (Array.isArray(value) && value.length) {
    title = value[0].name
    id = value[0].id
  }

  return (
    <Dropdown
      portal={portal}
      offset={{
        top: 6
      }}
      maskProps={{
        className: 'dropdown-mask',
        style: {
          zIndex: 99
        }
      }}
      titleProps={{
        className: 'nowrap',
        style: { maxWidth: '58px' }
      }}
      title={getTitle()}
      arrow={arrow}
      {...props}
      className={
        (props?.disabled ? 'disabled' : '') + props?.className ? ' ' + props?.className : ''
      }
      ref={dropdownRef}
      onBeforeOpen={handleBeforeOpen}
    >
      {layout === 'list' && <List id={id} list={list} onChange={handleChange} />}
      {layout === 'grid' && <Grid id={id} list={list} onChange={handleChange} />}
    </Dropdown>
  )
}
export default ListBar
