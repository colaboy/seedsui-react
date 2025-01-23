import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import { formatValue, getDynamicProps } from './../utils'
import Main from './../Main'

// 内库使用
import LocaleUtil from './../../../utils/LocaleUtil'
import ModalPicker from './../../Modal/Picker'

// Modal
const Modal = forwardRef(
  (
    {
      // 显示文本格式化和value格式化
      valueFormatter,

      // Combo
      getComboDOM,

      // Modal fixed properties
      visible,
      onVisibleChange,

      // Modal
      ModalComponent,
      ModalProps,

      // Modal: display properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,

      // Main
      MainComponent,
      MainProps,

      // Main: common
      value,
      list, // [{id: '', name: ''}]
      multiple,
      allowClear,
      onSelect,
      onBeforeChange,
      onChange,
      onSearch,

      // Main: render
      checkedType,
      checkedPosition,
      checkable,
      headerRender,
      footerRender,
      listRender,
      listHeaderRender,
      listFooterRender,
      listExtraHeaderRender,
      listExtraFooterRender,
      itemRender,
      itemContentRender,
      itemProps,
      checkboxProps,

      // Main: Picker Control properties
      defaultPickerValue,
      slotProps,

      // Combo|Main: DatePicker Control properties
      titleFormatter,
      min,
      max,
      type, // year | quarter | month | date | time | datetime
      onError,
      ranges,
      modal, // 弹出方式dropdown
      separator,

      // Main: ActionSheet Control properties
      groupProps,
      optionProps,

      // Main: Tree Component properties
      checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 子级不级联父级
      showCheckedStrategy, // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点
      enableHalfChecked, // 是否启用半选功能
      preserveValue, // 保留不在树结构中的value
      onlyLeafCheck, // 仅允许点击末级节点
      selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
      defaultExpandAll, // 默认展开
      TreeProps,

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // value格式化
    if (typeof valueFormatter !== 'function') {
      // eslint-disable-next-line
      valueFormatter = formatValue
    }

    // 当前标题，如日期
    let [currentTitle, setCurrentTitle] = useState('')

    // 当前选中项
    let [currentValue, setCurrentValue] = useState([])

    // 节点
    const modalRef = useRef(null)
    const mainRef = useRef(null)
    useImperativeHandle(ref, () => {
      const { rootDOM: mainDOM, getRootDOM: getMainDOM, ...otherMainRef } = mainRef?.current || {}
      return {
        rootDOM: modalRef?.current?.rootDOM,
        getRootDOM: () => modalRef?.current?.rootDOM,

        mainDOM: mainDOM,
        getMainDOM: getMainDOM,
        ...otherMainRef
      }
    })

    useEffect(() => {
      if (visible === null) return

      if (onVisibleChange) onVisibleChange(visible)

      // 显示弹窗，更新标题和显示值
      if (visible) {
        updateTitle()
        setCurrentValue(valueFormatter({ type, value, ranges, separator }))
      }
      // eslint-disable-next-line
    }, [visible])

    // useEffect(() => {
    //   setCurrentValue(valueFormatter({ type, value, ranges, separator }))
    //   // eslint-disable-next-line
    // }, [value])

    // 没有传入标题时, 需要动态更新标题（如果日期）
    function updateTitle() {
      if (captionProps?.caption === undefined && mainRef?.current?.getTitle) {
        // Main渲染完成后取标题, 否则将会取到上次的值
        setTimeout(() => {
          currentTitle = mainRef?.current?.getTitle?.()
          setCurrentTitle(currentTitle)
        }, 100)
      }
    }

    // 获取确定按钮的数量
    function getSubmitCaption() {
      let value = currentValue
      // 获取数量
      if (typeof submitProps?.caption === 'function') {
        return submitProps?.caption({
          multiple,
          value
        })
      }
      // 多选带选中数量
      if (multiple) {
        return LocaleUtil.locale('确定', 'SeedsUI_ok') + (value?.length ? `(${value.length})` : '')
      }
      return LocaleUtil.locale('确定', 'SeedsUI_ok')
    }

    // 事件
    async function handleSubmitClick(e) {
      if (submitProps?.onClick) submitProps.onClick(e)
      // 更新选中的值
      if (mainRef?.current?.getValue) {
        currentValue = mainRef.current.getValue()
      }
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(currentValue)
        if (goOn === false) return
        // 修改值
        if (typeof goOn === 'object') {
          currentValue = goOn
        }
      }
      if (onChange) {
        let goOn = await onChange(currentValue)
        if (goOn === false) return
      }
      if (onVisibleChange) onVisibleChange(false)
    }

    // Main Render
    let MainNode = Main
    if (MainComponent) {
      MainNode = MainComponent
    }

    return (
      <ModalPicker
        ref={modalRef}
        // Modal fixed properties
        visible={visible}
        onVisibleChange={onVisibleChange}
        // Modal: display properties
        animation={animation}
        maskProps={maskProps}
        captionProps={{ caption: currentTitle, ...captionProps }}
        submitProps={{
          // 必选单选不显示确定按钮
          visible: multiple !== undefined,
          // 多选确定带选中数量
          ...submitProps,
          caption: getSubmitCaption(),
          onClick: handleSubmitClick
        }}
        cancelProps={cancelProps}
        maskClosable={maskClosable}
        {...props}
        portal={portal || document.getElementById('root') || document.body}
      >
        {/* 纯渲染 */}
        {children}
        {/* 主体 */}
        {!children && (
          <MainNode
            ref={mainRef}
            {...getDynamicProps({
              BaseProps: MainProps,

              // Main
              // MainComponent,
              // MainProps,

              // Main: common
              value,
              list, // [{id: '', name: ''}]
              multiple,
              allowClear,
              onSelect,
              // onBeforeChange,
              // onChange,
              onSearch,

              // Main: render
              checkedType,
              checkedPosition,
              checkable,
              headerRender,
              footerRender,
              listRender,
              listHeaderRender,
              listFooterRender,
              listExtraHeaderRender,
              listExtraFooterRender,
              itemRender,
              itemContentRender,
              itemProps,
              checkboxProps,

              // Main: Picker Control properties
              defaultPickerValue,
              slotProps,

              // Combo|Main: DatePicker Control properties
              titleFormatter,
              min,
              max,
              type, // year | quarter | month | date | time | datetime
              onError,
              ranges,
              modal, // 弹出方式dropdown
              separator,

              // Main: ActionSheet Control properties
              groupProps,
              optionProps,

              // Main: Tree Component properties
              checkStrictly, // 严格模式: 级联 true: 不级联, false: 级联, children: 子级不级联父级
              showCheckedStrategy, // 定义选中项回填的方式: leaf仅显示所有末级节点; parent仅显示父级节点
              enableHalfChecked, // 是否启用半选功能
              preserveValue, // 保留不在树结构中的value
              onlyLeafCheck, // 仅允许点击末级节点
              selectable, // 点击选中, 根据checkable判断是否启用selectable, 没有checkbox时则启用
              defaultExpandAll, // 默认展开
              ...(TreeProps || {})
            })}
            // cover properties
            visible={visible}
            value={currentValue}
            list={list}
            onChange={(newValue, options) => {
              // 无标题时更新标题
              updateTitle()

              // 修改值
              currentValue = valueFormatter({ type, value: newValue, ranges, separator })
              setCurrentValue(currentValue)

              // multiple未传则为必选单选
              if (multiple === undefined || options?.close === true) {
                handleSubmitClick()
              }
            }}
          />
        )}
      </ModalPicker>
    )
  }
)

export default Modal
