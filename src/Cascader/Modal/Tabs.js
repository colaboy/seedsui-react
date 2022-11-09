import React from 'react'
import Utils from './Utils'

function Tabs({
  list,
  // 选中列表
  loadData,
  currentList,
  onCurrentListChange,
  // 页签
  tabs,
  onTabsChange,
  // 请选择页签
  chooseTab,
  onChooseTabChange
}) {
  // 点击Tab
  function handleTabClick(e, tab) {
    // 传入的选中项可能会数据不充分, 需要补充数据
    tab = Utils.getListNode(list, tab)
    e.stopPropagation()
    // 选中点击Tab
    handleActiveTab(tab)
    // 修改当前列表
    handleTabList(tab)
  }

  // 点击请选择
  async function handleChooseClick(e, tab) {
    e.stopPropagation()
    // 传入的选中项可能会数据不充分, 需要补充数据
    tab = Utils.getListNode(list, tab)

    let newCurrentList = await Utils.getChildrenList(list, tabs, tab, loadData)
    // 有子列表, 则渲染子列表, 并显示请选择
    if (Array.isArray(newCurrentList) && newCurrentList.length) {
      if (onCurrentListChange) onCurrentListChange(newCurrentList)
      // 选中请选择
      chooseTab.active = true

      // 取消页签选中
      tabs = tabs.map((item) => {
        delete item.active
        return item
      })
      if (onTabsChange) onTabsChange(tabs)
    }
  }

  // 更新Tabs选中状态
  function handleActiveTab(tab) {
    // 选择tab取消选中状态
    if (chooseTab?.active) {
      chooseTab.active = false
    }

    // 选中点击节点
    if (!tab?.id) return
    tabs = tabs.map((item) => {
      if (item.id === tab.id) {
        item.active = true
      } else {
        delete item.active
      }
      return item
    })
    if (onTabsChange) onTabsChange(tabs)
  }

  // 更新列表
  async function handleTabList(tab) {
    for (let item of tabs) {
      if (item.active) {
        tab = item
        break
      }
    }
    let newCurrentList = await Utils.getSiblingList(list, tabs, tab, loadData)
    if (!newCurrentList || !newCurrentList.length) debugger
    if (onCurrentListChange) onCurrentListChange(newCurrentList)
  }

  // 获取Tabs的DOM
  function getTabsDOM() {
    // 页签
    let tabsNode = []

    if (Array.isArray(tabs) && tabs.length) {
      for (let [index, tab] of tabs.entries()) {
        tabsNode.push(
          <div
            onClick={(e) => handleTabClick(e, tab)}
            className={`cascader-tab${tab.active ? ' active' : ''}`}
            key={index}
          >
            {tab.name}
          </div>
        )
      }
    }

    // 请选择
    if (chooseTab) {
      tabsNode.push(
        <div
          onClick={(e) => handleChooseClick(e, chooseTab)}
          className={`cascader-tab${chooseTab.active ? ' active' : ''}`}
          key={chooseTab.id}
        >
          {chooseTab.name}
        </div>
      )
    }
    return tabsNode
  }

  if (!Array.isArray(list) || !list.length) return null
  return <div className="cascader-tabs">{getTabsDOM()}</div>
}

export default Tabs
