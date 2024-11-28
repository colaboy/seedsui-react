import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import _ from 'lodash'

import sliceArray from './sliceArray'
import getTreeChildren from './getTreeChildren'
import formatValue from './formatValue'
import formatList from './formatList'

import Tabs from './Tabs'
import ListItem from './ListItem'

// 内库使用
import locale from './../../locale'
import ArrayUtil from './../../ArrayUtil'
import Toast from './../../Toast'

// 测试使用
// import { locale } from 'seedsui-react'
// import { ArrayUtil, Toast } from 'seedsui-react'

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

      list: externalList,
      loadData,
      optionProps = {},
      headerRender,
      footerRender,
      TabsComponent,
      ...props
    },
    ref
  ) => {
    // 格式化value: value未传parentid, 补充parentid
    formatValue(value)

    // 格式化list
    formatList(externalList)

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
        update: update
      }
    })

    // 初始化tabs、选中tab、列表
    useEffect(() => {
      if (
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
      // 无值渲染根节点
      if (!Array.isArray(value) || !value.length) {
        tabsRef.current = null
        setActiveTab(null)
        setList(externalList)
        return
      }

      // 获取当前列表
      let newList = await getChildrenList(value)
      if (!newList) return null

      // 如果有子级, 则增加请选择
      tabsRef.current = _.cloneDeep(value)
      let lastTab = Array.isArray(value) && value.length ? value[value.length - 1] : null
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
          return null
        }
        // 无值则为叶子节点
        else if (newList === null) {
          // 标识isLeaf
          for (let tab of tabs) {
            if (tab.id === lastTab.id) {
              tab.isLeaf = true
              break
            }
          }
          for (let tab of value) {
            if (tab.id === lastTab.id) {
              tab.isLeaf = true
              break
            }
          }
          ArrayUtil.setDeepTreeNode(externalList, lastTab.id, (node) => {
            node.isLeaf = true
          })
          return getChildrenList(tabs)
        }
        // 有值则为子项, 添加到原始list中
        else {
          ArrayUtil.setDeepTreeNode(externalList, lastTab.id, (node) => {
            node.children = newList
          })
        }
      }

      return newList
    }

    // 点击选项
    async function handleDrillDown(item) {
      let newValue = value

      // 点击项的父级为选中项
      let parentTabIndex = (value || [])?.findIndex?.((tab) => tab.id === item?.parentid)

      // 已经存在于tabs上, 截取
      if (parentTabIndex !== -1) {
        newValue = newValue.slice(0, parentTabIndex + 1)
        newValue.push(item)
      }
      // 不在tabs上, 为第一项
      else {
        newValue = [item]
      }

      // 不是末级节点, 则获取当前列表, 补充标识: value中的isLeaf和externalList中的children
      if (!newValue[newValue.length - 1].isLeaf) {
        let newList = await getChildrenList(newValue, {
          onError: (error) => {
            Toast.show({
              content: error.errMsg
            })
          }
        })
        if (!newList) return
      }

      onChange && onChange(newValue, { list: externalList })
    }

    function getTabsNode() {
      if (typeof TabsComponent === 'function') {
        return TabsComponent({
          tabs: tabsRef.current,
          activeTab: activeTab,
          onActiveTab: async (tab) => {
            activeTab = tab
            let newList = await getChildrenList(sliceArray(value, tab?.parentid))
            if (!newList) return

            setActiveTab(activeTab)
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
            let newList = await getChildrenList(sliceArray(value, tab?.parentid))
            if (!newList) return

            setActiveTab(activeTab)
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
