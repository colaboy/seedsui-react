import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import locale from './../../locale'
import Head from './../../Picker/Modal/Head'
import Tabs from './Tabs'
import ListItem from './ListItem'
import Utils from './Utils'

const Modal = forwardRef(
  (
    {
      // 通用属性
      portal,
      getComboDOM,
      maskClosable,
      visible = false,
      value,
      list,
      onBeforeChange,
      onChange,
      onVisibleChange,

      // 定制属性
      loadData,
      onBeforeSelectOption,
      maskProps = {},
      submitProps = {},
      cancelProps = {},
      optionProps = {},
      ...props
    },
    ref
  ) => {
    let [tabs, setTabs] = useState(value || [])
    let [chooseTab, setChooseTab] = useState(null)
    let [currentList, setCurrentList] = useState(list || [])

    // 补充parentid
    list = Utils.convertList(list)

    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        getRootDOM: () => rootRef.current
      }
    })

    useEffect(() => {
      // 隐藏时置空所有
      if (!visible) {
        // 置空tabs
        setTabs(null)
        // 置空请选择
        setChooseTab(null)
        // 置空列表
        setCurrentList(null)
        return
      }
      // 显示时更新tabs
      tabs = value // eslint-disable-line

      // 没有选中时使用一级列表
      if (!Array.isArray(tabs) || !tabs.length) {
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

      // 传入的选中项可能会数据不充分, 需要补充数据
      tabs = tabs.map((tab) => {
        return Utils.getListNode(list, tab)
      })

      // 选中项
      let activeTab = tabs.filter((item) => {
        if (item.active) {
          return true
        }
        return false
      })
      if (Array.isArray(activeTab) && activeTab.length) {
        activeTab = activeTab[0]
      } else {
        activeTab = tabs[tabs.length - 1]
        tabs[tabs.length - 1].active = true
      }

      setTabs(tabs)

      // 无选中项, 默认选中最后一项
      Utils.initData({
        list: list,
        // 选中列表
        loadData: loadData,
        currentList: currentList,
        onCurrentListChange: setCurrentList,
        // 选中前判断
        onBeforeSelectOption: onBeforeSelectOption,
        // 页签
        activeTab: activeTab,
        tabs: tabs,
        onTabsChange: setTabs,
        // 请选择页签
        chooseTab: chooseTab,
        onChooseTabChange: setChooseTab
      })
    }, [visible]) // eslint-disable-line

    // 点击遮罩
    function handleMaskClick(e) {
      if (maskProps.onClick) maskProps.onClick(e)
      if (maskClosable && onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 点击确定
    function handleSubmitClick(e) {
      handleChange(tabs)
      e.stopPropagation()
    }

    // 点击取消
    function handleCancelClick(e) {
      if (onVisibleChange) onVisibleChange(false)
      e.stopPropagation()
    }

    // 修改回调
    async function handleChange(newValue) {
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(newValue)
        if (!goOn) return
      }
      if (onChange) onChange(newValue)
      if (onVisibleChange) onVisibleChange(false)
    }

    return createPortal(
      <div
        ref={rootRef}
        {...maskProps}
        className={`mask picker-mask${maskProps.className ? ' ' + maskProps.className : ''}${
          visible ? ' active' : ''
        }`}
        onClick={handleMaskClick}
      >
        <div
          {...props}
          data-animation="slideUp"
          className={`cascader-modal popup-animation bottom-center${
            props.className ? ' ' + props.className : ''
          }${visible ? ' active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头 */}
          <Head
            caption={locale('请选择所在地区', 'picker_district_title')}
            cancelProps={cancelProps}
            submitProps={submitProps}
            onSubmitClick={handleSubmitClick}
            onCancelClick={handleCancelClick}
          />
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
            onBeforeSelectOption={onBeforeSelectOption}
          />
        </div>
      </div>,
      portal || document.getElementById('root') || document.body
    )
  }
)

export default React.memo(Modal, (prevProps, nextProps) => {
  if (nextProps.visible === prevProps.visible) return true
  return false
})
