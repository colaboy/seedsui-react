// Timepart 时间段
var Timepart = function (container, params) {
  /* -----------------------
  Model
  ----------------------- */
  var defaults = {
    rowClass: 'timepart-row',
    progressClass: 'timepart-progress',
    progressLegendClass: 'progress-legend',
    dataProgressAttr: 'data',
    partClass: 'timepart-part',
    partStartClass: 'timepart-startTime',
    partEndClass: 'timepart-endTime',

    colCount: 6, // 一行6格
    partMinute: 30, // 一格的30分钟
    startTime: '7:00',
    endTime: '22:00',

    colAttr: 'data-col',

    isEnableActive: true // 是否启用点击选中

    /*
    Callbacks:
    onContain:function(Timepart) // 包含
    onCross:function(Timepart) // 相交
    onClick:function(Timepart)
    onClickPart: function (Timepart) // 点击Part
    onClickProgress:function(Timepart) // 点击Progress
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
  s.rowsCount = 0
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

  // 总格数
  s.partsCount = 0
  s.updateParsCount = function () {
    var startTime = s.parseDate(s.params.startTime)
    var endTime = s.parseDate(s.params.endTime)
    s.partsCount = (endTime.getTime() - startTime.getTime()) / partMilliSecond
    if (Math.ceil(s.partsCount) !== s.partsCount) {
      // 是否是整数
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
    // 总行数s.rowsCount
    s.updateRowsCount()
    // 总时长
    var allStartTime = s.parseDate(s.params.startTime)
    var allEndTime = s.parseDate(s.params.endTime)
    // 总格数
    s.parts = []
    // 总行数
    s.rows = []
    // 创建行
    for (var i = 0; i < s.rowsCount; i++) {
      var rowStartTime = allStartTime.getTime() + rowMilliSecond * i
      var rowEndTime = rowStartTime + rowMilliSecond
      if (rowEndTime > allEndTime.getTime()) rowEndTime = allEndTime.getTime()

      var row = document.createElement('div')
      row.setAttribute('class', s.params.rowClass)
      row.startTime = new Date(rowStartTime)
      row.endTime = new Date(rowEndTime)

      s.rows.push(row)
      s.container.appendChild(row)

      // 创建列
      for (var j = 0; j < s.params.colCount; j++) {
        var partStartTime = rowStartTime + partMilliSecond * j
        var partEndTime = partStartTime + partMilliSecond
        if (partStartTime > allEndTime.getTime() || partEndTime > allEndTime.getTime()) return

        var part = document.createElement('label')
        part.setAttribute('class', s.params.partClass)
        part.startTime = new Date(partStartTime)
        part.endTime = new Date(partEndTime)

        var startHour =
          part.startTime.getHours() < 10
            ? '0' + part.startTime.getHours()
            : part.startTime.getHours()
        var startMinute =
          part.startTime.getMinutes() < 10
            ? '0' + part.startTime.getMinutes()
            : part.startTime.getMinutes()
        var endHour =
          part.endTime.getHours() < 10 ? '0' + part.endTime.getHours() : part.endTime.getHours()
        var endMinute =
          part.endTime.getMinutes() < 10
            ? '0' + part.endTime.getMinutes()
            : part.endTime.getMinutes()
        part.innerHTML =
          '<span class=' +
          s.params.partStartClass +
          '>' +
          startHour +
          ':' +
          startMinute +
          '</span>' +
          '<span class=' +
          s.params.partEndClass +
          '>' +
          endHour +
          ':' +
          endMinute +
          '</span>'
        s.parts.push(part)
        row.appendChild(part)
      }
    }
  }
  s.createParts()

  /* -----------------------
  Method
  ----------------------- */
  s.update = function () {
    // 清空容器
    s.container.innerHTML = ''
    // 重新绘制时间段
    s.createParts()
  }
  // 获取选中的时间段
  s.getTimes = function () {
    var progress = s.container.querySelectorAll('.' + s.params.progressLegendClass)
    var times = []
    for (var i = 0, el; (el = progress[i++]); ) {
      // eslint-disable-line
      times.push({
        className: el.className
          .replace(' ' + s.params.progressLegendClass, '')
          .replace(s.params.progressClass + ' ', ''),
        startTime: el.startTime,
        endTime: el.endTime,
        data: el.getAttribute(s.params.dataProgressAttr) || ''
      })
    }
    return times
  }
  // 获得进度条的开始行数、结束行数、开始位置、结束位置、开始段数、结束段数
  s.getTimesRange = function (startTime, endTime) {
    var allStartTime = s.parseDate(s.params.startTime)
    // 开始结束位置总比例
    var startRatio = ((startTime.getTime() - allStartTime.getTime()) / rowMilliSecond).toString()
    var endRatio = ((endTime.getTime() - allStartTime.getTime()) / rowMilliSecond).toString()
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
    var endNum = Math.floor(endRatio * s.params.colCount) - 1 // 半格的情况，则此格为正常状态，所以-1
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
  s.hasProgress = function (startTime, endTime) {
    var progress = s.container.querySelectorAll('.' + s.params.progressClass)
    for (var i = 0, pro; (pro = progress[i++]); ) {
      // eslint-disable-line
      // 相交
      if (
        (startTime > pro.startTime && startTime < pro.endTime) ||
        (endTime > pro.startTime && endTime < pro.endTime)
      ) {
        s.target = pro
        if (s.params.onCross) s.params.onCross(s)
        return true
      }
      // 包含
      if (
        (pro.startTime > startTime && pro.startTime < endTime) ||
        (pro.endTime > startTime && pro.endTime < endTime)
      ) {
        s.target = pro
        if (s.params.onContain) s.params.onContain(s)
        return true
      }
    }
    return false
  }
  // 进度条id
  var progressId = 0
  // 设置进度条
  s.addProgress = function (argStartTime, argEndTime, className, data, cover) {
    var allStartTime = s.parseDate(s.params.startTime)
    var allEndTime = s.parseDate(s.params.endTime)
    var startTime =
      Object.prototype.toString.call(argStartTime) === '[object Date]'
        ? argStartTime
        : s.parseDate(argStartTime || s.params.startTime)
    var endTime =
      Object.prototype.toString.call(argEndTime) === '[object Date]'
        ? argEndTime
        : s.parseDate(argEndTime || s.params.endTime)
    startTime.setYear(0)
    startTime.setMonth(0, 0)
    startTime.setSeconds(0, 0)

    endTime.setYear(0)
    endTime.setMonth(0, 0)
    endTime.setSeconds(0, 0)

    // 时间范围限制
    if (startTime.getTime() < allStartTime.getTime()) {
      startTime = allStartTime
    } else if (startTime.getTime() > allEndTime.getTime()) {
      startTime = allEndTime
    }
    if (endTime.getTime() < allStartTime.getTime()) {
      endTime = allStartTime
    } else if (endTime.getTime() > allEndTime.getTime()) {
      endTime = allEndTime
    }
    // 如果开启冲突监听，并且存在冲突，则停止进度条绘制
    if (!cover && s.hasProgress(startTime, endTime)) return false

    var range = s.getTimesRange(startTime, endTime)

    // 设置parts的class
    /*
    for(var i = range.startNum; i <= range.endNum; i++){
      s.parts[i].setAttribute('class', s.params.partClass + ' ' + className)
    }
    */

    // 设置progress的left和right
    progressId++
    for (var j = range.startRow; j <= range.endRow; j++) {
      var progress = document.createElement('div')
      // 设置class
      progress.setAttribute('class', s.params.progressClass + ' ' + className)

      // 设置style
      progress.style.display = 'block'
      progress.style.left = 0
      progress.style.right = 0

      // 设置data
      if (data) progress.setAttribute(s.params.dataProgressAttr, data)

      // 设置id
      progress.setAttribute('data-id', progressId)

      // 设置时间
      progress.startTime = startTime
      progress.endTime = endTime

      if (j === range.startRow) {
        progress.style.left = range.left + '%'
        progress.classList.add(s.params.progressLegendClass)
        // progress.setAttribute('data-starttime', startTime)
        // progress.setAttribute('data-endtime', endTime)
      }
      if (j === range.endRow) {
        progress.style.right = range.right + '%'
      }

      s.rows[j].appendChild(progress)
    }
    return true
  }

  // 删除进度条
  s.removeProgress = function (className) {
    // 清空parts
    for (var i = 0, part; (part = s.parts[i++]); ) {
      // eslint-disable-line
      part.classList.remove(className)
    }
    // 清空progress
    var activeProgress = s.container.querySelectorAll(
      '.' + s.params.progressClass + '.' + className
    )
    Array.prototype.slice.call(activeProgress).forEach(function (n, i) {
      n.parentNode.removeChild(n)
    })
  }
  // 时间排序
  s.sortTimes = function () {
    var args = [].slice.call(arguments)
    return args.sort(function (x, y) {
      if (x < y) return -1
      if (x > y) return 1
      return 0
    })
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
    s.event = e
    // Callback onClick
    if (s.params.onClick) s.params.onClick(s)
    // Callback onClickPart
    if (e.target.classList.contains(s.params.partClass)) {
      if (s.params.onClickPart) s.params.onClickPart(s)
    }
    // Callback onClickProgress
    if (e.target.classList.contains(s.params.progressClass)) {
      if (s.params.onClickProgress) s.params.onClickProgress(s)
    }
  }
  /* -----------------------
  Init
  ----------------------- */
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Timepart
