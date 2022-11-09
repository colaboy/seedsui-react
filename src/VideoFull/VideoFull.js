import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import locale from './../locale'

// 视频预览
const VideoFull = forwardRef(
  (
    {
      portal,

      scriptSDK = '//g.alicdn.com/de/prismplayer/2.8.8/aliplayer-min.js',
      cssSDK = '//g.alicdn.com/de/prismplayer/2.8.8/skins/default/aliplayer-min.css',

      poster = '',
      src,
      autoPlay = true,
      pause,
      isLive,
      params,
      onError,
      onLoad,

      bar, // 状态栏
      children,
      ...others
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

    let idSdkPlayer = ''
    const idSdkCss = '_seedsui_videofull_css_'
    const idSdkScript = '_seedsui_videofull_script_'

    // 设置播放器容器
    function setIdSdkPlayer(id) {
      if (!rootRef.current) return
      let player = rootRef.current.querySelector('.videofull-page-player')
      if (player) {
        player.setAttribute('id', id)
      }
    }
    // 加载SDK
    function loadSdk() {
      return new Promise((resolve) => {
        var css = document.getElementById(idSdkCss)
        if (!css) {
          var head = document.getElementsByTagName('head')[0]
          var link = document.createElement('link')
          link.id = idSdkCss
          link.href = cssSDK
          link.setAttribute('rel', 'stylesheet')
          link.setAttribute('type', 'text/css')
          head.appendChild(link)
        }
        var script = document.getElementById(idSdkScript)
        if (!script) {
          script = document.createElement('script')
          script.id = idSdkScript
          script.type = 'text/javascript'
          script.charset = 'utf-8'
          script.src = scriptSDK
          document.body.appendChild(script)
          script.onload = function () {
            resolve(true)
          }
          script.onerror = function () {
            resolve(false)
          }
        } else {
          resolve(true)
        }
      })
    }

    // 视频控件样式修改
    function getSkinLayout() {
      if (isLive) {
        return [
          {
            name: 'bigPlayButton',
            align: 'cc'
          },
          {
            name: 'controlBar',
            align: 'blabs',
            x: 0,
            y: 0,
            children: [
              { name: 'progress', align: 'tlabs', x: 0, y: 0 },
              { name: 'playButton', align: 'tl', x: 15, y: 26 },
              { name: 'nextButton', align: 'tl', x: 10, y: 26 },
              { name: 'timeDisplay', align: 'tl', x: 10, y: 24 },
              { name: 'fullScreenButton', align: 'tr', x: 10, y: 25 },
              { name: 'streamButton', align: 'tr', x: 10, y: 23 },
              { name: 'volume', align: 'tr', x: 10, y: 25 }
            ]
          },
          {
            name: 'fullControlBar',
            align: 'tlabs',
            x: 0,
            y: 0,
            children: [
              { name: 'fullTitle', align: 'tl', x: 25, y: 6 },
              { name: 'fullNormalScreenButton', align: 'tr', x: 24, y: 13 },
              { name: 'fullTimeDisplay', align: 'tr', x: 10, y: 12 },
              { name: 'fullZoom', align: 'cc' }
            ]
          }
        ]
      }
      return [
        {
          name: 'bigPlayButton',
          align: 'cc'
        },
        {
          name: 'H5Loading',
          align: 'cc'
        },
        {
          name: 'errorDisplay',
          align: 'tlabs',
          x: 0,
          y: 0
        },
        {
          name: 'infoDisplay'
        },
        {
          name: 'tooltip',
          align: 'blabs',
          x: 0,
          y: 56
        },
        {
          name: 'thumbnail'
        },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: 0,
          children: [
            { name: 'progress', align: 'blabs', x: 0, y: 44 },
            { name: 'playButton', align: 'tl', x: 15, y: 12 },
            { name: 'timeDisplay', align: 'tl', x: 10, y: 7 },
            { name: 'fullScreenButton', align: 'tr', x: 10, y: 12 },
            { name: 'subtitle', align: 'tr', x: 15, y: 12 },
            { name: 'setting', align: 'tr', x: 15, y: 12 },
            { name: 'volume', align: 'tr', x: 5, y: 10 }
          ]
        }
      ]
    }

    // 绑定显隐事件
    const [showBar, setShowBar] = useState(false)
    function attachBar(player) {
      if (!player) return
      player.on('hideBar', () => {
        setShowBar(false)
      })
      player.on('showBar', () => {
        setShowBar(true)
      })
    }
    // 实例化
    async function initInstance() {
      if (!src) {
        console.error(locale('请传入视频源', 'hint_video_src'))
        if (onError) onError({ errMsg: locale('请传入视频源', 'hint_video_src') })
        return
      }
      if (!(await loadSdk())) {
        console.error(locale('加载播放器库出错, 请稍后再试', 'hint_video_sdk_load_failed'))
        if (onError)
          onError({
            errMsg: locale('加载播放器库出错, 请稍后再试', 'hint_video_sdk_load_failed')
          })
        return
      }
      if (!window.Aliplayer) {
        setTimeout(() => {
          initInstance()
        }, 1000)
        return
      }
      // const width = rootRef.current.clientWidth;
      // const height = rootRef.current.clientHeight;
      // 构建参数
      let data = {
        id: idSdkPlayer,
        source: src,
        // 样式设置
        width: '100%',
        height: '100%',
        videoWidth: '100%',
        videoHeight: '100%',
        skinLayout: getSkinLayout(),
        // 控件设置
        autoplay: autoPlay,
        controlBarVisibility: 'click',
        showBarTime: 3000,
        // 播放设置
        isLive: isLive,
        preload: true,
        playsinline: navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
          ? true
          : false,
        showBuffer: true,
        defaultDefinition: 'FD',
        useH5Prism: true,
        useFlashPrism: false,
        cover: poster,
        x5_type: 'h5',
        x5_fullscreen: false,
        ...params
      }
      instance.current = new window.Aliplayer(data, function (player) {
        if (bar) {
          attachBar(player)
        }
        if (autoPlay) {
          player.play()
        }
      })
      if (onLoad) onLoad(instance.current)
    }

    useEffect(() => {
      window._seedsui_videofull_player_ = window._seedsui_videofull_player_
        ? window._seedsui_videofull_player_ + 1
        : 1
      // eslint-disable-next-line
      idSdkPlayer = `_seedsui_videofull_player_${window._seedsui_videofull_player_}`
      setIdSdkPlayer(idSdkPlayer)
      if (instance.current) return
      initInstance()

      return () => {
        if (instance.current) instance.current.dispose()
      }
    }, []) // eslint-disable-line

    useEffect(() => {
      if (instance.current && pause === true) {
        instance.current.pause()
      }
    }, [pause])

    const DOM = (
      <div
        className={`videofull-page${others.className ? ' ' + others.className : ''}`}
        {...others}
        ref={rootRef}
      >
        <div
          x5-video-player-type="h5"
          className="videofull-page-player prism-player"
          webkit-playsinline="true"
          playsInline={true}
          style={{ width: '100%', height: '100%' }}
        ></div>
        {showBar && bar ? bar : null}
        {children}
      </div>
    )
    if (portal) {
      return createPortal(DOM, portal)
    }
    return DOM
  }
)

export default VideoFull
