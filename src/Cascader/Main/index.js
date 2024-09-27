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
      headerRender,
      footerRender,

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
        },
        // 更新数据
        update: initData
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

      // 默认下钻
      initSelect()
      // eslint-disable-next-line
    }, [activeTab])

    // 默认下钻
    function initSelect() {
      // 如果没有数据则不能下钻
      if (!externalList?.length) {
        return
      }

      // 如果没有选中项， 则不能下钻
      if (!Array.isArray(value) || !value.length) {
        return
      }

      // 如果已经有请选择了, 则不需要下钻
      let tabs = tabsRef.current
      if (Array.isArray(tabs) && tabs.length && tabs.some((tab) => !tab.id)) {
        return
      }

      // 如果选中的不是最后一项, 则不需要下钻
      if (!activeTab?.id) return
      if (tabs.length && tabs[tabs.length - 1].id !== activeTab.id) {
        return
      }

      // 如果值当中已经有街道了，则不需要下钻
      if (
        value.some((item) => {
          if (item.isStreet) {
            return true
          }
          if (Array.isArray(item.type) && item.type.length) {
            return item.type.includes('street')
          }
          return false
        })
      ) {
        return
      }

      handleSelect(value[value.length - 1])
    }

    // 初始化数据
    async function initData(newValue) {
      let val = newValue || value
      // 选中末级选中项
      tabsRef.current = Array.isArray(val) ? [...val] : []
      let lastTab =
        Array.isArray(tabsRef.current) && tabsRef.current.length
          ? tabsRef.current[tabsRef.current.length - 1]
          : null

      // 渲染子级
      let children = await getChildrenList(lastTab?.parentid || '')
      setList(children)

      // 选中末级，放在children后面是为了useEffect[activeTab]可以保持在最后执行
      activeTab = lastTab
      setActiveTab(activeTab ? { ...activeTab } : activeTab)
    }

    // 获取指定级别的列表数据
    async function getChildrenList(id) {
      // 根节点
      if (!id) {
        return data
      }

      let currentTabIndex = tabsRef.current.findIndex((tab) => String(tab.id) === String(id))

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
            ? () => loadData(currentTabs, { list: externalList })
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
            ? () => loadData(tabsRef.current, { list: externalList })
            : null
      })

      // 有子节点，或者根节点(没有id)
      if ((Array.isArray(children) && children.length) || !id) {
        tabsRef.current.push({
          parentid: id,
          id: '',
          name: locale('请选择', 'SeedsUI_placeholder_select')
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
    async function handleSelect(item, options) {
      const { onChange } = options || {}

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
          onChange && onChange(tabsRef.current)
          activeTab = tabsRef.current[tabsRef.current.length - 1]
          setActiveTab(activeTab)
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
      onChange && onChange(tabsRef.current)
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
        onChange: handleChange,
        currentValue: tabsRef.current,
        onChangeCurrentValue: (newValue) => {
          initData(newValue)
        }
      })
    }
    // 渲染底部
    let FooterNode = null
    if (typeof footerRender === 'function') {
      FooterNode = footerRender({
        value,
        onChange: handleChange,
        currentValue: tabsRef.current,
        onChangeCurrentValue: (newValue) => {
          initData(newValue)
        }
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
          onSelect={(item) => handleSelect(item, { onChange: handleChange })}
          {...props}
        />

        {/* 底部 */}
        {FooterNode}
      </>
    )
  }
)

export default Main
