// United language list
// dayjs: https://github.com/iamkun/dayjs/tree/dev/src/locale
const languageMap = {
  // 阿拉伯语
  ar_EG: { dayjs: 'ar', translate: { google: 'ar', bing: 'ar' } },
  // 阿塞拜疆语
  az_AZ: { dayjs: 'az', translate: { google: 'az', bing: 'az' } },
  // 保加利亚语
  bg_BG: { dayjs: 'bg', translate: { google: 'bg', bing: 'bg' } },
  // 孟加拉语（孟加拉国）
  bn_BD: { dayjs: 'bn', translate: { google: 'bn', bing: 'bn' } },
  // 白俄罗斯语
  by_BY: { dayjs: 'by', translate: { google: 'by', bing: 'by' } },
  // 加泰罗尼亚语
  ca_ES: { dayjs: 'ca', translate: { google: 'ca', bing: 'ca' } },
  // 捷克语
  cs_CZ: { dayjs: 'cs', translate: { google: 'cs', bing: 'cs' } },
  // 丹麦语
  da_DK: { dayjs: 'da', translate: { google: 'da', bing: 'da' } },
  // 德语
  de_DE: { dayjs: 'de', translate: { google: 'de', bing: 'de' } },
  // 希腊语
  el_GR: { dayjs: 'el', translate: { google: 'el', bing: 'el' } },
  // 英语
  en_GB: { dayjs: 'en-gb', translate: { google: 'en', bing: 'en' } },
  // 英语（美式）
  en_US: { dayjs: 'en', translate: { google: 'en', bing: 'en' } },
  // 西班牙语
  es_ES: { dayjs: 'es', translate: { google: 'es', bing: 'es' } },
  // 巴斯克语
  eu_ES: { dayjs: 'eu', translate: { google: 'eu', bing: 'eu' } },
  // 爱沙尼亚语
  et_EE: { dayjs: 'et', translate: { google: 'et', bing: 'et' } },
  // 波斯语
  fa_IR: { dayjs: 'fa', translate: { google: 'fa', bing: 'fa' } },
  // 芬兰语
  fi_FI: { dayjs: 'fi', translate: { google: 'fi', bing: 'fi' } },
  // 法语（比利时）
  fr_BE: { dayjs: 'fr', translate: { google: 'fr', bing: 'fr' } },
  // 法语（加拿大）
  fr_CA: { dayjs: 'fr-ca', translate: { google: 'fr', bing: 'fr' } },
  // 法语（法国）
  fr_FR: { dayjs: 'fr', translate: { google: 'fr', bing: 'fr' } },
  // 爱尔兰语
  ga_IE: { dayjs: 'ga', translate: { google: 'ga', bing: 'ga' } },
  // 加利西亚语（西班牙）
  gl_ES: { dayjs: 'gl', translate: { google: 'gl', bing: 'gl' } },
  // 希伯来语
  he_IL: { dayjs: 'he', translate: { google: 'he', bing: 'he' } },
  // 印地语
  hi_IN: { dayjs: 'hi', translate: { google: 'hi', bing: 'hi' } },
  // 克罗地亚语
  hr_HR: { dayjs: 'hr', translate: { google: 'hr', bing: 'hr' } },
  // 匈牙利语
  hu_HU: { dayjs: 'hu', translate: { google: 'hu', bing: 'hu' } },
  // 亚美尼亚
  hy_AM: { dayjs: 'hy', translate: { google: 'hy', bing: 'hy' } },
  // 印度尼西亚语
  id_ID: { dayjs: 'id', translate: { google: 'id', bing: 'id' } },
  // 意大利语
  it_IT: { dayjs: 'it', translate: { google: 'it', bing: 'it' } },
  // 冰岛语
  is_IS: { dayjs: 'is', translate: { google: 'is', bing: 'is' } },
  // 日语
  ja_JP: { dayjs: 'ja', translate: { google: 'ja', bing: 'ja' } },
  // 格鲁吉亚语
  ka_GE: { dayjs: 'ka', translate: { google: 'ka', bing: 'ka' } },
  // 高棉语
  km_KH: { dayjs: 'km', translate: { google: 'km', bing: 'km' } },
  // 北库尔德语
  kmr_IQ: { dayjs: 'kmr', translate: { google: 'kmr', bing: 'kmr' } },
  // 卡纳达语
  kn_IN: { dayjs: 'kn', translate: { google: 'kn', bing: 'kn' } },
  // 哈萨克语
  kk_KZ: { dayjs: 'kk', translate: { google: 'kk', bing: 'kk' } },
  // 韩语/朝鲜语
  ko_KR: { dayjs: 'ko', translate: { google: 'ko', bing: 'ko' } },
  // 立陶宛语
  lt_LT: { dayjs: 'lt', translate: { google: 'lt', bing: 'lt' } },
  // 拉脱维亚语
  lv_LV: { dayjs: 'lv', translate: { google: 'lv', bing: 'lv' } },
  // 马其顿语
  mk_MK: { dayjs: 'mk', translate: { google: 'mk', bing: 'mk' } },
  // 马拉雅拉姆语
  ml_IN: { dayjs: 'ml', translate: { google: 'ml', bing: 'ml' } },
  // 蒙古语
  mn_MN: { dayjs: 'mn', translate: { google: 'mn', bing: 'mn' } },
  // 马来语 (马来西亚)
  ms_MY: { dayjs: 'ms', translate: { google: 'ms', bing: 'ms' } },
  // 缅甸语
  my_MM: { dayjs: 'my', translate: { google: 'my', bing: 'my' } },
  // 挪威语
  nb_NO: { dayjs: 'nb', translate: { google: 'nb', bing: 'nb' } },
  // 尼泊尔语
  ne_NP: { dayjs: 'ne', translate: { google: 'ne', bing: 'ne' } },
  // 荷兰语（比利时）
  nl_BE: { dayjs: 'nl-be', translate: { google: 'nl', bing: 'nl' } },
  // 荷兰语
  nl_NL: { dayjs: 'nl', translate: { google: 'nl', bing: 'nl' } },
  // 波兰语
  pl_PL: { dayjs: 'pl', translate: { google: 'pl', bing: 'pl' } },
  // 葡萄牙语(巴西)
  pt_BR: { dayjs: 'pt-br', translate: { google: 'pt', bing: 'pt' } },
  // 葡萄牙语
  pt_PT: { dayjs: 'pt', translate: { google: 'pt', bing: 'pt' } },
  // 罗马尼亚语
  ro_RO: { dayjs: 'ro', translate: { google: 'ro', bing: 'ro' } },
  // 俄罗斯语
  ru_RU: { dayjs: 'ru', translate: { google: 'ru', bing: 'ru' } },
  // 僧伽罗语
  si_LK: { dayjs: 'si', translate: { google: 'si', bing: 'si' } },
  // 斯洛伐克语
  sk_SK: { dayjs: 'sk', translate: { google: 'sk', bing: 'sk' } },
  // 塞尔维亚语
  sr_RS: { dayjs: 'sr', translate: { google: 'sr', bing: 'sr' } },
  // 斯洛文尼亚语
  sl_SI: { dayjs: 'sl', translate: { google: 'sl', bing: 'sl' } },
  // 瑞典语
  sv_SE: { dayjs: 'sv', translate: { google: 'sv', bing: 'sv' } },
  // 泰米尔语
  ta_IN: { dayjs: 'ta', translate: { google: 'ta', bing: 'ta' } },
  // 泰语
  th_TH: { dayjs: 'th', translate: { google: 'th', bing: 'th' } },
  // 土耳其语
  tr_TR: { dayjs: 'tr', translate: { google: 'tr', bing: 'tr' } },
  // 土库曼
  tk_TK: { dayjs: 'tk', translate: { google: 'tk', bing: 'tk' } },
  // 乌尔都语 (巴基斯坦)
  ur_PK: { dayjs: 'ur', translate: { google: 'ur', bing: 'ur' } },
  // 乌克兰语
  uk_UA: { dayjs: 'uk', translate: { google: 'uk', bing: 'uk' } },
  // 乌兹别克语（拉丁字母）
  uz_UZ: { dayjs: 'uz', translate: { google: 'uz', bing: 'uz' } },
  // 越南语
  vi_VN: { dayjs: 'vi', translate: { google: 'vi', bing: 'vi' } },
  // 简体中文
  zh_CN: { dayjs: 'zh-cn', translate: { google: 'zh-CN', bing: 'zh-CN' } },
  // 繁体中文（中国香港）
  zh_HK: { dayjs: 'zh-hk', translate: { google: 'zh-HK', bing: 'zh-HK' } },
  // 繁体中文（中国台湾）
  zh_TW: { dayjs: 'zh-tw', translate: { google: 'zh-TW', bing: 'zh-TW' } }
}

module.exports = languageMap
