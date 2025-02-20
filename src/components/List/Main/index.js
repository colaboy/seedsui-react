import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import hasMoreItems from './hasMoreItems'
import scrollToTop from './scrollToTop'
import InfiniteScroll from './InfiniteScroll'
import ResultMessage from './ResultMessage'
import Loading from './Loading'

// 内库使用-start
import Device from './../../../utils/Device'
import Layout from './../../Layout'
import List from './../List'
// 内库使用-end

/* 测试使用-start
import { Device, Layout, Result, List } from 'seedsui-react'
测试使用-end */

// 列表
const Main = forwardRef(
  (
    {
      // Modal
      visible = true,

      // Main: common
      allowClear,
      multiple,
      value,
      onChange,
      onScroll,
      // 显示
      loading,
      // 请求属性
      list: externalList, // 离线数据
      loadList,
      pull = true, // 是否允许下拉刷新
      pagination, // {totalPages: 10, totalItems: 100, rows: 100}
      onLoad,

      // List config
      prepend,
      append,
      wrapper,
      layout,
      checkbox,
      checkboxPosition,
      ...props
    },
    ref
  ) => {
    // 容器
    const mainRef = useRef(null)
    // 分页
    const pageRef = useRef(1)

    // 列表
    const [list, setList] = useState(null)
    // 全屏提示: noData | error<String>
    const [mainStatus, setMainStatus] = useState('')
    // 底部提示: loading | noMore | error<String>
    const [bottomStatus, setBottomStatus] = useState('')
    // 加载显示: load | reload | topRefresh | bottomRefresh
    const [loadAction, setLoadAction] = useState('')

    // Expose
    useImperativeHandle(ref, () => {
      return {
        mainDOM: mainRef?.current?.rootDOM,
        getMainDOM: mainRef?.current?.getRootDOM,
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
      init('load')
      // eslint-disable-next-line
    }, [])

    // 顶部刷新和初始化, action: 'load | reload | topRefresh'
    async function init(action) {
      let newList = null
      if (externalList) {
        newList = externalList
      } else if (typeof loadList === 'function') {
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
          setMainStatus('')

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
          setMainStatus('noData')
        }
      }
      // Failed to get first page list
      else {
        setList(null)
        setMainStatus(newList && typeof newList === 'string' ? newList : 'error')
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
          let newList = list.concat(nextList)
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

    return (
      <Layout.Main
        ref={mainRef}
        {...props}
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        onTopRefresh={pull && typeof loadList === 'function' ? () => init('topRefresh') : null}
        onBottomRefresh={
          pagination && typeof loadList === 'function' ? handleBottomRefresh : undefined
        }
        onScroll={(e) => {
          // Callback
          onScroll && onScroll(e)

          // ios滚动过程中不允许点击tab，否则可能会局部白屏
          if (Device.os === 'ios') {
            document.body.classList.add('ios-scrolling')

            if (window.timeout) {
              window.clearTimeout(window.timeout)
            }
            window.timeout = setTimeout(() => {
              document.body.classList.remove('ios-scrolling')
            }, 500)
          }
        }}
      >
        {/* 头部 */}
        {typeof prepend === 'function' ? prepend({ list, value, onChange, pagination }) : null}

        {/* 列表 */}
        {Array.isArray(list) && list.length && (
          <List
            allowClear={allowClear}
            multiple={multiple}
            value={value}
            list={list}
            onChange={onChange}
            // List config
            wrapper={wrapper}
            layout={layout}
            checkbox={checkbox}
            checkboxPosition={checkboxPosition}
          />
        )}

        {/* 底部 */}
        {typeof append === 'function' ? append({ list, value, onChange, pagination }) : null}

        {/* 底部错误提示 */}
        {pagination && typeof loadList === 'function' && <InfiniteScroll type={bottomStatus} />}

        {/* 页面级错误提示 */}
        {mainStatus && <ResultMessage type={mainStatus} onRetry={() => init('retry')} />}

        {/* 页面加载遮罩 */}
        <Loading type={loadAction} loading={loading} />
      </Layout.Main>
    )
  }
)

export default Main
