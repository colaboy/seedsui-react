import React, { useState } from 'react'
import { Loading } from 'seedsui-react'
import { Cascader } from 'seedsui-react'
// import Cascader from 'library/components/Cascader'

export default () => {
  const [value, setValue] = useState([
    {
      id: '1',
      name: '根节点',
      parentid: null
    },
    {
      id: '1-1',
      name: '子节点1',
      parentid: '1'
    },
    {
      parentid: '1-1',
      name: '孙子节点1',
      id: '1-1-1'
    }
  ])

  // 加载街道
  function loadData(tabs) {
    return new Promise((resolve) => {
      if (!Array.isArray(tabs) || !tabs.length) {
        resolve(null)
        return
      }
      let lastTab = tabs[tabs.length - 1]
      console.log('请求子级:', lastTab)
      if (lastTab.id !== '1-1') {
        resolve(null)
        return
      }
      Loading.show()
      // let streets = await DistrictUtil.getStreet(lastTab.id)
      let streets = [
        {
          parentid: lastTab.id,
          name: '孙子节点1',
          id: '1-1-1'
        },
        {
          parentid: lastTab.id,
          name: '孙子节点2',
          id: '1-1-2'
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
                id: '1-1',
                name: '子节点1'
              },
              {
                id: '1-2',
                name: '子节点2'
              }
            ]
          }
        ]}
        loadData={loadData}
        value={value}
        placeholder={`Select`}
        ricon={<i className="shape-arrow-right sm"></i>}
        onChange={(newValue) => {
          console.log('修改:', newValue)
          setValue(newValue)
          // setTimeout(() => {
          //   setValue([
          //     {
          //       id: '1',
          //       name: '根节点',
          //       parentid: null
          //     },
          //     {
          //       id: '1-1',
          //       name: '子节点1',
          //       parentid: '1'
          //     },
          //     {
          //       parentid: '1-1',
          //       name: '孙子节点1',
          //       id: '1-1-1'
          //     }
          //   ])
          // }, 2000)
        }}
        ModalProps={{
          captionProps: {
            caption: '级联选择'
          },
          onVisibleChange: (visible) => {
            console.log('visible:', visible)
          }
        }}
      />
    </div>
  )
}
