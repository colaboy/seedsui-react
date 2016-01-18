/*!
 * 单例模式
 * @version 1.0.0
 * @author WangMingzhu
 */

var getSingle=function(fn){
	var result;
	return function(){
		result=result || fn.apply(this,arguments);
	}
}