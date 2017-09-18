//Media 多媒体控件
(function(window,document,undefined){
	
	window.Media=function(media){
		/*===========================
	    Model
	    ===========================*/
		var s=this;
		s.media=document.querySelector(media)||new Audio(media);
		/*===========================
	    Method
	    ===========================*/
	    s.playAudio=function(loop){
			s.media.autoplay = true;
			s.media.loop = loop || false;
			s.media.play();
			return s;
		};
	    //判断视频加载状态
	    s.isReady=function(){
	    	if(s.media.readyState!=4){
				console.log("视频尚未加载完成，状态："+s.media.readyState);
				return false;
			}
			return true;
	    };
		//暂停与播放
		s.resume=function(){
			if(s.media.paused){
				s.media.play();
				return false;
			}else{
				s.media.pause();
				return true;
			}
		};
		//全屏与非全屏，w3c推荐标准，但尚未兼容
		s.fullScreen=function(){
			if(s.media.requestFullscreen){
				s.media.exitFullscreen();
				return false;
			}else{
				s.media.requestFullscreen();
				return true;
			}
		};
		//播放时间
		s.durationTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.duration=arguments[0];
			}
			return s.media.duration;
		};
		//当前时间
		s.currentTime=function(){
			if(!s.isReady)return;
			if(arguments.length>0){
				s.media.currentTime=arguments[0];
			}
			return s.media.currentTime;
		};
		//音量，值为0.0到1.0
		s.volume=function(){
			if(arguments.length>0){
				s.media.volume=arguments[0];
			}
			return s.media.volume;
		};
		//音量值大小
		s.volumeLvl=function(){
			var volnumber=s.media.volume;
			if(volnumber==0){
				return 0;
			}else if(volnumber>0 && volnumber<0.3){
				return 1;
			}else if(volnumber>0.3 && volnumber<0.6){
				return 2;
			}else if(volnumber>0.6 && volnumber<0.9){
				return 3;
			}else{
				return 4;
			}
		};
		//设置播放速度，默认为1.0秒
		s.rate=function(){
			if(arguments){
				s.media.defaultPlaybackRate=arguments[0];
			}
			return s.media.defaultPlaybackRate;
		};
		
		//是否支持此视频
		s.isSupport=function(mediaPostfix){
			var maybeMedia="";
			var probablyMedia="";
			switch(mediaPostfix){
				//音频
				case "aac":maybeMedia="audio/mp4",probablyMedia="audio/mp4; codecs=\"mp4a.40.2\"";break;
				case "mp3":maybeMedia="audio/mpeg",probablyMedia="audio/mpeg";break;
				case "vorbis":maybeMedia="audio/ogg",probablyMedia="audio/ogg; codecs=\"vorbis\"";break;//后缀通常为ogg
				case "wav":maybeMedia="audio/wav",probablyMedia="audio/wav; codecs=\"1\"";break;
				//视频
				case "h.264":maybeMedia="video/mp4",probablyMedia="video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"";break;//后缀通常为mpg4、mp4、mov
				case "theora":maybeMedia="video/ogg",probablyMedia="video/ogg; codecs=\"theora\"";break;//后缀通常为ogg
				case "webm":maybeMedia="video/webm",probablyMedia="video/webm; codecs=\"vp8, vorbis\"";break;//后缀通常为webm
			}
			if(maybeMedia!="" && probablyMedia!="" && (player.canPlayType(maybeMedia) || player.canPlayType(probablyMedia))){
				return true;
			}
			return false;
		};
		/*===========================
	    Events
	    ===========================*/
	    var event=function(eventname,fn,detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.media[action](eventname,fn,false);
		}
		//因为没有数据不能播放，readyState值为0
		s.onDataunavailable=function(callback,detach){
			event("dataunavailable",callback,detach);
		};
		//当前帧已下载完成，readyState值为1
		s.onCanshowcurrentframe=function(callback,detach){
			event("canshowcurrentframe",callback,detach);
		};
		//可以播放时，readyState值为2
		s.onCanplay=function(callback,detach){
			event("canplay",callback,detach);
		};
		//播放可继续，而且应该不会中断，readyState值为3
		s.onCanplaythrough=function(callback,detach){
			event("canplaythrough",callback,detach);
		};
		//所有媒体已加载完成，load有可能会被废弃，建议使用canplaythrough
		s.onLoad=function(callback,detach){
			event("load",callback,detach);
		};
		//媒体的第一帧已加载完成
		s.onLoadeddata=function(callback,detach){
			event("loadeddata",callback,detach);
		};
		//媒体的元数据已加载完成
		s.onLoadedmetadata=function(callback,detach){
			event("loadedmetadata",callback,detach);
		};
		//下载已开始
		s.onLoadstart=function(callback,detach){
			event("loadstart",callback,detach);
		};
		//正在下载
		s.onProgress=function(callback,detach){
			event("progress",callback,detach);
		};
		//下载中断
		s.onAbort=function(callback,detach){
			event("abort",callback,detach);
		};
		//浏览器尝试下载，但未接收到数据
		s.onStalled=function(callback,detach){
			event("stalled",callback,detach);
		};
		//下载发生网络错误
		s.onError=function(callback,detach){
			event("error",callback,detach);
		};
		//网络连接关闭
		s.onEmptied=function(callback,detach){
			event("emptied",callback,detach);
		};
		//发生错误阻止了媒体下载
		s.onEmpty=function(callback,detach){
			event("empty",callback,detach);
		};
		//准备播放
		s.onPlay=function(callback,detach){
			event("play",callback,detach);
		};
		//正在播放
		s.onPlaying=function(callback,detach){
			event("playing",callback,detach);
		};
		//当前时间被不合理或意外的方式更新
		s.onTimeupdate=function(callback,detach){
			event("timeupdate",callback,detach);
		};
		//暂停
		s.onPause=function(callback,detach){
			event("pause",callback,detach);
		};
		//播放暂停，等待下载更多数据
		s.onWaiting=function(callback,detach){
			event("pause",callback,detach);
		};
		//媒体已播放至末尾，播放停止
		s.onEnded=function(callback,detach){
			event("ended",callback,detach);
		};
		//更改音量事件
		s.onVolumechange=function(callback,detach){
			event("volumechange",callback,detach);
		};
		//更改播放速度事件
		s.onRatechange=function(callback,detach){
			event("ratechange",callback,detach);
		};
		//搜索结束
		s.onSeeked=function(callback,detach){
			event("seeked",callback,detach);
		};
		//正在移动到新位置
		s.onSeeking=function(callback,detach){
			event("seeking",callback,detach);
		};
	};
})(window,document,undefined);