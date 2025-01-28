import React, { useState, useEffect } from 'react'

import { Cascader } from 'seedsui-react'

export default () => {
  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value, setValue] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setValue([
        {
          id: '86',
          name: '中国',
          type: ['country']
        },
        {
          id: '810000',
          name: '香港特别行政区',
          parentid: '86',
          type: ['province', 'city', 'municipality']
        },
        {
          id: '810107',
          name: '九龙城区',
          parentid: '810000',
          type: ['district'],
          isLeaf: true
        }
      ])
    }, 2000)
  }, [])
  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.DistrictCombo
        // readOnly
        startType={'country'}
        multiple
        // type="country"
        // type="province"
        // type="district"
        // type="district"
        // type="street"
        max="city"
        // editableOptions={{
        //   country: { editable: false },
        //   province: { editable: false },
        //   city: { editable: false },
        //   district: { editable: false },
        //   street: { editable: true }
        // }}
        value={value}
        onChange={(newValue) => {
          console.log('修改: ', newValue)
          setValue(newValue)
        }}
        placeholder={'点击选择'}
        allowClear
        clear={({ triggerClear }) => {
          return value?.length ? (
            <i className="input-clear" onClick={triggerClear} />
          ) : (
            <i className="right-icon shape-arrow-right sm"></i>
          )
        }}
        modalProps={{ maskProps: { style: { zIndex: '9' } } }}
      />
    </div>
  )
}
