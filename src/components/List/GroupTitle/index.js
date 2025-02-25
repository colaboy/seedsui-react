// 内库使用-start
import IndexBar from './../../IndexBar'
// 内库使用-end

/* 测试使用-start
import { IndexBar } from 'seedsui-react'
测试使用-end */

// 获取分组标题
function GroupTitle({ anchor, title, description, elementProps }) {
  let TitleNode = (
    <>
      {title && <div className="list-title">{title}</div>}
      {description && <div className="list-description">{description}</div>}
    </>
  )

  if (anchor) {
    return (
      <IndexBar.Anchor className="list-divider" {...(elementProps || {})} name={anchor}>
        {TitleNode}
      </IndexBar.Anchor>
    )
  }

  return (
    <div className="list-divider" {...(elementProps || {})}>
      {TitleNode}
    </div>
  )
}

export default GroupTitle
