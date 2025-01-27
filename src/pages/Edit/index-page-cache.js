import React, { useRef, useEffect, useState } from 'react'
import { useActivate } from 'react-activation'
import locale from 'library/utils/locale'
import { queryData, saveData } from './api'
import validateForm from './utils/validateForm'

import { Card } from 'seedsui-react'
import Layout from 'library/components/Layout'
import NoDataGroup from 'library/components/NoDataGroup'
import Form from 'library/components/Form'
import Forms from './Forms'
import Footer from './Footer'

// 表单编辑页面: react-activation
const Edit = () => {
  // 表单
  const [form] = Form.useForm()

  // 防重复提交token
  const tokenRef = useRef('' + Date.now())

  // 基础数据
  const baseDataRef = useRef(null)

  // 错误: null加载中, ''加载成功, '错误信息'加载失败
  const [errMsg, setErrMsg] = useState(null)

  // 页面激活
  useActivate(() => {
    if (判断前进) {
      console.log('前进刷新')
      refreshScope('<KeepAlive>的此页面的name') // 刷新此页面
    }
  })

  useEffect(() => {
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [])

  /**
   * queryData初始化数据方法
   * @return {Object} {baseData: xx, formData: xx}
   */
  async function loadData() {
    // 加载详情数据
    let data = await queryData()

    // baseData基础数据, 用于提交时透传的参数, 页面中的所有展示信息一律在formData中
    baseDataRef.current = data.baseData

    // 加载数据失败
    if (typeof data === 'string') {
      setErrMsg(data)
    }
    // 加载数据成功
    else {
      // 设置表单数据
      form.setFieldsValue(data.formData)
    }
  }

  // 保存
  async function handleSave() {
    // 校验表单数据
    let errMsg = await validateForm({ form, errorType: 'toast' })
    if (errMsg) return

    // 获取表单数据
    let formData = form.getFieldsValue()

    let isOk = await saveData({ baseData: baseDataRef.current, formData, tokenRef: tokenRef })
    if (!isOk) {
      console.log('保存成功, 清空数据')
    }
  }

  return (
    <Layout className="full">
      <Layout.Main>
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
          <Forms.Form2 form={form} />
        </Card>

        {/* 表单3: 自定义 */}
        <Card>
          <p
            className="font-size-l border-b"
            style={{ margin: '0 12px', padding: '8px 0', fontWeight: '500' }}
          >
            {locale('自定义样式与校验', 'library.36ff6ad5457eb8938ae716a4032d3fe2')}
          </p>
          <Forms.Form3 form={form} />
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
