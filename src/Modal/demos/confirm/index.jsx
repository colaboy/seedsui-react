import React from 'react'
import { Layout, Modal } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Modal.confirm({
      maskClosable: true,
      captionProps: {
        className: 'text-left',
        style: {
          color: 'red'
        },
        caption: '第一层'
      },
      portal: top.document.body,
      content: 'confirm content1',
      contentProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      cancelProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      submitProps: {
        className: 'text-left',
        style: {
          color: 'red'
        },
        onClick: () => {
          console.log('第二层')
          Modal.confirm({
            maskProps: {
              name: '我很特殊',
              className: 'aa',
              style: {
                zIndex: 999
              }
            },
            maskClosable: true,
            content: 'confirm content2',
            submitProps: {
              onClick: () => {
                console.log('第三层')
                Modal.confirm({
                  portal: document.body,
                  captionProps: {
                    caption: '第三层'
                  },
                  content: 'confirm content3',
                  onVisibleChange: (visible) => {
                    console.log('onVisibleChange:', visible)
                  }
                })
                return false
              }
            }
          })
          return false
        }
      }
    })
  }

  return (
    <Layout className="full">
      <Layout.Header className="text-center">Modal.confirm</Layout.Header>
      <Layout.Main
        className="bg-white"
        style={{
          backgroundImage:
            'url(https://cdn.pixabay.com/photo/2014/12/16/08/32/cherry-blossoms-570046_1280.jpg)'
        }}
      >
        <div className="demo-title" onClick={handleToggle}>
          Modal visible toggle
        </div>
      </Layout.Main>
    </Layout>
  )
}
