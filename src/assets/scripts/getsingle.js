//单例模式
var getSingle=function(fn){
	var result;
	return function(){
		return result||(result=fn.apply(this,arguments));
	}
};