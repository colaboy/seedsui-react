import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
// 测试使用
// import { locale } from 'seedsui-react'
// 内库使用
import locale from './../../locale'

import Tabs from './Tabs'
import ListItem from './ListItem'
import { dataFormatter, getChildren } from './utils/index.js'

// 主体
const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main: common
      value,
      list: externalList,
      multiple,
      onDrillDown,
      onBeforeChange,
      onChange,

      // Main: Cascader.Main Control properties
      TabsComponent,
      loadData,
      optionProps = {},
      ...props
    },
    ref
  ) => {
    // 格式化value: value未传parentid, 补充parentid
    if (Array.isArray(value) && value.length) {
      for (let [index, item] of value.entries()) {
        if (index !== 0 && !item.parentid) {
          item.parentid = value?.[index - 1]?.id || ''
        }
      }
    }

    // 格式化data
    let data = dataFormatter(externalList)

    // 全部tab
    let tabsRef = useRef([])

    // 选中tab
    let [activeTab, setActiveTab] = useState(null)

    // 选中列表
    let [list, setList] = useState(data)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        // 当选择到叶子节点时，不触发onChange，允许用户手动点击确定提前获取最新的value
        getValue: () => {
          return Array.isArray(tabsRef.current) ? tabsRef.current.filter((item) => item.id) : []
        }
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (!Array.isArray(externalList) || !externalList.length) return

      initData()
      // eslint-disable-next-line
    }, [externalList, value])

    // 修改选中tab时，滚动条重置，并刷新列表
    useEffect(() => {
      if (!activeTab) return
      if (mainRef.current) mainRef.current.scrollTop = 0

      // eslint-disable-next-line
    }, [activeTab])

    // 初始化数据
    async function initData() {
      // 选中末级选中项
      tabsRef.current = Array.isArray(value) ? [...value] : []
      let lastTab =
        Array.isArray(tabsRef.current) && tabsRef.current.length
          ? tabsRef.current[tabsRef.current.length - 1]
          : null

      setActiveTab(lastTab)

      // 渲染子级
      let children = await getChildrenList(lastTab?.parentid || '')
      setList(children)
    }

    // 获取指定级别的列表数据
    async function getChildrenList(id) {
      // 根节点
      if (!id) {
        return data
      }

      let currentTabIndex = tabsRef.current.findIndex((tab) => tab.id === id)

      // tabs中没有此项，则也返回根节点
      if (currentTabIndex === -1) {
        return data
      }

      let currentTabs = tabsRef.current.slice(0, currentTabIndex + 1)

      let list = null
      list = await getChildren({
        data,
        id: id,
        loadData:
          typeof loadData === 'function'
            ? () => loadData(currentTabs, { data: externalList })
            : null
      })
      return list
    }

    // 如果有子级则补充请选择
    async function addEmptyTab() {
      let id = tabsRef.current?.[tabsRef.current?.length - 1]?.id || ''
      let children = await getChildren({
        data,
        id,
        loadData:
          typeof loadData === 'function'
            ? () => loadData(tabsRef.current, { data: externalList })
            : null
      })

      // 有子节点，或者根节点(没有id)
      if ((Array.isArray(children) && children.length) || !id) {
        tabsRef.current.push({
          parentid: id,
          id: '',
          name: locale('请选择')
        })
        // 子节点
        if (Array.isArray(children) && children.length) {
          return children
        }
        // 根节点
        else {
          return externalList
        }
      }
      return false
    }

    // 修改回调
    async function handleChange(newValue) {
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (goOn !== undefined && !goOn) return
      }
      if (onChange) onChange(newValue)
    }

    // 点击选项
    async function handleSelect(item) {
      // 选中中间的tabs
      let tabIndex = tabsRef.current.findIndex((tab) => tab.id === activeTab?.id)
      if (tabIndex !== -1) {
        tabsRef.current = tabsRef.current.slice(0, tabIndex + 1)
      }

      // 替换选中项
      if (!Array.isArray(tabsRef.current)) {
        tabsRef.current = []
      }
      // 非第一项
      if (tabsRef.current.length) {
        tabsRef.current[tabsRef.current.length - 1] = item
      }
      // 第一项
      else {
        tabsRef.current[0] = item
      }

      // 判断是否允许下钻
      if (typeof onDrillDown === 'function') {
        let goOn = await onDrillDown(tabsRef.current, { data })
        // 禁止下钻
        if (goOn !== undefined && !goOn) {
          handleChange(tabsRef.current)
          setActiveTab(tabsRef.current[tabsRef.current.length - 1])
          return
        }
      }

      // 添加空tab成功，说明有子级
      let children = await addEmptyTab()

      if (Array.isArray(children) && children.length) {
        // 更新选中项
        activeTab = tabsRef.current[tabsRef.current.length - 1]
        setActiveTab(activeTab)
        setList(children)
        return
      }

      // 无子级调用onChange
      handleChange(tabsRef.current)
    }

    function getTabsNode() {
      if (typeof TabsComponent === 'function') {
        return TabsComponent({
          tabs: tabsRef.current,
          activeTab: activeTab,
          onActiveTab: async (tab) => {
            setActiveTab(tab)
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
            setActiveTab(tab)
            let newList = await getChildrenList(tab?.parentid)
            setList(newList)
          }}
        />
      )
    }

    return (
      <>
        {/* 页签 */}
        {getTabsNode()}

        {/* 列表 */}
        <ListItem
          ref={mainRef}
          optionProps={optionProps}
          // 选中列表
          list={list}
          value={tabsRef.current}
          // 阻止选择
          onSelect={handleSelect}
          {...props}
        />
      </>
    )
  }
)

export default Main
