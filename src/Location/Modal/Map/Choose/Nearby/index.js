import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'
import { clearMarkers, addMarkers, searchNearby } from './../../utils'

import Toast from './../../../../../Toast'
import Loading from './../../../../../Loading'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 附近推荐
function Nearby({ map, onChange }, ref) {
  const markersRef = useRef(null)
  const [list, setList] = useState(null)
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState({ name: '全部' })

  // 节点
  useImperativeHandle(ref, () => {
    return {
      reload: loadData
    }
  })

  // 当value发生变化后, 需要查询附近的点
  useEffect(() => {
    if (!map || !tab?.name) return

    loadData()
    // eslint-disable-next-line
  }, [tab])

  // 获取附近的点
  async function loadData() {
    Loading.show()
    let result = await searchNearby(tab.name, { map: map })
    Loading.hide()
    if (typeof result === 'string') {
      Toast.show({ content: result })
      return
    }

    // 清除原先的点
    if (markersRef.current) {
      clearMarkers(markersRef.current, { map: map })
      markersRef.current = null
    }

    // 绘制新的点
    let points = Array.isArray(result) ? result.map((item) => item.point) : null
    if (points) {
      markersRef.current = addMarkers(points, { map: map, color: 'blue' })
    }

    // 刷新列表
    setList(result)
  }

  return (
    <div className={`mappage-nearby${visible ? ' active' : ''}`}>
      <Toggle visible={visible} onChange={setVisible} />
      <div className={`mappage-nearby-body`}>
        <Tabs tab={tab} onChange={setTab} />
        <Main
          list={list}
          onChange={(item) => onChange && onChange(item, { updateNearby: false })}
        />
      </div>
    </div>
  )
}
export default forwardRef(Nearby)