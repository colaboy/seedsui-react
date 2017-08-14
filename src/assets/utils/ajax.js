//Ajax
(function(window, document, undefined) {
	function buildParams(data) {
		var i
		var params = ''
		for (i in data) {
			if (data.hasOwnProperty(i)) {
				params += '&' + i + '=' + data[i]
			}
		}
		return params.slice(1)
	}
	window.ajax={};
	ajax.xhr = function(config) {
		var xhr = new window.XMLHttpRequest()
		var url = config.url
		var data = config.data || {}
		var success = config.success
		var error = config.error
		var params = buildParams(data)
		var type = config.type || 'GET'
		var contentType = config.contentType
		var extra = config.extra

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = JSON.parse(xhr.responseText)
					success(res, extra)
				} else {
					error && error()
				}
			}
		}

		if (type === 'POST') {
			xhr.open(type, url, true)
			xhr.setRequestHeader('Content-type', contentType || 'application/json')
			if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
				xhr.send(params)
			} else {
				xhr.send(JSON.stringify(data))
			}
		} else {
			if (url.indexOf('?') === -1) {
				url += '?' + params
			} else {
				url += '&' + params
			}
			xhr.open(type, url, true)
			xhr.send(null)
		}
	}
	window.fetchData=function(url, req, type, contentType) {
		// 显示loading
		// ob.$emit('ajaxLoading', true)
		var reqData = req || {}
		return new Promise(function(resolve, reject) {
			ajax.xhr({
				url: url,
				data: reqData,
				type: type,
				contentType: contentType,
				success:function(data) {
					if (data.code === '1') {
						resolve(data)
					} else {
						reject(data)
					}
					//关闭loading
					//ob.$emit('ajaxLoading', false)
				},
				error:function(err) {
					reject(err)
					//关闭loading
					//ob.$emit('ajaxLoading', false)
				}
			})
		})
	}
})(window,document,undefined);