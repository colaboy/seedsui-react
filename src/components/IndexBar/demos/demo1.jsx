import React, { Fragment, useEffect, useState } from 'react'
import { Layout, IndexBar } from 'seedsui-react'

export default () => {
  const [list, setList] = useState([])

  useEffect(() => {
    // Mock request list
    setTimeout(() => {
      let newList = queryList(['A', 'B', 'C'])
      setList(newList)
    }, 1000)

    // eslint-disable-next-line
  }, [])

  // 获取A-Z
  function queryList(letter) {
    let newList = []
    for (let i = 0; i < letter.length; i++) {
      for (let j = 0; j < 15; j++) {
        newList.push({
          letter: letter[i],
          name: `${letter[i]}姓人名`
        })
      }
    }
    return newList
  }

  console.log('list:', list)

  // Render list
  function getListNodes() {
    let letter = {}
    return list.map((item, index) => {
      if (!letter[item.letter]) {
        letter[item.letter] = true
        return (
          <Fragment key={index}>
            <IndexBar.Anchor name={item.letter}>
              <li>{item.letter}</li>
            </IndexBar.Anchor>
            <li>{item.name}</li>
          </Fragment>
        )
      }
      return <li key={index}>{item.name}</li>
    })
  }
  return (
    <Layout className="full">
      <IndexBar>
        <Layout.Main
          onBottomRefresh={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                let newList = queryList([
                  'A',
                  'B',
                  'C',
                  'D',
                  'E',
                  'F',
                  'G',
                  'H',
                  'I',
                  'J',
                  'K',
                  'L',
                  'M',
                  'N',
                  'O',
                  'P',
                  'Q',
                  'R',
                  'S',
                  'T',
                  'U',
                  'V',
                  'W',
                  'X',
                  'Y',
                  'Z'
                ])
                setList(newList)
                resolve(true)
              }, 2000)
            })
          }}
        >
          <ul>{getListNodes()}</ul>
        </Layout.Main>
      </IndexBar>
    </Layout>
  )
}
