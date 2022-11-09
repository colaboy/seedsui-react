// React17
import ReactDOM from 'react-dom'
// React18
let createRoot = null
try {
  let ReactDomClient = require('react-dom/client')
  if (ReactDomClient?.default) ReactDomClient = ReactDomClient.default
  createRoot = ReactDomClient?.createRoot || null
} catch (error) {
  createRoot = null
}

// 装载(React 18)
const MARK = '__SeedsUI_root__'
function modernRender(node, container) {
  const root = container[MARK] || createRoot(container)
  root.render(node)
  // 记录root对象到dom上, 防止重复createRoot
  container[MARK] = root
}

// 装载(React 17)
function legacyRender(node, container) {
  ReactDOM.render(node, container)
}

// 装载
export function render(node, container) {
  if (createRoot) {
    modernRender(node, container)
    return
  }

  legacyRender(node, container)
}

// 卸载(React 18)
async function modernUnmount(container) {
  // 延迟卸载以避免React 18同步警告
  return Promise.resolve().then(() => {
    container[MARK]?.unmount()
    delete container[MARK]
  })
}

// 卸载(React 17)
function legacyUnmount(container) {
  ReactDOM.unmountComponentAtNode(container)
}

export async function unmount(container) {
  if (createRoot) {
    return modernUnmount(container)
  }

  legacyUnmount(container)
}

// 默认导出
// eslint-disable-next-line
export default {
  render: render,
  unmount: unmount
}
