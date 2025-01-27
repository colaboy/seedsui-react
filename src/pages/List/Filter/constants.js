import locale from 'library/utils/locale'

export default {
  // 状态
  statusList: [
    {
      id: '1',
      name: locale('待确认', 'library.2a2772fa8f6d68423b4656905884c5b4')
    },
    {
      id: '2',
      name: locale('待客户确认', 'library.3b37f07680f1c1ca2cb4b9f8157ddcbf')
    },
    {
      id: '3',
      name: locale('待供应商确认', 'library.95287cb1b9d771c5adb4baefe575b4e7')
    },
    {
      id: '4',
      name: locale('待收货', 'library.4933ca41e65042dac0c6e02a476017ea')
    },
    {
      id: '5',
      name: locale('已完成', 'library.fad5222ca0acfaee54f06458188d916a')
    },
    {
      id: '6',
      name: locale('已取消', 'library.2111ccbb190dca403b6f540adf08221e')
    }
  ],

  // 来源
  orderSourceList: [
    {
      id: 'MDWXXD',
      name: locale('商城', 'library.2c7b38d66dfaa10444e369a25a46d270')
    },
    {
      id: 'GJBF',
      name: locale('拜访', 'library.10f31bc81c2384f0909a036aa73fd5ce')
    },
    {
      id: 'PHONE',
      name: locale('电话', 'library.5a93d3f72d13b6f878f30be38a9faa68')
    }
  ],

  // 订单类型
  orderTypeList: [
    {
      id: '1',
      name: locale('退货订单', 'library.29ed95fb6505132b22dbc38ed34983a1')
    },
    {
      id: '2',
      name: locale('换入订单', 'library.b00da7f3ef1cffb6a90adcf0f3c4ae0f')
    }
  ],

  // 图标
  ricon: <i className="ricon icon shape-arrow-right sm" style={{ marginRight: '4px' }} />
}
