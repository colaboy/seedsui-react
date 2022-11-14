import React from 'react'
import { Tree } from 'seedsui-react'

const data = [
  {
    name: 'xufeng',
    parentid: '-1',
    id: '10',
    keyword: 'xufeng xufeng',
    props: { node_type: '1', code: 'awdawd13' }
  },
  {
    name: '学生会子部门1',
    parentid: '7430500182303471302',
    id: '7585809493031658997',
    keyword: '学生会子部门1 xueshenghuizibumen1',
    props: { node_type: '1', code: 'wadaw213' }
  },
  {
    name: '部门090702',
    parentid: '10',
    id: '4741890770046876653',
    keyword: '部门090702 bumen090702',
    props: { node_type: '1', code: '10002' }
  },
  {
    name: '部门090704',
    parentid: '10',
    id: '7025421927446751459',
    keyword: '部门090704 bumen090704',
    props: { node_type: '1', code: '10004' }
  },
  {
    name: '部门09070401',
    parentid: '7025421927446751459',
    id: '6556176050047796346',
    keyword: '部门09070401 bumen09070401',
    props: { node_type: '1', code: '10005' }
  },
  {
    name: 'bm091406',
    parentid: '-1',
    id: '4704129477050857094',
    keyword: 'bm091406 bm091406',
    props: { node_type: '1', code: 'bm091406' }
  },
  {
    name: 'bm091407',
    parentid: '-1',
    id: '8288052511310579702',
    keyword: 'bm091407 bm091407',
    props: { node_type: '1', code: 'bm091407' }
  },
  {
    name: 'bm091408',
    parentid: '-1',
    id: '5539951644928164499',
    keyword: 'bm091408 bm091408',
    props: { node_type: '1', code: 'bm091408' }
  },
  {
    name: 'bm091409',
    parentid: '-1',
    id: '7882722086003908238',
    keyword: 'bm091409 bm091409',
    props: { node_type: '1', code: 'bm091409' }
  },
  {
    name: 'bm091410',
    parentid: '-1',
    id: '5090794268132594999',
    keyword: 'bm091410 bm091410',
    props: { node_type: '1', code: 'bm091410' }
  },
  {
    name: '部门091301',
    parentid: '-1',
    id: '8613074673063547119',
    keyword: '部门091301 bumen091301',
    props: { node_type: '1', code: '091301' }
  },
  {
    name: '部门091304',
    parentid: '-1',
    id: '5786442547562464696',
    keyword: '部门091304 bumen091304',
    props: { node_type: '1', code: '091304' }
  },
  {
    name: '部门1',
    parentid: '-1',
    id: '9077188644920740571',
    keyword: '部门1 bumen1',
    props: { node_type: '1', code: '111111' }
  },
  {
    name: '部门2',
    parentid: '-1',
    id: '5424047238530883639',
    keyword: '部门2 bumen2',
    props: { node_type: '1', code: '22222' }
  },
  {
    name: '学生会',
    parentid: '10',
    id: '7430500182303471302',
    keyword: '学生会 xueshenghui',
    props: { node_type: '1', code: 'xsh001' }
  }
]

export default () => {
  return (
    <>
      <Tree
        keyword="xu"
        keywordAttribute={{
          pinyin: true,
          style: { color: 'red' },
          className: 'custom'
        }}
        arrowAutoShow
        list={data}
        multiple
        checkbox
        checkStrictly={false}
      />
    </>
  )
}
