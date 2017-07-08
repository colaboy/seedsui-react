function oneanimateBackward(){
    document.getElementById("ID-About-Topic1").className="topic-backward";
    document.getElementById("ID-About-Subtitle1").className="subtitle-backward";
    document.getElementById("ID-About-RdoHTML").className="rdohtml-backward";
    document.getElementById("ID-About-RdoCss").className="rdocss-backward";
    document.getElementById("ID-About-RdoJs").className="rdojs-backward";
    
    document.getElementById("ID-About-TxtUp").value="oneanimate";
    document.getElementById("ID-About-TxtDown").value="oneanimateBackward";
}
function oneanimate(){
    //从2跳回来，或者从1跳过来
    if(document.getElementById("ID-About-PlugBox").className=="boxplug-forward"||document.getElementById("ID-About-PlugBox").className=="boxplug-down"){
        document.getElementById("ID-About-PlugBox").className="boxplug-backward";
        document.getElementById("ID-About-Topic2").className="topic2-backward";
        document.getElementById("ID-About-Topic1").className="topic-down";
        initplugs();
    }else{
        document.getElementById("ID-About-Topic1").className="topic-forward";
        document.getElementById("ID-About-Subtitle1").className="subtitle-forward";
    }
    
    //加载圆
    document.getElementById("ID-About-RdoHTML").className="rdohtml-forward";
    document.getElementById("ID-About-RdoCss").className="rdocss-forward";
    document.getElementById("ID-About-RdoJs").className="rdojs-forward";
    
    document.getElementById("ID-About-TxtUp").value="twoanimate";
    document.getElementById("ID-About-TxtDown").value="oneanimateBackward";
    
}
function twoanimate(){
    //从3跳回来
    if(document.getElementById("ID-About-Phone").className=="phone-forward"){
        document.getElementById("ID-About-IconDown").className="animate-show";
        document.getElementById("ID-About-Phone").className="phone-backward";
        document.getElementById("ID-About-Pull").className="pull-backward";
        document.getElementById("ID-About-Topic3").className="topic3-backward";
        
        document.getElementById("ID-About-Topic2").className="topic-down";
        document.getElementById("ID-About-PlugBox").className="boxplug-down";
        plugsload();
    }
    //从2跳过来
    if(document.getElementById("ID-About-RdoHTML").className=="rdohtml-forward"){
        document.getElementById("ID-About-RdoHTML").className="rdohtml-backward";
        document.getElementById("ID-About-RdoCss").className="rdocss-backward";
        document.getElementById("ID-About-RdoJs").className="rdojs-backward";
        document.getElementById("ID-About-Topic1").className="topic-up";
        document.getElementById("ID-About-Topic2").className="topic2-forward";
        document.getElementById("ID-About-PlugBox").className="boxplug-forward";
        plugsload();
    }
    document.getElementById("ID-About-TxtUp").value="threeanimate";
    document.getElementById("ID-About-TxtDown").value="oneanimate";
}
function plugsload(){
    document.getElementById("ID-About-IconChat").className="plugchat-forward";
    document.getElementById("ID-About-IconHome").className="plughome-forward";
    document.getElementById("ID-About-IconFile").className="plugfile-forward";
    document.getElementById("ID-About-IconMark").className="plugreadmark-forward";
    document.getElementById("ID-About-IconTel").className="plugtel-forward";
    document.getElementById("ID-About-IconFriends").className="plugfriends-forward";
    document.getElementById("ID-About-IconAlbum").className="plugalbum-forward";
    document.getElementById("ID-About-IconPos").className="plugposition-forward";
    document.getElementById("ID-About-IconComment").className="plugcomments-forward";
    document.getElementById("ID-About-IconGearth").className="plugearth-forward";
    document.getElementById("ID-About-IconMes").className="plugmessage-forward";
    document.getElementById("ID-About-IconImg").className="plugimg-forward";
    document.getElementById("ID-About-IconShare").className="plugshare-forward";
    document.getElementById("ID-About-IconSearch").className="plugsearch-forward";
}
function initplugs(){
    document.getElementById("ID-About-IconChat").className="plugchat";
    document.getElementById("ID-About-IconHome").className="plughome";
    document.getElementById("ID-About-IconFile").className="plugfile";
    document.getElementById("ID-About-IconMark").className="plugreadmark";
    document.getElementById("ID-About-IconTel").className="plugtel";
    document.getElementById("ID-About-IconFriends").className="plugfriends";
    document.getElementById("ID-About-IconAlbum").className="plugalbum";
    document.getElementById("ID-About-IconPos").className="plugposition";
    document.getElementById("ID-About-IconComment").className="plugcomments";
    document.getElementById("ID-About-IconGearth").className="plugearth";
    document.getElementById("ID-About-IconMes").className="plugmessage";
    document.getElementById("ID-About-IconImg").className="plugimg";
    document.getElementById("ID-About-IconShare").className="plugshare";
    document.getElementById("ID-About-IconSearch").className="plugsearch";
}
function threeanimate(){
    initplugs();
    document.getElementById("ID-About-Topic2").className="topic-up";
    document.getElementById("ID-About-PlugBox").className="boxplug-up";
    document.getElementById("ID-About-IconDown").className="animate-hide";
    
    document.getElementById("ID-About-Phone").className="phone-forward";
    document.getElementById("ID-About-Pull").className="pull-forward";
    document.getElementById("ID-About-Topic3").className="topic3-forward";
    
    document.getElementById("ID-About-TxtUp").value="closeAbout";
    document.getElementById("ID-About-TxtDown").value="twoanimate";
}
function swipeToUp(){
    var upStr=document.getElementById("ID-About-TxtUp").value;
    eval(upStr)();
}
function swipeToDown(){
    var downStr=document.getElementById("ID-About-TxtDown").value;
    eval(downStr)();
}
function resetAbout(){
    document.getElementById("ID-About-TxtUp").value="oneanimate";
    document.getElementById("ID-About-TxtDown").value="";
    //第一页
    document.getElementById("ID-About-Topic1").className="topic";
    document.getElementById("ID-About-Subtitle1").className="subtitle";
    document.getElementById("ID-About-RdoHTML").className="rdohtml";
    document.getElementById("ID-About-RdoCss").className="rdocss";
    document.getElementById("ID-About-RdoJs").className="rdojs";
    //第二页
    document.getElementById("ID-About-RdoHTML").className="rdohtml";
    document.getElementById("ID-About-RdoCss").className="rdocss";
    document.getElementById("ID-About-RdoJs").className="rdojs";
    document.getElementById("ID-About-Topic1").className="topic";
    document.getElementById("ID-About-Topic2").className="topic2";
    document.getElementById("ID-About-PlugBox").className="boxplug";

    document.getElementById("ID-About-IconChat").className="plugchat";
    document.getElementById("ID-About-IconHome").className="plughome";
    document.getElementById("ID-About-IconFile").className="plugfile";
    document.getElementById("ID-About-IconMark").className="plugreadmark";
    document.getElementById("ID-About-IconTel").className="plugtel";
    document.getElementById("ID-About-IconFriends").className="plugfriends";
    document.getElementById("ID-About-IconAlbum").className="plugalbum";
    document.getElementById("ID-About-IconPos").className="plugposition";
    document.getElementById("ID-About-IconComment").className="plugcomments";
    document.getElementById("ID-About-IconGearth").className="plugearth";
    document.getElementById("ID-About-IconMes").className="plugmessage";
    document.getElementById("ID-About-IconImg").className="plugimg";
    document.getElementById("ID-About-IconShare").className="plugshare";
    document.getElementById("ID-About-IconSearch").className="plugsearch";
    //第三页
    document.getElementById("ID-About-Topic2").className="topic2";
    document.getElementById("ID-About-PlugBox").className="boxplug";
    document.getElementById("ID-About-IconDown").className="animate";
    
    document.getElementById("ID-About-Phone").className="phone-backward";
    document.getElementById("ID-About-Pull").className="pull-backward";
    document.getElementById("ID-About-Topic3").className="topic3";
}
function closeAbout(){
    console.log("结束");
    document.getElementById("ID-About-Container").classList.remove("showAbout");
    document.getElementById("ID-About-Container").classList.add("closeAbout");
}
function showAbout(){
    console.log("开始");
    resetAbout();
    document.getElementById("ID-About-Container").classList.remove("closeAbout");
    document.getElementById("ID-About-Container").classList.add("showAbout");
}
EventUtil.addHandler(document.getElementById("ID-About-Container"),"swipeup",swipeToUp);
EventUtil.addHandler(document.getElementById("ID-About-Container"),"swipedown",swipeToDown);