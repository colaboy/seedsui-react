// 将服务器数据转成本地数据
function localData(serverData) {
  return {
    customer: [
      {
        id: 'zs',
        name: '张三'
      }
    ],
    orderNo: 'No.1234',
    dateRange: [new Date(), new Date()],
    employee: [
      {
        id: 'zjl',
        name: '张经理'
      }
    ],
    remark: '备注信息',
    orderStatus: [
      {
        id: '1',
        name: '待确认'
      }
    ]
  }
}
export default localData
