// Validator 表单验证 (require safelvl.js)

var Validator = function () {
  /* ------------------------
  验证策略类
  ------------------------ */
  var Rules = {
    required: function (value, errorMsg) {
      if (!/.+/.test(value)) {
        return errorMsg
      }
    },
    number: function (value, errorMsg) {
      if (value.length != 0 && /^-?([0-9]{1,})(\.[0-9]+)?$/.test(value)) {
        return errorMsg
      }
    },
    positive: function (value, errorMsg) {
      if (value.length != 0 && /^([0-9]{1,})(\.[0-9]+)?$/.test(value)) {
        return errorMsg
      }
    },
    integer: function (value, errorMsg) {
      if (!/^-?\d*$/.test(value)) {
        return errorMsg
      }
    },
    positiveInteger: function (value, errorMsg) {
      if (value.length != 0 && !/^[1-9]{1,}[0-9]*$/.test(value)) {
        return errorMsg
      }
    },
    negative: function (value, errorMsg) {
      if (value.length != 0 && /^-([0-9]{1,})(\.[0-9]+)?$/.test(value)) {
        return errorMsg
      }
    },
    negativeInteger: function (value, errorMsg) {
      if (value.length != 0 && !/^-[1-9]{1,}[0-9]*$/.test(value)) {
        return errorMsg
      }
    },
    username: function (value, errorMsg) {
      if (!/^[\w]*$/.test(value)) {
        return errorMsg
      }
    },
    password: function (value, errorMsg) {
      if (!/^[0-9_a-zA-Z-~!@#$]*$/.test(value)) {
        return errorMsg
      }
    },
    mail: function (value, errorMsg) {
      if (!/^(\w+@\w+\.[\.\w]+)?$/.test(value)) {
        return errorMsg
      }
    },
    phone: function (value, errorMsg) {
      if (!/^([1][34578][0-9]{9})?$/.test(value)) {
        return errorMsg
      }
    },
    chinese: function (value, errorMsg) {
      if (!/^[\u4E00-\u9FA5]*$/.test(value)) {
        return errorMsg
      }
    },
    specialchar: function (value, errorMsg) {
      if (!/^([\u4e00-\u9fa5]*|[a-zA-Z0-9]*)$/.test(value)) {
        return errorMsg
      }
    },
    minNumber: function (value, min, errorMsg) {
      if (value.length != 0 && value * 1 < min * 1) {
        return errorMsg
      }
    },
    maxNumber: function (value, max, errorMsg) {
      if (value.length != 0 && value * 1 > max * 1) {
        return errorMsg
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.length != 0 && value.length < length) {
        return errorMsg
      }
    },
    maxLength: function (value, length, errorMsg) {
      if (value.length != 0 && value.length > length) {
        return errorMsg
      }
    },
    compare: function (value1, value2, errorMsg) {
      if (value1 != value2) {
        return errorMsg
      }
    },
    safeLvl: function (value, lvl, errorMsg) {
      var valLvl = SafeLvl.check(value)
      if (value.length != 0 && valLvl < lvl) {
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
    var self = this
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
  }
  s.start = function () {
    for (var i = 0, valiFn; valiFn = s.caches[i++];) {
      var error = valiFn()
      if (error) return error
    }
  }
};