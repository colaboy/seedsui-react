import React, { useState, useContext, useEffect } from 'react'
import styles from './home-page.less'
import './../../assets/seedsui/index.less'
import { context } from 'dumi/theme'

export default () => {
  const { locale } = useContext(context)

  // 主体内容高度
  const [mainHeight, setMainHeight] = useState(400)

  // 动画库
  const Segment = require('./segment.js')
  useEffect(() => {
    setMainHeight(window.innerHeight - 64)
    drawLogo()
  }, [])

  // 国际化
  function trans(en, zh) {
    return locale === 'zh' ? zh : en
  }

  // 底部
  const footerGroups = [
    {
      title: 'SeedsUI',
      items: [
        {
          title: 'GitHub',
          link: 'https://github.com/colaboy/seedsui-react'
        },
        {
          title: trans('Releases', '发布日志'),
          link: 'https://github.com/colaboy/seedsui-react/releases'
        },
        {
          title: 'Roadmap',
          link: 'https://github.com/colaboy/seedsui-react/discussions/3924'
        },
        {
          title: trans('Contribution', '参与贡献'),
          link: 'https://github.com/colaboy/seedsui-react/blob/master/.github/CONTRIBUTING.md'
        },
        {
          title: trans('Questions And Feedback', '提问与反馈'),
          link: 'https://github.com/colaboy/seedsui-react/issues/new/choose'
        }
      ]
    },
    {
      title: trans('More Products', '更多产品'),
      items: [
        {
          title: trans('ahooks - React Hooks library', 'ahooks - React Hooks 库'),
          link: 'https://github.com/alibaba/hooks'
        },
        {
          title: trans('Dumi - Libraries/Documents Development Tool', 'Dumi - 组件/文档研发工具'),
          link: 'https://d.umijs.org'
        },
        {
          title: trans('rc-tree - Tree Select library', 'rc-tree - 树选择库'),
          link: 'https://github.com/react-component/tree'
        }
      ]
    }
  ]

  function showLogoFill() {
    let logo = document.getElementById('seedsuiLogo')
    let logoFill = document.getElementById('seedsuiLogoFill')
    if (logo && logoFill) {
      logo.style.display = 'none'
      logoFill.style.display = ''
    }
  }

  function drawLogo() {
    var path1 = document.getElementById('path1'),
      path2 = document.getElementById('path2'),
      path3 = document.getElementById('path3'),
      path4 = document.getElementById('path4'),
      path5 = document.getElementById('path5'),
      path6 = document.getElementById('path6'),
      path7 = document.getElementById('path7'),
      path8 = document.getElementById('path8'),
      path9 = document.getElementById('path9'),
      path10 = document.getElementById('path10'),
      path11 = document.getElementById('path11'),
      segment1 = new Segment(path1),
      segment2 = new Segment(path2),
      segment3 = new Segment(path3),
      segment4 = new Segment(path4),
      segment5 = new Segment(path5),
      segment6 = new Segment(path6),
      segment7 = new Segment(path7),
      segment8 = new Segment(path8),
      segment9 = new Segment(path9),
      segment10 = new Segment(path10),
      segment11 = new Segment(path11)

    segment1.draw('0%', '0%', 2)
    segment2.draw('0%', '0%', 2)
    segment3.draw('0%', '0%', 2)
    segment4.draw('0%', '0%', 1, { delay: 2 })
    segment5.draw('0%', '0%', 1, { delay: 2 })
    segment6.draw('0%', '0%', 1, { delay: 2 })
    segment7.draw('0%', '0%', 1, { delay: 2 })
    segment8.draw('0%', '0%', 1, { delay: 2 })
    segment9.draw('0%', '0%', 1, { delay: 2 })
    segment10.draw('100%', '100%', 1, { delay: 2 })
    segment11.draw('0%', '0%', 1, { delay: 2, callback: showLogoFill })
  }

  return (
    <div className={styles.homePage}>
      {/* 内容部分 */}
      <div className={styles.main} style={{ height: `${mainHeight}px` }}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>SeedsUI React</h1>
            <p className={styles.description}>
              {trans('A Mobile First HTMl5 and CSS3 UI Framework', '专为移动设备设计的模版框架')}
            </p>
            <p className={styles.buttons}>
              <a href={trans('/guide/quick-start', '/zh/guide/quick-start')}>
                {trans('Get Started', '开始使用')}
              </a>
              <a href={trans('/components', '/zh/components')}>{trans('Components', '组件列表')}</a>
            </p>
          </div>
          {/* logo动画 */}
          <div className={styles.logoContainer}>
            <svg
              version="1.1"
              id="seedsuiLogo"
              className={styles.logo}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100%"
              height="100%"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="11.6787"
                  strokeMiterlimit="10"
                  d="M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7
                c31.1,62.8,80.3,108.2,152,112.8C667.2,300.2,685.5,152,550.6,157.7z"
                />
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="11.6787"
                  strokeMiterlimit="10"
                  d="M686.4,575.5c0.4-42-15.6-81.6-45-111.6
                c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3
                c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"
                />
                <path
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="11.6787"
                  strokeMiterlimit="10"
                  d="M629.9,335.2
                c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1c-10.8-10.4-31.3-19.6-69.2-22.8
                C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7c93,17,122.8,97.2,131.5,152.9
                c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9C823.1,738.5,823.5,350.6,629.9,335.2z"
                />
              </g>
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7858"
                strokeMiterlimit="10"
                d="M261.7,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M585.5,769.6c0,0,0,79,0,103.8
              c0,24.8-20,45-45,45c-32.4,0-45.1-28.6-45.1-49.8c0-21.2,10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7858"
                strokeMiterlimit="10"
                d="M671,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="27.2503"
                strokeMiterlimit="10"
                d="M779.2,816.5c0,0,0,39.8,0,65.1
              s-22.5,28.5-28.5,28.5c-6,0-28.5-3.2-28.5-28.5s0-65.1,0-65.1"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="29.1968"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M819.1,785.1v0.7"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="27.2503"
                strokeMiterlimit="10"
                d="M819.1,921.6V816.5V921.6z"
              />
            </svg>
            <svg
              version="1.1"
              id="seedsuiLogoBtm"
              className={styles.logo}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100%"
              height="100%"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="none"
                  id="path1"
                  stroke="#8dc63f"
                  strokeWidth="12.5"
                  strokeMiterlimit="10"
                  d="M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7
                c31.1,62.8,80.3,108.2,152,112.8C667.2,300.2,685.5,152,550.6,157.7z"
                />
                <path
                  fill="none"
                  id="path2"
                  stroke="#8dc63f"
                  strokeWidth="12.5"
                  strokeMiterlimit="10"
                  d="M686.4,575.5c0.4-42-15.6-81.6-45-111.6
                c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3
                c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"
                />
                <path
                  fill="none"
                  id="path3"
                  stroke="#8dc63f"
                  strokeWidth="12.5"
                  strokeMiterlimit="10"
                  d="M629.9,335.2
                c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1c-10.8-10.4-31.3-19.6-69.2-22.8
                C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7c93,17,122.8,97.2,131.5,152.9
                c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9C823.1,738.5,823.5,350.6,629.9,335.2z"
                />
              </g>
              <path
                fill="none"
                id="path4"
                stroke="#8dc63f"
                strokeWidth="9"
                strokeMiterlimit="10"
                d="M261.7,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                id="path5"
                stroke="#8dc63f"
                strokeWidth="9"
                strokeMiterlimit="10"
                d="M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                id="path6"
                stroke="#8dc63f"
                strokeWidth="9"
                strokeMiterlimit="10"
                d="M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                id="path7"
                stroke="#8dc63f"
                strokeWidth="9"
                strokeMiterlimit="10"
                d="M585.5,769.6c0,0,0,79,0,103.8
              c0,24.8-20,45-45,45c-32.4,0-45.1-28.6-45.1-49.8c0-21.2,10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"
              />
              <path
                fill="none"
                id="path8"
                stroke="#8dc63f"
                strokeWidth="9"
                strokeMiterlimit="10"
                d="M671,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                id="path9"
                stroke="#8dc63f"
                strokeWidth="29"
                strokeMiterlimit="10"
                d="M779.2,816.5c0,0,0,39.8,0,65.1
              s-22.5,28.5-28.5,28.5c-6,0-28.5-3.2-28.5-28.5s0-65.1,0-65.1"
              />
              <path
                fill="none"
                id="path10"
                stroke="#8dc63f"
                strokeWidth="29.1968"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M819.1,785.1v0.7"
              />
              <path
                fill="none"
                id="path11"
                stroke="#8dc63f"
                strokeWidth="27.2503"
                strokeMiterlimit="10"
                d="M819.1,921.6V816.5V921.6z"
              />
            </svg>
            <svg
              version="1.1"
              id="seedsuiLogoFill"
              style={{ display: 'none' }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100%"
              height="100%"
              viewBox="0 0 1000 1000"
              enableBackground="new 0 0 1000 1000"
              xmlSpace="preserve"
            >
              <g>
                <path
                  fill="#ffffff"
                  d="M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7c31.1,62.8,80.3,108.2,152,112.8
                C667.2,300.2,685.5,152,550.6,157.7z"
                />
                <path
                  fill="#ffffff"
                  d="M686.4,575.5c0.4-42-15.6-81.6-45-111.6c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4
                l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1
                c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"
                />
                <path
                  fill="#ffffff"
                  d="M629.9,335.2c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1
                c-10.8-10.4-31.3-19.6-69.2-22.8C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7
                c93,17,122.8,97.2,131.5,152.9c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9
                C823.1,738.5,823.5,350.6,629.9,335.2z"
                />
              </g>
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7858"
                strokeMiterlimit="10"
                d="M261.7,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2
              c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7099"
                strokeMiterlimit="10"
                d="M585.5,769.6c0,0,0,79,0,103.8s-20,45-45,45
              c-32.4,0-45.1-28.6-45.1-49.8s10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="7.7858"
                strokeMiterlimit="10"
                d="M671,821.9c0,0-22.7,0-45.6,0
              c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"
              />
              <path
                fill="none"
                stroke="#ffffff"
                strokeWidth="27.2503"
                strokeMiterlimit="10"
                d="M779.2,816.5c0,0,0,39.8,0,65.1
              s-22.5,28.5-28.5,28.5s-28.5-3.2-28.5-28.5s0-65.1,0-65.1"
              />
              <line
                fill="none"
                stroke="#ffffff"
                strokeWidth="27.2503"
                strokeMiterlimit="10"
                x1="819.1"
                y1="816.5"
                x2="819.1"
                y2="921.6"
              />
              <line
                fill="none"
                stroke="#ffffff"
                strokeWidth="29.1968"
                strokeLinecap="round"
                strokeMiterlimit="10"
                x1="819.1"
                y1="785.1"
                x2="819.1"
                y2="785.8"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* 底部导航 */}
      <div className={styles.footer}>
        <div className={styles.columns}>
          {footerGroups.map((group) => (
            <ul key={group.title}>
              <li>{group.title}</li>
              {group.items.map((item) => (
                <li key={item.title}>
                  <a href={item.link} target="_blank">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          <ul>
            <li>{trans('WeChat Feedback', 'QQ交流反馈')}</li>
            <li>
              <img
                src="https://res.waiqin365.com/d/seedsui/qrcodeqq-seedsui.png"
                alt="WeChat-feedback"
                width={240}
              />
            </li>
          </ul>
        </div>

        <div className={styles.copyright}>
          Open-source MIT Licensed
          {' | '}
          Copyright © ColaBoy
          {' | '}
          Powered by{' '}
          <a href="https://d.umijs.org" target="_blank">
            dumi
          </a>
        </div>
      </div>
    </div>
  )
}
