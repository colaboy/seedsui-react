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
Mplus.Image={
    uploads:[],//上传队列
    uploadIndex:0,//上传成功数
    downloads:[],//下载队列
    downloadIndex:0,//上传成功数
    imagesCount:0,
    opts:{},
    download:function(id){
        var self=this;
        mplus.downloadImage({
            serverId: id, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            success: function (res) {
                self.downloadIndex++;
                var downloadUrl = res.downloadUrl; // 返回图片下载地址
                //Callback onDownloadSuccess
                self.opts.onDownloadSuccess(downloadUrl);

                if(self.downloadIndex===self.imagesCount){
                    //Callback onDownloadsSuccess
                    self.opts.onDownloadsSuccess && self.opts.onDownloadsSuccess();
                    return;
                }
                //调用上传方法upload
                self.upload(self.uploads[self.uploadIndex]);
            },
            fail:function(res){self.opts.onDownloadError && self.opts.onDownloadError(res);}
        });
    },
    upload:function(id){
        var self=this;
        mplus.uploadImage({
            localId:id,//需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 0,//0或1， 默认为1，显示进度提示（显示上传中）
            maxLength:"80",//填具体数值，单位为KB
            pwidth:"800",
            success:function(res){
                self.uploadIndex++;
                self.opts.onUploadSuccess && self.opts.onUploadSuccess(res);
                if(self.uploadIndex===self.imagesCount){
                    //Callback onUploadsSuccess
                    self.opts.onUploadsSuccess && self.opts.onUploadsSuccess();
                }
                //调用下载方法download
                self.opts.onDownloadSuccess && self.download(res.serverId);
            },
            fail:function(res){self.opts.onUploadError && self.opts.onUploadError(res);}
        });
    },
    choose:function(opts){
        var self=this;
        this.opts=opts;
        mplus.chooseImage({
            max:self.opts.max||1,
            sourceType:self.opts.sourceType||['album', 'camera'],
            success:function(res){
                //Callback onChooseSuccess
                self.opts.onChooseSuccess && self.opts.onChooseSuccess(res);
                //初始化上传队列
                self.uploads=[];
                self.uploadIndex=0;
                //初始化下载队列
                self.downloads=[];
                self.downloadIndex=0;
                
                for(var i=0,id;id=res.localIds[i++];){
                    self.uploads.push(id);
                }
                self.imagesCount=self.uploads.length;
                //调用上传方法upload
                self.upload(self.uploads[self.uploadIndex]);
            },
            fail:function(res){self.opts.onChooseError && self.opts.onChooseError(res);}
        });
    }
};