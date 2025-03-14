// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'seedsui-react'
测试使用-end */

// 校验照片是否已经上传完成
function validate(list) {
  for (let item of list || []) {
    if (item.status === 'fail' || item.status === 'choose' || item.status === 'uploading') {
      return LocaleUtil.locale('当前页面存在尚未上传成功的文件，请等待上传成功或删除后再提交')
    }
  }

  return true
}

export default validate
