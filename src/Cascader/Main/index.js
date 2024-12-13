import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import _ from 'lodash'

import sliceArray from './sliceArray'
import getTreeChildren from './getTreeChildren'

import Tabs from './Tabs'
import ListItem from './ListItem'

// 内库使用
import locale from './../../locale'
import ArrayUtil from './../../ArrayUtil'
import Toast from './../../Toast'
import IndexBar from './../../IndexBar'

// 测试使用
// import { locale } from 'seedsui-react'
// import { ArrayUtil, Toast, IndexBar } from 'seedsui-react'

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
      onSelect,

      list: externalList,
      loadData,
      optionProps = {},
      TabsComponent,
      ...props
    },
    ref
  ) => {
    // 全部tab
    let tabsRef = useRef([])

    // 选中tab
    let [activeTab, setActiveTab] = useState(null)

    // 选中列表, 文本则为错误
    let [list, setList] = useState(externalList)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
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

      update()
      // eslint-disable-next-line
    }, [visible, JSON.stringify(value)])

    // 初始化数据
    async function update() {
      // 滚动条还原
      if (mainRef.current) {
        mainRef.current.scrollTop = 0
      }

      // 无值渲染根节点
      if (!Array.isArray(value) || !value.length) {
        tabsRef.current = null
        setActiveTab(null)
        setList(externalList)
        return
      }

      // 更新tabs
      tabsRef.current = _.cloneDeep(value)
      let lastTab = Array.isArray(value) && value.length ? value[value.length - 1] : null

      // 获取当前列表
      let newList = await getChildrenList(value)
      if (!newList) {
        // 空数据选中末项, false接口报错不需要渲染
        if (newList === null) setActiveTab(lastTab)
        return null
      }

      // 如果有子级, 则增加请选择
      if (!lastTab?.isLeaf) {
        // 请选择
        lastTab = {
          parentid: lastTab.id,
          id: '',
          name: locale('请选择', 'SeedsUI_placeholder_select')
        }
        tabsRef.current.push(lastTab)
      }

      setActiveTab(lastTab)
      setList(newList)
    }

    // 设置叶子节点
    function updateIsLeaf(list, id) {
      // 更新当前列表叶子节点
      ArrayUtil.setDeepTreeNode(list, id, (node) => {
        node.isLeaf = true
      })

      // 更新总列表叶子节点
      ArrayUtil.setDeepTreeNode(externalList, id, (node) => {
        node.isLeaf = true
      })

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

    // 获取指定级别的列表数据
    async function getChildrenList(tabs, config) {
      let requestTabs = tabs?.filter?.((tab) => !tab.isLeaf)
      let lastTab =
        Array.isArray(requestTabs) && requestTabs.length
          ? requestTabs[requestTabs.length - 1]
          : null

      // 初次渲染列表, 没有选中项
      if (!lastTab?.id) {
        return externalList
      }

      // 渲染子级
      let newList = getTreeChildren(externalList, lastTab.id)

      // 无children, 动态获取子级
      if (!newList) {
        if (typeof loadData === 'function') {
          newList = await loadData(requestTabs, { list: externalList })
        }

        // 接口报错
        if (typeof newList === 'string' || newList === false) {
          let errMsg =
            typeof newList === 'string'
              ? newList
              : locale('获取数据失败', 'SeedsUI_get_data_failed')
          if (typeof config?.onError === 'function') {
            config.onError({ errMsg: errMsg })
          } else {
            setActiveTab(lastTab)
            setList(errMsg)
          }
          return false
        }
        // 无值则为叶子节点
        else if (newList === null) {
          updateIsLeaf(tabs, lastTab.id)
          return null
        }
        // 若当前项不为叶子节点, 有值则为子项, 添加到原始list中
        else if (!lastTab.isLeaf) {
          ArrayUtil.setDeepTreeNode(externalList, lastTab.id, (node) => {
            node.children = newList
          })
        }
      }

      return newList
    }

    // 点击选项
    async function handleDrill(item) {
      let newValue = _.cloneDeep(value)

      // 点击项的父级为选中项
      let parentTabIndex = (value || [])?.findIndex?.((tab) => tab.id === item?.parentid)

      // 已经存在于tabs上, 截取
      if (parentTabIndex !== -1) {
        newValue = newValue.slice(0, parentTabIndex + 1)
        newValue.push(item)
      }
      // 不在tabs上, 为第一项
      else {
        if (value?.length) {
          console.log(`SeedsUI Cascader.Main: 下钻项未匹配到上级, 请检查数据是否正确`, item, value)
        }
        newValue = [item]
      }

      // 选中项
      if (typeof onSelect === 'function') {
        let isOk = await onSelect(newValue, { list: externalList })
        if (Array.isArray(isOk)) {
          newValue = isOk
        }
      }

      // 不是末级节点, 则获取下级列表, 补充标识: value中的isLeaf和externalList中的children
      if (!newValue[newValue.length - 1].isLeaf) {
        let isOK = await getChildrenList(newValue, {
          onError: (error) => {
            Toast.show({
              content: error.errMsg
            })
          }
        })
        if (isOK === false) return
      }

      onChange && onChange(newValue, { list: externalList })

      // 点击"请选择"左边一级的tab(不是isLeaf代表末级是请选择), 点击相同选项值相同, 即不会触发关窗, 也不会触发更新, 需要强制触发更新
      if (!newValue.isLeaf && JSON.stringify(newValue) === JSON.stringify(value)) {
        update()
      }
    }

    function getTabsNode() {
      if (typeof TabsComponent === 'function') {
        return TabsComponent({
          tabs: tabsRef.current,
          activeTab: activeTab,
          onActiveTab: async (tab) => {
            // 滚动条还原
            if (mainRef.current) {
              mainRef.current.scrollTop = 0
            }

            activeTab = tab
            let newList = await getChildrenList(sliceArray(value, tab?.parentid))
            if (!newList) return

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
            let newList = await getChildrenList(sliceArray(value, tab?.parentid))
            if (!newList) return

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
