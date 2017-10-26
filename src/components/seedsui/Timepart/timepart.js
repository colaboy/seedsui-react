// Timepart 时间段
var Timepart = function (container, params) {
  /* -----------------------
  Model
  ----------------------- */
  var defaults = {
    rowClass: 'timepart-row',
    progressClass: 'timepart-progress',
    progressCaptionClass: 'progress-caption',
    dataProgressAttr: 'data-progress',
    partClass: 'timepart-part',
    partStartClass: 'timepart-startTime',
    partEndClass: 'timepart-endTime',
    activeClass: 'active',
    disableClass: 'disabled',

    colCount: 6, // 一行6格
    partMinute: 30, // 一格的30分钟
    startTime: '7:00',
    endTime: '22:00',

    colAttr: 'data-col',

    isEnableActive: true // 是否启用点击选中

    /*
    Callbacks:
    onConflictOver:function(Timepart)
    onConflictContain:function(Timepart)
    onClick:function(Timepart)
    onClickDisabled:function(Timepart)
    onClickActive:function(Timepart)
    onClickChoose:function(Timepart)
    onClickValid:function(Timepart)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  // Params
  s.params = params
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container
  // 设置Container的data-col
  s.container.setAttribute(s.params.colAttr, s.params.colCount)

  if (!s.container) {
    console.log('SeedsUI Error：未找到Timepart的DOM对象，请检查传入参数是否正确')
    return
  }
  // 点击次数
  s.clickCount = 0

  var partMilliSecond = s.params.partMinute * 60 * 1000
  // 行
  s.rows = []
  s.rowsCount
  var rowMilliSecond = partMilliSecond * s.params.colCount

  // 字符串转换成Date对象，参数格式如8:00
  s.parseDate = function (timeStr) {
    var date = new Date()
    var hour = timeStr.split(':')[0]
    var minute = timeStr.split(':')[1]
    date.setYear(0)
    date.setMonth(0, 0)
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(0, 0)
    return date
  }
  // 开始和结束时间
  s.startTime = s.parseDate(s.params.startTime)
  s.endTime = s.parseDate(s.params.endTime)

  // 总格数
  s.partsCount = 0
  s.updateParsCount = function () {
    var startTime = s.parseDate(s.params.startTime)
    var endTime = s.parseDate(s.params.endTime)
    s.partsCount = (endTime.getTime() - startTime.getTime()) / partMilliSecond
    if (Math.ceil(s.partsCount) !== s.partsCount) { // 是否是整数
      s.partsCount = 0
      console.log('SeedsUI Error：时间区间参数partMinute不正确，不能整除')
      return
    }
    return s.partsCount
  }
  // 总行数
  s.updateRowsCount = function () {
    if (s.partsCount === 0) s.updateParsCount()
    s.rowsCount = Math.ceil(s.partsCount / s.params.colCount)
    return s.rowsCount
  }
  // 创建时间段
  s.createParts = function () {
    s.updateRowsCount()
    // 总格数
    s.parts = []
    // 总行数
    s.rows = []
    // 创建行
    for (var i = 0; i < s.rowsCount; i++) {
      var rowStartTime = s.startTime.getTime() + (rowMilliSecond * i)
      var rowEndTime = rowStartTime + rowMilliSecond
      if (rowEndTime > s.endTime.getTime()) rowEndTime = s.endTime.getTime()

      var row = document.createElement('div')
      row.setAttribute('class', s.params.rowClass)
      row.startTime = new Date(rowStartTime)
      row.endTime = new Date(rowEndTime)

      s.rows.push(row)
      s.container.appendChild(row)

      // 创建列
      for (var j = 0; j < s.params.colCount; j++) {
        var partStartTime = rowStartTime + (partMilliSecond * j)
        var partEndTime = partStartTime + partMilliSecond
        if (partStartTime > s.endTime.getTime() || partEndTime > s.endTime.getTime()) return

        var part = document.createElement('label')
        part.setAttribute('class', s.params.partClass)
        part.startTime = new Date(partStartTime)
        part.endTime = new Date(partEndTime)

        var startHour = part.startTime.getHours() < 10 ? '0' + part.startTime.getHours() : part.startTime.getHours()
        var startMinute = part.startTime.getMinutes() < 10 ? '0' + part.startTime.getMinutes() : part.startTime.getMinutes()
        var endHour = part.endTime.getHours() < 10 ? '0' + part.endTime.getHours() : part.endTime.getHours()
        var endMinute = part.endTime.getMinutes() < 10 ? '0' + part.endTime.getMinutes() : part.endTime.getMinutes()
        part.innerHTML = '<span class=' + s.params.partStartClass + '>' + startHour + ':' + startMinute + '</span>' +
          '<span class=' + s.params.partEndClass + '>' + endHour + ':' + endMinute + '</span>'
        s.parts.push(part)
        row.appendChild(part)
      }
    }
  }
  s.createParts()

  /* -----------------------
  Method
  ----------------------- */
  s.reset = function () {
    // 重置点击次数
    s.clickCount = 0
    // 清空容器
    s.container.innerHTML = ''
    // 重新绘制时间段
    s.createParts()
  }
  // 获得进度条的开始行数、结束行数、开始位置、结束位置、开始段数、结束段数
  s.getTimesRange = function (startTime, endTime) {
    // 开始结束位置总比例
    var startRatio = ((startTime.getTime() - s.startTime.getTime()) / rowMilliSecond).toString()
    var endRatio = ((endTime.getTime() - s.startTime.getTime()) / rowMilliSecond).toString()
    /*
     *行数:开始结束位置行数
     */
    var startRow = Math.floor(startRatio)
    var endRow = Math.floor(endRatio)
    /*
     *左右:开始结束行左右值
     */
    var left = Math.round(startRatio.replace(/\d+\./, '0.') * 100)
    var right = Math.round(100 - endRatio.replace(/\d+\./, '0.') * 100)

    /*
     *段数:开始结束段数字
     */
    var startNum = Math.floor(startRatio * s.params.colCount)
    var endNum = Math.floor(endRatio * s.params.colCount) - 1// 半格的情况，则此格为正常状态，所以-1
    /*
     *整比例
     */
    // 结束比例为整数时得减1
    if (endRatio % 1 === 0) {
      endRow--
      right = 0
    }
    // 结束时间是一格的倍数得减1
    /*
    if(endTime.getMinutes()%s.params.partMinute===0){
        endNum++
    }
    */
    // 如果开始位置在最左边，则左边间距为0
    if (startRatio % 1 === 0) {
      left = 0
    }

    return {
      startRatio: startRatio,
      endRatio: endRatio,

      startRow: startRow,
      endRow: endRow,

      left: left,
      right: right,

      startNum: startNum,
      endNum: endNum
    }
  }
  s.hasProgress = function (startTime, endTime, isCallback) {
    var progress = s.container.querySelectorAll('.progress-caption')
    s.conflictTimes = {
      conflictStartTime: startTime,
      conflictEndTime: endTime
    }
    /* eslint-disable */
    for (var i = 0, pro; pro = progress[i++];) {
      // 相交
      if ((startTime > pro.startTime && startTime < pro.endTime) || (endTime > pro.startTime && endTime < pro.endTime)) {
        s.target = pro
        if (s.params.onConflictContain && isCallback) s.params.onConflictContain(s)
        return true
      }
      // 包含
      if ((pro.startTime > startTime && pro.startTime < endTime) || (pro.endTime > startTime && pro.endTime < endTime)) {
        s.target = pro
        if (s.params.onConflictOver && isCallback) s.params.onConflictOver(s)
        return true
      }
    }
    /* eslint-enable */
    return false
  }

  // 设置进度条
  s.setProgress = function (startTime, endTime, classes, data, isListenerConflict) {
    /* eslint-disable */
    var startTime = Object.prototype.toString.call(startTime) === '[object Date]' ? startTime : s.parseDate(startTime || s.params.startTime)
    var endTime = Object.prototype.toString.call(endTime) === '[object Date]' ? endTime : s.parseDate(endTime || s.params.endTime)
    var classes = classes && Object.prototype.toString.call(classes) === '[object Array]' ? classes : []
    /* eslint-enable */
    startTime.setYear(0)
    startTime.setMonth(0, 0)
    startTime.setSeconds(0, 0)

    endTime.setYear(0)
    endTime.setMonth(0, 0)
    endTime.setSeconds(0, 0)

    // 时间范围限制
    if (startTime.getTime() < s.startTime.getTime()) {
      startTime = s.startTime
    } else if (startTime.getTime() > s.endTime.getTime()) {
      startTime = s.endTime
    }
    if (endTime.getTime() < s.startTime.getTime()) {
      endTime = s.startTime
    } else if (endTime.getTime() > s.endTime.getTime()) {
      endTime = s.endTime
    }
    // 如果开启冲突监听，并且存在冲突，则停止进度条绘制
    if (isListenerConflict && s.hasProgress(startTime, endTime, true)) return false

    var range = s.getTimesRange(startTime, endTime)

    // 设置parts的class
    /*
    for(var i=range.startNum;i<=range.endNum;i++){
        for(var k=0,className;className=classes[k++];){
            s.parts[i].classList.add(className)
        }
    }
    */

    // 设置progress的left和right
    for (var j = range.startRow; j <= range.endRow; j++) {
      var progress = document.createElement('div')
      progress.setAttribute('class', s.params.progressClass)

      // 设置classes
      /* eslint-disable */
      for (var l = 0, className; className = classes[l++];) {
        progress.classList.add(className)
      }
      /* eslint-enable */

      // 设置style
      progress.style.display = 'block'
      progress.style.left = 0
      progress.style.right = 0

      // 设置data
      if (data) progress.setAttribute(s.params.dataProgressAttr, data)

      if (j === range.startRow) {
        progress.style.left = range.left + '%'

        progress.startTime = startTime
        progress.endTime = endTime
        progress.classList.add(s.params.progressCaptionClass)
        progress.setAttribute('data-starttime', startTime)
        progress.setAttribute('data-endtime', endTime)
      }
      if (j === range.endRow) {
        progress.style.right = range.right + '%'
      }

      s.rows[j].appendChild(progress)
    }
    return true
  }
  s.activeTimes = function (startTime, endTime, classes, data) {
    /* eslint-disable */
    var classes = classes ? [s.params.activeClass].concat(classes) : [s.params.activeClass]
    var data = data || ''
    /* eslint-enable */
    var isDrawed = s.setProgress(startTime, endTime, classes, data, true)
    if (isDrawed) {
      s.clickCount = 2
    }
  }
  s.disableTimes = function (startTime, endTime, classes, data) {
    /* eslint-disable */
    var classes = classes ? [s.params.disableClass].concat(classes) : [s.params.disableClass]
    var data = data || ''
    /* eslint-enable */
    s.setProgress(startTime, endTime, classes, data, true)
  }
  s.chooseTimes = function (startTime, endTime, classes, data) {
    s.setProgress(startTime, endTime, classes, data)
  }
  // 获取选中的时间段
  s.getActiveTimes = function () {
    var activeProgress = s.container.querySelectorAll('.' + s.params.progressCaptionClass + '.' + s.params.activeClass)
    if (activeProgress.length === 0) {
      activeProgress = s.container.querySelectorAll('.' + s.params.partClass + '.' + s.params.activeClass)
    }
    if (activeProgress.length <= 0) {
      return {
        startTime: null,
        endTime: null,
        startTimeString: null,
        endTimeString: null
      }
    }
    var startTime = activeProgress[0].startTime
    var startHour = startTime.getHours() < 10 ? '0' + startTime.getHours() : startTime.getHours()
    var startMinute = startTime.getMinutes() < 10 ? '0' + startTime.getMinutes() : startTime.getMinutes()

    var endTime = activeProgress[activeProgress.length - 1].endTime
    var endHour = endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()
    var endMinute = endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()

    return {
      startTime: startTime,
      endTime: endTime,
      startTimeString: startHour + ':' + startMinute,
      endTimeString: endHour + ':' + endMinute
    }
  }

  // 删除进度条
  s.removeProgress = function (className) {
    // 清空parts
    /* eslint-disable */
    for (var i = 0, part; part = s.parts[i++];) {
      part.classList.remove(className)
    }
    /* eslint-enable */
    // 清空progress
    var activeProgress = s.container.querySelectorAll('.' + s.params.progressClass + '.' + className)
    Array.prototype.slice.call(activeProgress).forEach(function (n, i) {
      n.parentNode.removeChild(n)
    })
  }
  s.removeAllActive = function () {
    s.clickCount = 0

    s.removeProgress(s.params.activeClass)
  }
  s.removeAllDisabled = function () {
    s.removeProgress(s.params.disableClass)
  }
  // 时间排序
  s.sortTimes = function () {
    var args = [].slice.call(arguments)
    var sortArr = args.sort(function (x, y) {
      if (x < y) return -1
      if (x === y) return 0
      if (x > y) return 1
    })
    return sortArr
  }
  // 根据段获得时间
  s.getTimesByParts = function (part1, part2) {
    var times = s.sortTimes(part1.startTime, part1.endTime, part2.startTime, part2.endTime)
    return {
      startTime: times[0],
      endTime: times[times.length - 1]
    }
  }
  /* -----------------------
  Events
  ----------------------- */
  s.events = function (detach) {
    var target = s.container
    var action = detach ? 'removeEventListener' : 'addEventListener'
    target[action]('click', s.onClickContainer, false)
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* -----------------------
  Events Handler
  ----------------------- */
  s.onClickContainer = function (e) {
    if (e.target.classList.contains(s.params.partClass) || e.target.classList.contains(s.params.progressClass)) { // 点击part
      s.onClickPart(e)
    }
  }
  s.onClickPart = function (e) {
    s.target = e.target
    // Callback onClick
    if (s.params.onClick) s.params.onClick(s)

    // 点击禁用
    if (s.target.classList.contains(s.params.disableClass)) {
      // Callback onClickDisabled
      if (s.params.onClickDisabled) s.params.onClickDisabled(s)
      return
    }
    // 点击激活
    if (s.target.classList.contains(s.params.activeClass)) {
      // Callback onClickActive
      if (s.params.onClickActive) s.params.onClickActive(s)
      return
    }
    // 点击进度条
    if (s.target.classList.contains(s.params.progressClass)) {
      // Callback onClickChoose
      if (s.params.onClickChoose) s.params.onClickChoose(s)
      return
    }

    // 记录点击次数
    s.clickCount++

    // 点击合法区域
    // Callback onClick
    if (s.params.onClickValid) s.params.onClickValid(s)
  }
  /* -----------------------
  Init
  ----------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

;//export default Timepart
