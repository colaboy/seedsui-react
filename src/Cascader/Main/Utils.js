// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../locale'

// eslint-disable-next-line
export default {
  /**
   * 数据转换
   */
  // 为原始数据补充parentid
  convertList: function (list) {
    if (!Array.isArray(list) || !list.length) return []
    return list.setDeepTreeParentId()
  },
  /**
   * 初始化选中项
   */
  initData: async function (config) {
    let {
      list,
      // 选中列表
      loadData,
      // eslint-disable-next-line
      currentList,
      onCurrentListChange,
      // 选中前判断
      onBeforeSelectOption,
      // 页签
      activeTab,
      tabs,
      onTabsChange,
      // 请选择页签
      chooseTab,
      onChooseTabChange
    } = config

    // 取兄弟节点
    let newCurrentList = await this.getSiblingList(list, tabs, activeTab, loadData)

    // 判断是否允许加载子节点
    let allowLoadChildren = true
    if (onBeforeSelectOption) {
      allowLoadChildren = await onBeforeSelectOption(tabs)
    }
    if (allowLoadChildren) {
      // 取子节点, 并增加请选择
      let childrenList = await this.getChildrenList(list, tabs, activeTab, loadData)
      if (Array.isArray(childrenList) && childrenList.length) {
        // 清除原选中状态
        tabs = tabs.map((tab) => {
          delete tab.active
          return tab
        })
        // 选中“请选择”
        chooseTab = this.getChooseTab(tabs, true)
        if (onChooseTabChange) onChooseTabChange(chooseTab)
        // 列表显示子数据
        newCurrentList = childrenList
      }
    }

    // if (Array.isArray(newCurrentList) && newCurrentList.length) {
    //   if (onCurrentListChange) onCurrentListChange(newCurrentList)
    // }
    if (onCurrentListChange) onCurrentListChange(newCurrentList)
    if (onTabsChange) onTabsChange(tabs)
  },
  /**
   * 列表数据
   */
  // 获取子节点
  getChildrenList: function (list, tabs, currentItem, loadData) {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      // 获取列表数据
      let childrenList = null
      if (Array.isArray(currentItem.children) && currentItem.children.length) {
        childrenList = currentItem.children
      }
      // 异步获取列表
      else if (typeof loadData === 'function') {
        childrenList = await loadData(tabs)
        // 当前项下增加children, 并修改children的parentid
        if (Array.isArray(childrenList) && childrenList.length) {
          // 增加parentid
          childrenList = childrenList.map((item) => {
            item.parentid = currentItem.id
            return item
          })
          list.setDeepTreeNodeProp(currentItem.id, (node) => {
            node.children = childrenList
          })
        }
      }
      // 没有数据
      else {
        childrenList = null
      }
      resolve(childrenList)
    })
  },
  // 获取兄弟节点
  getSiblingList: function (list, tabs, tab, loadData) {
    // eslint-disable-next-line
    return new Promise(async (resolve) => {
      // 父级tabs, 用于获取子级(当前节点的兄弟)数据
      let parentTabs = Object.clone(tabs)
      parentTabs.pop()

      // 兄弟列表
      let siblingList = null

      // 如果当前选中项有id, 则寻找其兄弟节点列表
      if (tab?.id) {
        // 获取父节点
        let parent = list.getDeepTreeParent(tab.id)
        if (!parent && tab.parentid) {
          parent = list.getDeepTreeNode(tab.parentid)
        }
        // 有上级, 则获取上级的子级(当前节点的兄弟)数据
        if (parent) {
          let currentItem = list.getDeepTreeNode(parent.id)
          siblingList = await this.getChildrenList(list, parentTabs, currentItem, loadData)
        }
        // 一级节点没有父节点
        else {
          siblingList = list
        }
      }
      // 连id都没有, 属于未知的节点
      else {
        siblingList = null
      }
      resolve(siblingList)
    })
  },
  // 从list中补全信息到选中项
  getListNode: function (list, item) {
    if (!item?.id) return item
    let node = list.getDeepTreeNode(item.id)
    return Object.assign({}, node, item)
  },
  /**
   * 页签控制
   */
  // 选中项增加
  addOptionToTabs: function (tabs, option) {
    // eslint-disable-next-line
    if (!tabs) tabs = []

    // 从选中位置加入
    let activeIndex = tabs.findIndex((tab) => tab.active)
    if (activeIndex > -1) {
      tabs.splice(activeIndex)
    }

    tabs.push(option)

    // 取消选中
    for (let tab of tabs) {
      delete tab.active
    }
    return tabs
  },
  // 生成请选择标签
  getChooseTab: function (argTabs, hasChildren) {
    let tabs = Object.clone(argTabs)
    if (!Array.isArray(tabs) || !tabs.length) {
      return {
        id: '',
        name: locale('请选择'),
        type: 'choose',
        active: true
      }
    }
    if (hasChildren) {
      let lastTab = tabs[tabs.length - 1]
      lastTab.name = locale('请选择')
      lastTab.type = 'choose'
      lastTab.active = true
      return lastTab
    }
    return null
  }
}
