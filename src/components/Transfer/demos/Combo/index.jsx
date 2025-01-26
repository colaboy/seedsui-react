import React, { useRef, useState } from 'react'
import { Layout, Button } from 'seedsui-react'
import { Transfer } from 'seedsui-react'
// import Transfer from 'library/components/Transfer'

export default () => {
  const transferRef = useRef(null)
  const [value, setValue] = useState([
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ])
  return (
    <Layout className="full">
      <Layout.Header className="text-center">Transfer.Combo</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title">Transfer Combo</div>
        <Transfer.Combo
          ref={transferRef}
          className="border-b"
          placeholder="Select"
          allowClear
          list={[
            { id: '1', name: '1' },
            { id: '2', name: '2' },
            { id: '3', name: '3' },
            { id: '4', name: '4' },
            { id: '5', name: '5' },
            { id: '6', name: '6' },
            { id: '7', name: '7' },
            { id: '8', name: '8' },
            { id: '9', name: '9' },
            { id: '10', name: '10' },
            { id: '11', name: '11' },
            { id: '12', name: '12' },
            { id: '13', name: '13' },
            { id: '14', name: '14' },
            { id: '15', name: '15' },
            { id: '16', name: '16' },
            { id: '17', name: '17' },
            { id: '18', name: '18' },
            { id: '19', name: '19' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            setValue(newValue)
          }}
          modalProps={{
            footer: ({ value, triggerOk }) => {
              return (
                <Layout.Footer
                  onClick={() => {
                    triggerOk()
                  }}
                >
                  <Button className="listpicker-footer-submit primary">确定</Button>
                </Layout.Footer>
              )
            },
            mainProps: {
              titles: { selected: '标题1', unSelected: '标题2' }
            }
          }}
        />
      </Layout.Main>
    </Layout>
  )
}
