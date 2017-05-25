var Mplus={};
/*=========================
  返回监听
  ===========================*/
Mplus.BackMonitor={
    fn:null,
    onBack:function(e){
        if(Mplus.BackMonitor.fn)Mplus.BackMonitor.fn(e);
    },
    addHandler:function(fn){
        this.fn=fn;
        if(NativeObj){
            var phoneType=NativeObj.getPhoneType();
            // 安卓
            if (phoneType=="0"){
                mplus.setBackListener({
                    active:'1',// 是否要监听返回键 0 否 1是 ，如若监听返回键，则ARK不再处理返回键事件，如需ARK处理，需解除监听
                });
                document.addEventListener("backpressed",this.onBack,false);
            }
        }
    },
    removeHandler:function(){
        if(NativeObj){
            var phoneType=NativeObj.getPhoneType();
            // 安卓
            if(phoneType=="0"){
                mplus.setBackListener({
                    active: '0', // 是否要监听返回键 0 否 1是 ，如若监听返回键，则ARK不再处理返回键事件，如需ARK处理，需解除监听
                });
                document.removeEventListener("backpressed",this.onBack,false);
            }
        }
    }
};

/*=========================
  图片上传
  ===========================*/
Mplus.Image=function(params){
    /*================
    Model
    ================*/
    var defaults={
        max:1,
        sourceType:['album', 'camera']
        /*
        Callbacks:
        onDownloadSuccess:function(e)    //e.downloadUrl | e.serverId
        onUploadSuccess:function(e)    //e.serverId | e.localId

        onDownloadsSuccess:function(e)    //e.downIdList | e.downList
        onUploadsSuccess:function(e)    //e.uploadList

        onDownloadError:function(e)    //e.errMsg
        onUploadError:function(e)    //e.errMsg
        */
    }
    params=params||{};
    for(var def in defaults){
        if(params[def]==undefined){
            params[def]=defaults[def];
        }
    }
    var s=this;
    s.params=params;

    s.target=null,s.uploadList=[],s.uploadIndex=0,s.downList=[],s.downIdList=[],s.downIndex=0;
    /*================
    Method
    ================*/
    s.setParams=function(params){
        for(var param in params){
            s.params[param]=params[param];
        }
    };
    s.down=function(serverId){
        if(!s.params.onDownloadSuccess)return;

        mplus.downloadImage({
            serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            success: function (res) {
                var e=res;
                e.target=s.target;
                e.serverId=serverId;
                //Callback onDownloadSuccess
                s.params.onDownloadSuccess(e);
            },
            fail:function(res){s.params.onDownloadError && s.params.onDownloadError(res);}
        });
    };
    s.upload=function(localId){
        if(!s.params.onUploadSuccess)return;

        mplus.uploadImage({
            localId:localId,//需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0,//0或1， 默认为1，显示进度提示（显示上传中）
            maxLength:"80",//填具体数值，单位为KB
            pwidth:"800",
            success: function (res) {
                var e=res;
                e.localId=localId;
                e.target=s.target;
                //Callback onUploadSuccess
                s.params.onUploadSuccess && s.params.onUploadSuccess(e);
            },
            fail:function(res){
                var e=res;
                e.localId=localId;
                e.target=s.target;
                //Callback onUploadError
                s.params.onUploadError && s.params.onUploadError(e);
            }
        });
    };
    s.downAll=function(downIdList){
        if(!s.params.onDownloadSuccess || !s.params.onDownloadsSuccess)return;
        if(downIdList && downIdList instanceof Array){
            //初始化下载队列
            s.downList=[];
            s.downIdList=[];
            s.downIndex=0;

            s.downIdList=downIdList;
        }
        var serverId=s.downIdList[s.downIndex];
        mplus.downloadImage({
            serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            success:function(res){
                var e=res;
                e.serverId=serverId;
                s.downList.push(res.downloadUrl);
                //Callback onDownloadSuccess
                e.target=s.target;
                s.params.onDownloadSuccess(e);
                s.downIndex++;
                //下载下一张
                if(s.downIndex<s.downIdList.length){
                    s.downAll();
                }else{
                    e.downIdList=s.downIdList;
                    e.downList=s.downList;
                    //Callback onDownloadsSuccess
                    s.params.onDownloadsSuccess && s.params.onDownloadsSuccess(e);
                }
            },
            fail:function(res){s.params.onDownloadError && s.params.onDownloadError(res);}
        });
    };
    s.uploadAll=function(uploadList){
        if(!s.params.onUploadSuccess && !s.params.onUploadsSuccess)return;
        if(uploadList && uploadList instanceof Array){
            //初始化上传队列
            s.uploadList=[];
            s.uploadIndex=0;

            s.uploadList=uploadList;
        }
        var localId=s.uploadList[s.uploadIndex];
        mplus.uploadImage({
            localId:localId,//需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0,//0或1， 默认为1，显示进度提示（显示上传中）
            maxLength:"80",//填具体数值，单位为KB
            pwidth:"800",
            success:function(res){
                //添加下载队列
                s.downIdList.push(res.serverId);
                var e=res;
                e.localId=localId;
                e.target=s.target;
                //Callback onUploadSuccess
                s.params.onUploadSuccess && s.params.onUploadSuccess(e);
                s.uploadIndex++;
                //上传下一张
                if(s.uploadIndex<s.uploadList.length){
                    s.uploadAll(); 
                }else{
                    e.uploadList=s.uploadList;
                    //Callback onUploadsSuccess
                    s.params.onUploadsSuccess && s.params.onUploadsSuccess(e);
                }
            },
            fail:function(res){
                var e=res;
                e.localId=localId;
                e.target=s.target;
                //Callback onUploadError
                s.params.onUploadError && s.params.onUploadError(res);
            }
        });
    };
    s.choose=function(target){
        if(target)s.target=target;
        mplus.chooseImage({
            max:s.params.max,
            sourceType:s.params.sourceType,
            success:function(res){
                var res=res;
                res.target=s.target;
                //Callback onChooseSuccess
                s.params.onChooseSuccess && s.params.onChooseSuccess(res);
                //初始化上传队列
                s.uploadList=[];
                s.uploadIndex=0;
                //初始化下载队列
                s.downList=[];
                s.downIdList=[];
                s.downIndex=0;
                
                for(var i=0,id;id=res.localIds[i++];){
                    s.uploadList.push(id);
                }
                //上传所有
                s.uploadAll();
            },
            fail:function(res){
                var e=res;
                e.target=s.target;
                //Callback onChooseError
                s.params.onChooseError && s.params.onChooseError(e);
            }
        });
    };
};