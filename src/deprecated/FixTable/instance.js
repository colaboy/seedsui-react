// eslint-disable-next-line
export default {
  // 匹配数字
  // matchNumber: function (str) {
  //   return str.match(/[+-]?(0|([1-9][0-9]*))(\.[0-9]+)?/igm)
  // },
  // // 取出单位中的数字
  // getNumberByUnit: function (unit) {
  //   var match = this.matchNumber(unit)
  //   if (match && match[0]) return match[0]
  //   return 0
  // },
  // // 取出padding的宽高
  // elPaddingSize: function (el) {
  //   var style = window.getComputedStyle(el)
  //   // 转成四个值
  //   var padding = style.getPropertyValue('padding')
  //   var paddingLeft = style.getPropertyValue('padding-left') || 0
  //   var paddingRight = style.getPropertyValue('padding-right') || 0
  //   var paddingTop = style.getPropertyValue('padding-top') || 0
  //   var paddingBottom = style.getPropertyValue('padding-bottom') || 0
  //   if (paddingLeft || paddingRight) {
  //     padding = paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft
  //   }
  //   padding = padding.split(' ')
  //   if (padding.length === 1) {
  //     padding = [padding[0], padding[0], padding[0], padding[0]]
  //   } else if (padding.length === 2) {
  //     padding = [padding[0], padding[1], padding[0], padding[1]]
  //   } else if (padding.length === 3) {
  //     padding = [padding[0], padding[1], padding[2], padding[1]]
  //   }
  //   console.log(padding)
  //   // 计算宽高
  //   var width = Number(this.getNumberByUnit(padding[1])) + Number(this.getNumberByUnit(padding[3]))
  //   var height = Number(this.getNumberByUnit(padding[0])) + Number(this.getNumberByUnit(padding[2]))
  //   return {
  //     width: width,
  //     height: height
  //   }
  // },
  // 从小到大排列数组内的数字
  sortFixedNums: function (fixedNums) {
    function sortNumber(a, b) {
      return a - b
    }
    return fixedNums.sort(sortNumber)
  },
  // 单列的实际宽度
  colsWidth: [],
  // 更新容器宽度和内部td的宽度
  updateContainerSize: function (container, frozenLeft, frozenRight) {
    var tbodyTable = container.querySelector('.fixtable-table')
    if (!tbodyTable) return

    // 为所有td增加换行样式
    let tds = [].slice
      .call(container.querySelectorAll('th'))
      .concat([].slice.call(container.querySelectorAll('td')))
    for (let td of tds) {
      if (!td) continue
      // td里必须包裹一层div, 使用div的才能控制宽度, td控制不了固定宽度
      let div = td.querySelector('div')
      if (!div) continue
      // 初始化div, 用于计算
      td.classList.add('nopadding')
      div.classList.add('init')
      // 宽度超过后, 需要强制设置宽度为最大宽度
      if (td.clientWidth < td.scrollWidth) {
        if (td.style.maxWidth) {
          div.style.width = td.style.maxWidth
        } else {
          let width = td.clientWidth
          if (width) {
            div.style.width = width + 'px'
          }
        }
        div.classList.add('wrap')
      }
      // 计算完成后还原div
      td.classList.remove('nopadding')
      div.classList.remove('init')
    }

    // 存储列宽度, 用于固定列时, 计算距离左右的距离
    this.colsWidth = []
    ;[].slice.call(tbodyTable.querySelector('tr').children).forEach((td) => {
      this.colsWidth.push(td.offsetWidth)
    })

    // 左右固定
    if (Array.isArray(frozenLeft) && frozenLeft.length) {
      this.fixed(container, 'left', frozenLeft)
    }
    if (Array.isArray(frozenRight) && frozenRight.length) {
      this.fixed(container, 'right', frozenRight)
    }
  },
  // 更新容器宽度和内部td的宽度: 增加固定样式
  fixed: function (container, position, fixedNums) {
    // 为指定列加上粘性定位
    var trs = container.querySelectorAll('tr')
    ;[].slice.call(trs).forEach((tr) => {
      this.fixedTd(position, tr, fixedNums)
    })
  },
  // 更新容器宽度和内部td的宽度: 增加固定样式 - 固定td, position: 'left || right'
  fixedTd: function (position, tr, fixedNums) {
    fixedNums = this.sortFixedNums(fixedNums)
    if (!tr) return
    let colsWidth = this.colsWidth
    var tds = tr.children
    if (!tds || !tds.length) return
    tds = [].slice.call(tds)
    // 如果是右侧固定, 则需要反转遍历对象
    if (position === 'right') {
      colsWidth = this.colsWidth.reverse()
      tds = tds.reverse()
    }
    tds.forEach((td, colNum) => {
      if (fixedNums.indexOf(colNum) !== -1) {
        td.classList.add('sticky')
        if (colNum === fixedNums[fixedNums.length - 1]) {
          if (position === 'left') {
            td.classList.add(`left-last`)
          } else if (position === 'right') {
            td.classList.add(`right-first`)
          }
        }
        // 计算位置, 遍历位置数*宽度
        let beforeWidth = 0
        if (colNum > 0) {
          for (let i = 0; i < colNum; i++) {
            beforeWidth += colsWidth[i]
          }
        }
        td.style[position] = beforeWidth + 'px'
      }
    })
    // 如果是右侧固定, 完成后需要反转回来
    if (position === 'right') {
      this.colsWidth.reverse()
    }
  },
  // 滚动修改左右滚动样式, 和底部加载
  onScroll: function (container, onBottomRefresh) {
    // 左右滚动样式, 为了显隐投影
    var scrollLeft =
      container === document.body ? document.documentElement.scrollLeft : container.scrollLeft
    var clientWidth = container.clientWidth
    var scrollWidth = container.scrollWidth
    if (clientWidth !== scrollWidth) {
      // 有滚动条的情况
      if (scrollLeft + clientWidth >= scrollWidth) {
        // 最右边
        container.classList.remove('fixtable-ping-right')
        container.classList.add('fixtable-ping-left')
      } else if (scrollLeft === 0) {
        // 最左边
        container.classList.remove('fixtable-ping-left')
        container.classList.add('fixtable-ping-right')
      } else {
        container.classList.add('fixtable-ping-left')
        container.classList.add('fixtable-ping-right')
      }
    }
    // 滚动到底部事件
    if (!onBottomRefresh) return
    var offsetHeight = container.offsetHeight
    var scrollHeight = container.scrollHeight
    var scrollTop =
      container === document.body ? document.documentElement.scrollTop : container.scrollTop
    if (scrollTop + offsetHeight >= scrollHeight - 2) {
      onBottomRefresh()
    }
  }
}
