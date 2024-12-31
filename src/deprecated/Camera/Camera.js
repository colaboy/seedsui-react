import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import CameraRecorder from './CameraRecorder.js'

const Camera = forwardRef(({ portal, onHide, onRecord, maxDuration, children, ...others }, ref) => {
  const [successResult, setSuccessResult] = useState({})

  const videoRef = useRef(null)
  const startRef = useRef(null)
  const stopRef = useRef(null)
  const timeRef = useRef(null)
  const timeTargetRef = useRef(null)
  const successRef = useRef(null)
  const errorRef = useRef(null)
  const errorTargetRef = useRef(null)
  useImperativeHandle(ref, () => {
    return videoRef.current
  })
  function openCamera() {
    CameraRecorder.init({
      maxDuration: maxDuration,
      timer: timeTargetRef.current,
      video: videoRef.current,
      onOpened: function (e, stream) {
        if (startRef.current) startRef.current.style.display = 'block'
        // e.target.play();
      },
      onStop: function (e) {
        if (stopRef.current) stopRef.current.style.display = 'none'
        if (timeRef.current) timeRef.current.style.display = 'none'
        if (successRef.current) successRef.current.style.display = 'block'
        setSuccessResult(e)
      },
      onError: function (e, err) {
        if (errorRef.current) errorRef.current.style.display = 'block'
        if (errorTargetRef.current) errorTargetRef.current.innerHTML = err.errMsg
      }
    })
  }
  function start() {
    CameraRecorder.startRecord()
    startRef.current.style.display = 'none'
    stopRef.current.style.display = 'block'
    timeRef.current.style.display = 'block'
  }
  function stop(e) {
    CameraRecorder.stopRecord()
  }

  function closeCamera(e) {
    CameraRecorder.stopRecord(null) // 关闭不走停止onStop回调
    if (onHide) onHide(e)
  }

  function success() {
    onRecord(successResult)
  }

  useEffect(() => {
    openCamera()
  }, []) // eslint-disable-line

  return createPortal(
    <div
      ref={ref}
      {...others}
      className={`camera${others.className ? ' ' + others.className : ''}`}
    >
      <video ref={videoRef} width="100%" height="100%" autoPlay="" playsInline muted></video>

      <div ref={startRef} className="camera-recorder-start" onClick={start}>
        <div className="camera-recorder-start-round">
          <div className="camera-recorder-start-dot"></div>
        </div>
      </div>

      <div ref={stopRef} className="camera-recorder-stop" onClick={stop}>
        <div className="camera-recorder-stop-dot"></div>
      </div>

      <div ref={successRef} className="camera-success" onClick={success}>
        <div className="camera-success-icon"></div>
      </div>

      <div ref={timeRef} className="camera-recorder-timer">
        <span className="camera-recorder-timer-dot"></span>
        <span ref={timeTargetRef} className="camera-recorder-timer-label">
          00:00
        </span>
      </div>

      <div ref={errorRef} className="camera-recorder-error">
        <span ref={errorTargetRef} className="camera-recorder-error-label"></span>
      </div>

      <div className="camera-close" onClick={closeCamera}></div>
      {children}
    </div>,
    portal || document.getElementById('root') || document.body
  )
})

export default Camera
