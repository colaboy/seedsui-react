import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'

import getTreeChildren from './getTreeChildren'
import formatValue from './formatValue'
import formatList from './formatList'

import Tabs from './Tabs'
import ListItem from './ListItem'

// 内库使用
import locale from './../../locale'
import ArrayUtil from './../../ArrayUtil'

// 测试使用
// import { locale } from 'seedsui-react'
// import { ArrayUtil } from 'seedsui-react'

// 主体
const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main: common
      value,
      allowClear,
      onBeforeChange,
      onChange,

      list: externalList,
      loadData,
      optionProps = {},
      headerRender,
      footerRender,
      TabsComponent,
      onDrillDown,
      ...props
    },
    ref
  ) => {
    // 格式化value: value未传parentid, 补充parentid
    formatValue(value)

    // 格式化data
    formatList(externalList)

    // 全部tab
    let tabsRef = useRef([])

    // 选中tab
    let [activeTab, setActiveTab] = useState(null)

    // 选中列表
    let [list, setList] = useState(externalList)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        // 当选择到叶子节点时，不触发onChange，允许用户手动点击确定提前获取最新的value
        getValue: () => {
          return value
        },
        // 更新数据
        update: update
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (!visible || !Array.isArray(externalList) || !externalList.length) {
        return
      }

      update()
      // eslint-disable-next-line
    }, [visible, JSON.stringify(value)])

    // 初始化数据
    async function update() {
      tabsRef.current = [...(value || [])]
      // 选中末级选中项
      let lastTab = Array.isArray(value) && value.length ? value[value.length - 1] : null

      debugger
      // 初次进入页面
      if (!lastTab) {
        setList(externalList)
        return
      }

      let newList = null
      // 末级节点加载兄弟节点
      if (lastTab.isLeaf) {
        newList = await getChildrenList(lastTab?.parentid || '')
      }
      // 非末级节点加载子级
      else {
        newList = await getChildrenList(lastTab.id || '')
      }

      // 接口报错
      if (typeof newList === 'string' || newList === false) {
        return
      }
      // 无值则为叶子节点
      else if (newList === null) {
        lastTab.isLeaf = true
      }
      // 有值则为子项, 请选择
      else {
        let lastTab = {
          parentid: lastTab.id,
          id: '',
          name: locale('请选择', 'SeedsUI_placeholder_select')
        }
        tabsRef.current.push(lastTab)
      }

      setActiveTab(lastTab)

      // 渲染子级
      setList(newList)
    }

    // 获取指定级别的列表数据
    async function getChildrenList(id) {
      // 初次渲染列表, 没有选中项
      if (!id) {
        return externalList
      }

      // 渲染子级
      let newList = await getTreeChildren(externalList, id)

      // 无children, 动态获取子级
      if (!newList) {
        let tabIndex = value.findIndex((tab) => tab.id === id)
        let selectedOptions = value.slice(0, tabIndex + 1)
        newList = await loadData(selectedOptions, { list: externalList })
      }
      return newList
    }

    // 点击选项
    async function handleDrillDown(item) {
      // 选中中间的tabs, 并截取后续的选中项
      let parentTabIndex = (value || [])?.findIndex?.((tab) => tab.id === item?.parentid)

      let newValue = [...(value || [])]
      // 已经存在于tabs上
      if (parentTabIndex !== -1) {
        newValue = newValue.slice(0, parentTabIndex + 1)
        newValue.push(item)
      }
      // 不在tabs上, 为第一项
      else {
        newValue = [item]
      }

      let newList = null
      // 有children, 直接显示子级
      if (Array.isArray(item?.children) || item?.children?.length) {
        newList = item.children
      }
      // 无children, 动态获取子级
      else {
        newList = await loadData(newValue, { list: externalList })
        let lastTab = newValue[newValue.length - 1]

        // 接口报错
        if (typeof newList === 'string' || newList === false) {
          return
        }
        // 无值则为叶子节点
        else if (newList === null) {
          lastTab.isLeaf = true
        }
        // 有值则为子项, 添加到原始list中
        else {
          ArrayUtil.setDeepTreeNode(externalList, lastTab.id, (node) => {
            node.children = newList
          })
        }
      }

      onChange && onChange(newValue, { list: externalList })

      // 更新选中项
      // activeTab = newValue[newValue.length - 1]
      // setActiveTab(activeTab)

      // 无子级, 则回落值
      // if (!newList) {
      //   handleChange(tabsRef.current)
      // }
      // // 有子级, 则展示子级
      // else {
      //   setList(newList)
      // }
    }

    function getTabsNode() {
      if (typeof TabsComponent === 'function') {
        return TabsComponent({
          tabs: tabsRef.current,
          activeTab: activeTab,
          onActiveTab: async (tab) => {
            activeTab = tab
            setActiveTab(activeTab)
            let newList = await getChildrenList(tab?.parentid)
            setList(newList)
          }
        })
      }

      console.log('tabsRef.current:', tabsRef.current, activeTab)
      return (
        <Tabs
          tabs={tabsRef.current}
          activeTab={activeTab}
          onActiveTab={async (tab) => {
            activeTab = tab
            setActiveTab(activeTab)
            let newList = await getChildrenList(tab?.parentid)
            setList(newList)
          }}
        />
      )
    }

    // 渲染头部
    let HeaderNode = null
    if (typeof headerRender === 'function') {
      HeaderNode = headerRender({
        value,
        onChange
      })
    }
    // 渲染底部
    let FooterNode = null
    if (typeof footerRender === 'function') {
      FooterNode = footerRender({
        value,
        onChange
      })
    }

    return (
      <>
        {/* 头部 */}
        {HeaderNode}

        {/* 主体 */}
        {getTabsNode()}
        <ListItem
          ref={mainRef}
          optionProps={optionProps}
          // 选中列表
          list={list}
          value={value}
          // 阻止选择
          onSelect={(item) => handleDrillDown(item)}
          {...props}
        />

        {/* 底部 */}
        {FooterNode}
      </>
    )
  }
)

export default Main
