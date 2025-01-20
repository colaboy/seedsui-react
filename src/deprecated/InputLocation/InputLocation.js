import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Fragment
} from 'react'
import InputText from './../InputText'
import Bridge from './../../utils/Bridge'
import locale from './../locale'

import Map from './Map'

// 定位超时setTimeout指针
let getLocationTimeout = null
// 地图预览数据
let viewMapData = null

/* 默认配置 */
// 非只读配置
let editConfigDefault = {
  type: 'location', // 背景定位location|选择定位choose
  editable: false, // 可修改文字true|不可修改文字false
  autoLocation: false, // 自动定位, 选点模式不支持自动定位
  clear: null // 清空回调
}

// 文本框中提示信息配置
let messageDefault = {
  // 定位时文案
  loading: locale('定位中...', 'SeedsUI_positioning'),
  // 失败时文案
  failed: locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed')
}

// 定位控件
/**
 * @deprecated since version 5.2.8
 * 请使用Location.Combo
 */
const InputLocation = forwardRef(
  (
    {
      timeout, // 定位超时
      ak, // 地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak
      // 非只读配置
      editConfig,
      // 提示信息配置
      message,
      // 预览
      preview = {
        title: '',
        onVisibleChange: null
      },
      /*
      显示或隐藏预览 boolean|func, 默认true,
      func(e, value)
      e:{
        currentTarget: div.input-text-box
        target: div.input-text-box
        type: "choose|preview"
        visible: false|true
      }
      value: 同传入的value
      */
      readOnly = false, // false: 使用editConfig;
      onClick,
      onChange,
      // 地图页面属性
      mapPageProps,
      // 显隐路由
      routePath = 'componentPage=1',
      value, // {latitude: '纬度', longitude: '经度', address:'地址', value: ''}
      ...others
    },
    ref
  ) => {
    // 定位状态, -1.定位中 0.定位失败时隐藏text框, 显示定位中或者定位失败的div, 1定位成功显示文本框
    let [status, setStatus] = useState('1')
    // 地图预览
    const [viewMapVisible, setViewMapVisible] = useState(false)

    // 存储原标题
    const titleRef = useRef(null)

    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onChangeRef = useRef()
    onChangeRef.current = onChange
    const onPreviewRef = useRef()
    onPreviewRef.current = preview?.onVisibleChange || null

    /* 默认配置 */
    // 非只读配置

    // eslint-disable-next-line
    editConfig = {
      ...editConfigDefault,
      ...(editConfig || {})
    }
    // 提示信息配置
    if (Object.prototype.toString.call(message) === '[object Object]') {
      for (let msg in messageDefault) {
        if (typeof message[msg] !== 'string') {
          message[msg] = messageDefault[msg]
        }
      }
    } else {
      // eslint-disable-next-line
      message = messageDefault
    }

    // 返回的dom
    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })

    // 页面初始化获取标题
    useEffect(() => {
      titleRef.current = document.title
    }, []) // eslint-disable-line

    // 自动定位
    useEffect(() => {
      if (readOnly) return
      if (editConfig?.autoLocation !== true) return
      handleAutoLocation()
      // eslint-disable-next-line
    }, [readOnly])

    // 返回
    function handlePop() {
      handleClosePreview()
      // 返回后允许关闭webview
      window.onHistoryBack = null
      window.removeEventListener('popstate', handlePop, false)
    }

    // 自动定位
    async function handleAutoLocation() {
      if (editConfig?.autoLocation !== true) return
      // 自动定位
      if (value && value.latitude && value.longitude) {
        // 默认地址
        if (value.address) {
          // 有地址, 则定位完成
          if (onChangeRef && onChangeRef.current)
            onChangeRef.current({ target: inputTextRef.current }, value)
        } else {
          // 无地址, 则需要地址逆解析
          status = '-1'
          setStatus('-1') // 定位中...
          const result = await Bridge.getAddress({
            // 只支持gcj02
            latitude: value.latitude,
            longitude: value.longitude
          })
          const address = result && result.address ? result.address : ''
          result.value = address
          if (address) {
            status = '1'
            setStatus('1')
            // 回调onChange
            if (onChangeRef && onChangeRef.current)
              onChangeRef.current({ target: inputTextRef.current }, result)
            // 自动定位设置选择地图的数据
            viewMapData = {
              point: [result.longitude, result.latitude],
              address: result.address
            }
          } else {
            status = '0'
            setStatus('0')
          }
        }
      } else {
        handleLocation({
          target: inputTextRef.current,
          currentTarget: inputTextRef.current
        })
      }
    }

    // 点击文本框
    function handleClick(event, val) {
      let e = event.nativeEvent

      // 正在定位不允许操作
      if (status === '-1') {
        return
      }

      // 点击输入
      if (!readOnly && editConfig.editable) {
        if (status === '0') {
          // 非只读状态下, 点击错误面板, 允许手动输入位置
          // eslint-disable-next-line
          status = '1'
          setStatus('1')
        }
        return
      }

      // 触发点击事件
      if (onClick) {
        onClick(e, val)
      }
      // 定位按钮
      if (
        e.target.classList.contains('input-location-icon') &&
        !e.target.classList.contains('input-location-icon-choose')
      ) {
        handleLocation(e)
        return
      }
      // 清除按钮
      if (e.target.classList.contains('clearicon')) {
        return
      }
      // 预览
      if (readOnly && preview) {
        handlePreview()
        return
      }
      // 地图选点
      if (!readOnly && editConfig?.type === 'choose') {
        handlePreview()
        return
      }

      // 点击整行定位
      handleLocation(e)
    }

    // 定位, isAutoLocation表示初始化时自动定位
    function handleLocation(e) {
      // 定位中...
      status = '-1'
      setStatus('-1')
      // 定位超时处理
      if (typeof timeout === 'number') {
        if (Number(timeout) < 1000) {
          console.warn('InputLocation: 超时参数timeout不能小于1000毫秒')
        } else {
          if (getLocationTimeout) window.clearTimeout(getLocationTimeout)
          getLocationTimeout = setTimeout(() => {
            if (status === '-1') {
              if (onChangeRef && onChangeRef.current)
                onChangeRef.current(e, {
                  errMsg: `getLocation:fail${locale(
                    '定位超时',
                    'SeedsUI_location_overtime_error'
                  )} Timeout`
                })
              status = '0'
              setStatus('0')
            }
          }, timeout)
        }
      }
      // 开始定位
      Bridge.getLocation({
        type: 'gcj02',
        success: async (data) => {
          // 定位超时后不再执行回调
          if (status === '0') {
            console.log('定位超时, 不再执行成功回调')
            return
          }
          // 客户端中不需要再getAddress
          if (data.address) {
            // 赋值
            if (onChange) {
              data.value = data.address
              if (onChangeRef && onChangeRef.current) onChangeRef.current(e, data)
              status = '1'
              setStatus('1')
              // 自动定位设置选择地图的数据
              viewMapData = {
                point: [data.longitude, data.latitude],
                address: data.address
              }
            }
            return
          }
          let result = await Bridge.getAddress({
            // 只支持gcj02
            latitude: data.latitude,
            longitude: data.longitude
          })
          result = { ...data, ...result }
          const address = result && result.address ? result.address : ''
          result.value = address
          if (onChangeRef && onChangeRef.current) onChangeRef.current(e, result)
          if (address) {
            status = '1'
            setStatus('1')
            // 自动定位设置选择地图的数据
            viewMapData = {
              point: [data.longitude, data.latitude],
              address: address
            }
          } else {
            status = '0'
            setStatus('0')
          }
        },
        fail: (res) => {
          // 定位超时后不再执行回调
          if (status === '0') {
            console.log('定位超时, 不再执行失败回调')
            return
          }
          // 赋值
          if (onChangeRef && onChangeRef.current) onChangeRef.current(e, res)
          status = '0'
          setStatus('0')
        }
      })
    }

    // 修改标题
    function handleTitle(e) {
      // 设置标题
      if (preview.title) {
        if (e.visible === true) {
          Bridge.setTitle({
            title: preview.title
          })
        } else {
          Bridge.setTitle({
            title: titleRef.current
          })
        }
      }
    }

    // 显示或隐藏预览
    function handlePreview(visible) {
      // event
      let e = {
        target: inputTextRef.current,
        currentTarget: inputTextRef.current,
        visible: visible === false ? false : true
      }

      // 预览类型
      if (readOnly) {
        e.type = 'preview'
      } else {
        e.type = 'choose'
      }

      // 预览回调
      let onPreview = null
      if (typeof onPreviewRef.current === 'function') {
        onPreview = onPreviewRef.current
      }

      // 隐藏预览回调
      if (e.visible === false) {
        // 修改标题
        handleTitle(e)
        if (onPreview) onPreview(e)
        return
      }

      // 预览
      if (value && value.longitude && value.latitude) {
        viewMapData = {
          point: [value.longitude, value.latitude],
          address: value.address
        }
        setViewMapVisible(true)

        // 增加历史记录
        if (routePath) {
          // 阻止关闭webview
          window.onHistoryBack = () => {}

          // 路径增加routePath
          let path = window.location.href
          path += `${path.indexOf('?') === -1 ? '?' : '&'}${routePath}`

          // 增加历史记录
          window.history.pushState(
            {
              href: path
            },
            document.title,
            path
          )

          window.removeEventListener('popstate', handlePop, false)
          window.addEventListener('popstate', handlePop, false)
        }

        // 预览回调
        handleTitle(e)
        if (onPreview) {
          onPreview(e, value)
        }
      }
      // 无法预览
      else {
        // 编辑状态下没有值先定位
        if (!readOnly) {
          handleLocation(e)
          return
        }
        // 预览出错
        if (onPreview) {
          onPreview(e, {
            errMsg: `preview:fail${locale(
              '坐标不正确, 预览失败',
              'SeedsUI_location_preview_failed'
            )}`
          })
        }
      }
    }

    // 关闭h5预览
    function handleClosePreview() {
      // 已经返回, 路由却没变
      if (window.location.href.indexOf(routePath) !== -1) {
        window.history.go(-1)
        return
      }

      // 隐藏预览
      setViewMapVisible(false)

      // 预览回调
      handlePreview(false)
    }

    // 地图选点
    function handleChoose(e, val, data) {
      handleClosePreview()
      const address = data && data.address ? data.address : ''
      data.value = address
      data.errMsg = 'getLocation:ok'
      if (onChangeRef && onChangeRef.current) {
        onChangeRef.current({ target: inputTextRef.current }, data)
      }
    }

    // 计算class, 防止重要class被覆盖
    let inputClassName = (others.inputAttribute || {}).className || ''
    let riconClassName = (others.riconAttribute || {}).className
    if (riconClassName === undefined) {
      riconClassName = `input-location-icon size24 ${
        editConfig?.type === 'choose'
          ? 'input-location-icon-choose'
          : 'input-location-icon-location'
      }`
    }
    // 加载和错误面板, 显示这些面板时将会隐藏文本框, 样式必须与文本框一致
    let statusDOM = null
    if (status === '-1') {
      statusDOM = (
        <div
          className={`input-text ${inputClassName} input-location`}
          style={(others.inputAttribute || {}).style || {}}
        >
          {message?.loading || ''}
        </div>
      )
    } else if (status === '0') {
      statusDOM = (
        <div
          className={`input-text ${inputClassName} input-location-error`}
          style={(others.inputAttribute || {}).style || {}}
        >
          {message.failed}
        </div>
      )
    }

    // 文本是否允许修改
    let inputReadOnly = true
    if (!readOnly && editConfig?.editable) {
      inputReadOnly = false
    }
    // 文本框是否允许清空
    let inputClear = false
    if (!readOnly && editConfig?.clear) {
      inputClear = true
    }
    return (
      <Fragment>
        <InputText
          ref={inputTextRef}
          readOnly={inputReadOnly}
          onClick={handleClick}
          onChange={onChange}
          // eslint-disable-next-line
          children={statusDOM}
          value={value && typeof value === 'object' ? value.value || '' : value || ''}
          clearReadOnly={inputClear}
          {...others}
          riconAttribute={
            readOnly
              ? null
              : Object.assign({}, others.riconAttribute, {
                  className: `${
                    status === '-1'
                      ? riconClassName + ' input-location-icon-active'
                      : riconClassName
                  }`
                })
          }
          inputAttribute={Object.assign({}, others.inputAttribute, {
            className: statusDOM
              ? 'hide-important input-location-success ' + inputClassName
              : 'input-location-success ' + inputClassName
          })} // 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
        />
        {preview || editConfig?.type === 'choose' ? (
          <Map
            // 地图选择参数
            readOnly={readOnly}
            type={editConfig?.type || ''}
            onChange={handleChoose}
            // 预览地图参数
            ak={ak}
            show={viewMapVisible}
            viewMapData={viewMapData}
            onHide={handleClosePreview}
            mapPageProps={mapPageProps}
          />
        ) : null}
      </Fragment>
    )
  }
)

export default InputLocation
