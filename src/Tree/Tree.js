// require PrototypeArray.js(flattenTree)
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

const Tree = forwardRef(
  (
    {
      multiple = false, // 是否需要多选
      checkbox = true, // 是否可选
      checkStrictly = true, // 严格模式, 父子节点选中状态不再关联
      arrowAutoShow = false, // 箭头自动显示, 有下级时才显示箭头
      extend = 0, // 1.全部展开 -1.全部收缩 0.不工作
      bar, // 选中栏

      treeAttribute = {},
      buttonAddAttribute = {}, // {className: '', onClick: func()}
      buttonDelAttribute = {}, // {className: '', onClick: func()}

      selected = [], // 选中项: [{id: '', name: '', parentid: ''}]
      selectedAutoClear = false, // 自动清理不存在的选中节点
      list = [], // 数据: [{id: '', name: '', parentid: ''}]

      getChildren,
      onChange, // func(e, value, selected)

      onClick,
      onClickLeaf,
      onData,
      params = {}, // 设置实例化参数

      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })

    const instance = useRef(null)

    // 是否是深层数据结构
    let isChildrenData = useRef(false)

    // 初始化树结构
    useEffect(() => {
      if (instance.current) return
      // 更新数据
      let data = convertData(list)
      let elTree = refEl.current.querySelector('ul')
      console.log('初始化, 是否多选:' + multiple)
      instance.current = new Instance(elTree, {
        data: data,
        selectedAutoClear: selectedAutoClear,
        multiple,
        checkbox,
        checkStrictly,
        arrowAutoShow,
        bar,
        buttonAddClass: buttonAddAttribute.className,
        onClickAdd: buttonAddAttribute.onClick,
        buttonDelClass: buttonDelAttribute.className,
        onClickDel: buttonDelAttribute.onClick,
        onClick: handleClick,
        onChange: handleChange,
        onData: onData,
        ...(params || {})
      })
      // 渲染数据
      instance.current.update()
      // 设置已选中
      checkedSelected()
      refEl.current.instance = instance
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
      let delIds = [] // 删除项
      let addOptions = [] // 新增项

      // 上次的对象
      let prevSelectedMap = {}
      for (let item of prevSelected) {
        prevSelectedMap[item.id] = item
      }

      // 上次的对象
      let selectedMap = {}
      for (let item of selected) {
        selectedMap[item.id] = item
      }
      // 此次比上次多的为新增
      for (let id in selectedMap) {
        // 新增项
        if (!prevSelectedMap[id]) {
          addOptions.push(selectedMap[id])
        }
      }
      // 此次比上次少的为删除
      for (let id in prevSelectedMap) {
        // 新增项
        if (!selectedMap[id]) {
          delIds.push(id)
        }
      }
      // 更新删除项
      for (let id of delIds) {
        instance.current.removeSelected(id)
      }
      // 更新新增项
      for (let option of addOptions) {
        instance.current.addSelected(option)
      }
    }, [selected]) // eslint-disable-line

    // 展开与收缩
    useEffect(() => {
      if (extend === 1) {
        instance.current.extendAll()
      } else if (extend === -1) {
        instance.current.collapseAll()
      }
    }, [extend])

    // 数据更新
    useEffect(() => {
      if (!instance.current) return
      if (list && list.length) {
        let data = Object.clone(list)
        isChildrenData.current = JSON.stringify(data).indexOf('"children"') !== -1
        if (isChildrenData.current) {
          data = data.flattenTree()
        }
        // 选中选中项
        checkedSelected()
        // 开始渲染
        instance.current.setData(data)
        instance.current.update()
      } else {
        instance.current.setData([])
        instance.current.update()
      }
    }, [list]) // eslint-disable-line

    // 选中栏
    useEffect(() => {
      if (!bar || !instance.current) return
      instance.current.params.bar = bar
      instance.current.updateBar()
      barSelected()
    }, [bar]) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClick = handleClick
      instance.current.params.onChange = handleChange
      instance.current.params.onData = onData
    }

    // 选中选中项
    function checkedSelected() {
      if (selected && selected.length) {
        for (var item of selected) {
          instance.current.addSelected(item)
        }
      } else {
        instance.current.removeAllSelected()
      }
    }

    // 当bar更新时, 选中项放到bar上
    function barSelected() {
      instance.current.bar.innerHTML = ''
      if (selected && selected.length) {
        for (var item of selected) {
          instance.current.addBarOption(item)
        }
      } else {
        instance.current.removeAllSelected()
      }
    }

    // 选中项
    function handleChange(s) {
      if (refEl.current) s.target = refEl.current
      if (onChange) {
        let value = []
        for (let id in s.selected) {
          value.push(s.selected[id].name)
        }
        onChange(s, value.join(','), Object.values(s.selected))
      }
    }

    // 判断是否选中
    function isSelected(id) {
      if (!Array.isArray(selected) || !id) return false
      for (let item of selected) {
        if (item.id === id) return true
      }
      return false
    }

    // 转换传入的数据为tree实例所需数据
    function convertData (list) {
      let data = Object.clone(list)
      isChildrenData.current = JSON.stringify(data).indexOf('"children"') !== -1
      if (isChildrenData.current) {
        data = data.flattenTree()
      }
      return data
    }

    // 点击
    function handleClick(s) {
      if (!s.targetLine) return
      if (refEl.current) s.target = refEl.current
      let data = convertData(list)
      // item
      const id = s.targetLine.getAttribute('data-id')
      let item = s.targetLine.getAttribute('data-node')
      if (item && typeof item === 'string') {
        try {
          item = JSON.parse(decodeURIComponent(decodeURIComponent(item)))
        } catch (error) {
          // 从list中拿此条数据有问题, 因为list是不变的, 而动态渲染的过程就是不断地向data中注入子数据
          item = data.getFlattenTreeNode(id)
        }
      }
      // isActived
      let isActived = isSelected(id) ? true : false
      // childrenCount
      let childrenCount = 0
      const ul = s.targetLine.nextElementSibling
      if (ul && ul.tagName === 'UL') {
        childrenCount = ul.children.length
      }
      // isExtend
      const isExtend = s.targetLine.classList.contains('extend')

      // 点击回调
      if (onClick) onClick(s, item.name, item, isActived, isExtend, childrenCount)
      if (s.isLeaf && onClickLeaf) onClickLeaf(s, item.name, item, isActived)
      if (getChildren) {
        addChildren(s, item, isActived, isExtend, childrenCount)
      }
    }

    // 异步加载的方法, 点击Title, 去请求数据, 将数据塞到指定节点下
    async function addChildren(s, item, isActived, isExtend, childrenCount) {
      if (!isExtend || s.targetLine.childrenLoaded) return
      var ul = s.targetLine.nextElementSibling
      let leaf = await getChildren(item.id)
      // 修改原数据
      if (isChildrenData.current) {
        // 修改children数据
        list.setDeepTreeNodeChildren(item.id, {
          children: leaf
        })
      } else {
        // 修改扁平数据
        list.push(...leaf)
      }

      // 如果返回不是数组, 则认为返回错误
      if (leaf instanceof Array === false) {
        return
      }
      // 格式化数据
      leaf = convertData(leaf)
      instance.current.addData(leaf, item.id, ul)
      if (s.targetLine) s.targetLine.childrenLoaded = true
    }

    return (
      <div
        ref={refEl}
        {...others}
        className={`tree-box${checkStrictly ? ' tree-strictly' : ''}${
          others.className ? ' ' + others.className : ''
        }`}
      >
        <ul
          {...treeAttribute}
          className={`tree${multiple ? '' : ' tree-type-radio'}${
            treeAttribute.className ? ' ' + treeAttribute.className : ''
          }`}
        ></ul>
      </div>
    )
  }
)

export default Tree
