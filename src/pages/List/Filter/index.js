import React from 'react'
import locale from 'library/utils/locale'
import constants from './constants'

import Form from 'library/components/Form'
import Input from 'library/deprecated/Input'

import Modal from 'library/deprecated/Modal'
import Select from 'library/deprecated/Select'
import Layout from 'library/components/Layout'
import Customer from 'library/components/Customer'
import Employee from 'library/components/Employee'
import DateRangePicker from './DateRangePicker'
import Footer from './Footer'

// 侧边查询
export default function FilterContent({ visible, onVisibleChange, queryParams, onQuery }) {
  const [form] = Form.useForm()

  const { statusList, orderSourceList, orderTypeList, ricon } = constants

  return (
    <Modal
      portal={false}
      animation="slideLeft" // slideLeft | slideRight | slideUp | slideDown | zoom | fade
      style={{ width: '85%', height: '100%', backgroundColor: 'white' }}
      visible={visible}
      onVisibleChange={onVisibleChange}
    >
      <Layout className="full" style={{ backgroundColor: 'white' }}>
        <Layout.Main>
          <Form form={form} className="wq-form">
            <Form.Item
              name="customer"
              initialValue={queryParams?.customer}
              label={locale('客户', 'library.ff0b207718d78924989384356166e4a3')}
            >
              <Customer.Combo
                modal="page"
                placeholder={locale('点击选择', 'library.c5e1f01e3d98b4db536765ae0d5b91a9')}
              />
            </Form.Item>

            <Form.Item
              name="order_no_like"
              initialValue={queryParams?.order_no_like}
              label={locale('退货单号', 'library.2efaa8fe48e4efd421dad5b7fde1aa00')}
            >
              <Input.Text
                placeholder={locale('退货单号', 'library.2efaa8fe48e4efd421dad5b7fde1aa00')}
              />
            </Form.Item>

            {/* 开始和结束日期 */}
            <Form.Item
              name="dateRange"
              initialValue={queryParams?.dateRange}
              label={locale('提交日期', 'library.1de8349a0ae081c3b8c4d4a1951e8562')}
              className="wq-form-item-padding-bottom-0"
            >
              <DateRangePicker />
            </Form.Item>

            <Form.Item
              name="employee"
              initialValue={queryParams?.employee}
              label={locale('客户经理', 'library.bd839db0d5d951346fdc0d235811039b')}
            >
              <Employee.Combo
                modal="page"
                tabs={[
                  {
                    id: 'people',
                    name: locale('按人员选择', 'library.fcab4bb4413d55a17b8c95874c3acc7b')
                  }
                ]}
                placeholder={locale('点击选择', 'library.c5e1f01e3d98b4db536765ae0d5b91a9')}
              />
            </Form.Item>

            <Form.Item
              name="remark"
              initialValue={queryParams?.remark}
              label={locale('订单备注', 'library.bb84d6eab6156242125acd22d08f367d')}
            >
              <Input.Text
                placeholder={locale('请输入备注', 'library.3cac6342966f3d0952773d8420293660')}
              />
            </Form.Item>

            <Form.Item
              name="orderStatus"
              initialValue={queryParams?.orderStatus}
              label={locale('状态', 'library.3fea7ca76cdece641436d7ab0d02ab1b')}
            >
              <Select.Combo
                list={statusList}
                placeholder={locale('点击选择', 'library.c5e1f01e3d98b4db536765ae0d5b91a9')}
                allowClear="exclusion-ricon"
                ricon={ricon}
              />
            </Form.Item>

            <Form.Item
              name="orderSource"
              initialValue={queryParams?.orderSource}
              label={locale('来源', 'library.26ca20b161c33362d88eb0ba0bc90751')}
            >
              <Select.Combo
                list={orderSourceList}
                placeholder={locale('点击选择', 'library.c5e1f01e3d98b4db536765ae0d5b91a9')}
                allowClear="exclusion-ricon"
                ricon={ricon}
              />
            </Form.Item>

            <Form.Item
              name="orderType"
              initialValue={queryParams?.orderType}
              label={locale('订单类型', 'library.5cd56b3eee7d6ce5ddf6f5aca247b54a')}
            >
              <Select.Combo
                list={orderTypeList}
                placeholder={locale('点击选择', 'library.c5e1f01e3d98b4db536765ae0d5b91a9')}
                allowClear="exclusion-ricon"
                ricon={ricon}
              />
            </Form.Item>
          </Form>
        </Layout.Main>
        {/* 底部 */}
        <Footer
          onReset={() => {
            // form.resetFields()
            form.setFieldsValue({
              customer: '',
              dateRange: '',
              order_no_like: '',
              employee: '',
              remark: '',
              orderStatus: '',
              orderSource: '',
              orderType: ''
            })
          }}
          onOk={() => {
            let fieldsValue = form.getFieldsValue()
            if (onQuery) onQuery(fieldsValue)
            if (onVisibleChange) onVisibleChange(false)
          }}
        />
      </Layout>
    </Modal>
  )
}
