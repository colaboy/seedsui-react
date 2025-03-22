import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'
import mergeGroups from './utils/mergeGroups'
import isGroups from './utils/isGroups'
import hasMoreItems from './utils/hasMoreItems'
import scrollToTop from './utils/scrollToTop'
import InfiniteScroll from './../InfiniteScroll'
import Loading from './components/Loading'
import List from './List'
import VirtualList from './VirtualList'

// 内库使用-start
import Device from './../../../utils/Device'
import LocaleUtil from './../../../utils/LocaleUtil'
import Storage from './../../../utils/Storage'
import Result from './../../Result'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { Device, LocaleUtil, Storage, Result, Button } from 'seedsui-react'
测试使用-end */

const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main: common
      reload,
      allowClear,
      multiple,
      value,
      onChange,
      onScroll,
      // 显示
      loading,
      // 请求属性
      loadList,
      pull = true, // 是否允许下拉刷新
      pagination, // {totalPages: 10, totalItems: 100, rows: 100}
      onLoad,

      // List config
      wrapper,
      layout,
      checkbox,
      checkboxPosition,

      // Render
      prepend,
      append,
      cache,
      // Virtual list config
      virtual,
      /*
      {
        getItemHeight: () => Number
      }
      */
      ...props
    },
    ref
  ) => {
    // 滚动节流定时器
    const scrollThrottleRef = useRef(null)

    // 容器
    const mainRef = useRef(null)
    // 分页
    const pageRef = useRef(1)

    const [list, setList] = Storage.useCacheState(
      null,
      cache?.name ? { name: cache?.name + ':list', persist: cache?.persist } : null
    )
    // 全屏提示: {status: 'empty|500', title: ''}
    const [mainStatus, setMainStatus] = Storage.useCacheState(
      null,
      cache?.name ? { name: cache?.name + ':mainStatus', persist: cache?.persist } : null
    )
    // 底部提示: loading | noMore | error
    const [bottomStatus, setBottomStatus] = Storage.useCacheState(
      '',
      cache?.name ? { name: cache?.name + ':bottomStatus', persist: cache?.persist } : null
    )
    // 加载显示: load | reload | topRefresh | bottomRefresh
    const [loadAction, setLoadAction] = Storage.useCacheState(
      '',
      cache?.name ? { name: cache?.name + ':loadAction', persist: cache?.persist } : null
    )

    // Expose
    useImperativeHandle(ref, () => {
      return {
        mainDOM: mainRef?.current?.rootDOM,
        getMainDOM: mainRef?.current?.getRootDOM,
        getAnchors: mainRef?.current?.getAnchors,
        scrollToAnchor: mainRef?.current?.scrollToAnchor,
        // 重新加载
        reload: (action) => init(action || 'reload'),
        // 获取设置列表
        getList: () => {
          return list
        }
      }
    })

    // 渲染完成执行onLoad
    useEffect(() => {
      if (Array.isArray(list) && list.length) {
        onLoad && onLoad()
      }
      // eslint-disable-next-line
    }, [list])

    useEffect(() => {
      // 有缓存数据, 直接渲染
      if (cache?.name && Array.isArray(list) && list.length) {
        // 滚动条位置
        if (mainRef?.current?.rootDOM) {
          mainRef.current.rootDOM.scrollTop =
            window[`${cache.name}:scrollTop`] || Storage.getCache(`${cache.name}:scrollTop`) || 0
        }
        return
      }
      init('load')
      // eslint-disable-next-line
    }, [])

    // 顶部刷新和初始化, action: 'load | reload | topRefresh'
    async function init(action) {
      let newList = null
      if (typeof loadList === 'function') {
        pageRef.current = 1

        setLoadAction(action)
        newList = await loadList({ page: pageRef.current, action: action })
        setLoadAction('')
      }

      // Scroll to top
      scrollToTop(mainRef.current?.rootDOM)

      // Succeed to get first page list
      if (Array.isArray(newList)) {
        if (newList.length) {
          setList(newList)
          setMainStatus(null)

          // Check if there are more items
          if (
            hasMoreItems({
              list: newList,
              currentPage: 1,
              currentList: newList,
              ...(typeof pagination === 'object' ? pagination : {})
            }) === false
          ) {
            setBottomStatus('noMore')
          } else {
            setBottomStatus('loading')
          }
        } else {
          setList(null)
          setBottomStatus('')
          setMainStatus({
            status: 'empty'
          })
        }
      }
      // Failed to get first page list
      else {
        setList(null)
        setMainStatus({
          status: '500',
          title: newList && typeof newList === 'string' ? newList : ''
        })
      }

      return true
    }

    // 底部刷新
    async function handleBottomRefresh() {
      // 全局有报错, 或者无数据了不再底部加载
      if (mainStatus || bottomStatus === 'noMore') return

      // 底部加载
      pageRef.current++
      let action = 'bottomRefresh'
      setLoadAction(action)
      let nextList = await loadList({ page: pageRef.current, action: action })
      setLoadAction(action)

      // Succeed to get next page list
      if (Array.isArray(nextList)) {
        if (nextList.length) {
          // 非分组列表直接合并, 分组列表合并分组
          let newList = isGroups(list) ? mergeGroups(list, nextList) : list.concat(nextList)
          setList(newList)

          // Check if there are more items
          if (
            hasMoreItems({
              list: newList,
              currentPage: 1,
              currentList: nextList,
              ...(typeof pagination === 'object' ? pagination : {})
            }) === false
          ) {
            setBottomStatus('noMore')
          } else {
            setBottomStatus('loading')
          }
        } else {
          setBottomStatus('noMore')
        }
      }
      // Failed to get the next page list
      else {
        pageRef.current--
        setBottomStatus(nextList && typeof nextList === 'string' ? nextList : 'error')
      }

      return true
    }

    // 获取重试按钮
    function getReloadButton() {
      if (reload === true) {
        return (
          <Button className="primary result-button" onClick={() => init('retry')}>
            {LocaleUtil.locale('重试', 'SeedsUI_retry')}
          </Button>
        )
      }
      if (typeof reload === 'function') {
        return reload()
      }
      if (React.isValidElement(reload)) {
        return reload
      }
      return null
    }

    const ListNode = virtual?.getItemHeight ? VirtualList : List

    return (
      <ListNode
        ref={mainRef}
        {...props}
        virtual={virtual}
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        // Request
        onTopRefresh={pull && typeof loadList === 'function' ? () => init('topRefresh') : null}
        onBottomRefresh={
          pagination && typeof loadList === 'function' ? handleBottomRefresh : undefined
        }
        // Main: common
        allowClear={allowClear}
        multiple={multiple}
        value={value}
        onChange={onChange}
        onScroll={(e) => {
          // Callback
          onScroll && onScroll(e)

          // ios滚动过程中不允许点击tab，否则可能会局部白屏
          document.body.classList.add(`${Device.os}-scrolling`)

          if (scrollThrottleRef.current) {
            window.clearTimeout(scrollThrottleRef.current)
          }
          scrollThrottleRef.current = setTimeout(() => {
            document.body.classList.remove(`${Device.os}-scrolling`)
            // 记录滚动条位置
            if (cache?.name && typeof e?.target?.scrollTop === 'number') {
              Storage.setCache(`${cache.name}:scrollTop`, e.target.scrollTop, {
                persist: cache?.persist
              })
            }
          }, 500)
        }}
        // List config
        wrapper={wrapper}
        layout={layout}
        checkbox={checkbox}
        checkboxPosition={checkboxPosition}
        // Render
        prepend={prepend}
        list={list}
        append={append}
      >
        {/* 底部错误提示 */}
        {pagination && <InfiniteScroll status={bottomStatus} />}
        {/* 页面级错误提示 */}
        {mainStatus && (
          <Result
            className="list-main-result"
            status={mainStatus?.status}
            title={mainStatus?.title}
          >
            {mainStatus?.status !== 'empty' ? getReloadButton() : null}
          </Result>
        )}
        {/* 页面加载遮罩 */}
        <Loading type={loadAction} loading={loading} />
      </ListNode>
    )
  }
)

export default Main
