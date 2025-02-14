import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import _ from 'lodash'
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

      // 列表设置
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

    // 初始化
    async function init() {
      let newList = null
      if (Array.isArray(externalList)) {
        newList = externalList
      } else {
        pageRef.current = 1
        newList = await loadList({ page: pageRef.current, action: 'load' })
      }

      let status = getStatus(newList)
      setMainStatus(status)
      setList(newList)
    }

    // 根据数据值返回类型
    function getStatus(newList) {
      if (typeof newList === 'string') {
        return 'error'
      }
      if (Array.isArray(newList) && newList.length) {
        return 'noData'
      }
      return ''
    }

    // 顶部刷新
    async function handleTopRefresh() {
      pageRef.current = 1
      let newList = await loadList({ page: pageRef.current, action: 'topRefresh' })
      setList(newList)
      return true
    }

    // 底部刷新
    function handleBottomRefresh() {
      // 全局有报错, 不再底部加载
      if (mainStatus) return

      // 底部加载
      pageRef.current++
      let nextList = loadList({ page: pageRef.current, action: 'bottomRefresh' })
      newList = list.concat(nextList)
      let status = getStatus(newList)
      setBottomStatus(status)
      setList(newList)
      return true
    }

    return (
      <Layout.Main
        ref={mainRef}
        {...props}
        onTopRefresh={pull ? handleTopRefresh : null}
        onBottomRefresh={pagination ? handleBottomRefresh : undefined}
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
        {/* 列表 */}
        {Array.isArray(list) && list.length && (
          <List
            allowClear={allowClear}
            multiple={multiple}
            value={value}
            list={list}
            onChange={onChange}
            checkbox={checkbox}
            checkboxPosition={checkboxPosition}
          />
        )}

        {/* 底部错误提示 */}
        {pagination && <InfiniteScroll type={bottomStatus || 'loading'} />}

        {/* 页面级错误提示 */}
        {mainStatus && <ResultMessage type={mainStatus} />}
      </Layout.Main>
    )
  }
)

export default Main
