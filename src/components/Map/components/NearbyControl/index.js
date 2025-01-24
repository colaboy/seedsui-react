import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'

import getTabs from './utils/getTabs'
import Current from './Current'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Loading from './../../../Loading'
// 内库使用-end

// 测试使用-start
// import { LocaleUtil, Loading } from 'seedsui-react'
// 测试使用-end

// 附近推荐
function Nearby(
  {
    map,
    radius,
    readOnly,
    value,
    // {
    //   name: '',
    //   address: '',
    //   longitude: '',
    //   latitude: ''
    // }
    onChange,
    onLoad
  },
  ref
) {
  // 容器
  const rootRef = useRef(null)

  const [list, setList] = useState(null)
  const [tab, setTab] = useState(getTabs()[0])
  const [active, setActive] = useState(value)

  // 节点
  useImperativeHandle(ref, () => {
    return {
      rootDOM: rootRef.current,
      getRootDOM: () => rootRef.current,
      reload: loadData
    }
  })

  // 初始化、切换tab更新附近的点
  useEffect(() => {
    // 只读、参数不全、加载中则不加载数据
    if (readOnly || !tab?.name || !value?.longitude || !value?.latitude || Loading.exists()) return

    loadData()
    // eslint-disable-next-line
  }, [JSON.stringify(tab), JSON.stringify(value)])

  // Update value linkage update active
  useEffect(() => {
    setActive(value)
    // eslint-disable-next-line
  }, [JSON.stringify(value)])

  // 获取附近的点
  async function loadData() {
    Loading.show({
      content: LocaleUtil.locale('搜索中', 'SeedsUI_searching')
    })
    let result = await map.queryNearby({
      map: map,
      keyword: tab.id || tab.name,
      longitude: value?.longitude,
      latitude: value?.latitude,
      type: value?.type,
      radius: radius
    })
    Loading.hide()

    // 刷新列表
    setList(result)

    // 重置滚动条
    let contentDOM = rootRef.current.querySelector('.map-nearbyControl-main')
    if (contentDOM) {
      contentDOM.scrollTop = 0
    }

    onLoad && onLoad(result)
  }

  return (
    <div className={`map-nearbyControl`} ref={rootRef}>
      {/* 当前位置 */}
      <Current
        map={map}
        readOnly={readOnly}
        value={value}
        active={active}
        onChange={(item) => {
          setActive(item)
          onChange && onChange(item)
        }}
      />
      {readOnly ? null : (
        <>
          {/* 展开收缩附近 */}
          <Toggle />
          {/* 附近的点 */}
          <div className={`map-nearbyControl-body`}>
            <Tabs tab={tab} onChange={setTab} />
            <Main
              list={list}
              active={active}
              onChange={(item) => {
                map.panTo({ longitude: item.longitude, latitude: item.latitude, type: item.type })
                setActive(item)
                onChange && onChange(item)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
export default forwardRef(Nearby)
