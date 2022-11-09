import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import Instance from './instance'
import './jcrop.css' // Jcrop

const Jcrop = forwardRef(
  (
    {
      src,
      rect, // [10,10,100,100]
      scale = [0.7, 0.5], // [.7,.5]
      options = {
        multi: false
      },
      onChange,
      style,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: Instance,
        getRootDOM: () => rootRef.current,
        getInstance: () => Instance
      }
    })

    useEffect(() => {
      update()
    }, []) // eslint-disable-line
    function formatPos(argPos) {
      var pos = argPos
      for (let n in argPos) {
        if (n === 'h') pos['height'] = argPos[n]
        else if (n === 'w') pos['width'] = argPos[n]
      }
      return pos
    }
    function update() {
      if (!src || rootRef.current) return
      Instance.load(rootRef.current)
        .then((img) => {
          var jcp = Instance.attach(img, options)
          var frame = null
          let pos = {}
          // 按尺寸创建
          if (rect) {
            pos = {
              x: rect[0],
              y: rect[1],
              w: rect[2],
              h: rect[3]
            }
            frame = Instance.Rect.create(pos.x, pos.y, pos.w, pos.h)
            jcp.newWidget(frame)
            // 按比例创建
          } else {
            frame = Instance.Rect.sizeOf(jcp.el)
            pos = frame.scale(...scale).center(frame.w, frame.h)
            jcp.newWidget(pos)
          }
          if (onChange) onChange({ pos: formatPos(pos), src: src })
          jcp.listen('crop.change', (widget, e) => {
            pos = formatPos(widget.pos)
            if (onChange) onChange({ pos, src: src })
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    return (
      <img
        alt=""
        ref={rootRef}
        {...others}
        style={Object.assign({ maxWidth: '100%' }, style)}
        src={src}
      />
    )
  }
)
export default Jcrop
