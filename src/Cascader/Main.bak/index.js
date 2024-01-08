import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import Tabs from './Tabs'
import ListItem from './ListItem'
import Utils from './Utils'

// 主体
const Main = forwardRef(
  (
    {
      // Modal
      visible,

      // Main: common
      value,
      list,
      multiple,
      onSelect, // useless
      onBeforeChange,
      onChange,

      // Main: Cascader.Main Control properties
      loadData,
      onBeforeSelect,
      optionProps = {},
      ...props
    },
    ref
  ) => {
    // value未传parentid, 补充parentid
    if (Array.isArray(value) && value.length) {
      for (let [index, item] of value.entries()) {
        if (index !== 0 && !item.parentid) {
          item.parentid = value?.[index - 1]?.id || ''
        }
      }
    }
    let [tabs, setTabs] = useState(value || [])
    let [chooseTab, setChooseTab] = useState(null)
    let [currentList, setCurrentList] = useState(list || [])

    // 补充parentid
    // eslint-disable-next-line
    list = Utils.convertList(list)

    // 节点
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef.current,
        getRootDOM: () => mainRef.current,
        getValue: () => {
          return tabs
        }
      }
    })

    // 显示时更新选中项，否则未点击关闭弹窗，再打开弹窗时会不更新选择
    useEffect(() => {
      if (typeof visible !== 'boolean') return
      // 显示时重新计算选中项
      if (visible) {
        initData()
      }
      // 隐藏时重置
      // else {
      //   // 置空tabs
      //   setTabs(null)
      //   // 置空请选择
      //   setChooseTab(null)
      //   // 置空列表
      //   setCurrentList(null)
      // }

      // eslint-disable-next-line
    }, [visible])

    // 监听value的变化, 更新tabs与列表
    useEffect(() => {
      initData()
      // eslint-disable-next-line
    }, [value])

    // 初始化数据
    function initData() {
      // 没有选中时使用一级列表
      if (!Array.isArray(value) || !value.length) {
        // 置空tabs
        setTabs(null)
        // 补一个请选择
        chooseTab = Utils.getChooseTab() // eslint-disable-line
        setChooseTab(chooseTab)
        // 使用初始化列表
        currentList = list // eslint-disable-line
        setCurrentList(currentList)
        return
      }

      // 传入的选中项可能会数据不充分, 需要补充数据, 并且选中最后一项
      let activeTab = null
      tabs = value.map((tab, index) => {
        // 删除选中状态
        delete tab.active

        // 默认选中最后一项
        if (index === value.length - 1) {
          tab.active = true
          activeTab = tab
        }
        return Utils.getListNode(list, tab)
      })

      // 选中项
      // let activeTab = tabs.filter((item) => {
      //   if (item.active) {
      //     return true
      //   }
      //   return false
      // })
      // if (Array.isArray(activeTab) && activeTab.length) {
      //   activeTab = activeTab[0]
      // } else {
      //   activeTab = tabs[tabs.length - 1]
      //   tabs[tabs.length - 1].active = true
      // }

      setTabs(tabs)

      // 无选中项, 默认选中最后一项
      Utils.initData({
        list: list,
        // 选中列表
        loadData: loadData,
        currentList: currentList,
        onCurrentListChange: setCurrentList,
        // 选中前判断
        onBeforeSelect: onBeforeSelect,
        // 页签
        activeTab: activeTab,
        tabs: tabs,
        onTabsChange: setTabs,
        // 请选择页签
        chooseTab: chooseTab,
        onChooseTabChange: setChooseTab
      })
    }

    // 修改回调
    async function handleChange(newValue) {
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (goOn !== undefined && !goOn) return
      }
      if (onChange) onChange(newValue)
    }

    return (
      <>
        {/* 页签 */}
        <Tabs
          list={list}
          // 选中列表
          loadData={loadData}
          currentList={currentList}
          onCurrentListChange={setCurrentList}
          // 页签
          tabs={tabs}
          onTabsChange={setTabs}
          // 请选择页签
          chooseTab={chooseTab}
          onChooseTabChange={setChooseTab}
        />
        {/* 列表 */}
        <ListItem
          ref={mainRef}
          optionProps={optionProps}
          list={list}
          // 选中列表
          loadData={loadData}
          currentList={currentList}
          onCurrentListChange={setCurrentList}
          // 页签
          tabs={tabs}
          onTabsChange={setTabs}
          // 请选择页签
          chooseTab={chooseTab}
          onChooseTabChange={setChooseTab}
          // 修改
          onChange={handleChange}
          // 阻止选择
          onBeforeSelect={onBeforeSelect}
          {...props}
        />
      </>
    )
  }
)

export default Main
