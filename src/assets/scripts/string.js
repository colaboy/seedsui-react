//字符串工具箱
(function(window,document,undefined){
	//转为json，目的是字符串去重
	String.prototype.toJson=function(split){
		var array = str.split(split);
		var json = {};
		for(var i in array){
			var ary = array[i];
			json[ary] ? (json[ary]++) : (json[ary]= 1) 
		}
		return json;
	}
})(window,document,undefined);