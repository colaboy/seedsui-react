import React, { useEffect, useRef } from 'react'
import closeAllDropdown from './../utils/closeAllDropdown'

import Modal from './Modal'
import List from './List'

// 列表下拉
function ListBar({
  title,

  value,
  list,
  onBeforeChange,
  onChange,
  ...props
}) {
  const dropdownRef = useRef(null)

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
  async function handleChange(newValue) {
    if (typeof onBeforeChange === 'function') {
      let goOn = await onBeforeChange(newValue)
      if (!goOn) return
    }
    if (onChange) onChange(newValue)
    close()
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

  return (
    <Modal
      offset={{
        top: 6
      }}
      maskProps={{
        className: 'toolbar-dropdown-mask',
        style: {
          zIndex: 99
        }
      }}
      title={title || value?.[0]?.name}
      {...props}
      ref={dropdownRef}
      onBeforeOpen={handleBeforeOpen}
    >
      <List value={value} list={list} onChange={handleChange} />
    </Modal>
  )
}
export default ListBar
