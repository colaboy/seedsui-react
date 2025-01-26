import React from 'react'

// 内库使用-start
import Card from './../Card'
// 内库使用-end

const Item = ({
  wrapper,
  disabled,
  checkbox,
  checkboxPosition = 'left',
  avatar,
  title,
  description,
  content,
  action,
  checked,
  onChange
}) => {
  // 获取checkbox
  function getCheckboxNode(checked) {
    if (typeof checkbox === 'function') {
      return checkbox({ checked })
    }
    if (checkbox !== undefined) {
      return checkbox
    }
    return null
  }

  // 渲染头像
  function getAvatarNode() {
    if (!avatar) return

    if (typeof avatar === 'function') {
      return avatar({ checked })
    }
    if (typeof avatar === 'string') {
      return (
        <div className={`list-option-main-avatar`}>
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

  function getItemNode() {
    return (
      <div
        className={`list-option${disabled ? ' disabled' : ''}${checked ? ' active' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onChange && onChange(!checked)
        }}
      >
        {/* Left Checkbox */}
        {checkboxPosition !== 'right' && getCheckboxNode(checked)}

        {/* Main */}
        <div className="list-option-main">
          {getAvatarNode()}

          <div className="list-option-main-content">
            <p className="list-option-main-title">{title}</p>
            {description && <div className="list-option-main-description">{description}</div>}
          </div>
        </div>

        {/* Content */}
        {content && <div className="list-option-content">{content}</div>}

        {/* Action */}
        {action && <div className="list-option-action">{action}</div>}

        {/* Right Checkbox */}
        {checkboxPosition === 'right' && getCheckboxNode(checked)}
      </div>
    )
  }

  if (wrapper === 'card') {
    return <Card className="list-option-wrapper">{getItemNode()}</Card>
  }
  return getItemNode()
}

export default Item
