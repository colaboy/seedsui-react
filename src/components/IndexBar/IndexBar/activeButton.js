// 选中button
function activeAnchor({ anchor, sidebarDOM, tooltipDOM }) {
  let buttonsDOM = sidebarDOM.querySelectorAll('.indexbar-button')
  if (buttonsDOM && buttonsDOM.length) {
    for (let i = 0, buttonDOM; (buttonDOM = buttonsDOM[i++]); ) {
      buttonDOM.classList.remove('active')
    }
  }

  let currentButtonDOM = sidebarDOM.querySelector(`[data-indexbar-anchor-button="${anchor}"]`)
  if (currentButtonDOM) {
    currentButtonDOM.classList.add('active')
    tooltipDOM.innerHTML = anchor || ''
  }
}

export default activeAnchor
