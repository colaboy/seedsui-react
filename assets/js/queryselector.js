/*!
 * 元素选择器
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  元素选择器，为了兼容ie
* 
*  @method querySelector
*  @param selector //id与object选择器，如："#id"
*  @return [object HTMLXXElement]
*/
var querySelector=function(selector){
	var match,idExpr = /^#([\w-]*)$/;//匹配id(#id)
	if ( !selector ) {
		alert("请输入id或者传元素对象");
	}
	//参数是id
	if ( typeof selector === "string" ) {
		match = idExpr.exec(selector);
		if(match && match[1] && document.getElementById(match[1]) ){
			return document.getElementById(match[1]);
		}
		alert("您传入的id不存在");
		return null;
	}
	//参数是对象
	if(typeof selector === "object"){
		return selector;
	}
	alert("您传入的参数既不是id，也不是一个对象");
	return null;
}