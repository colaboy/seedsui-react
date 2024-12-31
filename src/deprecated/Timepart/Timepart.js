import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

// 时间段
const Timepart = forwardRef(
  (
    {
      multiple,
      startTime = '07:00',
      endTime = '22:00',
      times,

      onChange,
      onError,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const instance = useRef(null)
    // 记录两次点击
    const part1Ref = useRef(null)
    const part2Ref = useRef(null)
    useImperativeHandle(ref, () => {
      return {
        rootDOM: rootRef.current,
        instance: instance.current,
        getRootDOM: () => rootRef.current,
        getInstance: () => instance.current
      }
    })

    useEffect(() => {
      if (instance.current) return
      initInstance()
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (!times) return
      handleUpdate()
      // eslint-disable-next-line
    }, [JSON.stringify(times)])

    function initInstance() {
      if (!rootRef?.current) return
      var clickCount = 0
      instance.current = new Instance(rootRef.current, {
        startTime: startTime,
        endTime: endTime,
        onClickPart: (s) => {
          let e = s.event
          if (e.target.classList.contains('active')) {
            e.target.classList.remove('active')
            clickCount = 0
            // onChange
            handleChange()
            return
          }
          // 如果不允许多选,发现有已选中的先清除
          if (!multiple) {
            if (s.container.querySelectorAll('.progress-legend.active').length) {
              s.removeProgress('active')
              clickCount = 0
              // onChange
              handleChange()
              return
            }
          }
          // 选中
          clickCount++
          if (clickCount === 1) {
            // 如果点击了一次
            part1Ref.current = e.target
            part1Ref.current.classList.add('active')
            // onChange
            handleChange()
          } else if (clickCount === 2) {
            // 如果点击了两次
            part1Ref.current.classList.remove('active')
            part2Ref.current = e.target
            var times = s.getTimesByParts(part1Ref.current, part2Ref.current)
            s.addProgress(times.startTime, times.endTime, 'active')
            clickCount = 0
            // onChange
            handleChange()
          }
        },
        onContain: (e) => {
          clickCount = 0
          if (onError) onError(Object.assign(e || {}, { errMsg: '已包含其它时间段' }))
        },
        onCross: (e) => {
          if (onError) onError(Object.assign(e || {}, { errMsg: '与其它时间段相交' }))
        },
        onClickProgress: (s) => {
          let e = s.event
          if (e.target.classList.contains('active')) {
            // 根据data-id删除
            const id = e.target.getAttribute('data-id')
            ;[].slice
              .call(s.container.querySelectorAll(`.timepart-progress[data-id="${id}"]`))
              .forEach((el) => {
                el.parentNode.removeChild(el)
              })
            // onChange
            handleChange()
          }
        },
        onClickWhite: (s) => {}
      })
    }

    function handleUpdate() {
      if (!Array.isArray(times)) return
      for (let i = 0, time; (time = times[i++]); ) {
        // eslint-disable-line
        if (time.className && time.startTime && time.endTime) {
          instance.current.addProgress(
            time.startTime,
            time.endTime,
            time.className,
            time.data || null,
            time.cover || false
          )
        }
      }
      // onChange
      handleChange()
    }

    function handleChange() {
      const times = instance.current.getTimes()
      const part = instance.current.container.querySelector('.timepart-part.active')
      if (part) {
        times.push({
          className: part.className.replace('timepart-part ', ''),
          startTime: part.startTime,
          endTime: part.endTime,
          data: part.getAttribute('data') || ''
        })
      }
      if (onChange) onChange(times)
    }
    return (
      <div
        {...others}
        className={`timepart${others.className ? ' ' + others.className : ''}`}
        ref={rootRef}
      ></div>
    )
  }
)

export default Timepart
