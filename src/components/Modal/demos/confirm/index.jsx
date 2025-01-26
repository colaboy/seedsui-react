import React from 'react'
import { Layout, Modal, Button } from 'seedsui-react'

export default () => {
  function handleToggle() {
    Modal.confirm({
      title: '第一层',
      titleProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      // 透传至外层
      portal: top.document.body,
      content:
        '最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度最大高度',
      contentProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      footerProps: {
        className: 'vertical'
      },
      cancelProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      okProps: {
        className: 'text-left',
        style: {
          color: 'red'
        }
      },
      onOk: () => {
        console.log('第二层')
        Modal.confirm({
          title: '第二层',
          maskProps: {
            className: 'aa',
            style: {
              zIndex: 999
            }
          },
          maskClosable: true,
          content: 'confirm content2',
          onOk: () => {
            console.log('第三层')
            Modal.alert({
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
        })
        return false
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
        <Button className="flex l primary" onClick={handleToggle}>
          Modal visible toggle
        </Button>
      </Layout.Main>
    </Layout>
  )
}
