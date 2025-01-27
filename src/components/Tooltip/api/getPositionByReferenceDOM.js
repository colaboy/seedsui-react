// 内库使用-start
import getClassNameByAnimation from './../../Modal/api/getClassNameByAnimation'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'seedsui-react'
const getClassNameByAnimation = Modal.getClassNameByAnimation
测试使用-end */

// 根据源位置计算弹框位置
function getPositionByReferenceDOM({ referenceDOM, animation }) {
  if (!referenceDOM || Object.prototype.toString.call(referenceDOM).indexOf('[object HTML') === -1)
    return null
  // 获取子元素的位置
  let rect = referenceDOM.getBoundingClientRect()
  let top = null
  let bottom = null
  let left = null
  let right = null
  // 根据不同位置的弹窗，计算位置
  let position = getClassNameByAnimation(animation)
  // 从下往上弹
  if (position.indexOf('bottom') === 0) {
    bottom = window.innerHeight - rect.top
  }
  // 从上往下弹
  else {
    top = rect.top + rect.height
  }

  // 左侧弹出
  if (position.indexOf('left') !== -1) {
    left = rect.left
  }
  // 右侧弹出
  else if (position.indexOf('right') !== -1) {
    right = window.innerWidth - rect.left - rect.width
  }
  return {
    bottom,
    top,
    left,
    right
  }
}

export default getPositionByReferenceDOM
