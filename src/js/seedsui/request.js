/**
 * 获取请求
 * 
 * @module Request
 * @return void
 */
var Request={
	/**
	 * 根据请求名称获取值
	 * 
	 * @method Request
	 * @param argName //参数名称
	 * @return string
	 */
	getParameter: function(argName){
		var param = location.search.match(new RegExp("[\?\&]" + argName + "=([^\&]*)(\&?)","i"));
		return param ? param[1] : param;
	}
};