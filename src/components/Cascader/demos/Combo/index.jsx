import React, { useState } from 'react'
import { Cascader, Loading } from 'seedsui-react'

export default () => {
  const [value, setValue] = useState(null)

  // 加载街道
  function loadData(tabs) {
    return new Promise((resolve) => {
      if (!Array.isArray(tabs) || !tabs.length) {
        resolve(null)
        return
      }
      let lastTab = tabs[tabs.length - 1]
      if (lastTab.id !== '1-1') {
        resolve(null)
        return
      }
      Loading.show()
      // let streets = await DistrictUtil.getStreet(lastTab.id)
      let streets = [
        {
          parentid: lastTab.id,
          name: '孙子节点',
          id: '1-1-1'
        }
      ]
      setTimeout(() => {
        Loading.hide()
      }, 100)
      if (typeof streets === 'string') {
        Toast.show({ content: streets })
      }
      resolve(streets)
    })
  }

  return (
    <div id="root" className="position-relative" style={{ height: '300px' }}>
      <Cascader.Combo
        allowClear
        // multiple={false}
        list={[
          {
            id: '1',
            name: '根节点',
            children: [
              {
                parentid: '1',
                id: '1-1',
                name: '子节点'
              }
            ]
          }
        ]}
        loadData={loadData}
        value={value}
        placeholder={`Select`}
        rightIcon={<i className="shape-arrow-right sm"></i>}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
        }}
        modalProps={{
          safeArea: true,
          title: '级联选择'
        }}
        onVisibleChange={(visible) => {
          console.log('visible:', visible)
        }}
      />
    </div>
  )
}
