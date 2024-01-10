import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import locale from './../../locale'

import Tabs from './Tabs'
import ListItem from './ListItem'
import { dataFormatter, getSibling, getChildren } from './utils/index.js'

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
      onBeforeSelect,
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
          return tabsRef.current
        }
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (!visible) return

      initData()
      // eslint-disable-next-line
    }, [value, visible])

    // 修改选中tab时，滚动条要重置
    useEffect(() => {
      if (mainRef.current) mainRef.current.scrollTop = 0

      // 更新列表
      updateList()
      // eslint-disable-next-line
    }, [activeTab])

    // 初始化数据
    async function initData() {
      // tabs
      tabsRef.current = value || []
      await addEmptyTab(tabsRef.current?.[tabsRef.current?.length - 1]?.id || '')

      // 选中tab
      activeTab =
        Array.isArray(tabsRef.current) && tabsRef.current.length
          ? tabsRef.current[tabsRef.current.length - 1]
          : null
      setActiveTab(activeTab)
    }

    // loadData函数入参格式化
    function loadDataFormatter(id) {
      // let tabs = null
      // if (tabsRef.current[tabsRef.current.length - 1].id === id) {
      //   tabs = tabsRef.current
      // } else if (activeTab.id === id) {
      //   tabs = [...tabsRef.current, activeTab]
      // }
      return loadData(tabsRef.current)
    }
    // 更新列表
    async function updateList() {
      // 选中已知项(点击头部tab)
      if (activeTab?.id) {
        list = getSibling({ data, id: activeTab.id })
      }
      // 选中未知项(点击列表: 有请选择时)
      else if (activeTab?.parentid) {
        list = await getChildren({
          data,
          id: activeTab.parentid,
          loadData: typeof loadData === 'function' ? loadDataFormatter : null
        })
      }
      setList(list)
    }

    // 如果有子级则补充请选择
    async function addEmptyTab(id) {
      let children = await getChildren({
        data,
        id,
        loadData: typeof loadData === 'function' ? loadDataFormatter : null
      })
      if ((Array.isArray(children) && children.length) || !id) {
        tabsRef.current.push({
          parentid: id,
          id: '',
          name: locale('请选择')
        })
        return true
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
      if (typeof onBeforeSelect === 'function') {
        let goOn = await onBeforeSelect(item)
        if (goOn !== undefined && !goOn) return
      }

      // 选中中间的tabs
      let tabIndex = tabsRef.current.findIndex((tab) => tab.id === activeTab?.id)
      if (tabIndex !== -1) {
        tabsRef.current = tabsRef.current.slice(0, tabIndex + 1)
      }

      // 替换选中项
      if (Array.isArray(tabsRef.current) && tabsRef.current.length) {
        tabsRef.current[tabsRef.current.length - 1] = item
      }

      // 添加空tab成功，说明有子集
      let addOk = await addEmptyTab(tabsRef.current?.[tabsRef.current?.length - 1]?.id || '')
      if (addOk) {
        // 更新选中项
        activeTab = tabsRef.current[tabsRef.current.length - 1]
        setActiveTab(activeTab)
        return
      }

      // 无子集调用onChange
      handleChange(tabsRef.current)
    }

    function getTabsNode() {
      if (typeof TabsComponent === 'function') {
        return TabsComponent({
          tabs: tabsRef.current,
          activeTab: activeTab,
          onActiveTab: setActiveTab
        })
      }

      return (
        <Tabs
          tabs={tabsRef.current}
          activeTab={activeTab}
          onActiveTab={(tab) => {
            setActiveTab(tab)
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
