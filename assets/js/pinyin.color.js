(function(window,document,undefined){
	'use strict';
	var colors={
		"a":"#FF66FF",
		"b":"#CC66FF",
		"c":"#9966FF",
		"d":"#6666FF",
		"e":"#3366FF",
		"f":"#0066FF",
		"g":"#0066CC",
		"h":"#3366CC",
		"i":"#6666CC",
		"j":"#9966CC",
		"k":"#CC66CC",
		"l":"#FF66CC",
		"m":"#006699",
		"n":"#666699",
		"o":"#996699",
		"p":"#CC6699",
		"q":"#FF6699",
		"r":"#FF6666",
		"s":"#996666",
		"t":"#336666",
		"u":"#006633",
		"v":"#666633",
		"w":"#CC6633",
		"x":"#FF6600",
		"y":"#996600",
		"z":"#336600"
	};
	String.prototype.toColor=function(){
		return colors[this.toPinyin().substr(0,1).toLowerCase()];
	}
})(window,document,undefined)