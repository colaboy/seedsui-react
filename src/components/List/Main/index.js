import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import InfiniteScroll from './InfiniteScroll'
import ResultMessage from './ResultMessage'

// 内库使用-start
import Device from './../../../utils/Device'
import Layout from './../../Layout'
import List from './../../List'
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
      // 请求属性
      list: externalList, // 离线数据
      loadList,
      pull = true, // 是否允许下拉刷新
      pagination,

      // List config
      header,
      footer,
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

    // Expose
    useImperativeHandle(ref, () => {
      return {
        rootDOM: mainRef?.current?.rootDOM,
        getRootDOM: mainRef?.current?.getRootDOM,
        // 重新加载
        reload: init,
        // 获取设置列表
        getList: () => {
          return list
        }
      }
    })

    // 列表
    const [list, setList] = useState(null)
    // 全屏提示
    const [mainStatus, setMainStatus] = useState('')
    // 底部提示
    const [bottomStatus, setBottomStatus] = useState('')

    useEffect(() => {
      init()
      // eslint-disable-next-line
    }, [])

    // // 顶部刷新和初始化
    async function init() {
      let newList = null
      if (Array.isArray(externalList)) {
        newList = externalList
      } else {
        pageRef.current = 1
        newList = await loadList({ page: pageRef.current, action: 'load' })
      }

      // Initialize bottomStatus
      setBottomStatus('')

      // Succeed to get first page list
      if (Array.isArray(newList)) {
        if (newList.length) {
          setList(newList)
          setMainStatus('')
        } else {
          setList(null)
          setMainStatus('noData')
        }
      }
      // Failed to get first page list
      else {
        setList(null)
        setMainStatus('error')
      }

      return true
    }

    // 底部刷新
    async function handleBottomRefresh() {
      // 全局有报错, 或者无数据了不再底部加载
      if (mainStatus || bottomStatus === 'noMore') return

      // 底部加载
      pageRef.current++
      let nextList = await loadList({ page: pageRef.current, action: 'bottomRefresh' })

      // Succeed to get next page list
      if (Array.isArray(nextList)) {
        if (nextList.length) {
          let newList = list.concat(nextList)
          setList(newList)
          setBottomStatus('')
        } else {
          setBottomStatus('noMore')
        }
      }
      // Failed to get the next page list
      else {
        pageRef.current--
        setBottomStatus('error')
      }

      return true
    }

    return (
      <Layout.Main
        ref={mainRef}
        {...props}
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        onTopRefresh={pull && typeof loadList === 'function' ? init : null}
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
        {typeof header === 'function' ? header({ list, value, onChange, pagination }) : null}

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
        {typeof footer === 'function' ? footer({ list, value, onChange, pagination }) : null}

        {/* 底部错误提示 */}
        {pagination && typeof loadList === 'function' && (
          <InfiniteScroll type={bottomStatus || 'loading'} />
        )}

        {/* 页面级错误提示 */}
        {mainStatus && <ResultMessage type={mainStatus} onRetry={init} />}
      </Layout.Main>
    )
  }
)

export default Main
