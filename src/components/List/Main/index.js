import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import _ from 'lodash'
import InfiniteScroll from './InfiniteScroll'
import ResultMessage from './ResultMessage'

// 内库使用-start
import Device from './../../../utils/Device'
import Layout from './../../Layout'
import List from './../../List'
import Checkbox from './../../Checkbox'
// 内库使用-end

/* 测试使用-start
import { Device, Layout, Result, List, Checkbox } from 'seedsui-react'
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

      // 列表设置
      checkbox,
      checkboxPosition,
      wrapper,
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
      if (Array.isArray(newList) && !newList.length) {
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
        className={`list-main${props.className ? ' ' + props.className : ''}`}
        onTopRefresh={pull && typeof loadList === 'function' ? handleTopRefresh : null}
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
        {/* 列表 */}
        {Array.isArray(list) && list.length && (
          <List
            allowClear={allowClear}
            multiple={multiple}
            value={value}
            list={list}
            onChange={onChange}
            // 显示设置
            layout="vertical"
            checkbox={
              checkbox
                ? checkbox
                : ({ checked }) => {
                    return <Checkbox checked={checked} />
                  }
            }
            checkboxPosition={checkboxPosition}
            wrapper={wrapper}
          />
        )}

        {/* 底部错误提示 */}
        {pagination && typeof loadList === 'function' && (
          <InfiniteScroll type={bottomStatus || 'loading'} />
        )}

        {/* 页面级错误提示 */}
        {mainStatus && <ResultMessage type={mainStatus} />}
      </Layout.Main>
    )
  }
)

export default Main
