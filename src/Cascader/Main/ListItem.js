import React, { forwardRef, useRef } from 'react'
import Utils from './Utils'

const ListItem = forwardRef(
  (
    {
      optionProps,
      list,
      // 选中列表
      loadData,
      currentList,
      onCurrentListChange,
      // 页签
      tabs,
      onTabsChange,
      // 请选择页签
      chooseTab,
      onChooseTabChange,
      // 修改
      onChange,
      // 阻止选择
      onBeforeSelectOption,
      ...props
    },
    ref
  ) => {
    // 加载时禁用点击
    const loadingRef = useRef(null)
    // 点击项
    async function handleOptionClick(e, item) {
      e.stopPropagation()
      if (loadingRef.current) return
      loadingRef.current = true

      if (optionProps.onClick) optionProps.onClick(e)

      // 更新tabs
      // eslint-disable-next-line
      tabs = Utils.addOptionToTabs(tabs, item)
      if (onTabsChange) onTabsChange(tabs)

      // 获取列表数据
      let newCurrentList = null

      // 获取子数据前阻止方法
      let allowLoadChildren = true
      if (onBeforeSelectOption) {
        allowLoadChildren = await onBeforeSelectOption(tabs)
      }

      // 获取子数据
      if (allowLoadChildren) {
        newCurrentList = await Utils.getChildrenList(list, tabs, item, loadData)
      }

      // 没有数据则直接调用onChange
      if (!Array.isArray(newCurrentList) || !newCurrentList.length) {
        // eslint-disable-next-line
        chooseTab = null
        if (onChooseTabChange) onChooseTabChange(chooseTab)
        // 选中最后一项
        tabs[tabs.length - 1].active = true
        if (onChange) onChange(tabs)
      }
      // 有数据则刷新列表
      else {
        // eslint-disable-next-line
        chooseTab = Utils.getChooseTab(tabs, true)
        if (onChooseTabChange) onChooseTabChange(chooseTab)
        if (onCurrentListChange) onCurrentListChange(newCurrentList)
      }
      loadingRef.current = false
    }

    // 判断是否选中
    function getActiveOptionClass(item) {
      if (!Array.isArray(tabs) || !tabs.length) return ''
      if (!item?.id) return ''

      for (let tab of tabs) {
        if (item.id === tab.id) {
          return ' active'
        }
      }
      return ''
    }

    if (!Array.isArray(currentList) || !currentList.length) return null
    return (
      <div
        {...props}
        className={`picker-main cascader${props?.className ? ' ' + props.className : ''}`}
        ref={ref}
      >
        {Array.isArray(currentList) &&
          currentList.map((item, index) => {
            return (
              <div
                key={index}
                {...optionProps}
                className={`cascader-modal-option${
                  optionProps.className ? ' ' + optionProps.className : ''
                }${getActiveOptionClass(item)}`}
                data-index={index}
                onClick={(e) => handleOptionClick(e, item)}
              >
                <p className="cascader-modal-option-caption">{item.name}</p>
                <i className="cascader-modal-option-icon"></i>
              </div>
            )
          })}
      </div>
    )
  }
)

export default ListItem
