import _ from 'lodash'
import formatList from './../../utils/formatList'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import ArrayUtil from './../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
import { ArrayUtil, Toast, IndexBar, Loading } from 'seedsui-react'
测试使用-end */

//
async function loadData(tabs, { externalLoadData, externalList, action }) {
  let requestTabs = tabs?.filter?.((tab) => !tab.isLeaf)
  let lastTab =
    Array.isArray(requestTabs) && requestTabs.length ? requestTabs[requestTabs.length - 1] : null

  let newList = null
  if (typeof externalLoadData === 'function') {
    newList = await externalLoadData(requestTabs, { list: externalList, action })
  }

  // 接口报错
  if (typeof newList === 'string' || newList === false) {
    let errMsg =
      typeof newList === 'string'
        ? newList
        : LocaleUtil.locale('获取数据失败', 'SeedsUI_data_error')

    return errMsg
  }
  // 接口返回空，则为叶子节点
  else if (_.isEmpty(newList)) {
    // 无根列表, 接口返回空, 则提示暂无数据
    if (_.isEmpty(externalList) || typeof externalList === 'string') {
      return LocaleUtil.locale('暂无数据', 'SeedsUI_no_data')
    }

    // 需要更新externalList、value、tabRef.current的树结构, 增加标识isLeaf
    // 更新操作在外部使用updateIsLeaf
    return null
  }
  // 接口返回列表, 若当前项不为叶子节点, 有值则为子项, 添加到原始list中
  else if (!lastTab?.isLeaf) {
    // 有根列表, 当前列表补充到根列表的children中
    if (Array.isArray(externalList) && externalList.length) {
      ArrayUtil.setDeepTreeNode(externalList, lastTab.id, (node) => {
        node.children = newList
      })
    }
    formatList(externalList)
  }

  return newList
}

export default loadData
