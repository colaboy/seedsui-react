var Request = {
  getParameter: function (argName) {
    var href = decodeURI(window.location.href)
    var param = href.match(new RegExp('[\\?\\&]' + argName + '=([^\\&]*)(\\&?)', 'i'))
    return param ? decodeURI(param[1]) : param
  }
}

;//export default Request
