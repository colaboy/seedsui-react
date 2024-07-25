import defaultIconOptions from './defaultIconOptions'

// 图标控件
function getIcon(icon) {
  if (!icon) return null

  if (!window.L?.Icon || !window.L?.divIcon) return null

  // 已经是图标了则直接返回
  if (icon instanceof window.L.Icon || icon instanceof window.L.divIcon) {
    return icon
  }

  const { html, ...props } = icon || {}

  if (html) {
    return window.L.divIcon({
      html: html,
      ...props
    })
  }

  return window.L.icon({
    ...defaultIconOptions,
    ...props
  })

  return null
}

export default getIcon
