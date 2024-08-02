// 更新容器
function updateContainer({ container, bodyX }) {
  bodyX.style.transform = 'translateX(-' + container.clientWidth + 'px)'
}

export default updateContainer
