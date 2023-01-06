import React from 'react'
import { IndexBar } from 'seedsui-react'

export default () => {
  return (
    <div className="position-relative" style={{ height: '500px', overflow: 'hidden' }}>
      <IndexBar>
        <div className="position-relative" style={{ height: '500px', overflow: 'auto' }}>
          <ul>
            <IndexBar.Anchor name={'A'}>
              <li>标题A</li>
            </IndexBar.Anchor>
            <li>阿华</li>
            <li>阿敏</li>
            <li>阿全</li>
            <li>阿达</li>

            <IndexBar.Anchor name={'B'}>
              <li>标题B</li>
            </IndexBar.Anchor>
            <li>白起</li>
            <li>白旭</li>
            <li>冰冰</li>
            <IndexBar.Anchor name={'C'}>
              <li>标题C</li>
            </IndexBar.Anchor>
            <li>曹操</li>
            <li>曹鸣</li>
            <li>曹捷</li>
            <li>陈真</li>
            <li>陈进</li>
            <li>陈明</li>
            <li>陈伟</li>
            <li>陈文</li>
            <li>陈晓</li>
            <li>陈娟</li>
            <li>成勇</li>
            <li>成婷</li>
            <li>成龙</li>
            <IndexBar.Anchor name={'D'}>
              <li>D</li>
            </IndexBar.Anchor>
            <li>大成子</li>
            <li>大舅子</li>
            <li>戴笠</li>
            <li>戴坤</li>
            <li>戴成虎</li>
            <li>邓小平</li>
            <li>邓稼先</li>
            <li>邓文迪</li>
            <li>邓等</li>
            <li>狄仁杰</li>
            <li>狄弟</li>
            <li>董文华</li>
            <li>董事</li>
            <IndexBar.Anchor name={'F'}>
              <li>F</li>
            </IndexBar.Anchor>
            <li>樊哙</li>
            <li>樊心</li>
            <li>冯晨晨</li>
            <li>冯敬尧</li>
            <li>冯成虎</li>
            <li>冯小平</li>
            <li>冯稼先</li>
            <li>冯文迪</li>
            <li>冯晨</li>
            <li>福尔杰</li>
            <li>福尔康</li>
            <li>福文华</li>
            <li>方文山</li>
          </ul>
        </div>
      </IndexBar>
    </div>
  )
}
