const axios = require('axios')
const chalk = require('chalk')
const languageMap = require('./../../../../../src/utils/LocaleUtil/languageMap')

module.exports = async function bingTranslate(text, config) {
  const from = languageMap[config.from].translate.bing
  const to = languageMap[config.to].translate.bing

  // bing支持翻译数组
  let content = []
  if (Array.isArray(text)) {
    for (let item of text) {
      content.push({
        Text: item
      })
    }
  } else if (typeof text === 'string') {
    content = [{ Text: text }]
  } else {
    return ''
  }

  try {
    const tokenResp = await axios.get('https://edge.microsoft.com/translate/auth', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42'
      }
    })

    if (tokenResp.status === 200) {
      console.log(`bingTranslate: bing服务器连接成功, 准备将${from}翻译成${to}`)

      const token = tokenResp.data
      const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=zh-Hans&to=${to}`
      const resp = await axios.post(url, content, {
        headers: {
          accept: '*/*',
          'accept-language': 'zh-TW,zh;q=0.9,ja;q=0.8,zh-CN;q=0.7,en-US;q=0.6,en;q=0.5',
          authorization: 'Bearer ' + token,
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-ch-ua': '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          Referer: 'https://appsumo.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42'
        }
      })

      if (resp.status === 200) {
        console.log(`bingTranslate: ${from}翻译成${to}成功!`)
        const result = resp.data
        if (Array.isArray(text)) {
          return result.map((item) => item.translations[0].text)
        }
        return result[0].translations[0].text
      }
      console.log(chalk.red(`bingTranslate: ${from}翻译成${to}失败!`))
      console.log(chalk.red(resp))
      return ''
    }
  } catch (error) {
    console.log(chalk.red(`bingTranslate: ${from}翻译成${to}失败!`))
    console.log(chalk.red(error))
    return ''
  }
}
