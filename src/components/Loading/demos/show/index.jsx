import React from 'react'
import { Layout, Loading } from 'seedsui-react'

export default () => {
  function handleToggle() {
    // Loading.defaultProps = {
    //   style: { backgroundColor: 'blue' },
    //   maskProps: { style: { backgroundColor: 'red' } }
    // }

    let loading = Loading.show({
      style: { backgroundColor: 'blue' },
      maskProps: { style: { backgroundColor: 'red' } },
      className: 'abc',
      content: '自定义加载'
    })
    console.log(loading)
    setTimeout(() => {
      Loading.show()
    }, 1000)
    setTimeout(() => {
      Loading.hide()
    }, 3000)
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Loading.show</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Loading visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
