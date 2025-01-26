import React from 'react'

// 内库使用-start
import Card from './../Card'
// 内库使用-end

const Item = ({
  itemData,
  layout,
  wrapper,
  disabled,
  checkbox,
  checkboxPosition = 'left',
  avatar,
  title,
  description,
  note,
  content,
  action,
  checked,
  onChange
}) => {
  // 获取checkbox
  function getCheckboxNode() {
    if (typeof checkbox === 'function') {
      return checkbox({ ...(itemData || {}), checked })
    }
    if (checkbox !== undefined) {
      return checkbox
    }
    return null
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

  // 渲染头像
  function getAvatarNode() {
    if (!avatar) return

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
              e.target.classList.add('fail')
            }}
            onLoad={(e) => {
              e.target.classList.add('success')
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
    if (action !== undefined) {
      return action
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

  if (wrapper === 'card') {
    return <Card className="list-item-wrapper">{getItemNode()}</Card>
  }
  return getItemNode()
}

export default Item
