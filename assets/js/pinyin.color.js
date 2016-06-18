//toColor字母转颜色
(function(window,document,undefined){
	
	var colors={
		"a":"#52c7fe",
		"b":"#52c7fe",
		"c":"#52c7fe",
		"d":"#52c7fe",
		"e":"#52c7fe",
		"f":"#ffaf01",
		"g":"#ffaf01",
		"h":"#ffaf01",
		"i":"#ffaf01",
		"j":"#ffaf01",
		"k":"#3ae3eb",
		"l":"#3ae3eb",
		"m":"#3ae3eb",
		"n":"#3ae3eb",
		"o":"#3ae3eb",
		"p":"#ff6e36",
		"q":"#ff6e36",
		"r":"#ff6e36",
		"s":"#ff6e36",
		"t":"#ff6e36",
		"u":"#cf7af3",
		"v":"#cf7af3",
		"w":"#cf7af3",
		"x":"#cf7af3",
		"y":"#cf7af3",
		"z":"#4cd32e"
	};
	String.prototype.toColor=function(){
		if(this.length>1 || !/^[A-Za-z]+$/.test(this))return;
		return colors[this.toLowerCase()];
	}
})(window,document,undefined);