// Validator 表单验证 (require safelvl.js)
// import SafeLvl from './validator.safelvl.js'
var Validator = function () {
  /* ------------------------
  正则
  ------------------------ */
  var Patts = {
    required: /.+/,
    number: /^[+-]?(0|([1-9][0-9]*))(\.[0-9]+)?$/, // 数字
    decimal: /^[+-]?(0|([1-9][0-9]*))(\.[0-9]+)$/, // 小数
    digits: /\.[0-9]*/,
    integer: /^(0|([+-]?[1-9][0-9]*))$/, // 整数
    positive: /^(0|([1-9][0-9]*))(\.[0-9]+)?$/, // 正数
    negative: /^-(0|([1-9][0-9]*))(\.[0-9]+)?$/, // 负数
    positiveInteger: /^[1-9][0-9]*$/, // 正整数
    negativeInteger: /^-[1-9][0-9]*$/, // 正整数
    username: /^[\w]+$/, //用户名
    password: /^[0-9_a-zA-Z-~!@#$]*$/, //密码
    mail: /^(\w+@\w+\.[\.\w]+)$/, //邮箱
    phone: /^([1][34578][0-9]{9})$/, //手机
    chinese: /^[\u4E00-\u9FA5]*$/, //中文
    specialchar: /^([\u4e00-\u9fa5]*|[a-zA-Z0-9]*)$/ //特殊字符
  }
  /* ------------------------
  验证策略类
  ------------------------ */
  var Rules = {
    // 为空
    required: function (value, errorMsg) {
      if (!Patts.required.test(value)) {
        return errorMsg
      }
    },
    // 数字
    number: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.number.test(value)) {
        return errorMsg
      }
    },
    // 小数
    decimal: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.decimal.test(value)) {
        return errorMsg
      }
    },
    // 小数位数
    maxDigits: function (value, max, errorMsg) {
      var match = value.match(Patts.digits)
      if (match && match[0] && match[0].length - 1 > max) {
        return errorMsg
      }
    },
    // 整数
    integer: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.integer.test(value)) {
        return errorMsg
      }
    },
    // 正数
    positive: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.positive.test(value)) {
        return errorMsg
      }
    },
    // 负数
    negative: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.negative.test(value)) {
        return errorMsg
      }
    },
    // 正整数
    positiveInteger: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.positiveInteger.test(value)) {
        return errorMsg
      }
    },
    // 负整数
    negativeInteger: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.negativeInteger.test(value)) {
        return errorMsg
      }
    },
    username: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.username.test(value)) {
        return errorMsg
      }
    },
    password: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.password.test(value)) {
        return errorMsg
      }
    },
    mail: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.mail.test(value)) {
        return errorMsg
      }
    },
    phone: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.phone.test(value)) {
        return errorMsg
      }
    },
    chinese: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.chinese.test(value)) {
        return errorMsg
      }
    },
    // 特殊字符
    specialchar: function (value, errorMsg) {
      if (value.length !== 0 && !Patts.specialchar.test(value)) {
        return errorMsg
      }
    },
    minNumber: function (value, min, errorMsg) {
      if (value.length !== 0 && value * 1 < min * 1) {
        return errorMsg
      }
    },
    maxNumber: function (value, max, errorMsg) {
      if (value.length !== 0 && value * 1 > max * 1) {
        return errorMsg
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.length !== 0 && value.length < length) {
        return errorMsg
      }
    },
    maxLength: function (value, length, errorMsg) {
      if (value.length !== 0 && value.length > length) {
        return errorMsg
      }
    },
    compare: function (value1, value2, errorMsg) {
      if (value1 !== value2) {
        return errorMsg
      }
    },
    // 密码安全等级
    safeLvl: function (value, lvl, errorMsg) {
      var valLvl = SafeLvl.check(value)
      if (value.length !== 0 && valLvl < lvl) {
        return errorMsg
      }
    }
  }
  /* ------------------------
  Validator类
  ------------------------ */
  var s = this
  s.caches = []
  s.add = function (field, strategies) {
    /* eslint-disable */
    for (var i = 0, strategy; strategy = strategies[i++];) {
      (function (strategy) {
        var ruleArray = strategy.rule.split(":")
        var errorMsg = strategy.errorMsg

        s.caches.push(function () {
          var ruleName = ruleArray.shift()
          ruleArray.unshift(field instanceof Object ? field.value : field)
          ruleArray.push(errorMsg) // 此时ruleArray的值为 ruleValue,fieldValue,errorMsg
          var ruleErrorMsg = Rules[ruleName].apply(null, ruleArray)
          if (ruleErrorMsg) return { field: field, msg: ruleErrorMsg }
        })
      })(strategy)
    }
    /* eslint-enable */
  }
  s.start = function () {
    /* eslint-disable */
    for (var i = 0, valiFn; valiFn = s.caches[i++];) {
      var error = valiFn()
      if (error) return error
    }
    /* eslint-enable */
  }
};

//export default Validator
