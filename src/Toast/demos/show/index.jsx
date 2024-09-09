import React from 'react'
import { Layout, Toast } from 'seedsui-react'

export default () => {
  function handleToggle() {
    // Toast.defaultProps = {
    //   style: { backgroundColor: 'blue' },
    //   maskProps: { style: { backgroundColor: 'red' } }
    // }
    let toast = Toast.show({
      style: { backgroundColor: 'blue', color: 'green' },
      maskProps: { style: { backgroundColor: 'red' } },
      position: 'middle',
      content: 'show toast',
      duration: 2000,
      maskClickable: false,
      onVisibleChange: (visible) => {
        console.log('custom visible:', visible)
      }
    })
    console.log(toast)

    setTimeout(() => {
      Toast.show({
        content: 'hh',
        onVisibleChange: (visible) => {
          console.log('hh visible:', visible)
        }
      })
    }, 1000)
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Toast.show</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Toast visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
