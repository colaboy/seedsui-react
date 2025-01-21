const google = require('@vitalets/google-translate-api')
const HttpProxyAgent = require('http-proxy-agent')
const languageMap = require('./../../../../utils/LocaleUtil/languageMap')

// 翻译文本，支持的语言:https://cloud.google.com/translate/docs/languages
module.exports = async function googleTranslate(text, config) {
  const from = languageMap[config.from].translate.google
  const to = languageMap[config.to].translate.google

  // text为数组格式，支持多组翻译
  const value = text.join('\n###\n')

  // 因为有次数限制, 所以当报Too Many Requests时, 需要切换代理
  const agent = new HttpProxyAgent.HttpProxyAgent('http://127.0.0.1:7890')
  let result = ''
  try {
    const { text } = await google.translate(value, {
      from: from,
      to: to,
      fetchOptions: { agent }
    })
    result = text
  } catch (error) {
    // eslint-disable-next-line
    console.log('Translate error: ', error)
    result = ''
  }

  // 返回数组
  return result.split(/\n *# *# *# *\n/)
}
