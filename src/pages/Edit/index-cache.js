import React, { useRef, useEffect, useState } from 'react'
import locale from 'library/utils/locale'
import useCache from 'library/utils/useCache'
import { useHistory } from 'library/utils/Router'
import { queryData, saveData } from './api'
import validateForm from './utils/validateForm'

import { Card } from 'seedsui-react'
import Layout from 'library/components/Layout'
import NoDataGroup from 'library/components/NoDataGroup'
import Form from 'library/components/Form'
import Forms from './Forms'
import Footer from './Footer'

// 表单编辑页面
const Edit = () => {
  // 持久化useCache
  const {
    // 响应式缓存数据与设置缓存
    cache,
    setCache,

    // 缓存是否加载完成
    isCacheLoad,

    // 清空缓存
    clearCache,

    // 附加功能: 缓存和获取滚动条位置
    setScrollTop,
    getScrollTop
  } = useCache({
    name: 'edit', // 缓存名称(缓存名称必须唯一, 否则数据将会串联)
    persist: true // 是否永久缓存(即杀掉进程也不会丢失)
  })

  // 前进的页面则清除缓存重新请求
  const history = useHistory()

  // 表单
  const [form] = Form.useForm()

  // 主体用于滚动条还原
  const mainRef = useRef(null)

  // 防重复提交token
  const tokenRef = useRef('' + Date.now())

  // 错误: null加载中, ''加载成功, '错误信息'加载失败
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    if (!isCacheLoad) return
    console.log('缓存数据：', cache)
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [isCacheLoad])

  /**
   * queryData初始化数据方法
   * @return {Object} {baseData: xx, formData: xx}
   */
  async function loadData() {
    // 加载详情数据
    let data = cache

    // 前进时也不读缓存
    if (!data || history.action !== 'POP') {
      data = await queryData()
      // 设置详情数据
      setCache({
        baseData: data.baseData,
        formData: data
      })
    }

    // 加载数据失败
    if (typeof data === 'string') {
      setErrMsg(data)
    }
    // 加载数据成功
    else {
      // 设置表单数据
      form.setFieldsValue(data.formData)
    }

    // 还原滚动条位置
    let scrollTop = getScrollTop()
    mainRef.current.rootDOM.scrollTop = scrollTop
  }

  // 保存
  async function handleSave() {
    // 校验表单数据
    let errMsg = await validateForm({ form, errorType: 'toast' })
    if (errMsg) return

    // 获取表单数据
    let formData = form.getFieldsValue()

    let isOk = await saveData({ formData, tokenRef: tokenRef })
    if (!isOk) {
      console.log('保存成功, 清空数据')
      clearCache()
    }
  }

  return (
    <Layout className="full">
      <Layout.Main
        // 缓存滚动条位置
        ref={mainRef}
        onScroll={(e) => {
          setScrollTop(e.currentTarget.scrollTop)
        }}
      >
        {/* 如果只有一个表单, 则直接平铺到Main中, 无需要封装到Form中 */}

        {/* 表单1，请替换成业务中更贴切的名称，例如：Forms.Base等 */}
        <Card>
          <p
            className="font-size-l border-b"
            style={{ margin: '0 12px', padding: '8px 0', fontWeight: '500' }}
          >
            {locale('表单1', 'library.52b3596e27795e1029b33e1e96f5f86e')}
          </p>
          <Forms.Form1 form={form} />
        </Card>

        {/* 表单2: 左右布局 */}
        <Card>
          <p
            className="font-size-l border-b"
            style={{ margin: '0 12px', padding: '8px 0', fontWeight: '500' }}
          >
            {locale('表单2: 左右布局', 'library.62f71aef231d97559c09eca9efba2609')}
          </p>
          <Forms.Form2
            form={form}
            onValuesChange={(changedValues, allValues) => {
              setCache({
                formData: allValues
              })
            }}
          />
        </Card>

        {/* 表单3: 自定义 */}
        <Card>
          <p
            className="font-size-l border-b"
            style={{ margin: '0 12px', padding: '8px 0', fontWeight: '500' }}
          >
            {locale('自定义样式与校验', 'library.36ff6ad5457eb8938ae716a4032d3fe2')}
          </p>
          <Forms.Form3
            form={form}
            onValuesChange={(changedValues, allValues) => {
              setCache({
                formData: allValues
              })
            }}
          />
        </Card>
      </Layout.Main>

      {/* 底部 */}
      <Footer onSave={handleSave} />

      {/* 数据加载失败 */}
      {errMsg && <NoDataGroup caption={errMsg} style={{ margin: '20px 0' }} />}
    </Layout>
  )
}

export default Edit
