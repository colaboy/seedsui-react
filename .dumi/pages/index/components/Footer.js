import { useLocale } from 'dumi'
import React from 'react'

// 底部导航
export default () => {
  const locale = useLocale()

  // 国际化
  function trans(en, zh) {
    return locale?.id === 'en-US' ? en : zh
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
          title: trans('Questions And Feedback', '提问与反馈'),
          link: 'https://github.com/colaboy/seedsui-react/issues/new/choose'
        }
      ]
    },
    {
      title: trans('Dependence Products', '依赖产品'),
      items: [
        {
          title: trans('axios - Request library', 'axios - 请求库'),
          link: 'https://axios-http.com/'
        },
        {
          title: trans('lodash - JavaScript utility library', 'lodash - JavaScript工具库'),
          link: 'https://lodash.com/'
        },
        {
          title: trans('rc-tree - Tree Select library', 'rc-tree - 树选择库'),
          link: 'https://github.com/react-component/tree'
        },
        {
          title: trans('vConsole - debugging tool', 'vConsole - 调试工具'),
          link: 'https://github.com/Tencent/vConsole'
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
        }
      ]
    }
  ]

  return (
    <div className="homepage-footer">
      <div className="columns">
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
              src="https://colaboy.github.io/seedsui-react/assets/images/qrcodeqq-seedsui.png"
              alt="WeChat-feedback"
              width={240}
            />
          </li>
        </ul>
      </div>

      {/* <div className="copyright">
        Open-source MIT Licensed
        {' | '}
        Copyright © ColaBoy
        {' | '}
        Powered by{' '}
        <a href="https://d.umijs.org" target="_blank">
          dumi
        </a>
      </div> */}
    </div>
  )
}
