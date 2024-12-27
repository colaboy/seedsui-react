import React, { useState, useEffect } from 'react'

const defaultConfig = {
  // threshold属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数
  threshold: [0], // 1.0
  // 祖先容器
  root: null,
  // 根元素的margin，用来扩展或缩小rootBounds这个矩形的大小，从而影响intersectionRect交叉区域的大小
  rootMargin: '0px'
}

function ContentVisibility({
  // 配置项
  options = {},
  children,
  ...others
}) {
  const [element, setElement] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  let observer = null
  // 可见性变化,参数entry:IntersectionObserverEntry对象提供目标元素的信息,一共有六个属性
  /*
    {
      isIntersecting: true, // 是否交叉(显示)
      time: 3893.92,
      rootBounds: ClientRect {
        bottom: 920,
        height: 1024,
        left: 0,
        right: 1024,
        top: 0,
        width: 920
      },
      boundingClientRect: ClientRect {
        // ...
      },
      intersectionRect: ClientRect {
        // ...
      },
      intersectionRatio: 0.54,
      target: element
    }*/
  const visibilityCallBack = ([entry]) => {
    console.log(entry)
    if (entry.isIntersecting) {
      // if (entry.boundingClientRect.top < 100) {
      console.log('显示')
      console.log(element)
      setIsVisible(true)
      // 关闭观察器
      // observer.disconnect()
    } else {
      console.log('隐藏')
      console.log(element)
      setIsVisible(false)
    }
  }

  useEffect(() => {
    if (!element) {
      return
    }
    // 创建观察器
    // eslint-disable-next-line
    observer = new IntersectionObserver(visibilityCallBack, {
      ...defaultConfig,
      ...options
    })
    // 开始观察
    observer.observe(element)
    // 关闭观察器
    return () => observer && observer.disconnect && observer.disconnect()
  }, [element]) // eslint-disable-line

  return (
    <div ref={setElement} {...others}>
      {/* {children} */}
      {isVisible ? children : null}
    </div>
  )
}

export default ContentVisibility
