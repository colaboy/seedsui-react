/*!
 * 社会化分享
 * @version 1.0.0
 * @author WangMingzhu
 */

/**
*  获取设备信息
* 
*  @class Share
*/
(function(window,document,undefined){
	'use strict';
	window.Share=function(params){
		/*===============
		Model
		================*/
		var s=this;
		var defaults={
			"href":window.location.href,
			"title":document.title || '',
			"desc":"",
			"imgUrl":"",
			"imgTitle":document.title || '',
			"from":window.location.host || "",
			"cusTxt":"请输入此时此刻想要分享的内容"
		};
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		s.params=params;

		/*===============
		Method
		================*/
		//uc分享
		var ucAppList = {
		        "tsina": ["kSinaWeibo", "SinaWeibo", "11", "新浪微博"],
		        "weixin": ["kWeixin", "WechatFriends", "1", "微信好友"],
		        "fweixin": ["kWeixinFriend", "WechatTimeline", "8", "微信朋友圈"],
		        "qq": ["kQQ", "QQ", "4", "QQ好友"],
		        /*"tqq": ["kQQWeibo", "QQWeibo", "11", "腾讯微博"],
		         * "qzone": ['kQZone', 'QZone', '3', 'QQ空间']*/
		};
		s.UCshare=function(toApp) {
			var to_app;
			if(Device.isIos){
				to_app=ucAppList[toApp][0];
				ucbrowser.web_share(s.params.title, s.params.title, s.params.href, to_app, "","@"+s.params.from, ''); 
			}else{
				to_app=ucAppList[toApp][1];
				ucweb.startRequest("shell.page_share", [s.params.title, s.params.title, s.params.href, to_app, "", "@"+s.params.from, ""]);  
			}
		};

		//html分享
		function popIFrame(openUrl){
			var tempDiv = document.createElement("div");
			tempDiv.style.visibility = "hidden";
			tempDiv.innerHTML = '<iframe src="' + openUrl + '" scrolling="no" width="1" height="1"></iframe>';
			document.body.appendChild(tempDiv);
			setTimeout(function () {
				tempDiv && tempDiv.parentNode && tempDiv.parentNode.removeChild(tempDiv);
			}, 5000);
		};
		s.HTMLShare=function(toApp){
			var openUrl=""
			if (toApp == "qzone") {
				if(Device.isMobile){
					openUrl= "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+s.params.imgUrl+"&title="+s.params.title+"&description="+s.params.desc+"&url="+s.params.href+"&app_name="+s.params.from;
					popIFrame(openUrl);
					return;
				}
				openUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+s.params.href+"&amp;title="+s.params.title+"&amp;showcount=0&amp;summary="+s.params.desc+"&amp;pics="+s.params.imgUrl+"";
				window.open(openUrl);
				return;
			}
			if(toApp=="tsina"){
				openUrl="http://service.weibo.com/share/share.php?url="+s.params.href+"&language=zh_cn&title="+s.params.title+"&pic="+s.params.imgUrl+"&searchPic=true";
				window.open(openUrl);
				return;
			}
			if(toApp=="tqq"){
				openUrl=encodeURI("http://share.v.t.qq.com/index.php?c=share&a=index&title="+s.params.title+"&url="+s.params.href+"&appkey=ce15e084124446b9a612a5c29f82f080&site="+s.params.from+"&pic="+s.params.imgUrl);
				window.open(openUrl,"转播到腾讯微博");
				return;
			}
			if(toApp="qq"){
				openUrl="http://connect.qq.com/widget/shareqq/index.html?url="+s.params.href+"#0-sqq-1-85270-9737f6f9e09dfaf5d3fd14d775bfee85&title="+s.params.title+"&desc="+s.params.desc+"&summary=&site="+s.params.from+"&pics="+s.params.imgUrl;
				window.open(openUrl);
				return;
			}
		}

		/*===============
		Controller
		================*/
		s.toQzone=function(){
			s.HTMLShare("qzone");
		};
		s.toTsina=function(){
			if(Device.isUC){
				s.UCshare("tsina");
			}else{
				s.HTMLShare("tsina");
			}
		};
		s.toTqq=function(){
			s.HTMLShare("tqq");
		};
		s.toWeixin=function(){
			if(Device.isUC){
				s.UCshare("weixin");
			}else{
				alert("您当前的浏览器不支持分享到微信");
			}
		};
		s.toFWeixin=function(){
			if(Device.isUC){
				s.UCshare("fweixin");
			}else{
				alert("您当前的浏览器不支持分享到微信朋友圈");
			}
		};
		s.toQQ=function(){
			if(Device.isUC){
				s.UCshare("qq");
			}else{
				s.HTMLShare("qq");
			}
		};
	}
})(window,document,undefined);