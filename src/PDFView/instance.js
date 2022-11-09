// PDFView pdf文件预览
var PDFView = function (container, params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    containerClass: 'pdf-container',
    wrapperClass: 'pdf-wrapper',
    pageClass: 'pdf-page',
    pageFeatureClass: '',
    drawClass: 'pdf-page-draw', // 绘制容器
    elementsClass: 'pdf-page-elements', // 页面中元素盒子
    elementClass: 'pdf-page-element', // 页面中元素盒子中元素
    canvasClass: 'pdf-page-canvas',
    imgClass: 'pdf-page-img',
    loadClass: 'pdf-page-load',
    loadHTML: '加载中',
    errorClass: 'pdf-page-error',
    errorHTML: '文件加载失败',
    nodataClass: 'pdf-page-nodata',
    nodataHTML: '暂无数据',
    hideClass: 'hide',

    pictures: '', // 图片地址
    src: '', // pdf地址
    cMapUrl: '',

    pageAttr: 'data-page', // 图片页数, 从0开始
    completeAttr: 'data-complete', // 完成加载, data-complete=0代表加载错误, =1代码加载正确

    pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js',
    pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js',

    rows: 5, // 为0时不分页

    pageElements: null // page内子元素
    /*
    callbacks
    onInit:function(PDFView)
    onPageLoad:function(PDFView)
    onLoad:function(PDFView)
    */
  }
  // pageElements = [{
  //   page: 1,
  //   x: 0,
  //   y: 0,
  //   element: <input/>
  //   ...其它属性将透传
  // }]
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Slider
  var s = this

  // Params
  s.params = params

  // Container
  s.container =
    typeof container === 'string' && container !== ''
      ? document.querySelector(container)
      : container
  if (!s.container) {
    console.warn('SeedsUI Warn: 未找到Container，请检查传入参数是否正确')
  }

  // Wrapper
  s.wrapper = s.container ? s.container.querySelector('.' + s.params.wrapperClass) : null

  // 创建DOM
  s.create = function () {
    if (!s.container) return
    s.container.innerHTML = ''

    if (!s.wrapper) {
      s.wrapper = document.createElement('div')
      s.wrapper.setAttribute('class', s.params.wrapperClass)

      s.container.appendChild(s.wrapper)
    }
  }
  // 更新params
  s.updateParams = function (params = {}) {
    // 更新s.params
    for (var param in params) {
      s.params[param] = params[param]
    }
  }
  // 更新DOM
  s.update = function (params = {}) {
    // 更新DOM
    if (!s.container) return
    s.wrapper = s.container.querySelector('.' + s.params.wrapperClass) || null
    if (!s.wrapper) {
      s.create()
    }

    // 更新参数
    s.updateParams(params)

    // 更新自定义元素(传入元素的情况下才更新插入元素)
    if (params.pageElements !== undefined) s.updatePageElements()

    // 更新源src或者pictures
    if ((params.src || params.pictures) && s.loadPDF) {
      // 页数初始化, 从0开始
      s.page = 0
      // 重新加载pdf
      s.load()
    }
    // 重新加载
    // if (s.init) {
    //   s.page = 0
    //   s.wrapper.innerHTML = ''
    //   s.updateParams(params)
    //   s.init()
    // }
  }
  s.update()
  /* --------------------
  Methods
  -------------------- */
  // 提供给外部使用的工具方法: 获取pdf信息, params: {onSuccess: func(s), onError: func(s, {errMsg})}
  s.getPDF = function (src, params = {}) {
    s.loadPDFScript({
      onSuccess: function () {
        var param = s.getDocumentParam(src)
        // base64访问, 直接读取data, 不需要发请求
        if (src.indexOf('data:application/pdf;base64,') === 0) {
          var data = src.replace('data:application/pdf;base64,', '')
          data = s.convertBase64ToBinary(data)
          param = {
            data: data
          }
        }
        window.PDFJS.getDocument(param)
          .then(function (pdf) {
            // eslint-disable-line
            s.pdf = pdf // 设置pdf
            s.pdf
              .getPage(1)
              .then((page) => {
                let viewport = page.getViewport(1)
                if (params.onSuccess)
                  params.onSuccess(s, {
                    total: s.pdf.numPages,
                    width: viewport.width,
                    height: viewport.height
                  })
              })
              .catch((err) => {
                console.log(err)
                s.showError()
                if (params.onError) params.onError(s, { errMsg: '读取PDF页面失败' })
              })
          })
          .catch(function (error) {
            console.log(error)
            s.showError()
            if (params.onError) params.onError(s, { errMsg: 'pdf格式不正确' })
          })
      },
      onError: params.onError
    })
  }
  // 获取所有元素
  s.getPageElements = function () {
    var pagesDOM = s.wrapper.querySelectorAll('.' + s.params.pageClass)
    // 提取页面中元素
    var elements = []
    for (let [page, pageDOM] of pagesDOM.entries()) {
      for (let elDOM of pageDOM.querySelectorAll('.' + s.params.elementClass)) {
        elements.push({
          page: page + 1,
          $el: elDOM
        })
      }
    }
    // 合并传入的数据再返回
    return s.params.pageElements.map((pageElement) => {
      for (let element of elements) {
        if (element.page === pageElement.page) {
          // eslint-disable-line
          return Object.assign(pageElement, element)
        }
      }
      return pageElement
    })
  }
  // 更新渲染的所有页面元素
  s.updatePageElements = function () {
    // 清空所有插入元素
    let elementBoxes = s.wrapper.querySelectorAll('.' + s.params.elementsClass)
    for (let elementBox of elementBoxes) {
      elementBox.innerHTML = ''
    }
    // 插入新的元素
    var pagesDOM = s.wrapper.querySelectorAll('.' + s.params.pageClass)
    for (let [page, pageDOM] of pagesDOM.entries()) {
      s.renderPageElements(page + 1, pageDOM)
    }
  }
  // 渲染页面元素
  s.renderPageElements = function (page, pageDOM) {
    if (!s.params.pageElements || !s.params.pageElements.length) {
      return
    }
    // 提取此页的元素
    var elements = []
    for (var pageElement of s.params.pageElements) {
      // eslint-disable-next-line
      if (pageElement.page == page && pageElement.HTML && typeof pageElement.HTML === 'string') {
        elements.push(pageElement)
      }
    }
    // 元素容器
    var elementsDOM = pageDOM.querySelector('.' + s.params.elementsClass)
    if (!elementsDOM) return
    elementsDOM.innerHTML = ''
    // 渲染此页的元素
    for (var element of elements) {
      var el = document.createElement('div')
      el.innerHTML = element.HTML || ''
      el.setAttribute(
        'style',
        `position: absolute; top: ${element.x || 0}px; left: ${element.y || 0}px;`
      )
      el.setAttribute('class', `${s.params.elementClass}`)
      elementsDOM.appendChild(el)
    }
  }
  // base64编码转成流
  s.convertBase64ToBinary = function (base64) {
    var raw = window.atob(base64) // 这个方法在ie内核下无法正常解析。
    var rawLength = raw.length
    // 转换成pdf.js能直接解析的Uint8Array类型
    var array = new Uint8Array(new ArrayBuffer(rawLength))
    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i) & 0xff
    }
    return array
  }
  // 设置绘制区域宽高, 计算宽高比例
  s.scale = 1
  s.updateScale = function (pageDOM) {
    // 计算实际宽高与适应宽高比例
    s.scale = s.wrapper.clientWidth / s.width

    // 计算当前适应宽高
    s.pageWidth = s.width * s.scale
    s.pageHeight = s.height * s.scale

    // 设置页面的适应宽高
    if (pageDOM) {
      pageDOM.style.width = s.pageWidth + 'px'
      pageDOM.style.height = s.pageHeight + 'px'
    }
    // 设置绘制容器实际宽高
    var drawBox = pageDOM.querySelector('.' + s.params.drawClass)
    if (drawBox) {
      drawBox.style.width = s.width + 'px'
      drawBox.style.height = s.height + 'px'
    }
    // 设置canvas实际宽高
    var canvas = pageDOM.querySelector('.' + s.params.drawClass + '>.' + s.params.canvasClass)
    if (canvas) {
      canvas.height = s.height
      canvas.width = s.width
    }
    // img实际宽高
    var img = pageDOM.querySelector('.' + s.params.drawClass + '>.' + s.params.imgClass)
    if (img) {
      img.style.width = s.width + 'px'
      img.style.height = s.height + 'px'
    }

    // 设置绘制容器适应缩放
    drawBox.style.WebkitTransform = `scale(${s.scale})`
    drawBox.style.WebkitTransformOrigin = `0 0`
  }
  // 隐藏page内的元素
  s.hidePage = function (pageDOM) {
    // 隐藏绘制区域
    var draw = pageDOM.querySelector('.' + s.params.drawClass)
    draw.classList.add(s.params.hideClass)
    // 隐藏canvas
    var canvas = pageDOM.querySelector('.' + s.params.canvasClass)
    canvas.classList.add(s.params.hideClass)
    // 隐藏img
    var img = pageDOM.querySelector('.' + s.params.imgClass)
    img.classList.add(s.params.hideClass)
    // 隐藏load
    var load = pageDOM.querySelector('.' + s.params.loadClass)
    load.classList.add(s.params.hideClass)
    load.innerHTML = s.params.loadHTML
    // 隐藏error
    var error = pageDOM.querySelector('.' + s.params.errorClass)
    error.classList.add(s.params.hideClass)
    error.innerHTML = s.params.errorHTML
    // 隐藏nodata
    var nodata = pageDOM.querySelector('.' + s.params.nodataClass)
    nodata.classList.add(s.params.hideClass)
    nodata.innerHTML = s.params.nodataHTML
  }
  // 显示page内error
  s.showPageError = function (pageDOM) {
    s.hidePage(pageDOM)
    var error = pageDOM.querySelector('.' + s.params.errorClass)
    error.classList.remove(s.params.hideClass)
  }
  // 显示page内load
  s.showPageLoad = function (pageDOM) {
    s.hidePage(pageDOM)
    var load = pageDOM.querySelector('.' + s.params.loadClass)
    load.classList.remove(s.params.hideClass)
  }
  // 显示page内canvas
  s.showPageCanvas = function (pageDOM) {
    s.hidePage(pageDOM)
    var draw = pageDOM.querySelector('.' + s.params.drawClass)
    draw.classList.remove(s.params.hideClass)
    var canvas = pageDOM.querySelector('.' + s.params.canvasClass)
    canvas.classList.remove(s.params.hideClass)
  }
  // 显示page内img
  s.showPageImg = function (pageDOM) {
    s.hidePage(pageDOM)
    var draw = pageDOM.querySelector('.' + s.params.drawClass)
    draw.classList.remove(s.params.hideClass)
    var img = pageDOM.querySelector('.' + s.params.imgClass)
    img.classList.remove(s.params.hideClass)
  }
  // 显示page内nodata
  s.showPageNodata = function (pageDOM) {
    s.hidePage(pageDOM)
    var nodata = pageDOM.querySelector('.' + s.params.nodataClass)
    nodata.classList.remove(s.params.hideClass)
  }
  // 截取已有页面, 防止更新时上次的页面大于此次页面长度(暂无没用到)
  s.totalPagesSlice = function () {
    var pages = s.wrapper.querySelectorAll('.' + s.params.pageClass)
    var pagesLen = pages.length
    function removeLastPage() {
      if (pagesLen <= s.total) {
        return
      }
      pages[pages.length - 1].parentNode.removeChild(pages[pages.length - 1])
      pagesLen--
      removeLastPage()
    }
    removeLastPage()
  }
  // 创建一页
  s.createPage = function (pageIndex) {
    // 判断此页是否已经创建
    var pages = s.wrapper.querySelectorAll('.' + s.params.pageClass)
    if (pages[pageIndex - 1]) return pages[pageIndex - 1]
    // page容器
    var page = document.createElement('div')
    page.setAttribute('class', s.params.pageClass + ' ' + s.params.pageFeatureClass)
    // draw绘制容器
    var drawBox = document.createElement('div')
    drawBox.setAttribute('class', s.params.drawClass)
    page.appendChild(drawBox)
    // canvas用于渲染pdf单页, 并生成img
    var canvas = document.createElement('canvas')
    canvas.setAttribute('class', s.params.canvasClass)
    drawBox.appendChild(canvas)
    // img
    var img = document.createElement('img')
    img.setAttribute('class', s.params.imgClass)
    drawBox.appendChild(img)
    // 元素容器
    var elements = document.createElement('div')
    elements.setAttribute('class', s.params.elementsClass)
    drawBox.appendChild(elements)
    // load
    var load = document.createElement('div')
    load.setAttribute('class', s.params.loadClass)
    load.innerHTML = s.params.loadHTML
    page.appendChild(load)
    // error
    var error = document.createElement('div')
    error.setAttribute('class', s.params.errorClass + ' ' + s.params.hideClass)
    error.innerHTML = s.params.errorHTML
    page.appendChild(error)
    // nodata
    var nodata = document.createElement('div')
    nodata.setAttribute('class', s.params.nodataClass + ' ' + s.params.hideClass)
    nodata.innerHTML = s.params.nodataHTML
    page.appendChild(nodata)

    // 添加到容器
    if (s.wrapper) s.wrapper.appendChild(page)

    return page
  }
  // 显示暂无数据
  s.showNoData = function () {
    // Callback onLoad
    if (s.params.onLoad) s.params.onLoad(s)
    // 页面显示暂无数据
    s.wrapper.innerHTML = ''
    var pageDOM = s.createPage()
    s.showPageNodata(pageDOM)
  }
  // 预览失败
  s.showError = function () {
    // Callback onLoad
    if (s.params.onLoad) s.params.onLoad(s)
    if (!s.wrapper) return
    // 页面显示错误
    s.wrapper.innerHTML = ''
    var pageDOM = s.createPage()
    s.showPageError(pageDOM)
  }
  // canvas转成图片
  s.canvasToPng = function (canvas) {
    var dataURL = canvas.toDataURL('image/png', 1.0)
    return dataURL
  }
  // 加载
  s.load = function () {
    if (!s.container) return
    if (!s.wrapper) {
      console.warn('SeedsUI Warn: wrapper为空')
      return
    }
    // 过滤无效的图片
    if (s.params.pictures) {
      s.pictures = s.params.pictures.filter(function (picture) {
        if (picture) return true
        return false
      })
    }
    if (s.pictures && s.pictures.length) {
      // Img加载
      s.loadImg()
    } else if (s.params.src) {
      // PDF加载
      s.loadPDFScript({
        onSuccess: s.loadPDF,
        onError: s.showNoData
      })
    } else {
      s.showNoData()
    }
  }
  // 加载PDF的库
  s.loadPDFScript = function (params = {}) {
    if (!s.params.pdfLib || !s.params.pdfWorkLib) {
      console.log('SeedsUI: 请先加载pdf资源库')
      return
    }
    var scriptPdf = document.getElementById('_seedsui_pdfview_lib_')
    var scriptPdfWork = document.getElementById('_seedsui_pdfview_work_')
    if (
      scriptPdf &&
      scriptPdfWork &&
      scriptPdf.getAttribute('data-complete') === '1' &&
      scriptPdfWork.getAttribute('data-complete') === '1'
    ) {
      if (params.onSuccess) params.onSuccess(s)
      return
    }
    try {
      scriptPdf = document.createElement('script')
      scriptPdf.id = '_seedsui_pdfview_lib_'
      scriptPdf.type = 'text/javascript'
      scriptPdf.src = s.params.pdfLib

      scriptPdfWork = document.createElement('script')
      scriptPdfWork.id = '_seedsui_pdfview_work_'
      scriptPdfWork.type = 'text/javascript'
      scriptPdfWork.src = s.params.pdfWorkLib
      document.body.appendChild(scriptPdf)
      document.body.appendChild(scriptPdfWork)
      var loadCount = 0
      scriptPdf.onload = function () {
        scriptPdf.setAttribute('data-complete', '1')
        if (!loadCount) loadCount = 1
        else loadCount++
        if (loadCount === 2) {
          if (params.onSuccess) params.onSuccess(s)
        }
      }
      scriptPdfWork.onload = function () {
        scriptPdfWork.setAttribute('data-complete', '1')
        if (!loadCount) loadCount = 1
        else loadCount++
        if (loadCount === 2) {
          if (params.onSuccess) params.onSuccess(s)
        }
      }
    } catch (error) {
      console.log('SeedsUI: pdfjs库加载失败')
      console.log(error)
      s.showError()
      if (params.onError) params.onError(s, { errMsg: 'pdfjs库加载失败' })
    }
  }
  // 构建PDFJS的参数
  s.getDocumentParam = function (src) {
    // 地址访问, 发请求获取地址
    var param = src
    // base64访问, 直接读取data, 不需要发请求
    if (src.indexOf('data:application/pdf;base64,') === 0) {
      var data = src.replace('data:application/pdf;base64,', '')
      data = s.convertBase64ToBinary(data)
      param = {
        data: data
      }
    }
    return param
  }
  // 初始化pdf文件
  s.pdf = null
  s.loadPDF = function () {
    if (!window.PDFJS) {
      // eslint-disable-line
      console.log('SeedsUI: PDFJS未加载')
      return
    }
    // 设置cMapUrl, 解决中文不显示的问题
    if (s.params.cMapUrl) {
      window.PDFJS.disableRange = true // eslint-disable-line
      window.PDFJS.cMapUrl = s.params.cMapUrl // eslint-disable-line
      window.PDFJS.cMapPacked = true // eslint-disable-line
    }
    // 地址访问, 发请求获取地址
    var param = s.getDocumentParam(s.params.src)
    window.PDFJS.getDocument(param)
      .then(function (pdf) {
        // eslint-disable-line
        if (!s.wrapper) return
        s.pdf = pdf // 设置pdf
        s.total = s.pdf.numPages // 总页数
        s.rows = !s.params.rows || s.params.rows > s.total ? s.total : s.params.rows
        console.log('是否一次性加载' + (s.rows === s.total))

        s.addPages()
      })
      .catch(function (error) {
        console.log('SeedsUI: pdf格式不正确')
        console.log(error)
        s.showError()
      })
  }

  // 加载图片
  s.loadImg = function () {
    s.total = s.pictures.length
    s.rows = !s.params.rows || s.params.rows > s.total ? s.total : s.params.rows
    console.log('是否一次性加载' + (s.rows === s.total))
    s.addPages()
  }

  // 加载下一页, 索引从1开始
  s.addPages = function () {
    if (s.page * s.rows >= s.total) {
      console.log('pdf所有页面加载完成, 不需要再加载了')
      return
    }
    s.page++
    s.completeCount = 0
    let index = 1 // 起始索引
    let rows = s.rows // 每页显示条数
    let len = s.total // 结束索引
    if (rows) {
      // 如果有rows则走分页
      len = s.page * rows
      index = len - rows + 1
      if (len > s.total) len = s.total
    }
    for (let i = index; i <= len; i++) {
      // 图片分页
      if (s.pictures) {
        // 创建页
        var pageDOM = s.createPage(i)
        pageDOM.setAttribute(s.params.pageAttr, i)
        var img = pageDOM.querySelector('img')
        // 设置图片路径
        img.src = s.pictures[i - 1]
        img.addEventListener('load', s.onLoad, false)
        img.addEventListener('error', s.onError, false)
        continue
      }
      // pdf文件分页
      s.pdf
        .getPage(i)
        .then((page) => {
          let viewport = page.getViewport(1)
          // 创建页
          let pageDOM = s.createPage(i)
          pageDOM.setAttribute(s.params.pageAttr, i)

          // 获取pdf实际宽高
          s.width = viewport.width
          s.height = viewport.height
          // 设置适应当前容器
          s.updateScale(pageDOM)

          // canvas
          let canvas = pageDOM.querySelector('canvas')
          let context = canvas.getContext('2d')
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          let renderTask = page.render(renderContext)
          renderTask.promise
            .then(() => {
              s.onLoad({ target: canvas })
            })
            .catch((err) => {
              s.onLoad({ target: canvas }, true)
              console.log('SeedsUI: 渲染PDF第' + i + '页失败')
              console.log(err)
            })
        })
        .catch((err) => {
          s.completeCount++
          console.log('SeedsUI: 读取PDF第' + i + '页失败')
          console.log(err)
        })
    }
  }
  // 加载完成或失败事件
  s.total = 0 // 总页数
  s.page = 0 // 当前页数, 因为当执行addPages或者addPages时会先s.page++, 实际页数是从1开始的
  s.rows = 0
  s.completeCount = 0 // 完成页数
  s.onLoad = function (e, isError) {
    var target = e.target // canvas或者img
    var targetType = target.tagName === 'IMG' ? 'img' : 'canvas'
    var pageDOM = target.parentNode.parentNode
    var page = pageDOM ? pageDOM.getAttribute(s.params.pageAttr) : 'page'
    // 显示此页Error层
    if (isError) {
      console.log('第' + page + '页加载失败')
      pageDOM && pageDOM.setAttribute(s.params.completeAttr, '0') // 0为加载失败
      s.showPageError(pageDOM)
    } else {
      console.log('第' + page + '页加载完成')
      pageDOM && pageDOM.setAttribute(s.params.completeAttr, '1') // 1为加载成功
      if (targetType === 'img') s.showPageImg(pageDOM)
      else s.showPageCanvas(pageDOM)
      // 图片类型需要设置原始宽高比例, 以方便外界调用计算
      if (targetType === 'img') {
        s.width = target.naturalWidth
        s.height = target.naturalHeight
        // 设置适应当前容器
        s.updateScale(pageDOM)
      }
      // 渲染对应页的元素
      s.renderPageElements(page, pageDOM)
    }
    s.event = e
    // Callback onPageLoad
    if (s.params.onPageLoad) s.params.onPageLoad(s)
    // 全部加载完成回调
    s.completeCount++
    if (s.completeCount === (s.rows || s.total)) {
      // 如果有分页走分页比较
      // Callback onLoad
      if (s.params.onLoad) s.params.onLoad(s)
    }
  }
  // 图片加载失败事件
  s.onError = function (e) {
    s.onLoad(e, true)
  }
  /* --------------------
  Init
  -------------------- */
  // 主函数
  s.init = function () {
    s.load()
    // Callback onInit
    if (s.params.onInit) s.params.onInit(s)
  }
  // 执行主函数
  s.init()
  //  Return slider instance
  return s
}

export default PDFView
