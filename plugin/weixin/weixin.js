//Weixin 初始化微信环境 @requie db.js @requie dateutil.js @requie sha.js
(function(window, document, undefined) {
	window.Weixin=function(appid,secret){
		var s=this;
		//Date
		var date=new Date();
		//其它信息
		s.appid=appid || "wxad7e7fcdacc939de";
		s.secret=secret || "de2242954dc9082e77a9dff55c8e60c1";
		s.jsapiToken="";
		s.jsapiTicket="";
		//ascii码排序
		function raw(args) {
			var keys = Object.keys(args);
			keys = keys.sort()
			var newArgs = {};
			keys.forEach(function(key) {
				newArgs[key.toLowerCase()] = args[key];
			});

			var string = '';
			for (var k in newArgs) {
				string += '&' + k + '=' + newArgs[k];
			}
			string = string.substr(1);
			return string;
		};
		
		function createNonceStr() {
			return Math.random().toString(36).substr(2, 15); //随机串
		}

		function createTimestamp() {
			return parseInt(new Date().getTime() / 1000) + ''; //时间戳
		}
		/**
		 * @method sign签名算法 
		 *
		 * @param jsapi_ticket 用于签名的 jsapi_ticket
		 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
		 *
		 * @returns {jsapi_ticket:xxx,timestamp:xxx,url:xxx,signature:xxx}
		 */
		function sign(jsapi_ticket, url) {
			var ret = {
				jsapi_ticket: jsapi_ticket,
				nonceStr: createNonceStr(),
				timestamp: createTimestamp(),
				url: url
			};
			var string = raw(ret);
			shaObj = new jsSHA(string, 'TEXT');
			ret.signature = shaObj.getHash('SHA-1', 'HEX');

			return ret;
		}

		//第一步获得token
		function getToken() {
			//如果本地数据库已存在，优先读取本地数据库，则不往下执行
			s.jsapiToken = DB.get("jsapiToken");
			var jsapiTicket_expires = DB.get("jsapiTicket_expires");
			var nonce = date.format(date.datetime());
			if (jsapiTicket_expires && jsapiTicket_expires > nonce) {
				s.jsapiTicket = DB.get("jsapiTicket");
				//初始化微信组件
				initConfig(s.jsapiTicket);
			} else {
				$.getJSON("http://query.yahooapis.com/v1/public/yql", {
					q: "select * from json where url=\"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + s.appid + "&secret=" + s.secret + "\"",
					format: "json"
				}, function(data) {
					tokenHandler(data.query.results.json.access_token);
				});
			}
		}

		function tokenHandler(token) {
			if (!token || token == "undefined") {
				alert("获得token失败");
				return;
			}
			DB.set("jsapiToken", token);
			DB.set("jsapiToken_expires", date.format(date.expires(2)));
			s.jsapiToken = token;
			//第二步，获得ticket
			$.getJSON("http://query.yahooapis.com/v1/public/yql", {
				q: "select * from json where url=\"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + token + "&type=jsapi\"",
				format: "json"
			}, function(data) {
				s.jsapiTicket = data.query.results.json.ticket;
				DB.set("jsapiTicket", jsapiTicket);
				DB.set("jsapiTicket_expires", date.format(date.expires(2)));
				//初始化微信组件
				initConfig(s.jsapiTicket);
			});
		}

		//第三步，初始化微信组件
		function initConfig(ticket) {
			if (!ticket || ticket == "undefined") {
				alert("获取ticket失败");
				return;
			}
			var nonceUrl = window.location.href;
			dataConfig = sign(ticket, nonceUrl);
			wx.config({
				debug: false, // false为关闭调试，true为开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
				appId: s.appid, // 必填，公众号的唯一标识
				timestamp: dataConfig.timestamp, // 必填，生成签名的时间戳
				nonceStr: dataConfig.nonceStr, // 必填，生成签名的随机串
				signature: dataConfig.signature, // 必填，签名，见附录1
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					'translateVoice',
					'startRecord',
					'stopRecord',
					'onVoiceRecordEnd',
					'playVoice',
					'pauseVoice',
					'stopVoice',
					'uploadVoice',
					'downloadVoice',
					'chooseImage',
					'previewImage',
					'uploadImage',
					'downloadImage',
					'getNetworkType',
					'openLocation',
					'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					'scanQRCode',
					'chooseWXPay',
					'openProductSpecificView',
					'addCard',
					'chooseCard',
					'openCard'
				]
			});
		};
		s.init=function(){
			getToken();
		}
		s.init();
	};
})(window, document, undefined);