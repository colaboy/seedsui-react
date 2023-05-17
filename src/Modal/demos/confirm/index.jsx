import React from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Modal.confirm({
      content: 'confirm content1',
      submitProps: {
        onClick: () => {
          Modal.confirm({
            content: 'confirm content2',
            submitProps: {
              onClick: () => {
                Modal.confirm({
                  content: 'confirm content3'
                })
              }
            }
          })
        }
      }
    })
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Modal.confirm</Layout.Header>
      <Layout.Main className="bg-white">
        <div className="demo-title" onClick={handleToggle}>
          Modal visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
