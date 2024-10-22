import React, { useEffect, useRef, useState } from 'react'
import vconsole from 'vconsole'

import { Loading, Button } from 'seedsui-react'

// 内库使用
import { Layout, Bridge, Location, Image as ImageUploader } from 'seedsui-react'

// 测试使用
// import Bridge from 'library/utils/Bridge'
// import Layout from 'library/components/Layout'
// import Location from 'library/components/Location'
// import ImageUploader from 'library/components/ImageUploader'

new vconsole()
export default () => {
  const [photos, setPhotos] = useState([])
  const [location, setLocation] = useState([])

  const imageLocalIds = useRef(null)
  useEffect(() => {
    Bridge.ready(
      (params) => {
        console.log('鉴权完成', params)
        Bridge.getLocation({
          type: 'gcj02',
          success: (res) => {
            console.log('定位1成功', res)
          },
          fail: (res) => {
            console.log('定位1失败')
          }
        })
        Bridge.getLocation({
          type: 'gcj02',
          success: (res) => {
            console.log('定位2成功', res)
          },
          fail: (res) => {
            console.log('定位2失败')
          }
        })
        Bridge.getLocation({
          type: 'gcj02',
          success: (res) => {
            console.log('定位3成功', res)
          },
          fail: (res) => {
            console.log('定位3失败')
          }
        })
      },
      {
        wqSrc: 'https://res.waiqin365.com/p/open/js/waiqin365.min-2.0.4.js'
      }
    )
  }, [])

  return (
    <Layout className="full">
      <Layout.Main>
        <h2>组件</h2>
        <p className="demo-title">定位</p>
        <Location.Combo
          placeholder={'点击定位'}
          value={location}
          onChange={(result) => {
            console.log(result)
            setLocation(result)
          }}
        />
        <p className="demo-title">拍照</p>
        <ImageUploader
          uploadPosition="start"
          captureException={(props) => {
            console.log('captureException:', ...props)
          }}
          // 缩略图显示
          visibleCount={1}
          ModalProps={{
            captionProps: {
              caption: '商品照片'
            },
            listExtraHeaderRender: () => {
              return <div>修改前</div>
            }
          }}
          type="browser"
          timeout={2000}
          uploadDir={`businessName`}
          sizeType={['compressed']}
          // width={100}
          sourceType={['camera']}
          list={photos}
          count={4}
          watermarkConfig={{ showTime: '1', type: '1' }}
          // 离北京天安门差不多2.4公里
          watermark={['$address $distance:116.37,39.91', 'aaa', '$address', '$datetime']}
          onChange={setPhotos}
          onDelete={setPhotos}
        />
        <h2>界面接口</h2>
        <p className="demo-title">打开新窗口接口</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.openWindow({ title: '测试', url: 'https://www.baidu.com/' })
          }}
        >
          openWindow
        </Button>
        <p className="demo-title">关闭当前网页窗口接口(仅客户端与企微)</p>
        <a href="/#/test?title=test&isFromApp=confirm-close:11">返回提示11, 并关闭webview</a>
        <br />
        <a href="/#/test?title=test&isFromApp=confirm-close">返回提示, 并关闭webview</a>
        <br />
        <a href="/#/test?title=test&isFromApp=confirm:11">返回提示11</a>
        <br />
        <a href="/#/test?title=test&isFromApp=confirm">返回提示</a>
        <br />
        <a href="/#/test?title=test&isFromApp=1">返回时将会关闭webview</a>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.closeWindow()
          }}
        >
          closeWindow(全平台支持)
        </Button>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.back()
          }}
        >
          back(全平台支持)
        </Button>
        <p className="demo-title">监听页面返回事件(仅客户端与企微)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.onHistoryBack(() => {
              alert('返回监听')
            })
          }}
        >
          onHistoryBack
        </Button>

        <p className="demo-title">修改页面title</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.setTitle({
              title: '自定义标题'
            })
          }}
        >
          setTitle
        </Button>

        <p className="demo-title">退出至登录页面(仅客户端)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.logOut()
          }}
        >
          logout
        </Button>

        <p className="demo-title">返回首页(仅订货客户端支持)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.goHome()
          }}
        >
          goHome
        </Button>

        <h2>扫码接口</h2>
        <p className="demo-title">调用外勤365扫码接口</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.scanQRCode({
              scanType: ['barCode'],
              success: (res) => {
                alert(JSON.stringify(res))
              }
            })
          }}
        >
          scanQRCode
        </Button>

        <h2>图像接口</h2>
        <p className="demo-title">拍照或从手机相册中选图接口(仅支持客户端,微信,企微,小程序)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.chooseImage({
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                alert(JSON.stringify(res))
                imageLocalIds.current = res?.localIds
              },
              fail: (res) => {
                alert(JSON.stringify(res))
              },
              cancel: (res) => {
                alert(JSON.stringify(res))
              }
            })
          }}
        >
          chooseImage
        </Button>

        <p className="demo-title">上传图片接口(仅支持客户端,微信,企微,小程序)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            if (!imageLocalIds.current) {
              alert('chooseImage first!')
              return
            }
            Loading.show({
              content: '上传中...'
            })
            Bridge.uploadImage({
              localId: imageLocalIds.current[0],
              isShowProgressTips: 0,
              uploadDir: 'test',
              success: function (res) {
                alert(JSON.stringify(res))
              },
              fail: function (res) {
                alert(JSON.stringify(res))
              },
              cancel: function (res) {
                alert(JSON.stringify(res))
              },
              complete: function () {
                Loading.hide()
              }
            })
          }}
        >
          uploadImage
        </Button>

        <p className="demo-title">预览图片接口</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.previewImage({
              urls: [
                'https://res.waiqin365.com/d/static/images/logo.png',
                'https://res.waiqin365.com/d/qince-web/platform/home/banner/shootOver.png'
              ],
              index: 0,
              current: 'https://res.waiqin365.com/d/static/images/logo.png'
            })
          }}
        >
          previewImage
        </Button>

        <h2>文件接口</h2>
        <p className="demo-title">预览文件接口(仅勤策客户端支持)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.previewFile({
              url: 'https://res.waiqin365.com/d/static/images/logo.png'
            })
          }}
        >
          previewFile
        </Button>

        <h2>地理位置接口</h2>
        <p className="demo-title">查看地理位置接口(仅客户端与企微)</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.openLocation({
              slatitude: 32.02, // 起点纬度
              slongitude: 118.79, // 起点经度
              sname: '起点', // 起点名
              latitude: 39.81, // 纬度，浮点数，范围为90 ~ -90
              longitude: 116.49, // 经度，浮点数，范围为180 ~ -180。
              name: '终点', // 位置名
              address: '终点地址名', // 地址详情说明
              scale: 1 // 地图缩放级别,整形值,范围从1~28。默认为16
            })
          }}
        >
          openLocation
        </Button>

        <p className="demo-title">获取地理位置接口</p>
        <Button
          className="primary flex"
          style={{ margin: '12px 10px' }}
          onClick={() => {
            Bridge.getLocation({
              type: 'gcj02',
              success: (res) => {
                alert(JSON.stringify(res))
              },
              fail: (res) => {
                alert(JSON.stringify(res))
              }
            })
          }}
        >
          getLocation
        </Button>
      </Layout.Main>
    </Layout>
  )
}
