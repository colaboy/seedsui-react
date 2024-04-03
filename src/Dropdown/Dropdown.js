import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
  Fragment
} from 'react'
import Tabbar from './../Tabbar'
import DropdownDialog from './DropdownDialog'

const Dropdown = forwardRef(
  (
    {
      top,
      portal,
      disabled,
      onChange,
      listRoot, // 一级标题, 有可能id相同但名称不同 [{id: '', name: '分类'}, {id: '', name: '品牌'}, {id: '', name: '筛选'}]
      list, // [{id: '', name: '分类', data: [{id: '1',name: '测试数据1',children:[]}]}]
      tabbarProps = {},
      dialogProps = {},
      menutiledProps = {}
    },
    ref
  ) => {
    const tabbarRef = useRef(null)
    useImperativeHandle(ref, () => {
      return tabbarRef.current
    })
    const [activeIndex, setActiveIndex] = useState(-1)
    let [selected, setSelected] = useState([])
    const [menusMultiple, setMenusMultiple] = useState(false)
    const [menus, setMenus] = useState([])
    const [offsetTop, setOffsetTop] = useState(0)
    const [show, setShow] = useState(false)

    // 改造tab数据
    let tabs = []
    if (Array.isArray(list) && list.length) {
      for (let item of list) {
        tabs.push({
          ...item,
          ricon: <span className="icon tab-icon shape-triangle-down"></span>
        })
      }
    }

    // 初始化遮罩距离顶部间距
    function getMaskTop() {
      return new Promise((resolve) => {
        // 计算距离头部
        let maskTop = top
        if (!maskTop) {
          setTimeout(() => {
            let rect = tabbarRef?.current?.getBoundingClientRect?.()
            if (rect?.top) {
              maskTop = rect.top + (tabbarRef.current.clientHeight || 40)
              resolve(maskTop)
            } else {
              resolve(0)
            }
          }, 100)
        } else {
          resolve(maskTop)
        }
      })
    }

    useEffect(() => {
      async function fetchData() {
        let maskTop = await getMaskTop()
        setOffsetTop(maskTop)
      }
      fetchData()
    }, []) // eslint-disable-line

    // 点击Tabbar, 选中此项, 并显示或者隐藏Dialog
    function handleClickTab(e, value, options, index) {
      let ids = tabs[index].id.split(',')
      let names = tabs[index].name.split(',')
      selected = []
      for (let [index, id] of ids.entries()) {
        selected.push({
          id: id,
          name: names[index]
        })
      }
      setSelected(selected)
      setMenusMultiple(list[index].multiple)
      setMenus(list[index].data)
      if (activeIndex >= 0) {
        // 隐藏弹框
        setActiveIndex(-1)
        setShow(false)
      } else {
        // 显示弹框
        setActiveIndex(index)
        setShow(true)
      }
    }

    // 点击遮罩隐藏
    function handleClickMask(e) {
      setActiveIndex(-1)
      setShow(false)
      if (dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.onClick) {
        dialogProps.maskAttribute.onClick(e)
      }
    }

    // 选中项是否是根节点
    function selectedIsRoot(selected) {
      if (!listRoot || !listRoot.length) return false
      if (!selected || !selected.length) return true
      if (selected.length === 1) {
        if (menusMultiple) {
          return selected[0].isroot === '1'
        }
        for (let tab of listRoot) {
          if (tab.id === selected[0].id) return true
        }
      }
      return false
    }

    // 选中项
    function handleSelected(e, value, selected, data) {
      // 判断是否是根节点
      let isRoot = selectedIsRoot(selected)
      if (!selected || !selected.length) {
      } else {
        // 单选展开
        if (selected[0].children && selected[0].children.length > 0) return

        // 选中id和name
        let id = []
        let name = []
        for (let selectedItem of selected) {
          id.push(selectedItem.id)
          name.push(selectedItem.name)
        }
        id = id.join(',')
        name = name.join(',')
        // 设置选中的id和name
        tabs[activeIndex].id = id
        tabs[activeIndex].name = name
      }

      // 删除增加的ricon属性
      for (let tab of tabs) {
        delete tab.ricon
      }
      // 如果选中根节点
      if (isRoot) {
        tabs[activeIndex].name = listRoot[activeIndex].name
        tabs[activeIndex].id = listRoot[activeIndex].id
      }
      setActiveIndex(-1)
      setShow(false)
      // 触发onChange事件
      setSelected(selected)
      let names = []
      if (tabs && tabs.length) {
        names = tabs.map((tab) => {
          return tab.name
        })
        names = names.join(',')
      }
      if (onChange) onChange(e, names, tabs)
    }
    return (
      <Fragment>
        <Tabbar
          disabled={disabled}
          ref={tabbarRef}
          exceptOnClickActive={false}
          list={tabs}
          onChange={handleClickTab}
          activeIndex={activeIndex}
          className="tabbar-dropdown tabbar-tiled border-b"
          {...tabbarProps}
        />
        <DropdownDialog
          show={show}
          dialogProps={{
            ...(dialogProps || {}),
            portal: portal,
            maskAttribute: {
              ...(dialogProps && dialogProps.maskAttribute ? dialogProps.maskAttribute : {}),
              onClick: handleClickMask,
              style: {
                top: offsetTop + 'px',
                ...(dialogProps && dialogProps.maskAttribute && dialogProps.maskAttribute.style
                  ? dialogProps.maskAttribute.style
                  : {})
              }
            }
          }}
          multiple={menusMultiple}
          list={menus}
          selected={selected}
          onChange={handleSelected}
          menutiledProps={menutiledProps}
        />
      </Fragment>
    )
  }
)

export default Dropdown
