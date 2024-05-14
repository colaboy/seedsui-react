import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useContext,
  useState
} from 'react'
import Instance from './instance.js'
import BScroll from 'better-scroll'
import Context from '../Context/instance.js'

let timeout = null

const PDFView = forwardRef(
  (
    {
      insertPageElements, // 插入页面元素, 有此属性时将不分页
      // insertPageElements: [{
      //   page: 1,
      //   element: <input/>
      // }]
      pictures, // 图片地址
      src, // pdf地址或data:application/pdf;base64,开头的base64pdf流文件
      cMapUrl, // 设置cMapUrl, 解决中文不显示的问题
      params = {}, // 设置实例化参数
      // params: {
      //   rows: 5, // 分页, 一页的条数
      //   errorHTML: '文件加载失败', // 加载错误时显示的信息
      //   loadHTML: '加载中', // 加载时显示的信息
      //   nodataHTML: '暂无数据', // 暂无数据
      //   pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js', // pdf.js库
      //   pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js' // pdf.work.js库
      // }
      zoom, // 是否允许放大缩小
      wrapperAttribute = {},
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })
    // context
    const context = useContext(Context) || {}
    const locale =
      context.locale ||
      function (remark) {
        return remark || ''
      }
    // 总页数
    let [total, setTotal] = useState(0)
    // 初始化
    useEffect(() => {
      init()
    }, []) // eslint-disable-line

    // 更新src或者pictures
    function usePrevious(value) {
      const ref = useRef()
      useEffect(() => {
        ref.current = value
      })
      return ref.current
    }
    const prevSrc = usePrevious(src)
    const prevPictures = usePrevious(pictures)

    useEffect(() => {
      // 修改PDF原文件, 刷新整个页面, 从第1页开始重新渲染
      if (
        refEl.current &&
        refEl.current.instance &&
        (src !== prevSrc || JSON.stringify(pictures) !== JSON.stringify(prevPictures))
      ) {
        init()
      }
    }, [src, pictures]) // eslint-disable-line

    // 一页加载完成后回调
    function onLoad(s) {
      console.log('全部加载完成')
      if (params.onLoad) params.onLoad(s)
      if (zoom) {
        // 若允许放大, 使用better-scroll
        if (refEl.current.bscroll) {
          console.log('加载完成, bscroll刷新')
          refEl.current.bscroll.finishPullUp()
          refEl.current.bscroll.refresh()
          return
        }
        refEl.current.bscroll = new BScroll('.pdf-container', {
          scrollX: true,
          zoom: {
            start: 1,
            min: 1,
            max: 4
          },
          probeType: 2,
          pullUpLoad: {
            threshold: 10
          }
        })
        // 上拉到底部刷新
        refEl.current.bscroll.on('pullingUp', () => {
          refEl.current.instance?.addPages?.()
        })
      } else {
        // 不允许放大, 则使用原生滚动条
        // 上拉到底部
        if (!s.container.getAttribute('data-scroll')) {
          s.container.addEventListener('scroll', onScroll, false)
          s.container.setAttribute('data-scroll', '1')
        }
      }
    }

    // 初始化PDF
    function init() {
      if (!src && !pictures) {
        console.warn('SeedsUI: PDFView请传入src或者pictures')
        return
      }
      // 如果设置了插入元素, 则需要通过react Node渲染完成后, 再实例化
      if (insertPageElements && insertPageElements.length && src) {
        new Instance().getPDF(src, {
          onSuccess: (s, pdf) => {
            total = pdf.total
            setTotal(total)
            instance(total)
          },
          onError: () => {
            instance()
          }
        })
      } else if (insertPageElements && insertPageElements.length && pictures) {
        total = pictures.length
        setTotal(total)
        instance(total)
      } else {
        instance()
      }
    }
    // 实例化和更新
    function instance(rows) {
      // 更新
      if (refEl.current.instance) {
        // 更新一页的条数和src
        refEl.current.instance.update({
          rows: rows,
          src: src
        })
        return
      }
      // 实例化
      refEl.current.instance = new Instance(refEl.current, {
        loadHTML: locale('加载中', 'SeedsUI_loading'),
        errorHTML: locale('文件加载失败', 'SeedsUI_file_load_failed'),
        nodataHTML: locale('暂无数据', 'SeedsUI_no_data'),
        ...params,
        pictures,
        src,
        cMapUrl,
        rows: rows || params.rows,
        onLoad: (s) => {
          onLoad(s)
        }
      })
    }
    // 当不允许放大缩小使用原生滚动时, 滚动到底部加载下一页
    function onScroll(e) {
      let target = e.target
      let clientHeight = target.clientHeight
      let scrollHeight = target.scrollHeight
      let scrollTop =
        target === document.body ? document.documentElement.scrollTop : target.scrollTop
      if (scrollTop + clientHeight >= scrollHeight - 2) {
        // 刷新
        if (timeout) {
          window.clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          refEl.current.instance?.addPages?.()
        }, 500)
      }
    }
    // 滚动到页数
    function scrollToPage(pageIndex) {
      if (!pageIndex || isNaN(pageIndex) || Number(pageIndex) < 1) return
      const pages = refEl.current.querySelectorAll('.pdf-page')
      const page = pages[Number(pageIndex) - 1]
      if (!page) return
      if (refEl.current.bscroll) {
        refEl.current.bscroll.scrollToElement(page)
      } else {
        refEl.current.scrollTop = page.offsetTop
      }
    }
    if (refEl.current) {
      refEl.current.scrollToPage = scrollToPage
    }
    // 设置total则不分页
    function getTotalDOM(total, insertPageElements = [], pageFeatureClass) {
      if (!src && !pictures) {
        return null
      }
      if (!total) return null
      const DOM = []
      for (let i = 1; i <= total; i++) {
        let insertDOM = []
        for (let pageEl of insertPageElements) {
          if (pageEl && pageEl.page && Number(pageEl.page) === i && pageEl.element)
            insertDOM.push(pageEl.element)
        }
        DOM.push(
          <div key={i} className={`pdf-page${pageFeatureClass ? ' ' + pageFeatureClass : ''}`}>
            <div className="pdf-page-draw">
              <canvas className="pdf-page-canvas"></canvas>
              <img className="pdf-page-img" alt="" />
              <div className="pdf-page-elements">{insertDOM}</div>
            </div>
            <img alt="" className="pdf-page-img hide" />
            <div className="pdf-page-load">
              {params.loadHTML !== undefined
                ? params.loadHTML
                : locale('加载中', 'SeedsUI_loading')}
            </div>
            <div className="pdf-page-error hide">
              {params.errorHTML !== undefined
                ? params.errorHTML
                : locale('文件加载失败', 'SeedsUI_file_load_failed')}
            </div>
            <div className="pdf-page-nodata hide">
              {params.nodataHTML !== undefined ? params.nodataHTML : locale('暂无数据', 'no_date')}
            </div>
          </div>
        )
      }
      return DOM
    }

    return (
      <div
        ref={refEl}
        {...others}
        className={`pdf-container${others.className ? ' ' + others.className : ''}${
          zoom ? '' : ' scroll'
        }`}
      >
        <div
          {...wrapperAttribute}
          className={`pdf-wrapper${
            wrapperAttribute.className ? ' ' + wrapperAttribute.className : ''
          }`}
        >
          {getTotalDOM(total, insertPageElements, params.pageFeatureClass)}
        </div>
      </div>
    )
  }
)

export default PDFView
