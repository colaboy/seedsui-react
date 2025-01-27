import React, { useRef, useState } from 'react'
import QueryUtil from 'library/utils/QueryUtil'
import { useHistory } from 'library/utils/Router'
import locale from 'library/utils/locale'

import { Device } from 'seedsui-react'
import Layout from 'library/components/Layout'
import ListPicker from 'library/components/ListPicker'
import FloatButton from 'library/components/FloatButton'
import Item from './Item'
import Filter from './Filter'
import mockData from './mockData'

// 列表页面
export default function List() {
  const menuId = Device.getUrlParameter('menuId') || '6842461864498739009'
  const listRef = useRef(null)

  // 前进的页面则清除缓存重新请求
  const history = useHistory()
  if (history.action !== 'POP' || window.isReloadList) {
    delete window.examplePagesListCache
  }

  // 显隐
  const [filterVisible, setFilterVisible] = useState(false)

  // 查询条件（缓存数据，返回时需要回显）
  const [queryParams, setQueryParams] = useState(window?.examplePagesListCache?.value || {})

  // 搜索
  const handleQuery = (newQueryParams) => {
    setQueryParams({
      ...queryParams,
      ...newQueryParams
    })
  }

  console.log('获取缓存：', listRef?.current?.getCache?.())

  return (
    <Layout className="full">
      {/* 列表 */}
      <ListPicker.Main
        ref={listRef}
        checkable={false}
        pagination
        url="/app/dms/client/v1/changebackmanage/queryChangeBack.do"
        head={{
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
        paramNames={{
          page: 'currentPage',
          rows: 'recPerPage'
        }}
        // 测试数据
        // list={mockData}
        /*
      toolbar的缓存格式: {"createTimeBegin,createTimeEnd": []}
      */
        toolbar={[
          {
            type: 'dateRange',
            field: ['createTimeBegin', 'createTimeEnd'],
            value: window.examplePagesListCache?.toolbar?.['createTimeBegin,createTimeEnd'] || [
              new Date(),
              new Date()
            ]
          },
          {
            type: 'search',
            field: 'keyword',
            placeholder: locale('请输入关键字', 'library.db91cb073ee4c9b76289e93ae2b4aa04'),
            value: window.examplePagesListCache?.toolbar?.['keyword'] || ''
          },
          {
            type: 'button',
            name: locale('按钮', 'library.fa966345577ba81af19408f203db968f'),
            titleRender: () => {
              // icon-sort-fill
              return (
                <i
                  className="icon icon-filter-menu color-sub size16"
                  style={{ fontWeight: 'bold' }}
                ></i>
              )
            },
            className: 'toolbar-button',
            onClick: () => {
              console.log('visible:', filterVisible)
              setFilterVisible(!filterVisible)
            }
          }
        ]}
        cache={{ name: 'examplePagesListCache', value: queryParams }}
        params={{
          menuId: menuId,
          ...QueryUtil.convertQueryParams(queryParams, {
            // 日期区间要改为两个字段
            dateRange: (optionValue, newQueryParams) => {
              if (Array.isArray(optionValue) && optionValue.length === 2) {
                newQueryParams.startDate = QueryUtil.getDisplayValue(optionValue[0])
                newQueryParams.endDate = QueryUtil.getDisplayValue(optionValue[1])
              }
            }
          })
        }}
        itemRender={(item, index) => <Item key={item.id || index} item={item} />}
      />

      {/* 筛选悬浮球 */}
      <FloatButton
        list={[
          { id: '1', name: '1' },
          { id: '2', name: '2', icon: 'icon-map-zoom-in', type: 'primary', group: false }
        ]}
        onChange={(value) => {
          console.log(value)
          setFilterVisible(true)
        }}
      />

      {/* 筛选 */}
      <Filter
        visible={filterVisible}
        onVisibleChange={setFilterVisible}
        queryParams={queryParams}
        onQuery={handleQuery}
      />
    </Layout>
  )
}
