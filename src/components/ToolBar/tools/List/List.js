import React from 'react'

// 列表
function List({ id, list, onChange }) {
  return (
    <>
      {Array.isArray(list) && list.length
        ? list.map((item, index) => {
            return (
              <div
                className={`toolbar-dropdown-list-item${id === item.id ? ' active' : ''}${
                  item.disabled ? ' disabled' : ''
                }`}
                key={item.id ?? index}
                onClick={() => onChange(item)}
              >
                <p className="toolbar-dropdown-list-item-content">{item.name}</p>
                <i className="toolbar-dropdown-list-item-active-icon"></i>
              </div>
            )
          })
        : null}
    </>
  )
}
export default List
