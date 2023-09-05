import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'
import BridgeBrowser from './../Bridge/browser'
import locale from './../locale'

let loaded = 0 // eslint-disable-line

const Vott = forwardRef(
  (
    {
      src,
      data = [],
      params = {}, // 设置实例化参数
      // data = {
      //   polygon: [ // 逆时针
      //     [x2, y1], // 右上
      //     [x1, y1], // 左上
      //     [x1, y2], // 左下
      //     [x2, y2], // 右下
      //   ],
      //   style: '',
      //   className: '',
      //   id: '',
      //   ...
      // }
      // params = {
      //   shapeAttributes: '形状属性'
      // }
      readOnly = true, // 是否只读
      preview = true, // 是否支持单击预览, readOnly为true时才生效
      watermark,
      onChange, // func(e, value, selected)
      ...props
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      if (instance.current) instance.current.updateParams(params)
      // eslint-disable-next-line
    }, [JSON.stringify(params)])

    useEffect(() => {
      if (instance.current) instance.current.setReadOnly(readOnly)
    }, [readOnly])

    useEffect(() => {
      if (instance.current) {
        instance.current.updateParams({ src: src })
        loaded = 0
        instance.current.update()
      }
    }, [src])

    useEffect(() => {
      if (instance.current) {
        instance.current.updateParams({ data: data })
        loaded = 0
        instance.current.update()
      }
    }, [data])

    useEffect(() => {
      instance.current = new Instance(rootRef.current, {
        readOnly: readOnly,
        data: data,
        src: src,
        // 图片加载成功
        onSuccess: handleSuccess,
        onChange: handleChange,
        ...params
      })
    }, []) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onChange = handleChange
    }

    function handleChange(s, item, list) {
      if (rootRef.current) s.currentTarget = rootRef.current
      if (onChange) onChange(list, { current: item, instance: s })
    }
    function handleSuccess() {
      loaded = 1
    }
    function handleClick() {
      previewImage()
    }
    function previewImage() {
      if (!readOnly || !preview || !loaded) return
      // 克隆Wrapper
      let wrapper = instance.current.wrapper

      let previewHTML = `<div class="preview-layer"> <div class="vott-wrapper">${wrapper.innerHTML}</div></div>`
      BridgeBrowser.previewImage({
        urls: [src],
        layerHTML: previewHTML,
        success: (s) => {
          let layer = s.container.querySelector('.preview-layer')
          wrapper = s.container.querySelector('.vott-wrapper')
          let svg = wrapper.querySelector('.vott-svg')
          svg.style.backgroundImage = 'initial'
          // 计算宽高
          let width = svg.style.width.replace('px', '')
          let height = svg.style.height.replace('px', '')
          let scale = 1
          if (width > height) {
            // 宽图计算
            scale = layer.clientWidth / width
          } else {
            // 长图计算
            scale = layer.clientHeight / height
          }
          wrapper.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
          wrapper.style.WebkitTransformOrigin = `0 0`
        }
      })
    }

    return (
      <div
        {...props}
        className={`vott-container${props.className ? ' ' + props.className : ''}`}
        ref={rootRef}
      >
        <div className="vott-wrapper" onClick={handleClick}>
          <svg className="vott-svg" preserveAspectRatio="none"></svg>
          {watermark && (
            <div className="vott-watermark" style={{ backgroundImage: `url(${watermark})` }}></div>
          )}
        </div>
        <div className={`vott-loading active`}>
          <div className={`vott-loading-icon`}></div>
        </div>
        <div className={`vott-error`}>
          <div className={`vott-error-icon`}></div>
          <div className={`vott-error-caption`}>
            {locale('图片加载失败', 'hint_image_failed_to_load')}
          </div>
        </div>
      </div>
    )
  }
)

export default Vott
