/*!
 * 表情工具库
 * @version 1.0.0
 * @author WangMingzhu
 */

(function(window,document,undefined){
	'use strict';

	window.Face={
		icons:{
			"[拜拜]":"[baibai]",
			"[发呆]":"[fadai]",
			"[坏笑]":"[huaixiao]",
			"[流汗]":"[liuhan]",
			"[呕吐]":"[outu]",
			"[微笑]":"[weixiao]",
			"[晕]":"[yun]",
			"[眨眼]":"[zhayan]",
			"[龀牙]":"[ziya]",
		},
		parse:function(str){
			var faceExpr=/(\[[\u4E00-\u9FA5]*\])/gm;
			var result,parseStr=str;
			while (faceExpr.exec(str))  {
				if(this.icons[RegExp.$1]){
					parseStr=parseStr.replace(RegExp.$1,"<span data-face=\""+this.icons[RegExp.$1]+"\"></span>");
				}
			}
			return parseStr;
		}
	}
})(window,document,undefined);