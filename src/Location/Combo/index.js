import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Fragment
} from 'react'
import Modal from './../Modal'
import { getLocation } from './../Main/utils'

// 测试使用
// import { locale, Input, Bridge } from 'seedsui-react'
// 内库使用
import Input from './../../Input'
import Bridge from './../../Bridge'
import locale from './../../locale'

// 定位控件
const LocationCombo = forwardRef(
  (
    {
      cacheTime = 10000, // 经纬度缓存时效, 默认10秒
      ak, // 地图预览和选择地点时需要传入, 如果地图已经加载, 则不需要传入ak
      // 自定义地址逆解析
      geocoder,
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
      loadingText = locale('定位中...', 'positioning'),

      // 点击整行触发的动作: location | choose | preview
      clickAction,
      disabled = false,
      editable = false,
      value, // {latitude: '纬度', longitude: '经度', value: '地址'}

      // 弹窗类型: page页面; 其它弹窗(默认);
      modal,

      portal = document.getElementById('root') || document.body,
      onVisibleChange,
      onBeforeChange,
      onChange,
      onError,
      onClick,
      inputProps,

      // 地图选择页面属性
      MainProps = {},
      ...props
    },
    ref
  ) => {
    // 错误信息
    const errMsgRef = useRef(failText)

    // 定位状态, -1.定位中; 0.定位失败时隐藏text框, 显示定位中或者定位失败的div; 1定位成功显示文本框
    let [locationStatus, setLocationStatus] = useState('1')

    // 显示预览preview、选择choose
    const [modalVisible, setModalVisible] = useState('')

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

    // 显隐回调
    useEffect(() => {
      onVisibleChange && onVisibleChange(modalVisible)
      // eslint-disable-next-line
    }, [modalVisible])

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
        if (value.value) {
          // 有地址, 则定位完成
          if (onChangeRef?.current) {
            onChangeRef.current(value)
          }
        } else {
          // 无地址, 则需要地址逆解析
          locationStatus = '-1'
          setLocationStatus('-1') // 定位中...

          let newValue = await getLocation({
            geocoder: geocoder,
            latitude: value.latitude,
            longitude: value.longitude
          })

          updateValue(newValue)
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

      // 禁用
      if (disabled) {
        return
      }

      // 点击输入
      if (editable) {
        if (locationStatus === '0') {
          // 非只读状态下, 点击错误面板, 允许手动输入位置
          locationStatus = '1'
          setLocationStatus('1')
        }
        return
      }

      // 点击整行定位
      if (clickAction === 'location') {
        handleLocation(e)
        return
      }

      // 点击整行预览或选点
      if (clickAction) {
        setModalVisible(clickAction)
        return
      }
    }

    // Update new value
    function updateValue(newValue) {
      // 定位失败
      if (!newValue || typeof newValue === 'string') {
        errMsgRef.current = typeof newValue === 'string' ? newValue : failText
        if (onErrorRef?.current) {
          onErrorRef.current({
            errMsg: `getLocation:fail${errMsgRef.current}`
          })
        }
        locationStatus = '0'
        setLocationStatus('0')
        // 回调onChange
        onChangeRef?.current && onChangeRef.current(null)
      }
      // 定位成功
      else {
        locationStatus = '1'
        setLocationStatus('1')
        // 回调onChange
        onChangeRef?.current && onChangeRef.current(newValue)
      }
    }

    // 定位, isAutoLocation表示初始化时自动定位
    async function handleLocation(e) {
      if (e) {
        e.stopPropagation()
      }
      // 定位中...
      locationStatus = '-1'
      setLocationStatus('-1')

      // 开始定位
      let newValue = await getLocation({
        cacheTime: cacheTime,
        geocoder: geocoder
      })

      updateValue(newValue)
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
            className={`ricon location-combo-icon location-combo-icon-choose${
              modalVisible === 'choose' ? ' active' : ''
            }`}
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
            className={`ricon location-combo-icon location-combo-icon-preview${
              modalVisible === 'preview' ? ' active' : ''
            }`}
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
            className={`ricon location-combo-icon location-combo-icon-location${
              locationStatus === '-1' ? ' active' : ''
            }`}
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
          {errMsgRef.current}
        </div>
      )
    }

    return (
      <Fragment>
        <Input.Text
          readOnly={!editable}
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
          // eslint-disable-next-line
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
          ref={rootRef}
        />
        {/* 地图预览与选择 */}
        <Modal
          ak={ak}
          portal={portal}
          value={value}
          modal={modal}
          visible={modalVisible}
          onVisibleChange={setModalVisible}
          onBeforeChange={onBeforeChange}
          onChange={updateValue}
          MainProps={MainProps}
          cacheTime={cacheTime}
          geocoder={geocoder}
        />
      </Fragment>
    )
  }
)

export default LocationCombo
