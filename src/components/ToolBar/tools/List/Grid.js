import React from 'react'

// 列表
function List({ id, list, onChange }) {
  return (
    <div className="toolbar-grid-modal">
      {Array.isArray(list) && list.length
        ? list.map((item, index) => {
            return (
              <div
                className={`toolbar-grid-modal-item${id === item.id ? ' active' : ''}`}
                key={item.id ?? index}
                onClick={() => onChange(item)}
              >
                {item.name}
              </div>
            )
          })
        : null}
    </div>
  )
}
export default List
