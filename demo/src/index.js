import React, { useState, useRef, useEffect, useCallback } from 'react'
import { render } from 'react-dom'
import { Page, Header, Titlebar, Bridge, Container, MapUtil, Tree } from '../../src'

function Demo() {
  const groupList = [
    {
      id: '97666a35-778e-4d28-a973-df7144fe5887',
      name: '开发二部一室',
      parentid: '3fbb06c3-6ac5-4a19-9252-898818da5c30'
    },
    {
      id: '93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9',
      name: '开发一部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: 'afb6ae14-5d23-4117-b819-cc7e705e8ddb',
      name: '开发一部一室',
      parentid: '93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9'
    },
    {
      id: '3fbb06c3-6ac5-4a19-9252-898818da5c30',
      name: '开发二部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: 'bd8b7116-e5ae-4813-b2a7-a38f56ce10d1',
      name: '开发二部二室',
      parentid: '3fbb06c3-6ac5-4a19-9252-898818da5c30'
    },
    {
      id: '7eb397f6-daed-41f9-8985-ac2c2129ef9b',
      name: '开发一部二室',
      parentid: '93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9'
    },
    {
      id: '87154769-0d80-4459-a0cb-df68b26e4011',
      name: '开发二部三室',
      parentid: '3fbb06c3-6ac5-4a19-9252-898818da5c30'
    },
    {
      id: '380e2247-1179-40e2-91e1-8851dd5f24ef',
      name: '开发三部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: '41eddac1-e560-47c9-8ea0-c39838e93bb5',
      name: '开发一部三室',
      parentid: '93fe4fa2-e75e-4e98-833d-7cdecdf2e3f9'
    },
    {
      id: '56a81fea-03f4-41e1-a521-ea14513a65c6',
      name: '业务产品部',
      parentid: '-1'
    },
    {
      id: 'dbc1599b-41a1-49bb-8230-a230e0927016',
      name: 'UED部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: 'abd197f0-1ce5-4e42-a6b0-063cf22633d2',
      name: '测试部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: '0a9ba2be-94d8-4163-85d2-940ccbf5ede1',
      name: '广州开发部',
      parentid: '0b189355-76f5-430d-bcdc-ccce65880021'
    },
    {
      id: '0a9ba2be-94d8-4163-468i-940ccbf5ede1',
      name: '广州开发部一室',
      parentid: '0a9ba2be-94d8-4163-85d2-940ccbf5ede1'
    },
    {
      id: '0d736fce-5f4a-4603-acc2-1ed4d3f4a578',
      name: '运营支撑部',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: 'c6e56510-c293-48bc-ac8e-bfa3a1926417',
      name: '办公室',
      parentid: '-1'
    },
    {
      id: '483d-94d8-4163-85d2-940ccbf5ede1',
      name: '办公室1',
      parentid: 'c6e56510-c293-48bc-ac8e-bfa3a1926417'
    },
    {
      id: '693a-5f4a-4603-acc2-1ed4d3f4a578',
      name: '办公室1-1',
      parentid: '483d-94d8-4163-85d2-940ccbf5ede1'
    },
    {
      id: 'f83fe35c-a93e-4332-a3a4-8c16b7b9e4db',
      name: '财务部',
      parentid: '-1'
    },
    {
      id: 'e58f452e-a3d4-4eff-9f00-fbcf57342267',
      name: '残酷吗？VC的筛选法则：看100个案子投1个',
      parentid: '7576b7b4-1e15-4b09-8d4c-47ca7edb36fe'
    },
    {
      id: 'ed991ebb-872b-4943-838d-41e51d145cf4',
      name: '测试二室',
      parentid: 'abd197f0-1ce5-4e42-a6b0-063cf22633d2'
    },
    {
      id: 'c74b5302-1293-4087-a684-04104e7da402',
      name: '测试三室',
      parentid: 'abd197f0-1ce5-4e42-a6b0-063cf22633d2'
    },
    {
      id: '8144c2fa-a39b-4959-8251-3327a683df4c',
      name: '测试一室',
      parentid: 'abd197f0-1ce5-4e42-a6b0-063cf22633d2'
    },
    {
      id: '2b33aea3-3745-4ed3-9457-5494aee5e344',
      name: '工程及运维部',
      parentid: '0b189355-76f5-430d-bcdc-ccce65880021'
    },
    {
      id: '728fd935-fb28-4154-8e3f-74ca29a2460f',
      name: '集成开发二部',
      parentid: '0b189355-76f5-430d-bcdc-ccce65880021'
    },
    {
      id: 'a6781fb8-9968-4134-8fd0-564821ea7058',
      name: '集成开发一部',
      parentid: '0b189355-76f5-430d-bcdc-ccce65880021'
    },
    {
      id: '13ed5bf3-1b91-4fca-9303-ee8071b32154',
      name: '内勤组',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: '47f9b708-ab98-4fb3-a643-217db2074c73',
      name: '人力资源部',
      parentid: '-1'
    },
    {
      id: 'a87d375e-61ba-470a-914c-30eb94e21adf',
      name: '市场北京办',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: 'd0d02e37-114c-4446-b870-06e99f9e1394',
      name: '市场广州办',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: '90fea6c9-0f66-45b0-a3c1-bb209beac12e',
      name: '市场南京办',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: '0a39cee5-a280-45c7-a41e-1998855e3ef1',
      name: '市场上海办',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: '221b9674-ac71-45ba-81f1-4b4be1df4314',
      name: '市场武汉办',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: 'ce1ebf90-9540-41d4-9b79-c30441913ad2',
      name: '市场支持',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      id: '7576b7b4-1e15-4b09-8d4c-47ca7edb36fe',
      name: '微软宣布新一轮裁员或影响1000人',
      parentid: '97666a35-778e-4d28-a973-df7144fe5887'
    },
    {
      id: '3e12ef76-9235-48c5-bff8-27fbd56111cb',
      name: '项目管理部',
      parentid: '-1'
    },
    {
      id: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba',
      name: '销售二部',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    },
    {
      id: '99bc0450-4e64-42e6-99cb-2c5686a4c0b3',
      name: '系统集成部',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    },
    {
      id: '96a2835b-a1b2-4556-bf68-cb0038042b57',
      name: '移动平台产品线',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    },
    {
      id: '0b189355-76f5-430d-bcdc-ccce65880021',
      name: '应用交付产品线',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    },
    {
      id: 'd3a6be54-30f0-4e82-8083-a7ed8456d03d',
      name: '运营体系',
      parentid: '-1'
    },
    {
      id: '6bb5a527-5800-4583-a749-bbb53e639d52',
      name: '支撑二室',
      parentid: '0d736fce-5f4a-4603-acc2-1ed4d3f4a578'
    },
    {
      id: 'abdab8ba-7a99-462e-b022-56c69b3ae4fd',
      name: '支撑一室',
      parentid: '0d736fce-5f4a-4603-acc2-1ed4d3f4a578'
    },
    {
      id: '8ff29a2a-0960-4bd7-81be-0e4a649ba701',
      name: '未分组部门',
      parentid: '-1'
    }
  ]
  var userList1 = [
    {
      isPeople: true,
      id: 'xiali',
      name: '夏立',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    },
    {
      isPeople: true,
      id: 'liuyu',
      name: '刘宇',
      parentid: '56a81fea-03f4-41e1-a521-ea14513a65c6'
    }
  ]
  var userList2 = [
    {
      isPeople: true,
      id: 'liguanghui',
      name: '李广辉',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      isPeople: true,
      id: 'xuguolong',
      name: '徐国龙',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    },
    {
      isPeople: true,
      id: 'zhujingjing',
      name: '朱晶晶',
      parentid: '96a2835b-a1b2-4556-bf68-cb0038042b57'
    }
  ]

  // 异步加载的方法, 点击Title, 去请求数据, 将数据塞到指定节点下
  function handleChildren(id) {
    Bridge.showLoading()
    return new Promise((resolve) => {
      if (id === '56a81fea-03f4-41e1-a521-ea14513a65c6') {
        // 加载业务产品部
        console.log('加载业务产品部')
        setTimeout(() => {
          resolve(userList1)
          Bridge.hideLoading()
        }, 2000)
      } else if (id === '96a2835b-a1b2-4556-bf68-cb0038042b57') {
        // 加载移动平台产品线
        console.log('加载移动平台产品线')
        setTimeout(() => {
          resolve(userList2)
          Bridge.hideLoading()
        }, 2000)
      }
    })
  }
  const barRef = useRef(null)
  const [elBar, setElBar] = useState(null)

  const [list, setList] = useState([])
  useEffect(() => {
    setElBar(barRef.current)
    setTimeout(() => {
      setList(groupList)
    }, 1000)
  }, [])
  const [selected, setSelected] = useState([
    {
      id: '13ed5bf3-1b91-4fca-9303-ee8071b32154',
      name: '内勤组',
      parentid: 'b93d94c6-7e30-4caf-89eb-188bef40b3ba'
    },
    {
      id: '47f9b708-ab98-4fb3-a643-217db2074c73',
      name: '人力资源部',
      parentid: '-1'
    }
  ])
  const [extend, setExtend] = useState(0) // 1.全部展开 -1.全部收缩 0.不工作
  // 获取选中
  function handleSubmit() {
    console.log(selected)
  }
  // 展开全部
  function handleExtend() {
    setExtend(1)
  }
  // 展开全部
  function handleCollapse() {
    setExtend(-1)
  }

  // 添加数据时, 可手动修改它的渲染样式
  function handleRender(option) {
    if (option.isPeople) {
      var photo = ''
      if (option.avatarUrl) {
        photo =
          '<span class="tree-avatar" style="background-image:url(' + option.avatarUrl + ')"></span>'
      } else {
        // photo = '<span class="tree-avatar" style="background-color:' + option.name.substr(0, 1).toPinyin().substr(0, 1).toColor() + '">' + option.name.substr(option.name.length - 2, 2) + '</span>';
        photo =
          '<span class="tree-avatar">' + option.name.substr(option.name.length - 2, 2) + '</span>'
      }
      option.html =
        '<div class="tree-icon">' +
        photo +
        '</div>' +
        '<div class="tree-title">' +
        option.name +
        '</div>'
    }
  }
  // 查看选中信息
  function handleChange(e, value, options) {
    console.log(value, options)
    setSelected(options)
  }

  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <div ref={barRef} className="tree-bar"></div>
        <Tree
          list={list}
          extend={extend}
          multiple
          checkbox
          getChildren={handleChildren}
          onData={handleRender}
          onChange={handleChange}
          selected={selected}
          checkStrictly={false}
          bar={elBar}
        />
        <input type="button" className="button lg" value="查看选中" onClick={handleSubmit} />
        <input type="button" className="button lg" value="展开全部" onClick={handleExtend} />
        <input type="button" className="button lg" value="收缩全部" onClick={handleCollapse} />
      </Container>
    </Page>
  )
}

Bridge.ready(() => {
  // render(<Demo />, document.querySelector('#demo'))
  // 加载百度地图js库
  MapUtil.load({
    ak: '3pTjiH1BXLjASHeBmWUuSF83',
    success: () => {
      render(<Demo />, document.querySelector('#demo'))
    },
    fail: () => {
      console.log('加载失败')
    }
  })
})
