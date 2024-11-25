import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'

import Tabs from './Tabs'
import ListItem from './ListItem'
import getTreeChildren from './getTreeChildren'
import formatValue from './formatValue'
import formatList from './formatList'

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
          return Array.isArray(tabsRef.current) ? tabsRef.current.filter((item) => item.id) : []
        },
        // 更新数据
        update: update
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (
        !visible ||
        JSON.stringify(value) === JSON.stringify(tabsRef.current) ||
        !Array.isArray(externalList) ||
        !externalList.length
      ) {
        return
      }

      update()
      // eslint-disable-next-line
    }, [visible, JSON.stringify(value)])

    // 初始化数据
    async function update() {
      // 选中末级选中项
      tabsRef.current = Array.isArray(value) ? [...value] : []
      let lastTab =
        Array.isArray(tabsRef.current) && tabsRef.current.length
          ? tabsRef.current[tabsRef.current.length - 1]
          : null

      // 初次进入页面
      if (!lastTab) {
        setList(externalList)
        return
      }

      // 渲染子级
      let newList = await getChildrenList(lastTab?.parentid || '')
      setList(newList)

      // 选中末级，放在children后面是为了useEffect[activeTab]可以保持在最后执行
      activeTab = lastTab
      setActiveTab(activeTab ? { ...activeTab } : activeTab)
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
        let tabIndex = tabsRef.current.findIndex((tab) => tab.id === id)
        let selectedOptions = tabsRef.current.slice(0, tabIndex + 1)
        newList = await loadData(selectedOptions, { list: externalList })
      }
      return newList
    }

    // 修改回调
    async function handleChange(newValue) {
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (goOn === false) return
        if (typeof goOn === 'object') {
          // eslint-disable-next-line
          newValue = goOn
        }
      }
      if (onChange) onChange(newValue)
    }

    // 点击选项
    async function handleDrillDown(item) {
      // 判断是否允许下钻
      if (typeof onDrillDown === 'function') {
        let goOn = await onDrillDown(item, { tabs: tabsRef.current, list: externalList })
        if (goOn === false) {
          return
        }
      }

      // 选中中间的tabs, 并截取后续的选中项
      let parentTabIndex = tabsRef.current.findIndex((tab) => tab.id === item?.parentid)

      // 已经存在于tabs上
      if (parentTabIndex !== -1) {
        tabsRef.current = tabsRef.current.slice(0, parentTabIndex + 1)
        tabsRef.current.push(item)
      }
      // 不在tabs上, 为第一项
      else {
        tabsRef.current = [item]
      }

      let newList = null
      // 有children, 直接显示子级
      if (Array.isArray(item?.children) || item?.children?.length) {
        newList = item.children
      }
      // 无children, 动态获取子级
      else {
        newList = await loadData(tabsRef.current, { list: externalList })
      }

      // 更新选中项
      activeTab = tabsRef.current[tabsRef.current.length - 1]
      setActiveTab(activeTab)

      // 无子级, 则回落值
      if (!newList) {
        handleChange(tabsRef.current)
      }
      // 有子级, 则展示子级
      else {
        setList(newList)
      }
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
          value={tabsRef.current}
          // 阻止选择
          onSelect={(item) => handleDrillDown(item, { onChange: handleChange })}
          {...props}
        />

        {/* 底部 */}
        {FooterNode}
      </>
    )
  }
)

export default Main
