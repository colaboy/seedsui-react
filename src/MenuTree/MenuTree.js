// require PrototypeArray.js
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

const MenuTree = forwardRef(
  (
    {
      selected = [], // 选中项: [{id: '', name: ''}]
      list = [], // 数据: [{id: '', name: '', parentid: ''}]

      onChange, // func(e, value, selected)
      onExpandActive, // func(e, value, selected) 展开选中项时触发, 如若有此属性, 展开选中项时也将移除同级所有的选中项与展开项

      onClick,
      onClickLeaf,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)

    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      if (!instance.current) return
      if (list && list.length) {
        if (selected && selected.length) {
          instance.current.params.selectedId = selected[0].id
        }
        var data = Object.clone(list)
        if (JSON.stringify(data).indexOf('"children"') === -1) {
          data = data.deepTree()
        }
        instance.current.setData(data)
      } else {
        instance.current.setData([])
      }
    }, [list]) // eslint-disable-line

    useEffect(() => {
      if (instance.current) return
      var data = Object.clone(list)
      if (JSON.stringify(data).indexOf('"children"') === -1) {
        data = data.deepTree()
      }
      instance.current = new Instance(rootRef.current, {
        data: data,
        selectedId: selected && selected.length ? selected[0].id : '',
        onExpandActive: onExpandActive ? true : null,
        onClick: click // (item, isActive, isExpand: true展开 | false收缩)
      })
    }, []) // eslint-disable-line

    // 比较变化
    function usePrevious(value) {
      const ref = useRef()
      useEffect(() => {
        ref.current = value
      })
      return ref.current
    }
    const prevSelected = usePrevious(selected)

    // 比较选中是否不同, 不同更新树
    useEffect(() => {
      // console.log(prevSelected)
      // console.log(selected)
      if (!prevSelected || !selected || !Array.isArray(prevSelected)) return
      if (!Array.isArray(selected) || !selected[0]) return
      instance.current.params.selectedId = selected[0].id
      instance.current.addSelected(selected[0])
    }, [selected]) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClick = click
    }
    function click(s, item, isActived, isExpand) {
      if (rootRef.current) s.currentTarget = rootRef.current
      // childrenCount
      var childrenCount = item.children && item.children.length ? item.children.length : 0

      // 点击回调
      if (onClick) onClick(s, item.name, [item], isActived, isExpand, childrenCount)
      if (!isActived) {
        // 选中菜单变化
        if (onChange) onChange(s, item.name, [item])
      } else if (!isExpand) {
        // 选中菜单展开
        if (onExpandActive) onExpandActive(s, item.name, [item])
      }
      if (item.isLeaf === true && onClickLeaf)
        onClickLeaf(s, item.name, item, isActived, isExpand, childrenCount)
    }

    return (
      <ul
        ref={rootRef}
        {...others}
        className={`menutree${others.className ? ' ' + others.className : ''}`}
      ></ul>
    )
  }
)

export default MenuTree
