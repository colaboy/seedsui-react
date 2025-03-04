import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import _ from 'lodash'
import loadData from './loadData'
import sliceArray from './sliceArray'
import getTreeChildren from './getTreeChildren'
import formatValue from './../utils/formatValue'
import formatList from './../utils/formatList'
import Tabs from './Tabs'
import ListItem from './ListItem'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// import ArrayUtil from './../../../utils/ArrayUtil'
import Toast from './../../Toast'
import IndexBar from './../../IndexBar'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
import { ArrayUtil, Toast, IndexBar, Loading } from 'seedsui-react'
测试使用-end */

// 主体
const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main: common
      value,
      allowClear,
      onChange,
      onBeforeChange,
      onReLoad,

      list: externalList,
      loadData: externalLoadData,
      optionProps = {},
      tabbar,
      ...props
    },
    ref
  ) => {
    // 全部tab
    let tabsRef = useRef([])

    // 选中tab
    let [activeTab, setActiveTab] = useState(null)

    // 选中列表, 文本则为错误
    let [list, setList] = useState(formatList(externalList))

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        mainDOM: mainRef.current,
        getMainDOM: () => mainRef.current,
        // 当选择到叶子节点时，不触发onChange，允许用户手动点击确定提前获取最新的value
        // getValue: () => {
        //   return value
        // },
        // 更新数据
        update: update,
        // 设置叶子节点标识
        updateIsLeaf: updateIsLeaf
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (
        value === undefined ||
        !visible ||
        !Array.isArray(externalList) ||
        !externalList.length ||
        JSON.stringify(tabsRef.current) === JSON.stringify(value)
      ) {
        return
      }

      update({ action: 'load' })
      // eslint-disable-next-line
    }, [visible, JSON.stringify(value)])

    // 更新错误信息
    useEffect(() => {
      if (!visible || typeof externalList !== 'string') {
        return
      }

      setList(externalList)
      // eslint-disable-next-line
    }, [visible, JSON.stringify(externalList)])

    // 初始化tabs、选中tab、列表
    async function update({ action } = {}) {
      // 更新tabs
      tabsRef.current = _.cloneDeep(formatValue(value))
      let lastTab = Array.isArray(value) && value.length ? value[value.length - 1] : null

      // 滚动条还原
      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }
      // 获取当前列表
      let newList = await getChildrenList(value, { action })

      // 接口报错或无数据
      if (typeof newList === 'string' || _.isEmpty(newList)) {
        setActiveTab(lastTab)
        setList(newList)
        return
      }

      // 如果有子级, 则增加请选择
      if (lastTab && !lastTab?.isLeaf) {
        // 请选择
        lastTab = {
          parentid: lastTab.id,
          id: '',
          name: LocaleUtil.locale('请选择', 'SeedsUI_placeholder_select')
        }
        tabsRef.current.push(lastTab)
      }

      setActiveTab(lastTab)
      setList(newList)
    }

    // 设置叶子节点
    function updateIsLeaf(list, id) {
      // 更新总列表叶子节点(外部列表数据变化会引起多个组件isLeaf相互影响)
      // ArrayUtil.setDeepTreeNode(externalList, id, (node) => {
      //   node.isLeaf = true
      // })

      // 更新当前列表叶子节点
      for (let tab of list || []) {
        if (tab && tab.id === id) {
          tab.isLeaf = true
          break
        }
      }

      // 更新value叶子节点
      for (let tab of value || []) {
        if (tab && tab.id === id) {
          tab.isLeaf = true
          break
        }
      }

      // 更新tabs叶子节点
      for (let tab of tabsRef.current || []) {
        if (tab && tab.id === id) {
          tab.isLeaf = true
          break
        }
      }
      return list
    }

    // 获取指定级别的列表数据, 最后一级则获取兄弟节点列表
    async function getChildrenList(tabs, { action } = {}) {
      let requestTabs = tabs?.filter?.((tab) => !tab.isLeaf)
      let lastTab =
        Array.isArray(requestTabs) && requestTabs.length
          ? requestTabs[requestTabs.length - 1]
          : null

      // 下级或兄弟列表
      let newList = null

      // externalList为空, 或者不合法, 需要重新获取
      if (!Array.isArray(externalList) || !externalList.length) {
        newList = await loadData(tabs, { externalLoadData, externalList, action })
        return newList
      }

      // 无值渲染根节点
      if (!lastTab?.id) {
        return externalList
      }

      // 渲染子级
      newList = getTreeChildren(externalList, lastTab.id)

      // 无children, 动态获取子级
      if (_.isEmpty(newList)) {
        newList = await loadData(tabs, { externalLoadData, externalList, action })

        // 接口报错
        if (typeof newList === 'string') {
          return newList
        }
        // 无值则为叶子节点
        if (_.isEmpty(newList)) {
          updateIsLeaf(tabs, lastTab.id)
          return null
        }
        // 接口没报错, 也有值, 则正常返回
      }

      return newList
    }

    // 点击选项, value不包含children
    async function handleDrill({ children, ...item }) {
      // 防止用户快速点击多次触发
      Loading.show({
        id: '__SeedsUI_loading_cascader_drill_mask__',
        content: 'Get children...',
        style: {
          opacity: 0
        }
      })

      let newValue = _.cloneDeep(value)

      // 点击项的父级为选中项
      let parentTabIndex = (value || [])?.findIndex?.((tab) => tab.id === item?.parentid)

      // 已经存在于tabs上, 截取
      if (parentTabIndex !== -1) {
        newValue = newValue.slice(0, parentTabIndex + 1)
        newValue.push({ ...item })
      }
      // 不在tabs上, 为第一项
      else {
        if (value?.length) {
          console.log(`SeedsUI Cascader.Main: 下钻项未匹配到上级, 请检查数据是否正确`, item, value)
        }
        newValue = [{ ...item }]
      }

      // 选中项, 允许修改值Array | 继续true | 停止false
      if (typeof onBeforeChange === 'function') {
        let isOk = await onBeforeChange(newValue, { list: externalList })
        if (Array.isArray(isOk)) {
          newValue = isOk
        }
      }

      // 不是末级节点, 则获取下级列表, 用于校验是否能下钻, 补充标识: value中的isLeaf和externalList中的children
      if (!newValue[newValue.length - 1].isLeaf) {
        let isOk = await getChildrenList(newValue, {
          action: 'clickItem'
        })

        // 接口报错停止下钻
        if (typeof isOk === 'string') {
          Toast.show({
            content: isOk
          })

          // 挡住不让快速点击
          setTimeout(() => {
            Loading.hide({ id: '__SeedsUI_loading_cascader_drill_mask__' })
          }, 300)
          return
        }
      }

      // 触发tab与列表更新
      onChange && onChange(newValue, { list: externalList })

      // 点击"请选择"上级选项, 点击相同选项值, 既不会触发关窗, 也不会触发tab更新, 需要强制触发更新(不是末级节点, 即使值相同, 也要触发更新下级列表)
      if (
        !newValue[newValue.length - 1].isLeaf &&
        JSON.stringify(newValue) === JSON.stringify(value)
      ) {
        update({ action: 'clickItem' })
      }

      // 防止用户快速点击多次触发
      setTimeout(() => {
        Loading.hide({ id: '__SeedsUI_loading_cascader_drill_mask__' })
      }, 300)
    }

    function getTabsNode() {
      if (typeof list === 'string') return null

      if (typeof tabbar === 'function') {
        return tabbar({
          tabs: tabsRef.current,
          activeTab: activeTab,
          triggerActiveTab: async (tab) => {
            // 滚动条还原
            if (mainRef.current) {
              mainRef.current.scrollTop = 0
            }

            activeTab = tab
            let newList = await getChildrenList(sliceArray(value, tab?.parentid), {
              action: 'clickTab'
            })

            setActiveTab(activeTab)
            setList(newList)
          }
        })
      }

      return (
        <Tabs
          tabs={tabsRef.current}
          activeTab={activeTab}
          onActiveTab={async (tab) => {
            // 滚动条还原
            if (mainRef.current) {
              mainRef.current.scrollTop = 0
            }

            activeTab = tab
            let newList = await getChildrenList(sliceArray(value, tab?.parentid), {
              action: 'clickTab'
            })

            setActiveTab(activeTab)
            setList(newList)
          }}
        />
      )
    }

    return (
      <>
        {/* Tab */}
        {getTabsNode()}

        {/* 主体 */}
        <IndexBar className="cascader-indexbar">
          <ListItem
            ref={mainRef}
            optionProps={optionProps}
            // 选中列表
            list={list}
            value={value}
            onReLoad={typeof onReLoad === 'function' ? () => onReLoad({ update }) : null}
            // 阻止选择
            onSelect={(item) => handleDrill(item)}
            {...props}
          />
        </IndexBar>
      </>
    )
  }
)

export default Main
