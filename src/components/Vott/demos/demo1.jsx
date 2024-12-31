import React, { useState } from 'react'
import { Vott, Button } from 'seedsui-react'
import mockData from './mockData'
import mock from './mock.jpg'

export default () => {
  const [data, setData] = useState([])
  const [readOnly, setReadOnly] = useState(true)
  const [params, setParams] = useState({})

  function handleAll() {
    setData(convertData(mockData.data.skuList))
  }
  function handle1() {
    let typeData = mockData.data.skuList.filter(
      (item) => item.skuId === 'rio_qingshuang_qingputao_sleencan330ml'
    )
    setData(convertData(typeData))
  }
  function handle2() {
    let typeData = mockData.data.skuList.filter(
      (item) => item.skuId === 'posm_rio_qinshuang_jiageqian'
    )
    setData(convertData(typeData))
  }
  function handleReadOnly() {
    setReadOnly(!readOnly)
  }
  function handleBlue() {
    setParams({
      shapeAttributes: {
        style: 'stroke:blue;',
        className: 'blue',
        id: 'blue',
        custom: '自定义blue'
      }
    })
  }
  function convertData(skuList) {
    return skuList.map((item) => {
      return {
        polygon: [
          [item.x2, item.y1],
          [item.x1, item.y1],
          [item.x1, item.y2],
          [item.x2, item.y2]
        ],
        style: 'stroke:red;',
        className: 'default',
        id: 'default',
        custom: '自定义属性'
      }
    })
  }
  function handleChange(list, others) {
    console.log(list, others)
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Vott
        style={{ height: '469px' }}
        data={data}
        readOnly={readOnly}
        src={mock}
        params={params}
        onChange={handleChange}
        preview
      />
      <Button className="flex danger" onClick={handleReadOnly}>
        只读与绘制(
        {readOnly ? '只读' : '绘制'})
      </Button>
      <Button className="flex link" onClick={handleBlue}>
        修改标注颜色为蓝色
      </Button>

      <Button className="flex primary" onClick={handleAll}>
        全部标注
      </Button>

      <Button className="flex success" onClick={handle1}>
        标注清爽阳光玫瑰葡萄
      </Button>

      <Button className="flex danger" onClick={handle2}>
        标注清爽阳光玫瑰葡萄价格签
      </Button>
    </div>
  )
}
