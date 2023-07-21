import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'
import { clearMarkers, addMarkers, searchNearby } from './../../utils'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 测试使用
// import { Loading, Toast } from 'seedsui-react'
// 内库使用
import Toast from './../../../../Toast'
import Loading from './../../../../Loading'
import tabs from './keywords'

// 附近推荐
function Nearby({ map, onChange }, ref) {
  // 容器
  const nearbyRef = useRef(null)

  // 附近的点
  const markersRef = useRef(null)

  const [list, setList] = useState(null)
  const [tab, setTab] = useState(tabs[0])

  // 节点
  useImperativeHandle(ref, () => {
    return {
      reload: loadData
    }
  })

  // 初始化、切换tab更新附近的点
  useEffect(() => {
    if (!map || !tab?.name) return
    loadData()
    // eslint-disable-next-line
  }, [tab])

  // 获取附近的点
  async function loadData() {
    Loading.show()
    let result = await searchNearby(tab.id || tab.name, { map: map })
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
      markersRef.current = addMarkers(points, { map: map })
    }

    // 刷新列表
    setList(result)

    // 选中项
    if (nearbyRef.current) {
      // 滚动条置顶
      nearbyRef.current.querySelector('.mappage-nearby-main').scrollTop = 0

      // 选中附近推荐的选中项
      setTimeout(() => {
        // 清空选中项
        nearbyRef.current?.querySelector('.mappage-info-item.active')?.classList.remove('active')

        // 外层容器中查询附近推荐的选中项
        let container = nearbyRef.current?.closest('.mappage-info-card')
        let activeId = container.nearbyActive

        if (activeId) {
          for (let el of container.querySelectorAll('.mappage-info-item')) {
            if (el.getAttribute('data-nearby-item-id') === activeId) {
              el.classList.add('active')
            }
          }
        }
      }, 100)
    }
  }

  return (
    <div className={`mappage-nearby`} ref={nearbyRef}>
      <Toggle />
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
