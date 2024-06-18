import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'
import queryNearby from './../../utils/queryNearby'
import getTabs from './utils/getTabs'
import Current from './Current'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 测试使用
// import { Loading, Toast } from 'seedsui-react'
// 内库使用
import Toast from './../../../Toast'
import Loading from './../../../Loading'

// 附近推荐
function Nearby(
  {
    map,
    radius,
    readOnly,
    value = {
      name: '',
      address: '',
      longitude: '',
      latitude: ''
    },
    onChange,
    onLoad
  },
  ref
) {
  // 容器
  const nearbyRef = useRef(null)

  const [list, setList] = useState(null)
  const [tab, setTab] = useState(getTabs()[0])

  // 节点
  useImperativeHandle(ref, () => {
    return {
      reload: loadData
    }
  })

  // 初始化、切换tab更新附近的点
  useEffect(() => {
    if (!tab?.name) return

    loadData()
    // eslint-disable-next-line
  }, [tab])

  // 获取附近的点
  async function loadData() {
    Loading.show()
    let result = await queryNearby({
      map: map.currentMap,
      keyword: tab.id || tab.name,
      longitude: value?.longitude,
      latitude: value?.latitude,
      radius: radius
    })
    Loading.hide()
    if (typeof result === 'string') {
      Toast.show({ content: result })
      return
    }

    // 刷新列表
    setList(result)
    // 选中项
    if (nearbyRef.current) {
      // 滚动条置顶
      nearbyRef.current.querySelector('.map-nearbyControl-main').scrollTop = 0
    }

    onLoad && onLoad(result)
  }

  return (
    <div className={`map-nearbyControl`} ref={nearbyRef}>
      {/* 当前位置 */}
      <Current map={map} readOnly={readOnly} value={value} onChange={onChange} />
      {/* 展开收缩附近 */}
      <Toggle />
      {/* 附近的点 */}
      <div className={`map-nearbyControl-body`}>
        <Tabs tab={tab} onChange={setTab} />
        <Main
          list={list}
          onChange={(item) => {
            map.panTo({ longitude: item.longitude, latitude: item.latitude })
            onChange && onChange(item)
          }}
        />
      </div>
    </div>
  )
}
export default forwardRef(Nearby)
