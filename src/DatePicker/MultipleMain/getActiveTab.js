function getActiveTab(tabs) {
  // 默认选中一个非禁止项
  for (let tab of tabs) {
    if (tab.disabled) {
      continue
    }
    return tab
  }
  return tabs[0]
}

export default getActiveTab
