import React from 'react'

// 单项
const Item = ({ onAdd, onDelete, sortable, children }) => {
  return (
    <div className="transfer-item">
      {/* 操作 */}
      <div className="transfer-item-operate" onClick={onAdd || onDelete}>
        {onAdd ? (
          <i className="transfer-item-operate-icon add" />
        ) : (
          <i className="transfer-item-operate-icon delete" />
        )}
      </div>

      {/* 内容 */}
      <div className="transfer-item-content">{children}</div>

      {/* 拖拽 */}
      {sortable && (
        <div className="transfer-item-drop">
          <i className="transfer-item-drop-icon" />
        </div>
      )}
    </div>
  )
}

export default Item
