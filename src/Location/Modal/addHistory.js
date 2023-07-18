// 页面模式: 显示页面
function addHistory({ modal, loaded }) {
  if (modal !== 'page' || !loaded || window.location.href.indexOf('modalPage=1') !== -1) return

  let url = window.location.href
  // url最后一个字符为?号时删除?号
  url = url.indexOf('?') === url.length - 1 ? url.substring(0, url.length - 1) : url
  // url最后一个字符为&号时删除&号
  url = url.indexOf('&') === url.length - 1 ? url.substring(0, url.length - 1) : url

  // url分割符
  let split = url.indexOf('?') === -1 ? '?' : '&'

  window.history.pushState(
    {
      modalPage: '1'
    },
    '',
    `${url}${split}modalPage=1`
  )
}

export default addHistory
