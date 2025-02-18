const path = require('path')
const fs = require('fs')
const translateFolder = require('./utils/translateFolder')
const writeFileSync = require('./utils/writeFileSync')

async function translateSrc() {
  const folderPath = path.resolve(__dirname, './../src')
  // 生成文件的目录
  let localesPath = path.resolve(folderPath, `assets/locale`)
  // 读取上次数据用于做合并与统计差量
  let oldBaseDataPath = path.resolve(folderPath, `assets/locale/base.json`)
  let oldBaseData = null
  if (fs.existsSync(oldBaseDataPath)) {
    oldBaseData = require(oldBaseDataPath)
  }

  let data = await translateFolder({
    ignore: [
      '**/deprecated/**',
      '**/scripts/**',
      '**/demos/**',
      '**/locale/**', // 忽略 locale 目录
      '**/locales/**', // 忽略 locales 目录
      '**/*.d.ts'
    ],
    folderPath: folderPath,
    localeFunctionName: 'LocaleUtil.locale',
    oldBaseData: oldBaseData,
    translateOptions: [
      // 阿拉伯语
      { from: 'zh_CN', to: 'ar_EG' },
      // 阿塞拜疆语
      { from: 'zh_CN', to: 'az_AZ' },
      // 保加利亚语
      { from: 'zh_CN', to: 'bg_BG' },
      // 孟加拉语（孟加拉国）
      { from: 'zh_CN', to: 'bn_BD' },
      // 白俄罗斯语
      { from: 'zh_CN', to: 'by_BY' },
      // 加泰罗尼亚语
      { from: 'zh_CN', to: 'ca_ES' },
      // 捷克语
      { from: 'zh_CN', to: 'cs_CZ' },
      // 丹麦语
      { from: 'zh_CN', to: 'da_DK' },
      // 德语
      { from: 'zh_CN', to: 'de_DE' },
      // 希腊语
      { from: 'zh_CN', to: 'el_GR' },
      // 英语
      { from: 'zh_CN', to: 'en_GB' },
      // 英语（美式）
      { from: 'zh_CN', to: 'en_US' },
      // 西班牙语
      { from: 'zh_CN', to: 'es_ES' },
      // 巴斯克语
      { from: 'zh_CN', to: 'eu_ES' },
      // 爱沙尼亚语
      { from: 'zh_CN', to: 'et_EE' },
      // 波斯语
      { from: 'zh_CN', to: 'fa_IR' },
      // 芬兰语
      { from: 'zh_CN', to: 'fi_FI' },
      // 法语（比利时）
      { from: 'zh_CN', to: 'fr_BE' },
      // 法语（加拿大）
      { from: 'zh_CN', to: 'fr_CA' },
      // 法语（法国）
      { from: 'zh_CN', to: 'fr_FR' },
      // 爱尔兰语
      { from: 'zh_CN', to: 'ga_IE' },
      // 加利西亚语（西班牙）
      { from: 'zh_CN', to: 'gl_ES' },
      // 希伯来语
      { from: 'zh_CN', to: 'he_IL' },
      // 印地语
      { from: 'zh_CN', to: 'hi_IN' },
      // 克罗地亚语
      { from: 'zh_CN', to: 'hr_HR' },
      // 匈牙利语
      { from: 'zh_CN', to: 'hu_HU' },
      // 亚美尼亚
      { from: 'zh_CN', to: 'hy_AM' },
      // 印度尼西亚语
      { from: 'zh_CN', to: 'id_ID' },
      // 意大利语
      { from: 'zh_CN', to: 'it_IT' },
      // 冰岛语
      { from: 'zh_CN', to: 'is_IS' },
      // 日语
      { from: 'zh_CN', to: 'ja_JP' },
      // 格鲁吉亚语
      { from: 'zh_CN', to: 'ka_GE' },
      // 高棉语
      { from: 'zh_CN', to: 'km_KH' },
      // 北库尔德语
      { from: 'zh_CN', to: 'kmr_IQ' },
      // 卡纳达语
      { from: 'zh_CN', to: 'kn_IN' },
      // 哈萨克语
      { from: 'zh_CN', to: 'kk_KZ' },
      // 韩语/朝鲜语
      { from: 'zh_CN', to: 'ko_KR' },
      // 立陶宛语
      { from: 'zh_CN', to: 'lt_LT' },
      // 拉脱维亚语
      { from: 'zh_CN', to: 'lv_LV' },
      // 马其顿语
      { from: 'zh_CN', to: 'mk_MK' },
      // 马拉雅拉姆语
      { from: 'zh_CN', to: 'ml_IN' },
      // 蒙古语
      { from: 'zh_CN', to: 'mn_MN' },
      // 马来语 (马来西亚)
      { from: 'zh_CN', to: 'ms_MY' },
      // 缅甸语
      { from: 'zh_CN', to: 'my_MM' },
      // 挪威语
      { from: 'zh_CN', to: 'nb_NO' },
      // 尼泊尔语
      { from: 'zh_CN', to: 'ne_NP' },
      // 荷兰语（比利时）
      { from: 'zh_CN', to: 'nl_BE' },
      // 荷兰语
      { from: 'zh_CN', to: 'nl_NL' },
      // 波兰语
      { from: 'zh_CN', to: 'pl_PL' },
      // 葡萄牙语(巴西)
      { from: 'zh_CN', to: 'pt_BR' },
      // 葡萄牙语
      { from: 'zh_CN', to: 'pt_PT' },
      // 罗马尼亚语
      { from: 'zh_CN', to: 'ro_RO' },
      // 俄罗斯语
      { from: 'zh_CN', to: 'ru_RU' },
      // 僧伽罗语
      { from: 'zh_CN', to: 'si_LK' },
      // 斯洛伐克语
      { from: 'zh_CN', to: 'sk_SK' },
      // 塞尔维亚语
      { from: 'zh_CN', to: 'sr_RS' },
      // 斯洛文尼亚语
      { from: 'zh_CN', to: 'sl_SI' },
      // 瑞典语
      { from: 'zh_CN', to: 'sv_SE' },
      // 泰米尔语
      { from: 'zh_CN', to: 'ta_IN' },
      // 泰语
      { from: 'zh_CN', to: 'th_TH' },
      // 土耳其语
      { from: 'zh_CN', to: 'tr_TR' },
      // 土库曼
      { from: 'zh_CN', to: 'tk_TK' },
      // 乌尔都语 (巴基斯坦)
      { from: 'zh_CN', to: 'ur_PK' },
      // 乌克兰语
      { from: 'zh_CN', to: 'uk_UA' },
      // 乌兹别克语（拉丁字母）
      { from: 'zh_CN', to: 'uz_UZ' },
      // 越南语
      { from: 'zh_CN', to: 'vi_VN' },
      // 简体中文
      { from: 'zh_CN', to: 'zh_CN' },
      // 繁体中文（中国香港）
      { from: 'zh_CN', to: 'zh_HK' },
      // 繁体中文（中国台湾）
      { from: 'zh_CN', to: 'zh_TW' }
    ],
    onGenerateKey: ({ folders, value, oldKey, newKey }) => {
      if (oldKey) return oldKey
      return `noKey_${newKey}`
    }
  })

  if (!data) return

  let { baseData, diffData, files } = data

  // 生成base.json
  await writeFileSync(oldBaseDataPath, JSON.stringify(baseData, null, 2))

  // 生成files
  for (let fileName in files) {
    let localeFilePath = path.resolve(localesPath, `${fileName}.json`)
    writeFileSync(localeFilePath, JSON.stringify(files[fileName], null, 2))
  }
}
translateSrc()
