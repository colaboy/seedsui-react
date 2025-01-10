import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import ModalPicker from './../Picker'

// Modal
const Modal = forwardRef(
  (
    {
      // 无用的属性
      getComboDOM,

      // Modal fixed properties
      portal,
      animation = 'slideUp',
      maskProps,
      captionProps,
      submitProps,
      cancelProps,
      maskClosable = true,
      visible,
      onVisibleChange,

      // Modal current properties
      changeClosable,
      onBeforeChange,

      // Main
      main: MainNode,
      mainProps,

      // Main properties
      value,
      allowClear,
      onChange,

      // Header and Footer
      headerRender,
      footerRender,

      // 纯渲染时不渲染Main
      children,
      ...props
    },
    ref
  ) => {
    // 当前标题，如日期
    let [currentTitle, setCurrentTitle] = useState(undefined)

    // 当前选中项, 默认不能为value, 因为子组件Main先执行, Cascader.DistrictCombo中: 无值update同步加载, 有值在update异步加载, 先有值再无值会导致setList的顺序先set无值, 再set有值
    let [currentValue, setCurrentValue] = useState(undefined)

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

        submit: handleChange,
        ...otherMainRef
      }
    })

    // 不能加此更新, 因为Cascader组件会改原对象, 加isLeaf, 导致每次改动都会触发
    // useEffect(() => {
    //   setCurrentValue(value)
    //   // eslint-disable-next-line
    // }, [JSON.stringify(value)])

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

    // 事件
    async function handleChange(newValue) {
      if (newValue !== undefined) {
        currentValue = newValue
      }

      // 更新选中的值
      if (mainRef?.current?.getValue) {
        currentValue = mainRef.current.getValue()
      }

      // 修改前校验
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

      onVisibleChange && onVisibleChange(false)
    }

    function handleSubmitClick(e) {
      if (submitProps?.onClick) submitProps.onClick(e)
      handleChange(currentValue)
    }

    return (
      <ModalPicker
        ref={modalRef}
        // Modal fixed properties
        visible={visible}
        onVisibleChange={(visible) => {
          // 显示弹窗，更新标题和显示值
          if (visible) {
            updateTitle()
            if (JSON.stringify(value) !== JSON.stringify(currentValue)) {
              setCurrentValue(value)
            }
          }

          onVisibleChange && onVisibleChange(visible)
        }}
        // Modal: display properties
        animation={animation}
        maskProps={maskProps}
        captionProps={{ caption: currentTitle, ...captionProps }}
        submitProps={{
          ...submitProps,
          onClick: handleSubmitClick
        }}
        cancelProps={cancelProps}
        maskClosable={maskClosable}
        {...props}
        portal={portal || document.getElementById('root') || document.body}
      >
        {/* 头部 */}
        {headerRender && headerRender({ visible, value: currentValue, submit: handleChange })}

        {/* 纯渲染 */}
        {children}
        {/* 主体 */}
        {!children && MainNode ? (
          <MainNode
            ref={mainRef}
            {...(mainProps || {})}
            visible={visible}
            value={currentValue}
            allowClear={allowClear}
            onChange={(newValue, newArguments) => {
              // 无标题时更新标题
              updateTitle()

              // 修改值
              setCurrentValue(newValue)

              // 修改即关闭
              if (changeClosable === true) {
                handleChange(newValue)
              } else if (typeof changeClosable === 'function') {
                changeClosable(newValue, newArguments, { submit: handleChange })
              }

              mainProps?.onChange && mainProps.onChange(newValue, newArguments)
            }}
          />
        ) : null}

        {/* 底部 */}
        {footerRender && footerRender({ visible, value: currentValue, submit: handleChange })}
      </ModalPicker>
    )
  }
)

export default Modal
