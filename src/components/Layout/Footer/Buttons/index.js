import React from 'react'
import Tab from './Tab'
import Button from './Button'

// 侧边查询底部按钮
export default function FilterContent({ buttons, onChange }) {
  console.log('buttons:', buttons)
  return (
    <>
      {buttons &&
        buttons.map((button, index) => {
          if (button.type === 'tab' || button.children) {
            return (
              <Tab
                key={button?.id || index}
                icon={button?.icon}
                type={button?.type}
                id={button?.id}
                name={button?.name}
                children={button?.children}
                onChange={onChange}
              />
            )
          }
          return (
            <Button
              key={button?.id || index}
              type={button?.type}
              id={button?.id}
              name={button?.name}
              primary={button?.primary}
              onChange={onChange}
            />
          )
        })}
    </>
  )
}
