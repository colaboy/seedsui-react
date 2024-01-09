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
      visible,

      // Main: common
      value,
      list: externalList,
      multiple,
      onBeforeChange,
      onChange,

      // Main: Cascader.Main Control properties
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
    let list = data
    // 选中已知项
    if (activeTab?.id) {
      list = getSibling({ data, id: activeTab.id })
    }
    // 选中未知项(请选择)
    else if (activeTab?.parentid) {
      list = getChildren({ data, id: activeTab.parentid })
    }

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

    // 初始化tabs和选中tab
    useEffect(() => {
      tabsRef.current = value || []
      addEmptyTab(tabsRef.current?.[tabsRef.current?.length - 1]?.id || '')
      setActiveTab(
        Array.isArray(tabsRef.current) && tabsRef.current.length
          ? tabsRef.current[tabsRef.current.length - 1]
          : null
      )
      // eslint-disable-next-line
    }, [value])

    // 修改选中tab时，滚动条要重置
    useEffect(() => {
      if (mainRef.current) mainRef.current.scrollTop = 0

      // eslint-disable-next-line
    }, [activeTab])

    // 如果有子级则补充请选择
    function addEmptyTab(id) {
      if (getChildren({ data, id: id }) || !id) {
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
    function handleSelect(item) {
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
      if (addEmptyTab(tabsRef.current?.[tabsRef.current?.length - 1]?.id || '')) {
        // 更新选中项
        setActiveTab(tabsRef.current[tabsRef.current.length - 1])
        return
      }

      // 无子集调用onChange
      handleChange(tabsRef.current)
    }

    return (
      <>
        {/* 页签 */}
        <Tabs
          tabs={tabsRef.current}
          activeTab={activeTab}
          onActiveTab={(tab) => {
            setActiveTab(tab)
          }}
        />
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
