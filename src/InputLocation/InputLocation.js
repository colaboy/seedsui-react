import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useState,
  useEffect,
  Fragment
} from 'react'
import InputText from './../InputText'
import Bridge from './../Bridge'
import MapView from './../MapView'
import MapChoose from './../MapChoose'
import Context from '../Context/instance.js'

// 定位超时setTimeout指针
let getLocationTimeout = null
// 地图预览数据
let viewMapData = null

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const InputLocation = forwardRef(
  (
    {
      cacheTime = 10000, // 经纬度缓存时效, 默认10秒
      timeout, // 定位超时
      ak, // 地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak
      loadingValue,
      failedValue,
      readOnly, // 无: 点击整行定位; false: 允许手动修改位置信息; true: 只读,点击无效;
      autoLocation, // 自动定位, 选点模式不支持自动定位
      onClick,
      onChange,
      clear,
      clearReadOnly,
      type = 'location', // location: 点击定位当前位置, choose: 点击选择地点
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      onPreviewHide,
      // 显隐路由
      routePath = 'componentPage=1',
      value, // {latitude: '纬度', longitude: '经度', address:'地址', value: ''}
      ...others
    },
    ref
  ) => {
    // 国际化
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }
    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onChangeRef = useRef()
    onChangeRef.current = onChange
    const onPreviewRef = useRef()
    onPreviewRef.current = preview

    // 返回的dom
    const inputTextRef = useRef(null)
    useImperativeHandle(ref, () => {
      return inputTextRef.current
    })

    // 地图预览
    const [viewMapShow, setViewMapShow] = useState(false)
    
    // 自动定位
    useEffect(() => {
      handleAutoLocation()
    }, [autoLocation])
    if (!loadingValue || typeof loadingValue !== 'string') {
      loadingValue = locale('定位中...', 'location')
    }
    if (!failedValue || typeof failedValue !== 'string') {
      failedValue = locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed')
    }

    // 自动定位
    async function handleAutoLocation() {
      if (autoLocation !== true) return
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
        location({
          target: inputTextRef.current,
          currentTarget: inputTextRef.current
        })
      }
    }

    

    let [status, setStatus] = useState('1') // 定位状态, -1.定位中 0.定位失败时隐藏text框, 显示定位中或者定位失败的div, 1定位成功显示文本框
    function handleClick(event, val) {
      var e = event.nativeEvent
      // 触发点击事件
      if (onClick) {
        onClick(e, val)
      }

      // 正在定位不允许操作
      if (status === '-1') {
        return
      }
      // 定位按钮
      if (e.target.classList.contains('input-location-icon')) {
        location(e)
        return
      }
      // 清除按钮
      if (e.target.classList.contains('clearicon')) {
        return
      }
      // 预览
      if (val && (type === 'choose' || onPreviewRef.current)) {
        if (value && value.longitude && value.latitude) {
          viewMapData = {
            point: [value.longitude, value.latitude],
            address: value.address
          }
          openPreview()
        } else {
          if (typeof onPreviewRef.current === 'function') {
            onPreviewRef.current(e, {
              errMsg: `preview:fail${locale('坐标不正确, 预览失败', 'hint_location_preview_fail')}`
            })
          }
        }
        return
      }

      // 编辑状态下仅允许点击右边图标定位
      if (readOnly === false) {
        if (status === '0') {
          // 非只读状态下, 点击错误面板, 允许手动输入位置
          status = '1'
          setStatus('1')
        }
        return
      }

      // 非编辑状态下点击整行定位
      location(e)
    }

    // 定位, isAutoLocation表示初始化时自动定位
    function location(e) {
      // 如果type为choose为选择定位
      // if (!isAutoLocation && type === 'choose') {
      //   openPreview()
      //   return
      // }
      // 定位中...
      status = '-1'
      setStatus('-1')
      // 定位超时处理
      if (!isNaN(timeout)) {
        if (Number(timeout) < 1000) {
          console.warn('InputLocation: 超时参数timeout不能小于1000毫秒')
        } else {
          if (getLocationTimeout) window.clearTimeout(getLocationTimeout)
          getLocationTimeout = setTimeout(() => {
            if (status === '-1') {
              if (onChangeRef && onChangeRef.current)
                onChangeRef.current(e, {
                  errMsg: `getLocation:fail${locale('定位超时', 'hint_location_timeout')} Timeout`
                })
              status = '0'
              setStatus('0')
            }
          }, timeout)
        }
      }
      // 开始定位
      Bridge.getLocation({
        cacheTime: cacheTime,
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

    // 显示h5预览
    function openPreview() {
      setViewMapShow(true)
      // 增加历史记录
      Bridge.addHistoryBack(() => {
        closePreview('history')
      }, routePath)
      // 预览回调
      if (typeof onPreviewRef.current === 'function')
        onPreviewRef.current({ target: inputTextRef.current }, value)
    }
    // 关闭h5预览, [closeType] history: 地址栏返回; 其它: 主动隐藏;
    function closePreview(closeType) {
      if (window.location.href.indexOf(routePath) !== -1) {
        window.history.go(-1)
      } else {
        setViewMapShow(false)
        if (onPreviewHide) onPreviewHide(closeType)
      }
    }
    // 地图选点
    function handleChoose(e, val, data) {
      closePreview('history')
      const address = data && data.address ? data.address : ''
      data.value = address
      data.errMsg = 'getLocation:ok'
      if (onChangeRef && onChangeRef.current)
        onChangeRef.current({ target: inputTextRef.current }, data)
    }

    // 计算class, 防止重要class被覆盖
    let inputClassName = (others.inputAttribute || {}).className || ''
    let riconClassName = (others.riconAttribute || {}).className
    if (riconClassName === undefined) {
      riconClassName = `input-location-icon size24 ${
        type === 'choose' ? 'input-location-icon-choose' : 'input-location-icon-location'
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
          {loadingValue}
        </div>
      )
    } else if (status === '0') {
      statusDOM = (
        <div
          className={`input-text ${inputClassName} input-location-error`}
          style={(others.inputAttribute || {}).style || {}}
        >
          {failedValue}
        </div>
      )
    }
    return (
      <Fragment>
        <InputText
          ref={inputTextRef}
          readOnly={!readOnly && readOnly !== false ? true : readOnly} // 不填写readOnly则认为文本框不允许输入, 只有readOnly为false时才允许输入
          onClick={handleClick}
          onChange={onChange}
          children={statusDOM}
          value={value && typeof value === 'object' ? value.value || '' : value || ''}
          clear={clear}
          clearReadOnly={clearReadOnly}
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
        {type !== 'choose' && (
          <MapView
            ak={ak}
            show={viewMapShow}
            header={
              viewMapData && viewMapData.address ? (
                <div className="map-bar border-b">{viewMapData.address}</div>
              ) : null
            }
            points={viewMapData && viewMapData.point ? [viewMapData.point] : null}
            portal={context.portal || document.getElementById('root') || document.body}
            onHide={closePreview}
          />
        )}
        {type === 'choose' && (
          <MapChoose
            ak={ak}
            show={viewMapShow}
            autoLocation
            point={viewMapData && viewMapData.point ? viewMapData.point : null}
            address={viewMapData && viewMapData.address ? viewMapData.address : null}
            portal={context.portal || document.getElementById('root') || document.body}
            onHide={closePreview}
            onChange={handleChoose}
          />
        )}
      </Fragment>
    )
  }
)

export default InputLocation
