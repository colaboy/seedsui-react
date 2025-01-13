// 选中button
function activeButton(currentButtonDOM, sidebarDOM) {
  let buttonsDOM = sidebarDOM.querySelectorAll('.indexbar-button')
  if (buttonsDOM && buttonsDOM.length) {
    for (let i = 0, buttonDOM; (buttonDOM = buttonsDOM[i++]); ) {
      buttonDOM.classList.remove('active')
    }
  }

  if (currentButtonDOM) {
    currentButtonDOM.classList.add('active')
  }
}

export default activeButton
