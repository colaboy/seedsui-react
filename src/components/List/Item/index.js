import React from 'react'
import Wrapper from './Wrapper'

// 内库使用-start
import Checkbox from './../../Checkbox'
// 内库使用-end

/* 测试使用-start
import { Checkbox } from 'seedsui-react'
测试使用-end */

const Item = ({
  // Custom Wrapper or Item
  wrapper,

  // Display Item
  disabled,
  image,
  avatar,
  title,
  description,
  note,
  content,
  action,

  // Item Data
  itemData,

  // GLobal Config
  layout,
  checkbox,
  checkboxPosition = 'left',
  checked,
  onChange
}) => {
  // 获取checkbox
  function getCheckboxNode() {
    if (!checkbox) return null

    if (typeof checkbox === 'function') {
      return checkbox({ ...(itemData || {}), checked })
    }

    return <Checkbox checked={checked} />
  }

  // 获取note
  function getNoteNode() {
    if (typeof note === 'function') {
      return note({ ...(itemData || {}), checked })
    }
    if (typeof note === 'string') {
      return <div className="list-item-meta-node">{note}</div>
    }
    return note
  }

  // 渲染图片
  function getImageNode() {
    if (!image) return null

    if (typeof image === 'function') {
      return image({ ...(itemData || {}), checked })
    }
    if (typeof image === 'string') {
      return (
        <div className={`list-item-meta-image`}>
          <img
            alt=""
            src={image}
            onError={(e) => {
              e.target.parentNode.classList.add('fail')
            }}
            onLoad={(e) => {
              e.target.parentNode.classList.add('success')
            }}
            className="avatar"
          />
        </div>
      )
    }
    return image
  }

  // 渲染头像
  function getAvatarNode() {
    if (!avatar) return null

    if (typeof avatar === 'function') {
      return avatar({ ...(itemData || {}), checked })
    }
    if (typeof avatar === 'string') {
      return (
        <div className={`list-item-meta-avatar`}>
          <img
            alt=""
            src={avatar}
            onError={(e) => {
              e.target.parentNode.classList.add('fail')
            }}
            onLoad={(e) => {
              e.target.parentNode.classList.add('success')
            }}
            className="avatar"
          />
        </div>
      )
    }
    return avatar
  }

  // 获取action
  function getActionNode() {
    if (typeof action === 'function') {
      return action({ ...(itemData || {}), checked })
    }

    return null
  }

  // 获取item节点
  function getItemNode() {
    return (
      <div
        className={`list-item${disabled ? ' disabled' : ''}${checked ? ' active' : ''}${
          layout ? ' ' + layout : ''
        }`}
        onClick={(e) => {
          e.stopPropagation()
          onChange && onChange(!checked)
        }}
      >
        {/* Left Checkbox */}
        {checkboxPosition !== 'right' && getCheckboxNode(checked)}

        {/* Main */}
        <div className="list-item-main">
          {/* Meta */}
          <div className="list-item-meta">
            {getImageNode()}

            {getAvatarNode()}

            <div className="list-item-meta-content">
              <p className="list-item-meta-title">{title}</p>
              {description && <div className="list-item-meta-description">{description}</div>}
            </div>

            {getNoteNode()}
          </div>

          {/* Content */}
          {content && <div className="list-item-content">{content}</div>}

          {/* Action */}
          {action && <div className="list-item-action">{getActionNode()}</div>}
        </div>

        {/* Right Checkbox */}
        {checkboxPosition === 'right' && getCheckboxNode(checked)}
      </div>
    )
  }

  // Custom Wrapper or Item
  if (wrapper) {
    let WrapperNode = Wrapper
    if (typeof wrapper === 'function') {
      return wrapper({
        checked,
        onChange,
        // data
        itemData,
        // config
        layout,
        checkbox,
        checkboxPosition,
        // Node
        children: getItemNode()
      })
    }

    if (React.isValidElement(wrapper)) {
      WrapperNode = wrapper
    }
    return (
      <WrapperNode
        checked={checked}
        onChange={onChange}
        // data
        itemData={itemData}
        // config
        layout={layout}
        checkbox={checkbox}
        checkboxPosition={checkboxPosition}
      >
        {getItemNode()}
      </WrapperNode>
    )
  }

  return getItemNode()
}

export default Item
