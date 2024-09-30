import React, { forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import addHistory from './addHistory'
import { getLocation } from './../Main/utils'

import Main from './../Main'
import Footer from './Footer'

// 测试使用
// import Head from 'seedsui-react/lib/Modal/Picker/Head'
// import { locale, Toast, Loading, MapUtil, Layout, Modal } from 'seedsui-react'
// 内库使用
import locale from './../../locale'
import Toast from './../../Toast'
import Loading from './../../Loading'
import MapUtil from './../../MapUtil'
import Layout from './../../Layout'
import Modal from './../../Modal'
import Head from './../../Modal/Picker/Head'

// 地图标注
const LocationModal = forwardRef(
  (
    {
      ak,
      autoLocation,
      // 值: {latitude: '纬度', longitude: '经度', value: '地址'}
      value: originValue = null,
      onChange,
      geocoder,

      // 弹窗类型: page页面; 其它弹窗(默认);
      modal,

      portal,
      // 预览方式: preview、choose
      visible,
      onVisibleChange,

      // Main
      MainComponent,
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
        Toast.show({ content: locale('请传入百度地图ak', 'SeedsUI_no_bdmap_ak') })
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

      let loadErrMsg = locale('地图库加载失败, 请稍后再试', 'SeedsUI_map_js_load_failed')
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
      // 格式化数据
      Loading.show()

      // 修改
      if (value) {
        value = await getLocation({ geocoder, ...value })
      }

      Loading.hide()
      onChange && onChange(value)
      handleBack()
    }

    if (!loaded) return null

    // Page显示
    if (modal === 'page') {
      const PageNode = (
        <Layout
          ref={ref}
          safeArea
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
            geocoder={geocoder}
            // 地图选择页面属性
            {...(MainProps || {})}
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

    // Main Render
    let MainNode = Main
    if (MainComponent) {
      MainNode = MainComponent
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
            caption:
              visible === 'choose'
                ? locale('选择地址', 'SeedsUI_choose_address')
                : locale('查看地址', 'SeedsUI_view_address')
          }}
          onSubmitClick={visible === 'choose' && value?.value ? handleOk : null}
          onCancelClick={handleBack}
        />
        {/* 内容 */}
        <MainNode
          ak={ak}
          autoLocation={autoLocation}
          type={visible}
          value={value}
          onChange={setValue}
          geocoder={geocoder}
          // 地图选择页面属性
          {...(MainProps || {})}
        />
      </Modal>
    )
  }
)

export default LocationModal
