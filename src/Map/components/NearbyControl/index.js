import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react'
import queryNearby from './../../utils/queryNearby'
import tabs from './keywords'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

// 测试使用
// import { Loading, Toast } from 'seedsui-react'
// 内库使用
import Toast from './../../../Toast'
import Loading from './../../../Loading'

// 附近推荐
function Nearby({ map, longitude, latitude, radius, onChange }, ref) {
  // 容器
  const nearbyRef = useRef(null)

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
    if (!tab?.name) return

    loadData()
    // eslint-disable-next-line
  }, [tab, longitude, latitude, radius])

  // 获取附近的点
  async function loadData() {
    Loading.show()
    let result = await queryNearby({
      map: map.currentMap,
      keyword: tab.id || tab.name,
      longitude: longitude,
      latitude: latitude,
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

      // 选中附近推荐的选中项
      setTimeout(() => {
        // 清空选中项
        nearbyRef.current
          ?.querySelector('.map-nearbyControl-item.active')
          ?.classList.remove('active')

        // 外层容器中查询附近推荐的选中项
        let container = nearbyRef.current?.closest('.map-nearbyControl')
        if (!container) return

        let activeId = container.nearbyActive

        if (activeId) {
          for (let el of container.querySelectorAll('.map-nearbyControl-item')) {
            if (el.getAttribute('data-nearby-item-id') === activeId) {
              el.classList.add('active')
            }
          }
        }
      }, 100)
    }
  }

  return (
    <div className={`map-nearbyControl`} ref={nearbyRef}>
      <Toggle />
      <div className={`map-nearbyControl-body`}>
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
