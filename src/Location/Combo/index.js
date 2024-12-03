import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  Fragment
} from 'react'
import Modal from './../Modal'

// 测试使用
// import { locale, Input, Map } from 'seedsui-react'
// 内库使用
import Map from './../../Map'
import Input from './../../Input'
import locale from './../../locale'

const { getAddress: defaultGetAddress, getLocation: defaultGetLocation } = Map

// 定位控件
const LocationCombo = forwardRef(
  (
    {
      // 坐标类型
      type = 'gcj02',
      // 地图加载修改
      config = {
        // type类型 google, bmap, amap, 默认osm
        // key: '',
        // type: 'google'
        // 百度地图
        key: '',
        type: 'bmap'
      },
      // 获取定位和地址工具类
      getAddress,
      getLocation,
      // 显示定位按钮
      locationVisible = true,
      // 自动定位
      autoLocation = false,
      // 显示选择按钮
      chooseVisible = false,
      // 显示预览按钮
      previewVisible = false,
      // 提示信息配置
      failText = locale('定位失败, 请检查定位权限是否开启', 'SeedsUI_location_failed'),
      loadingText = locale('定位中...', 'SeedsUI_positioning'),

      // 点击整行触发的动作: location | choose | preview
      clickAction,
      disabled = false,
      editable = false,
      value, // {latitude: '纬度', longitude: '经度', value: '地址'}

      portal = document.getElementById('root') || document.body,
      onVisibleChange,
      onLocationStatusChange,
      onChange,
      onError,
      inputProps,

      // Modal
      ModalComponent,
      ModalProps,

      // Main
      MainComponent,
      MainProps,
      ...props
    },
    ref
  ) => {
    // 获取定位和地址工具类
    // eslint-disable-next-line
    if (typeof getAddress !== 'function') getAddress = defaultGetAddress
    // eslint-disable-next-line
    if (typeof getLocation !== 'function') getLocation = defaultGetLocation

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
      // eslint-disable-next-line
    }, [autoLocation])

    // 定位状态
    useEffect(() => {
      if (onLocationStatusChange) {
        onLocationStatusChange(locationStatus)
      }
      // eslint-disable-next-line
    }, [locationStatus])

    // 获取位置
    async function addAddress(value) {
      let newValue = value
      if (typeof newValue === 'object' && newValue?.longitude && newValue?.latitude) {
        let addrRes = await getAddress({
          ...newValue,
          type: type
        })
        if (addrRes?.address) {
          newValue = {
            ...newValue,
            ...addrRes
          }
        } else {
          newValue = locale('获取地址失败, 请稍后重试', 'SeedsUI_get_address_failed')
        }
      }
      return newValue
    }

    // 自动定位
    async function handleAutoLocation() {
      // 有经纬度, 补充address
      if (value && value.latitude && value.longitude) {
        // 有地址, 则定位完成
        if (value.value || value.address) {
          if (onChangeRef?.current) {
            onChangeRef.current(value)
          }
        }
        // 无地址, 则需要地址逆解析
        else {
          locationStatus = '-1'
          setLocationStatus('-1') // 定位中...

          let newValue = await addAddress(value)

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

        if (newValue.address && !newValue.value) {
          newValue.value = newValue.address
        }
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
        type: type
      })

      // 获取地址信息
      newValue = await addAddress(newValue)

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

    // Modal Render
    let ModalNode = Modal
    if (ModalComponent) {
      ModalNode = ModalComponent
    }

    return (
      <Fragment>
        <Input.Text
          readOnly={!editable}
          disabled={disabled}
          onClick={handleClick}
          onChange={(address, event) => {
            if (event?.action === 'clickClear') {
              if (onChange) onChange(null)
              return
            }
            let newValue = Object.clone(value)
            if (!newValue) {
              newValue = {}
            }
            newValue.value = address
            newValue.address = address
            if (onChange) onChange(newValue)
          }}
          // eslint-disable-next-line
          children={statusNode}
          value={value?.value || value?.address || ''}
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
        <ModalNode
          config={config}
          portal={portal}
          value={value}
          type={type}
          visible={modalVisible}
          onVisibleChange={setModalVisible}
          onChange={(newValue) => {
            // 选择地址后，更新显示状态
            if (newValue) {
              updateValue(newValue)
            }
            // 清空值
            else {
              onChange && onChange(null)
            }
          }}
          MainProps={MainProps}
          MainComponent={MainComponent}
          getAddress={getAddress}
          getLocation={getLocation}
          {...(ModalProps || {})}
        />
      </Fragment>
    )
  }
)

export default LocationCombo
