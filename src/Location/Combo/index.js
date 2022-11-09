import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Fragment
} from 'react'
import Input from './../../Input'
import Bridge from './../../Bridge'
import locale from './../../locale'
import Modal from './../Modal'
import Utils from './Utils'

// 定位控件
const LocationCombo = forwardRef(
  (
    {
      cacheTime = 10000, // 经纬度缓存时效, 默认10秒
      timeout, // 定位超时
      ak, // 地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak
      // 显示定位按钮
      locationVisible = true,
      // 自动定位
      autoLocation = false,
      // 显示选择按钮
      chooseVisible = false,
      // 显示预览按钮
      previewVisible = false,
      // 提示信息配置
      failText = locale('定位失败, 请检查定位权限是否开启', 'hint_location_failed'),
      loadingText = locale('定位中...', 'location'),

      readOnly = true,
      disabled = false,
      value, // {latitude: '纬度', longitude: '经度', address:'地址', value: ''}

      onChange,
      onError,
      onClick,
      inputProps,
      ...props
    },
    ref
  ) => {
    // 显示预览preview、选择choose
    const [modalVisible, setModalVisible] = useState('')
    // 定位状态, -1.定位中; 0.定位失败时隐藏text框, 显示定位中或者定位失败的div; 1定位成功显示文本框
    let [locationStatus, setLocationStatus] = useState('1')

    const onChangeRef = useRef()
    onChangeRef.current = onChange
    const onErrorRef = useRef()
    onErrorRef.current = onError

    // 节点
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef?.current?.getRootDOM ? rootRef.current.getRootDOM() : rootRef?.current,
        getRootDOM: () => {
          // div
          let rootDOM = rootRef?.current
          // Input.Text
          if (rootRef?.current?.getRootDOM) {
            rootDOM = rootRef.current.getRootDOM()
          }
          return rootDOM
        }
      }
    })

    // 自动定位
    useEffect(() => {
      if (autoLocation !== true) return
      handleAutoLocation()
    }, [autoLocation]) // eslint-disable-line

    // 自动定位
    async function handleAutoLocation() {
      // 有经纬度, 补充address
      if (value && value.latitude && value.longitude) {
        // 默认地址
        if (value.address) {
          // 有地址, 则定位完成
          if (onChangeRef?.current) {
            onChangeRef.current(value)
          }
        } else {
          // 无地址, 则需要地址逆解析
          locationStatus = '-1'
          setLocationStatus('-1') // 定位中...
          const result = await Bridge.getAddress({
            // 只支持gcj02
            latitude: value.latitude,
            longitude: value.longitude
          })
          const address = result && result.address ? result.address : ''
          result.value = address
          if (address) {
            locationStatus = '1'
            setLocationStatus('1')
            // 回调onChange
            if (onChangeRef?.current) {
              onChangeRef.current(result)
            }
          } else {
            locationStatus = '0'
            setLocationStatus('0')
          }
        }
      }
      // 定位并获取地址
      else {
        handleLocation()
      }
    }

    // 点击文本框
    function handleClick(e) {
      e.stopPropagation()
      if (onClick) onClick(e)
      // 正在定位不允许操作
      if (locationStatus === '-1') {
        return
      }

      // 点击输入
      if (!readOnly) {
        if (locationStatus === '0') {
          // 非只读状态下, 点击错误面板, 允许手动输入位置
          locationStatus = '1'
          setLocationStatus('1')
        }
        return
      }

      // 点击整行定位
      if (readOnly && locationVisible) {
        handleLocation(e)
        return
      }

      // 点击整行预览
      if (readOnly && previewVisible) {
        setModalVisible('preview')
        return
      }
    }

    // 定位, isAutoLocation表示初始化时自动定位
    function handleLocation(e) {
      if (e) {
        e.stopPropagation()
      }
      // 定位中...
      locationStatus = '-1'
      setLocationStatus('-1')
      // 定位超时处理
      if (typeof timeout === 'number') {
        if (Number(timeout) < 1000) {
          console.warn('InputLocation: 超时参数timeout不能小于1000毫秒')
        } else {
          if (rootRef.current.locationTimeout) window.clearTimeout(rootRef.current.locationTimeout)
          rootRef.current.locationTimeout = setTimeout(() => {
            if (locationStatus === '-1') {
              if (onChangeRef?.current) {
                onChangeRef.current(null)
              }
              if (onErrorRef?.current) {
                onErrorRef.current({
                  errMsg: `getLocation:fail${locale('定位超时', 'hint_location_timeout')}`
                })
              }
              locationStatus = '0'
              setLocationStatus('0')
            }
          }, timeout)
        }
      }
      // 开始定位
      Utils.getLocation({
        cacheTime: cacheTime,
        onChange: (newValue) => {
          // 定位超时后不再执行回调
          if (locationStatus === '0') {
            console.log('定位超时, 不再执行成功回调')
            return
          }
          // 定位失败
          if (!newValue) {
            if (onErrorRef?.current) {
              onErrorRef.current({
                errMsg: `getLocation:fail${failText}`
              })
            }
            locationStatus = '0'
            setLocationStatus('0')
          }
          // 定位成功
          else {
            locationStatus = '1'
            setLocationStatus('1')
          }

          // 回调onChange
          if (onChangeRef?.current) {
            onChangeRef.current(newValue)
          }
        }
      })
    }

    // 定位和选择按钮
    function getRiconNode() {
      if (disabled) return null
      let riconNode = []
      // 显示选择
      if (chooseVisible) {
        riconNode.push(
          <i
            key="choose"
            className="ricon icon location-combo-icon size24 location-combo-icon-choose"
            onClick={(e) => {
              e.stopPropagation()
              setModalVisible('choose')
            }}
          ></i>
        )
      }
      // 显示预览
      if (previewVisible) {
        riconNode.push(
          <i
            key="preview"
            className="ricon icon location-combo-icon size24 location-combo-icon-choose"
            onClick={(e) => {
              e.stopPropagation()
              setModalVisible('preview')
            }}
          ></i>
        )
      }
      // 显示定位
      if (locationVisible) {
        riconNode.push(
          <i
            key="location"
            className="ricon icon location-combo-icon size24 location-combo-icon-location"
            onClick={handleLocation}
          ></i>
        )
      }
      return riconNode
    }

    // 加载和错误面板, 显示这些面板时将会隐藏文本框, 样式必须与文本框一致
    let statusNode = null
    if (locationStatus === '-1') {
      statusNode = (
        <div
          className={`input-text ${inputProps?.className || ''} location-combo`}
          style={inputProps?.style || {}}
        >
          {loadingText}
        </div>
      )
    } else if (locationStatus === '0') {
      statusNode = (
        <div
          className={`input-text ${inputProps?.className || ''} location-combo-error`}
          style={inputProps?.style || {}}
        >
          {failText}
        </div>
      )
    }

    return (
      <Fragment>
        <Input.Text
          ref={rootRef}
          readOnly={readOnly}
          disabled={disabled}
          onClick={handleClick}
          onChange={(address) => {
            let newValue = Object.clone(value)
            if (!newValue) {
              newValue = {}
            }
            newValue.value = address
            if (onChange) onChange(newValue)
          }}
          children={statusNode}
          value={value && typeof value === 'object' ? value?.value || '' : value || ''}
          {...props}
          ricon={<>{getRiconNode()}</>}
          inputProps={Object.assign({}, inputProps, {
            // 定位中和定位失败时隐藏text框, 显示定位中或者定位失败的div
            visible: statusNode ? false : true,
            className:
              'location-combo-success' + (inputProps?.className ? '' + inputProps?.className : '')
          })}
        />
        {/* 地图预览与选择 */}
        <Modal
          value={value}
          visible={modalVisible}
          onVisibleChange={() => setModalVisible('')}
          onChange={(newValue) => {
            if (newValue.address && onChangeRef?.current) {
              onChangeRef.current(newValue)
            }
          }}
        />
      </Fragment>
    )
  }
)

export default LocationCombo
