// require (PrototypeArray.js), 使用了equals
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import Instance from './instance.js'

/**
 * @deprecated since version 5.2.8
 * 请使用Swiper
 */
const Carrousel = forwardRef(
  (
    {
      style, // 设置容器Style
      className, // 设置容器className

      slideAttribute = {},

      // 是否显示小点点
      pagination = false,
      paginationAttribute = {},

      prevAttribute = {},
      nextAttribute = {},

      stopPropagation = false, // 是否阻止点击事件的传播, 设置为false解决与FastClick插件touch事件冲突的问题
      activeIndex, // 默认选中第几块

      loop = false, // 是否循环显示
      autoPlay = 0, // 是否自动播放
      slidesPerView = 1, // 一屏显示几块,默认1块
      defaultSrc = '//res.waiqin365.com/d/seedsui/carrousel/default.png', // 默认图片
      list = [], // [{bg: 'xx', img: 'xx', iconAttribute: {}, caption: 'xx'}]
      enableOnChange = true, // 手动调用slideTo方法是否触发onChange事件回调
      speed = 300, // 动画过渡的速度
      onClick, // func(s, item, index)
      onChange,
      delay = 500, // 延迟初始化秒数

      children, // 轮播页,例<Carrousel><div>第1页</div></Carrousel>
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })
    let childrenArr = React.Children.toArray(children)
    childrenArr = childrenArr.filter((child) => {
      if (typeof child !== 'object') return false
      return true
    })
    const instance = useRef(null)

    function slideToIndex(currentSpeed) {
      if (!instance || !instance.current) return
      // 设置选中项
      let len = childrenArr.length || (list || []).length
      if (typeof activeIndex === 'number' && activeIndex <= len - 1) {
        instance.current.slideTo(
          activeIndex,
          typeof currentSpeed === 'number' ? currentSpeed : speed,
          false
        )
      }
    }

    function update() {
      if (!instance.current || !instance.current.updateParams) return
      instance.current.activeIndex = activeIndex
      instance.current.updateParams({
        height: style && style.height ? style.height : null,
        width: style && style.width ? style.width : null,
        stopPropagation: stopPropagation,
        autoplay: autoPlay,
        slidesPerView: slidesPerView,
        loop: loop,
        imgLoadSrc: defaultSrc
      })
    }
    useEffect(() => {
      // 只有list或children发生变化时才更新
      update()
    }, [list, children]) // eslint-disable-line

    useEffect(() => {
      slideToIndex()
    }, [activeIndex]) // eslint-disable-line

    useEffect(() => {
      if (!refEl || !refEl.current) return
      instance.current = new Instance(refEl.current, {
        height: style && style.height ? style.height : null,
        width: style && style.width ? style.width : null,
        stopPropagation: stopPropagation,
        autoplay: autoPlay,
        slidesPerView: slidesPerView,
        loop: loop,
        imgLoadSrc: defaultSrc,
        onClick: click,
        onSlideChangeEnd: onChange ? onChange : null
      })
      // 轮播图片, 自适应的情况下, 高度需要计算
      if (!(style && style.height) && list.length && delay) {
        setTimeout(() => {
          instance.current.updateContainerSize()
          if (typeof activeIndex === 'number' && activeIndex > 0) {
            slideToIndex(0)
          }
        }, delay)
      } else {
        if (typeof activeIndex === 'number' && activeIndex > 0) {
          slideToIndex(0)
        }
      }
    }, []) // eslint-disable-line

    // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
    if (instance.current) {
      instance.current.params.onClick = click
      instance.current.params.onSlideChangeEnd = onChange
    }

    // 点击轮播
    function click(s) {
      const index = s.activeIndex
      if (onClick) onClick(s, list[index], index)
    }
    // 如果className没有carrousel-container或者carrousel-page, 则补充一个
    function getCarrouselClassName() {
      if (className) {
        if (
          className.indexOf('carrousel-container') !== -1 ||
          className.indexOf('carrousel-page') !== -1
        ) {
          return className
        }
      }
      return 'carrousel-container' + (className ? ' ' + className : '')
    }
    // 如果项中包含bg属性, 则加入到style中
    function getSlideStyle(item) {
      if (item.bg) {
        return Object.assign(
          { backgroundImage: `url(${defaultSrc ? defaultSrc : item.bg})` },
          slideAttribute.style
        )
      }
      return slideAttribute.style
    }

    return (
      <div ref={refEl} className={getCarrouselClassName()} style={style} {...others}>
        <div className="carrousel-wrapper">
          {/* 轮播图 */}
          {list.length > 0 &&
            list.map((item, index) => {
              return (
                <div
                  {...slideAttribute}
                  className={`carrousel-slide${
                    slideAttribute.className ? ' ' + slideAttribute.className : ''
                  }`}
                  style={getSlideStyle(item)}
                  key={index}
                  data-load-src={defaultSrc ? item.bg : null}
                >
                  {item.img && (
                    <img
                      className="carrousel-slide-img"
                      alt=""
                      src={defaultSrc ? defaultSrc : item.img}
                      data-load-src={defaultSrc ? item.img : null}
                    />
                  )}
                  {item.caption && (
                    <div className="carrousel-summary">
                      {item.iconAttribute && (
                        <i
                          {...item.iconAttribute}
                          className={`icon carrousel-summary-icon${
                            item.iconAttribute.className ? ' ' + item.iconAttribute.className : ''
                          }`}
                        ></i>
                      )}
                      <span
                        className="nowrap carrousel-summary-caption"
                        style={{ marginRight: '20px' }}
                      >
                        {item.caption}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          {/* 轮播页 */}
          {list.length === 0 &&
            childrenArr &&
            childrenArr.map((item, index) => {
              return (
                <div
                  {...slideAttribute}
                  className={`carrousel-slide${
                    slideAttribute.className ? ' ' + slideAttribute.className : ''
                  }`}
                  key={index}
                >
                  {item}
                </div>
              )
            })}
        </div>
        {pagination === true && (
          <div
            {...paginationAttribute}
            className={`carrousel-pagination${
              paginationAttribute.className ? ' ' + paginationAttribute.className : ''
            }`}
          ></div>
        )}
        {pagination && pagination !== true && pagination}
        {list.length > 1 && (
          <div
            {...prevAttribute}
            className={`carrousel-prev${
              prevAttribute.className ? ' ' + prevAttribute.className : ''
            }`}
          ></div>
        )}
        {list.length > 1 && (
          <div
            {...nextAttribute}
            className={`carrousel-next${
              nextAttribute.className ? ' ' + nextAttribute.className : ''
            }`}
          ></div>
        )}
      </div>
    )
  }
)

export default Carrousel
