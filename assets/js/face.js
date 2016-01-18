/*!
 * 表情工具库
 * @version 1.0.0
 * @author WangMingzhu
 */

(function(window,document,undefined){
	'use strict';
	window.Face={
		icons:{
			"[拜拜]":"baibai.png",
			"[发呆]":"fadai.png",
			"[坏笑]":"huaixiao.png",
			"[流汗]":"liuhan.png",
			"[呕吐]":"outu.png",
			"[微笑]":"weixiao.png",
			"[晕]":"yun.png",
			"[眨眼]":"zhayan.png",
			"[龀牙]":"ziya.png",
		},
		parse:function(str,src){
			var parseSrc=src||"../assets/css/img/face/";
			var parseStr=str;
			var faceExpr=/(\[[\u4E00-\u9FA5]*\])/gm;
			var result;
			while((result=faceExpr.exec(parseStr))!=null){
				if(Face.icons[result[0]]){
					var facesrc=Face.icons[result[0]];
					parseStr=parseStr.replace(result[0],"<img src='"+parseSrc+facesrc+"'/>");
				}
			}
			return parseStr;
		}
	}
})(window,document,undefined);