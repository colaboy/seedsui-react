// 页面模式: 显示页面
function addHistory({ modal, loaded }) {
  if (modal !== 'page' || !loaded || window.location.href.indexOf('modalPage=1') !== -1) return
  window.history.pushState(
    {
      modalPage: '1'
    },
    '',
    `${
      window.location.href.indexOf('?') === -1 &&
      window.location.href.indexOf('?') !== window.location.href.length - 1
        ? '?'
        : '&'
    }modalPage=1`
  )
}

export default addHistory
