import React, { useState, useMemo, memo, useCallback } from 'react'
import { render } from 'react-dom'
import {
  Page,
  Header,
  Titlebar,
  Bridge,
  Container,
  MapUtil,
  InputLocation
} from '../../src'

const Child = memo((props) => {
  console.log('Child改变了', props);

  return (
    <div>
      <input type="text" value={props?.value?.value || ''} onChange={props.onChange}/>
    </div>
  )
})

const Child2 = memo((props) => {
  console.log('Child2改变了', props);

  return (
    <div>
      <input type="text" value={props.value || ''} onChange={props.onChange}/>
    </div>
  )
})

function Demo() {
  const [value, setValue] = useState({})
  const [value2, setValue2] = useState('')
  const handleChange = useCallback((e) => {
    setValue({
      value: e.target.value
    })
  }, [])
  const handleChange2 = useCallback((e) => {
    setValue2(e.target.value)
  }, [])
  const params = useMemo(() => {
    return {
      id: '1',
      funcId: '12341234'
    }
  }, [])

  return (
    <Page>
      <Header>
        <Titlebar caption="标题" />
      </Header>
      <Container>
        <Child value={value} onChange={handleChange}/>
        <Child2 value={value2} params={params} onChange={handleChange2}/>
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
