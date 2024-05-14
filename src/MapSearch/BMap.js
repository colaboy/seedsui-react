import React, { useEffect, useRef } from 'react'
import MapUtil from './../../MapUtil'
import Notice from './../../Notice'
import locale from './../../locale'
import helper from './helper'

const BMap = ({ errMsg, changeState, list = [], defaultChecked, onMapClose, callback }) => {
  const refWrapperEl = useRef(null)

  useEffect(() => {
    MapUtil.load({
      ak: '3pTjiH1BXLjASHeBmWUuSF83',
      success: () => {
        initData()
      },
      fail: () => {
        changeState &&
          changeState({
            errMsg: locale('地图库加载失败，请稍后再试！', 'SeedsUI_map_js_load_failed')
          })
      }
    })
  }, []) // eslint-disable-line

  const onMapLocation = () => {
    helper.location(callback)
  }

  function initData() {
    if (!window.BMap) {
      // 如果有高德地图, 则加上 || !window.AMap
      changeState({
        errMsg: locale('地图库加载失败，请稍后再试！', 'SeedsUI_map_js_load_failed')
      })
      return
    }
    if (!refWrapperEl.current) {
      changeState({
        errMsg: locale('地图容器不存在', 'SeedsUI_no_mapcontainer_error')
      })
      return
    }
    helper.initMap(
      refWrapperEl.current,
      { defaultChecked, onMapClose, onMapLocation, list },
      callback
    )
  }

  useEffect(() => {
    if (helper.init && list) {
      helper.drawMap(list)
    }
  }, [list]) // eslint-disable-line

  return (
    <div>
      <div className="map-container" ref={refWrapperEl}></div>
      {errMsg && <Notice caption={errMsg} />}
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export default React.memo(BMap, areEqual)
