// Tree 树结构 (require PrototypeArray.js PrototypeString.js addClass)
var Tree = function (container, params) {
  function getElementByParent (parent, selector) {
    return (typeof selector === 'string' && selector !== '') ? parent.querySelector(selector) : selector
  }
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null, // [{id: '', name: '', parentid: ''}]
    selectedAutoClear: false, // 自动清理不存在的选中节点
    // DOM
    multiple: true, // 是否需要多选
    checkbox: false, // 是否可选
    checkStrictly: true, // 严格模式, 父子节点选中状态不再关联
    arrowAutoShow: false, // 箭头自动显示, 有下级时才显示箭头
    bar: null,
    barOptionClass: 'tree-bar-button',
    barButtonDelClass: 'tree-bar-button-del',

    extendClass: 'extend',
    activeClass: 'active',

    treeClass: 'tree',
    lineClass: 'tree-line', // 行
    titleClass: 'tree-title', // 标题
    arrowClass: 'tree-icon-arrow',
    iconClass: 'tree-icon', // 左侧图标

    buttonAddHTML: '', // HTML添加按钮
    buttonAddClass: 'tree-button-add', // 默认添加按钮
    buttonAddSrc: '', // 图标添加按钮
    buttonDelHTML: '', // HTML删除按钮
    buttonDelClass: 'tree-button-del', // 默认删除按钮
    buttonDelSrc: '', // 图标删除按钮

    idAttr: 'data-id',
    parentidAttr: 'data-parentid',
    nameAttr: 'data-name',
    dataAttr: 'data-node'

    /*
    callbacks
    onClick:function(Tree)
    onClickLeaf:function(Tree)
    onClickAdd: function(option)
    onClickDel: function(option)
    onChange: function (Tree)
    onData:function(option)
    */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Tree
  var s = this

  // Params
  s.params = params

  // Container
  s.container = getElementByParent(document, container)
  if (!s.container) {
    console.log('SeedsUI Error：未找到Tree的DOM对象，请检查传入参数是否正确')
    return
  }

  // Bar
  s.updateBar = function () {
    if (s.params.bar) {
      s.bar = getElementByParent(document, s.params.bar)
      if (!s.bar) {
        console.log('SeedsUI Error：未找到Bar的DOM对象，请检查传入参数是否正确')
        return
      } else {
        // 点击选中容器
        s.bar.removeEventListener('click', s.onClickBar, false)
        s.bar.addEventListener('click', s.onClickBar, false)
      }
    }
  }

  // Selected
  s.selected = {}
  // 异步渲染时需要用临时数据, 所以设置_data用于渲染
  var _data = s.params.data
  // 判断当前id节点下是否有子节点
  s.hasChildren = function (id) {
    for (var i = 0; i < _data.length; i++) {
      var option = _data[i]
      if (option.parentid === id) return true
    }
    return false
  }
  // 构建项
  s.buildOption = function (option) {
    // 如果设置自动显隐箭头, 则判断当前项是否有下级节点
    if (s.params.arrowAutoShow) {
      if (s.hasChildren(option.id)) {
        delete option.isLeaf
      } else {
        option.isLeaf = true
      }
    }
    // 拷贝option，方便传入回调中而不影响原option
    var copyOption = Object.clone(option)
    // line的data-xxx属性html
    var lineDataHTML = ''
    if (typeof option === 'object' && Object.keys(option).length) {
      lineDataHTML += `${s.params.dataAttr}="${encodeURIComponent(JSON.stringify(option))}" ${s.params.idAttr}="${option.id}"`
    }
    // for (var n in option) {
    //   lineDataHTML += 'data-' + n + '="' + option[n] + '" '
    // }
    // tree-icon和tree-title的html
    copyOption.html = '<div class="' + s.params.iconClass + '">' +
      (s.params.arrowAutoShow && option.isLeaf ? '' : '<i class="' + s.params.arrowClass + '"></i>') +
      '</div>' +
      '<div class="' + s.params.titleClass + '">' + option.name + '</div>'
    // Callback onData
    if (s.params.onData) s.params.onData(copyOption)

    var li = document.createElement('li')

    // tree-btnadd
    var btnHTML = ''
    var addBtnHTML = ''
    var delBtnHTML = ''
    if (s.params.checkbox) {
      // if (!s.selected[option.id]) {
        // 添加按钮
        if (s.params.buttonAddHTML) {
          addBtnHTML = s.params.buttonAddHTML
        } else if (s.params.buttonAddSrc) {
          addBtnHTML = '<span class="' + s.params.buttonAddClass + '" style="background-image:url(' + s.params.buttonAddSrc + ')"></span>'
        } else {
          addBtnHTML = '<span class="' + s.params.buttonAddClass + '"></span>'
        }
        // 删除按钮
        if (s.params.buttonDelHTML) {
          delBtnHTML = s.params.buttonDelHTML
        } else if (s.params.buttonDelSrc) {
          delBtnHTML = '<span class="' + s.params.buttonDelClass + '" style="background-image:url(' + s.params.buttonDelSrc + ')"></span>'
        } else {
          delBtnHTML = '<span class="' + s.params.buttonDelClass + '"></span>'
        }
        // 如果html没有添加和删除样式,则默认增加添加和删除样式,用于后续的点击操作识别
        if (addBtnHTML && !addBtnHTML.hasClass(s.params.buttonAddClass)) addBtnHTML.addClass(s.params.buttonAddClass)
        if (delBtnHTML && !delBtnHTML.hasClass(s.params.buttonDelClass)) delBtnHTML.addClass(s.params.buttonDelClass)
        // 合成html
        btnHTML = addBtnHTML + delBtnHTML
      // }
    }

    // 严格模式下, 父级和当前都被选中,则移除当前选中项
    if (s.params.checkStrictly && s.isSelected(option.id, option.parentid) === 2) {
      s.removeSelected(option.id)
    }

    // 生成完整的html
    var html = '<div class="' + s.params.lineClass + '" ' + lineDataHTML + '>' + copyOption.html + btnHTML + '</div>'
    if (s.selected[option.id]) {
      html = '<div class="' + s.params.lineClass + ' ' + s.params.activeClass + '" ' + lineDataHTML + '>' + copyOption.html + btnHTML + '</div>'
    }
    li.innerHTML = html
    
    return li
  }
  s.initData = function (id, ulContainer) { // 指定的部门id，根节点为-1
    var children = _data.getFlattenTreeChildren(id)
    if (children && children.length) { // 子节点
      for (var i = 0, option; option = children[i++];) { // eslint-disable-line
        var li = s.buildOption(option)
        // 在li项里再增加一个ul用于承载子节点
        var ul = document.createElement('ul')
        li.appendChild(ul)
        // 把li项放入容器
        ulContainer.appendChild(li)
        s.initData(option.id, ul)
      }
    }
  }
  s.update = function () {
    s.container.innerHTML = ''
    if (!s.params.data || !s.params.data.length) {
      console.log('SeedsUI Warn：未找到Tree的Data数据，可在初始化时传入data参数，或者通过setData方法设置数据')
      return
    }
    // if (!s.params.data[0].id || !s.params.data[0].parentid || !s.params.data[0].name) {
    if (!s.params.data[0].hasOwnProperty('id') || !s.params.data[0].name) { // 有些根节点没有parentid, 有些根节点(例如: 全部)id为空
      console.log('SeedsUI Error：Tree的Data数据格式不正确，请检查data参数是否有id、name、parentid属性')
      return
    }
    // 数据格式化, 没有parentid的补上parentid
    s.rootParentIds = s.params.data.getFlattenTreeRootIds()
    _data = s.params.data
    s.updateBar()
    for (let rootParentId of s.rootParentIds) {
      s.initData(rootParentId, s.container) // 根节点
    }
  }
  // s.update() // 改为由外部调用渲染数据
  /* ------------------
    Method
    ------------------ */
  s.setData = function (data) {
    _data = s.params.data = data
  }
  // 添加数据
  s.addData = function (data, id, childNode) {
    if (!Array.isArray(data)) return
    // 修改原数据
    if (Array.isArray(s.params.data) && s.params.data.length) {
      s.params.data = s.params.data.concat(data)
    }
    _data = data
    s.initData(id, childNode)
  }
  // 获得数据
  s.getDataByTarget = function (target) {
    var opts = target.getAttribute(s.params.dataAttr)
    if (opts.length) {
      opts = JSON.parse(decodeURIComponent(opts))
    } else {
      opts = {}
    }
    return opts
  }
  // 危险: 获得所有父节点, 到根截止, 如果根节点parentid不正确将进入死循环
  // s.getParentOptions = function (parentid) { // 已使用getFlattenTreePredecessors代替
  //   console.log(s.rootParentIds)
  //   var parentOptions = []
  //   var currentId = parentid
  //   while (s.rootParentIds.indexOf(currentId) !== -1) { // 提取所有父级节点
  //     debugger
  //     for (var i = 0, opt; opt = s.params.data[i++];) { // eslint-disable-line
  //       if (opt.id === currentId) {
  //         parentOptions.push(opt)
  //         currentId = opt.parentid
  //         break;
  //       }
  //     }
  //   }
  //   return parentOptions
  // }
  // 当前被选中返回1，父级被选中返回-1，当前和父级都被选中返回2，没有被选中返回0
  s.isSelected = function (id, parentid) {
    var currentFlag = false
    var parentFlag = false

    // 判断当前数据中是否有此父级, 如果没有父级, 则删除此选中节点
    if (s.params.selectedAutoClear) {
      var hasParentIdNode = false
      for (var i = 0, opt; opt = s.params.data[i++];) { // eslint-disable-line
        if (opt.id === parentid) {
          hasParentIdNode = true
          break
        }
      }

      if (!hasParentIdNode) {
        delete s.selected[parentid]
      }
    }

    // 判断当前和父级是否被选中
    if (s.selected[id]) {
      currentFlag = true
    }

    // 父级选中也认为是被选中
    if (s.selected[parentid]) {
      parentFlag = true
    }

    // 判断树中是否存在此节点,比较id和parentid
    var hasNode = false
    if (!s.params.data || !s.params.data.length) return 0
    for (var i = 0, opt; opt = s.params.data[i++];) { // eslint-disable-line
      if (opt.id === id && opt.parentid === parentid) {
        hasNode = true
        break
      }
    }
    if (!hasNode) return 0

    // 向上查询是否已添加到选中项，一直查到顶级
    var parentNodes = s.params.data.getFlattenTreePredecessors(parentid)
    for (var opt of parentNodes) { // eslint-disable-line
      if (s.selected[opt.id]) {
        parentFlag = true
        break
      }
    }

    if (currentFlag && parentFlag) return 2
    if (currentFlag) return 1
    if (parentFlag) return -1
    return 0
  }

  // Json是否为空
  s.isEmptyJson = function (json) {
    var temp = ''
    for (var j in json) {
      temp += j
    }
    if (temp === '') return true
    return false
  }
  // 创建选中项
  s.createBarOption = function (id, name, parentid) {
    var div = document.createElement('span')
    div.setAttribute('class', s.params.barOptionClass)
    div.setAttribute(s.params.idAttr, id)
    if (parentid) div.setAttribute(s.params.parentidAttr, parentid)
    div.setAttribute(s.params.nameAttr, name)

    var label = document.createElement('label')
    label.innerHTML = name

    var del = document.createElement('a')
    del.classList.add(s.params.barButtonDelClass)

    div.appendChild(label)
    div.appendChild(del)
    return div
  }
  // 删除选中项
  s.removeSelected = function (id, isClick) {
    if (s.selected[id]) {
      // 删除数组
      delete s.selected[id]
      // 删除bar上元素
      if (s.bar) {
        var barOption = s.bar.querySelector('[' + s.params.idAttr + '="' + id + '"]')
        if (barOption) s.bar.removeChild(barOption)
      }
      // 清空树上的选中状态
      var node = s.container.querySelector('[' + s.params.idAttr + '="' + id + '"]')
      if (node) node.classList.remove(s.params.activeClass)
    }
    if (isClick && s.params.onChange) {
      console.log('删除节点')
      s.checkStrictly(id, 0)
      s.params.onChange(s)
    }
  }
  s.removeAllSelected = function () {
    for (var id in s.selected) {
      s.removeSelected(id)
    }
    if (s.bar) s.hideBar()
  }
  s.collapseAll = function () {
    var elements = s.container.querySelectorAll('.' + s.params.extendClass)
    for (var i = 0, el; el = elements[i++];) { // eslint-disable-line
      el.classList.remove(s.params.extendClass)
    }
  }
  s.extendAll = function () {
    var elements = s.container.querySelectorAll('.' + s.params.lineClass)
    for (var i = 0, el; el = elements[i++];) { // eslint-disable-line
      el.classList.add(s.params.extendClass)
    }
  }
  s.addSelected = function (opts, isClick) {
    if (!opts.id || !opts.name) {
      console.log('addSelected:id、name个参数不正确')
      return
    } else if (!opts.parentid) {
      // 严格模式下必须包含parentid
      if (s.params.checkStrictly && !opts.parentid) {
        console.log('addSelected:parentid三个参数不正确')
        return
      }
    }
    
    // 如果禁止多选, 则只先移除所有选中
    if (!s.params.multiple) s.removeAllSelected()

    if (s.selected[opts.id]) {
      console.log('addSelected:您要选中的节点已经选中')
      return
    }
    // 严格模式下不允许选中已选中父节点的子节点
    if (s.params.checkStrictly && s.isSelected(opts.id, opts.parentid)) {
      console.log('addSelected:您要选中的节点已经选中')
      return
    }

    // bar上添加选中
    s.addBarOption(opts)

    // tree中激活选中
    var treeOption = s.container.querySelector('[' + s.params.idAttr + '="' + opts.id + '"]')
    if (treeOption) treeOption.classList.add(s.params.activeClass)

    // s.selected中添加选中
    s.selected[opts.id] = opts

    if (isClick && s.params.onChange) {
      console.log('选中节点')
      s.checkStrictly(opts.id)
      s.params.onChange(s)
    }
  }
  // 非严格模式, 新增或者删除后代节点
  s.checkStrictly = function (id, type) {
    // 严格模式, 父子节点选中状态不再关联
    if (s.params.checkStrictly || !s.selected) return
    let descendants = s.params.data.getFlattenTreeDescendants(id)
    for (let node of descendants) {
      if (type === 0) {
        s.removeSelected(node.id)
      } else {
        s.addSelected(node)
      }
    }
  }
  // bar上添加选中
  s.addBarOption = function (opts) {
    if (s.bar) {
      var barOption = s.createBarOption(opts.id, opts.name, opts.parentid)
      s.bar.appendChild(barOption)
      s.showBar()
    }
  }
  // 显示选中项
  s.showBar = function () {
    s.bar.classList.add(s.params.activeClass)
  }
  // 隐藏选中项
  s.hideBar = function () {
    s.bar.classList.remove(s.params.activeClass)
  }

  s.reset = function () {
    s.removeAllSelected()
    s.collapseAll()
  }
  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.isSupportTouch = 'ontouchstart' in window
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener'
    // 点击树,touch兼容pc事件
    if (s.isSupportTouch) {
      s.container[action]('touchstart', s.onTouchStart, false)
      s.container[action]('touchend', s.onTouchEnd, false)
    } else {
      s.container[action]('click', s.onClickTree, false)
    }
  }
  // attach、dettach事件
  s.attach = function (event) {
    s.events()
  }
  s.detach = function (event) {
    s.events(true)
  }
  /* ------------------
    Event Handler
    ------------------ */
  // Tap
  s.touches = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0,
  }
  s.onTouchStart = function (e) {
    s.touches.startX = e.touches[0].clientX
    s.touches.startY = e.touches[0].clientY
  }
  s.onTouchEnd = function (e) {
    s.touches.endX = e.changedTouches[0].clientX
    s.touches.endY = e.changedTouches[0].clientY
    s.touches.diffX = s.touches.startX - s.touches.endX
    s.touches.diffY = s.touches.startY - s.touches.endY
    // 单击事件
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      s.onClickTree(e)
    }
  }
  // 点击树
  s.onClickTree = function (e) {
    s.event = e
    // 点击树
    s.targetLi = null
    s.targetLine = null

    if (e.target.classList.contains(s.params.lineClass)) { // 点击二级
      s.targetLine = s.target
      s.targetLi = e.target.parentNode
    } else if (e.target.classList.contains(s.params.iconClass) ||
      e.target.classList.contains(s.params.titleClass)) { // 点击三级
      s.targetLine = e.target.parentNode
      s.targetLi = e.target.parentNode.parentNode
    }
    if (e.target.classList.contains(s.params.buttonAddClass)) { // 点击添加
      s.onClickBtnAdd(e)
    } else if (e.target.classList.contains(s.params.buttonDelClass)) { // 点击删除
      s.onClickBtnDel(e)
    } else if (s.targetLine) { // 点击其它元素,但s.targetLine存在的情况下
      // 展开与收缩
      s.targetLine.classList.toggle(s.params.extendClass)
      if (!s.targetLine.nextElementSibling) return
      var lines = s.targetLine.nextElementSibling.querySelectorAll('li > .' + s.params.lineClass)
      /* eslint-disable */
      for (var i = 0, line; line = lines[i++];) {
        if (s.selected[line.getAttribute(s.params.idAttr)]) {
          line.classList.add(s.params.activeClass)
        }
      }
      /* eslint-enable */
      s.isLeaf = false
      // Callback onClickLeaf(点击底层)
      if ((!s.targetLine.nextElementSibling || !s.targetLine.nextElementSibling.hasChildNodes())) {
        if (s.params.onClickLeaf) s.params.onClickLeaf(s)
        s.isLeaf = true
      }
      // Callback onClick
      if (s.params.onClick) s.params.onClick(s)
    } else {
      // Callback onClick
      if (s.params.onClick) s.params.onClick(s)
    }
    e.stopPropagation()
  }
  // 点击添加按钮
  s.onClickBtnAdd = function (e) {
    s.event = e
    // 选中项
    var elLine = e.target.parentNode
    var opts = s.getDataByTarget(elLine)

    // 删除子级
    var elLines = elLine.parentNode.querySelectorAll('.' + s.params.lineClass)
    /* eslint-disable */
    for (var i = 0, el; el = elLines[i++];) {
      var elId = el.getAttribute(s.params.idAttr)
      s.removeSelected(elId)
    }
    /* eslint-enable */
    // 显示此级
    elLine.classList.add(s.params.activeClass)
    /*
    var id=elLine.getAttribute(s.params.idAttr)
    var name=elLine.getAttribute(s.params.nameAttr)
    var parentid=elLine.getAttribute(s.params.parentidAttr)
    */
    // 添加到s.selected
    s.addSelected(opts, true)
    // Callback onClickAdd
    if (s.params.onClickAdd) s.params.onClickAdd(opts, s)
  }
  // 点击bar
  s.onClickBar = function (e) {
    if (e.target.classList.contains(s.params.barButtonDelClass)) {
      s.onClickBtnDel(e)
    }
  }
  // 点击删除按钮
  s.onClickBtnDel = function (e) {
    s.event = e
    s.option = e.target.parentNode
    // 选中选中项
    var id = s.option.getAttribute(s.params.idAttr)
    var opts = s.selected[id]

    s.removeSelected(id, true)
    // 如果为空，则隐藏选中容器
    if (s.isEmptyJson(s.selected)) {
      if (s.bar) s.hideBar()
    }
    // Callback onClickDel
    if (s.params.onClickDel) s.params.onClickDel(opts, s)
  }

  // 主函数
  s.init = function () {
    s.attach()
  }
  s.init()
}

export default Tree
