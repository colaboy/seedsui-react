// MediaUtil 多媒体控件
var MediaUtil = {
  /* ---------------------------
    Methods
    --------------------------- */
  audio: function (src) {
    return new Audio(src)
  },
  video: function (src) {
    if (!src) return null
    var video = document.createElement('video')
    video.controls = true
    var source = document.createElement('source')
    source.type = this.sourceType(src)
    source.src = src
    video.appendChild(source)
    return video
  },
  getFileURL: function (file) {
    // 临时路径, file = input.files[0]
    var url = null
    if (window.createObjcectURL !== undefined) {
      url = window.createOjcectURL(file)
    } else if (window.URL !== undefined) {
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) {
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  },
  getFileSize: function (file) {
    // 文件大小
    return file.size
  },
  getFileType: function (file) {
    // 文件类型
    return file.type
  },
  getFileBase64: function (file, callback) {
    // 转成base64
    var reader = new FileReader()
    reader.onload = (e) => {
      callback(e.target.result)
    }
    reader.readAsDataURL(file)
  },
  convertTime: function (sec) {
    // 将毫秒转成分秒
    if (sec < 0) sec = -sec
    let sec_num = parseInt(sec, 10)
    let hours = Math.floor(sec_num / 3600)
    let minutes = Math.floor((sec_num - hours * 3600) / 60)
    let seconds = sec_num - hours * 3600 - minutes * 60
    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  },
  convertSize: function (bytes) {
    // 转换成KB或者MB, 先*1000再/1000是为了防止精度丢失
    if (isNaN(bytes)) return 0
    if (bytes > 1024 * 1024)
      return (Math.round((bytes * 1000) / (1024 * 1024)) / 1000).toString() + 'MB'
    return (Math.round((bytes * 1000) / 1024) / 1000).toString() + 'KB'
  },
  play: function (target) {
    target.play()
  },
  pause: function (target) {
    target.pause()
  },
  resume: function (target) {
    if (target.paused) {
      target.play()
    } else {
      target.pause()
    }
  },
  loop: function (target, loop) {
    target.loop = loop || false
  },
  autoplay: function (target, autoplay) {
    target.autoplay = autoplay || false
  },
  isReady: function (target) {
    // 0.没有数据不能播放 1.当前帧已下载完成 2.可以播放 3.播放可继续而且应该不会中断
    if (target.readyState !== 4) {
      return false
    }
    return true
  },
  toggleFullScreen: function (target) {
    // audio不支持全屏, 兼容性差
    if (target.requestFullscreen) {
      target.exitFullscreen()
    } else {
      target.requestFullscreen()
    }
  },
  duration: function (target) {
    if (!this.isReady(target)) return
    return target.duration
  },
  currentTime: function (target, time) {
    if (!this.isReady(target)) return
    if (!isNaN(time)) {
      target.currentTime = time
    }
    return time
  },
  volume: function (target, volume) {
    if (!isNaN(volume)) {
      target.volume = volume
    }
    return target.volume
  },
  volumeLvl: function (target) {
    var volnumber = target.volume
    if (volnumber === 0) {
      return 0
    } else if (volnumber > 0 && volnumber < 0.3) {
      return 1
    } else if (volnumber > 0.3 && volnumber < 0.6) {
      return 2
    } else if (volnumber > 0.6 && volnumber < 0.9) {
      return 3
    } else {
      return 4
    }
  },
  rate: function (target, rate) {
    // 设置播放速度，默认为1.0秒
    if (!isNaN(rate)) {
      target.defaultPlaybackRate = rate
    }
    return target.defaultPlaybackRate
  },
  suffixTypes: function (suffix) {
    var type = ''
    var codeType = ''
    switch (suffix) {
      // 音频
      case 'aac':
        type = 'audio/mp4'
        codeType = 'audio/mp4; codecs="mp4a.40.2"'
        break
      case 'vorbis': // 后缀通常为ogg
        type = 'audio/ogg'
        codeType = 'audio/ogg; codecs="vorbis"'
        break
      case 'wav':
        type = 'audio/wav'
        codeType = 'audio/wav; codecs="1"'
        break
      // 视频
      case 'h.264': // 后缀通常为mpg4、mp4、mov
        type = 'video/mp4'
        codeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        break
      case 'mp4':
        type = 'video/mp4'
        codeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
        break
      case 'theora': // 后缀通常为ogg
        type = 'video/ogg'
        codeType = 'video/ogg; codecs="theora"'
        break
      case 'ogg':
        type = 'video/ogg'
        codeType = 'video/ogg; codecs="theora"'
        break
      case 'webm': // 后缀通常为webm
        type = 'video/webm'
        codeType = 'video/webm; codecs="vp8, vorbis"'
        break
      default:
        type = ''
        codeType = ''
    }
    return [type, codeType]
  },
  isSupport: function (suffix) {
    // 是否支持此视频
    var types = this.suffixTypes(suffix)
    var type = types[0]
    var codeType = types[1]
    var player = document.createElement('video')
    if (
      type !== '' &&
      codeType !== '' &&
      (player.canPlayType(type) || player.canPlayType(codeType))
    ) {
      return true
    }
    return false
  },
  sourceType: function (src) {
    if (!src) return src
    return this.suffixTypes(src.substring(src.lastIndexOf('.') + 1, src.length).toLowerCase())[0]
  }
  /* ---------------------------
    Events
    --------------------------- */
  // dataunavailable // 因为没有数据不能播放，readyState值为0
  // canshowcurrentframe // 当前帧已下载完成，readyState值为1
  // canplay // 可以播放时，readyState值为2
  // canplaythrough // 播放可继续，而且应该不会中断，readyState值为3
  // load // 媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
  // loadeddata // 媒体的第一帧已加载完成
  // loadedmetadata // 媒体的元数据已加载完成
  // loadstart // 下载已开始
  // progress // 正在下载
  // abort // 下载中断
  // stalled // 浏览器尝试下载，但未接收到数据
  // error // 下载发生网络错误
  // emptied // 网络连接关闭
  // empty // 发生错误阻止了媒体下载
  // play // 准备播放
  // playing // 正在播放
  // timeupdate // 当前时间被不合理或意外的方式更新
  // pause // 暂停
  // waiting // 播放暂停，等待下载更多数据
  // ended // 媒体已播放至末尾，播放停止
  // volumechange // 更改音量事件
  // ratechange // 更改播放速度事件
  // seeked // 搜索结束
  // seeking // 正在移动到新位置
}

export default MediaUtil
