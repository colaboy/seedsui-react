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
        },
        // 更新数据
        update: initData
      }
    })

    // 初始化tabs、选中tab、列表
    // useEffect(() => {
    //   if (!Array.isArray(externalList) || !externalList.length) return

    //   debugger
    //   initData()
    //   // eslint-disable-next-line
    // }, [externalList])

    // 修改选中tab时，滚动条重置，并刷新列表
    // useEffect(() => {
    //   if (!activeTab) return
    //   if (mainRef.current) mainRef.current.scrollTop = 0

    //   // 默认下钻
    //   initSelect()
    //   // eslint-disable-next-line
    // }, [activeTab])

    // 默认下钻
    // function initSelect() {
    //   // 如果没有数据则不能下钻
    //   if (!externalList?.length) {
    //     return
    //   }

    //   // 如果没有选中项， 则不能下钻
    //   if (!Array.isArray(value) || !value.length) {
    //     return
    //   }

    //   // 如果已经有请选择了, 则不需要下钻
    //   let tabs = tabsRef.current
    //   if (Array.isArray(tabs) && tabs.length && tabs.some((tab) => !tab.id)) {
    //     return
    //   }

    //   // 如果选中的不是最后一项, 则不需要下钻
    //   if (!activeTab?.id) return
    //   if (tabs.length && tabs[tabs.length - 1].id !== activeTab.id) {
    //     return
    //   }

    //   // 如果值当中已经有街道了，则不需要下钻
    //   if (
    //     value.some((item) => {
    //       if (item.isStreet) {
    //         return true
    //       }
    //       if (Array.isArray(item.type) && item.type.length) {
    //         return item.type.includes('street')
    //       }
    //       return false
    //     })
    //   ) {
    //     return
    //   }

    //   handleDrillDown(value[value.length - 1])
    // }

    // 初始化数据
    async function initData() {
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
        newList = await loadData(tabsRef.current, { list: externalList })
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
      if (Array.isArray(item.children)) {
        newList = item.children
      }
      // 无children, 动态获取子级
      else {
        newList = await loadData(tabsRef.current, { list: externalList })
      }

      // 无子级, 则回落值
      if (!newList) {
        debugger
        onChange && onChange(tabsRef.current)
      }
      // 有子级, 则展示子级
      else {
        // 更新选中项
        activeTab = tabsRef.current[tabsRef.current.length - 1]
        setActiveTab(activeTab)
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
