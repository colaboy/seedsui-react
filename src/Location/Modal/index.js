import React, { forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import addHistory from './addHistory'

import Main from './../Main'
import Footer from './Footer'

// 测试使用
// import Head from 'seedsui-react/lib/Picker/Modal/Head'
// import { locale, Toast, Loading, MapUtil, Layout, Modal } from 'seedsui-react'
// 内库使用
import locale from './../../locale'
import Toast from './../../Toast'
import Loading from './../../Loading'
import MapUtil from './../../MapUtil'
import Layout from './../../Layout'
import Modal from './../../Modal'
import Head from './../../Picker/Modal/Head'

// 地图标注
const LocationModal = forwardRef(
  (
    {
      ak,
      autoLocation,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value: originValue = null,
      onBeforeChange,
      onChange,

      // 弹窗类型: page页面; 其它弹窗(默认);
      modal,

      portal,
      // 预览方式: preview、choose
      visible,
      onVisibleChange,

      // 地图选择页面属性
      MainProps,
      ...props
    },
    ref
  ) => {
    // 经纬度
    let [value, setValue] = useState(originValue)

    // 加载中
    let [loaded, setLoaded] = useState(false)

    useEffect(() => {
      if (!visible) return
      // 无法使用地图
      if (!window.BMap && !ak) {
        Toast.show({ content: locale('请传入百度地图ak', 'hint_map_ak') })
        return
      }

      // 正确
      if (window.BMap) {
        // eslint-disable-next-line
        loaded = true
        setLoaded(true)
        addHistory({ modal, loaded })
        return
      }

      let loadErrMsg = locale('地图库加载失败, 请稍后再试', 'hint_map_failed_load')
      if (ak) {
        Loading.show()
        MapUtil.load({
          ak: ak,
          success: () => {
            Loading.hide()
            loaded = true
            setLoaded(true)
            addHistory({ modal, loaded })
          },
          fail: () => {
            Loading.hide()
            Toast.show({ content: loadErrMsg })
          }
        })
        return
      }
      Toast.show({ content: loadErrMsg })

      // eslint-disable-next-line
    }, [visible])

    // 页面模式: 路由监听
    useEffect(() => {
      if (modal !== 'page') return
      window.removeEventListener('popstate', handleBack, false)
      window.addEventListener('popstate', handleBack, false)

      return () => {
        window.removeEventListener('popstate', handleBack, false)
      }
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      setValue(originValue)
    }, [JSON.stringify(originValue)]) // eslint-disable-line

    // 返回路由监听
    function handleBack() {
      if (window.location.href.indexOf('modalPage=1') !== -1) {
        window.history.go(-1)
      }
      onVisibleChange && onVisibleChange(false)
    }

    // 点击确定和取消
    async function handleOk() {
      // 修改提示
      if (typeof onBeforeChange === 'function') {
        let goOn = await onBeforeChange(value)
        if (!goOn) return
      }

      onChange &&
        onChange({
          errMsg: value?.errMsg || '',
          latitude: value?.latitude || '',
          longitude: value?.longitude || '',
          title: value?.title || '',
          value: value?.value || ''
        })
      handleBack()
    }

    if (!loaded) return null

    // Page显示
    if (modal === 'page') {
      const PageNode = (
        <Layout
          ref={ref}
          className={`location-page${props?.className ? ' ' + props.className : ''}${
            visible ? '' : ' hide'
          }`}
          {...props}
        >
          {/* 内容 */}
          <Main
            ak={ak}
            type={visible}
            value={value}
            onChange={setValue}
            // 地图选择页面属性
            {...MainProps}
            // 底
            footerRender={() => {
              return visible === 'choose' ? (
                <Footer
                  onOk={handleOk}
                  onClear={() => {
                    value = null
                    setValue(null)
                    handleOk()
                  }}
                />
              ) : null
            }}
          />
        </Layout>
      )

      if (portal) {
        return createPortal(PageNode, portal)
      }

      return PageNode
    }

    return (
      <Modal
        ref={ref}
        portal={portal}
        visible={visible}
        onVisibleChange={onVisibleChange}
        style={{ height: '95%' }}
        {...props}
        animation="slideUp"
        className="location-modal"
      >
        {/* 头 */}
        <Head
          captionProps={{
            caption: locale('选择地址', 'picker_location_title')
          }}
          onSubmitClick={visible === 'choose' && value?.value ? handleOk : null}
          onCancelClick={handleBack}
        />
        {/* 内容 */}
        <Main
          ak={ak}
          autoLocation={autoLocation}
          type={visible}
          value={value}
          onChange={setValue}
          // 地图选择页面属性
          {...MainProps}
        />
      </Modal>
    )
  }
)

export default LocationModal
