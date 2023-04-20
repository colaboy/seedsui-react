import React, { useEffect, useState, useRef } from 'react'
import { clearMarkers, addMarkers, searchNearby } from './../../utils'

import Toast from './../../../../../Toast'
import Loading from './../../../../../Loading'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 附近推荐
function Nearby({ value, map, onChange }) {
  const markersRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState(null)

  // 当value发生变化后, 需要查询附近的点
  useEffect(() => {
    if (!tab?.name) return

    loadData()
    // eslint-disable-next-line
  }, [value, tab])

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
  }

  return (
    <div className={`map-nearby${visible ? ' active' : ''}`}>
      <Toggle visible={visible} onChange={setVisible} />
      <Tabs tab={tab} onChange={setTab} />
      <Main />
    </div>
  )
}
export default Nearby
