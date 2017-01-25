//Tree 树结构
(function(window,document,undefined){
window.Tree=function(container,params){
    /*=========================
      Model
      ===========================*/
    var defaults={
        /*DATA*/
        data:null,
        /*DOM*/
        bar:null,
        barOptionClass:"tree-bar-button",

        extandClass:"extand",
        activeClass:"active",

        treeClass:"tree",
        lineClass:"tree-line",//行
        titleClass:"tree-title",//标题
        arrowClass:"tree-icon-arrow",
        iconClass:"tree-icon",//左侧图标

        enableSelected:false,
        btnAddFinalClass:"tree-btnadd",
        btnAddClass:"icon-rdoadd-fill",
        btnDelFinalClass:"tree-btndel",
        btnDelClass:"icon-clear-fill",

        idAttr:"data-id",
        parentIdAttr:"data-parentId",
        nameAttr:"data-name",

        
        /*callbacks
        onClick:function(Tree)
        onClickLastChild:function(Tree)
        onData:function(option)
        */
    }
    params=params||{};
    for(var def in defaults){
        if(params[def]===undefined){
            params[def]=defaults[def];
        }
    }
    //Tree
    var s=this;

    //Params
    s.params = params;
    
    //Container
    s.container=typeof container=="string"?document.querySelector(container):container;
    if(!s.container){
        console.log("SeedsUI Error：未找到Tree的DOM对象，请检查传入参数是否正确");
        return;
    }

    //Bar
    if(s.params.bar){
        s.bar=typeof s.params.bar=="string"?document.querySelector(s.params.bar):s.params.bar;
    }

    //Selected
    s.selected={};
    s.data=s.params.data;
    s.getChildren=function(id){
        var children = [];
        for(var i=0,child; child=s.data[i++];) {
            if (id && child.parentId == id) {
                children.push(child);
            }
        }
        return children;
    }
    s.initData=function(id,childNode){//指定的部门id，根节点为-1
        var group = this.getChildren(id);
        for(var i=0,option; option=group[i++];) {
            //tree-line的data-xxx
            var lineDataHTML="";
            for(var n in option){
                lineDataHTML+='data-'+n+'="'+option[n]+'" ';
            }

            //tree-icon和tree-title的html
            option.html='<div class="'+s.params.iconClass+'">'+
                            '<i class="'+s.params.arrowClass+'"></i>'+
                        '</div>'+
                        '<div class="'+s.params.titleClass+'">'+option.name+'</div>';
            //Callback onData
            if(s.params.onData)s.params.onData(option);
            var li = document.createElement("li");
            //tree-btnadd
            var addBtnHTML="";
            if(s.params.enableSelected){
                addBtnHTML='<span class="'+s.params.iconClass+' '+s.params.btnAddClass+' '+s.params.btnAddFinalClass+'"></span>';
            }else{
                addBtnHTML='';
            }
            //生成完整的html
            //var html='<div class="'+s.params.lineClass+'" '+s.params.idAttr+'="'+option.id+'" '+s.params.nameAttr+'="'+option.name+'">'+option.html+addBtnHTML+'</div><ul></ul>';
            var html='<div class="'+s.params.lineClass+'" '+lineDataHTML+'>'+option.html+addBtnHTML+'</div><ul></ul>';
            li.innerHTML=html;

            /*if (id == "-1") {//根节点
                s.container.appendChild(li);
            } else {
                childNode.appendChild(li);
            }*/
            childNode.appendChild(li);
            var ul = s.container.querySelector("["+s.params.idAttr+"='"+option.id+"']").nextElementSibling;
            s.initData(option.id,ul);
        }
    }
    s.update=function(){
        if(!s.params.data){
            console.log("SeedsUI Error：未找到Tree的Data数据，请检查data参数");
            return;
        }
        if(!s.params.data[0].id || !s.params.data[0].parentId || !s.params.data[0].name){
            console.log("SeedsUI Error：Tree的Data数据格式不正确，请检查data参数是否有id、parentId、name属性");
            return;
        }
        s.initData(-1,s.container);//根节点
    }
    s.update();
    /*=========================
      Method
      ===========================*/
    s.setData=function(data){
        s.data=s.params.data=data;
    }
    //添加数据
    s.addData=function(data,id,childNode){
        s.data=data;
        s.initData(id,childNode);
    }
    //异步添加节点，判断节点是否已经被选中
    s.isSelected=function(id,parentId){
        //判断选中列表是否存在
        if(s.selected[id] || s.selected[parentId]){
            return true;
        }

        //判断树中是否存在此ID
        var parentNode=s.container.querySelector("["+s.params.idAttr+"='"+parentId+"']");
        if(!parentNode){
            return false;
        }

        //向上查询是否已添加到选中项，一直查到顶级
        while(!parentNode.classList.contains(s.params.treeClass) && parentNode.tagName!="BODY"){
            parentNode=parentNode.parentNode.parentNode;
            var lineNode=parentNode.previousElementSibling;
            if(lineNode.classList.contains(s.params.lineClass)){
                var id=lineNode.getAttribute(s.params.idAttr);
                if(s.selected[id]){
                    return true;
                }
            }
        }

        //经过以上过滤，仍然未找到存在于选中项的迹象，说明没有存在于选中列表中
        return false;
    }

    //Json是否为空
    s.isEmptyJson=function(json){
        var temp="";
        for(var j in json){
            temp+=j;
        }
        if(temp==="")return true;
        return false;
    }
    //创建选中项
    s.createBarOption=function(id,name,parentId){
        var div=document.createElement("span");
        div.setAttribute("class",s.params.barOptionClass);
        div.setAttribute(s.params.idAttr,id);
        if(parentId)div.setAttribute(s.params.parentIdAttr,parentId);
        div.setAttribute(s.params.nameAttr,name);

        var label=document.createElement("label");
        label.innerHTML=name;

        var del=document.createElement("a");
        del.classList.add(s.params.btnDelFinalClass,s.params.btnDelClass);

        div.appendChild(label);
        div.appendChild(del);
        return div;
    }
    //删除选中项
    s.removeSelected=function(id){
        if(s.selected[id]){
            //删除数组
            delete s.selected[id];
            //删除bar上元素
            s.bar.removeChild(s.bar.querySelector("["+s.params.idAttr+"='"+id+"']"));
            //清空树上的选中状态
            var node=s.container.querySelector("["+s.params.idAttr+"='"+id+"']");
            if(node)node.classList.remove(s.params.activeClass);
        }
    }
    s.removeAllSelected=function(){
        for(var id in s.selected){
            s.removeSelected(id);
        }
        s.hideBar();
    }
    s.removeAllExtand=function(){
        var extands=s.container.querySelectorAll("."+s.params.extandClass);
        for(var i=0,ex;ex=extands[i++];){
            ex.classList.remove(s.params.extandClass);
        }
    }
    s.addSelected=function(elLine){
        //删除子级
        var elLines=elLine.parentNode.querySelectorAll("."+s.params.lineClass);
        for(var i=0,el;el=elLines[i++];){
            var elId=el.getAttribute(s.params.idAttr);
            s.removeSelected(elId);
        }
        //显示此级
        elLine.classList.add(s.params.activeClass);
        var id=elLine.getAttribute(s.params.idAttr);
        var name=elLine.getAttribute(s.params.nameAttr);
        var parentId=elLine.getAttribute(s.params.parentIdAttr);

        var barOption=s.createBarOption(id,name,parentId);
        s.bar.appendChild(barOption);

        s.selected[id]=elLine;
        s.showBar();
    }
    //显示选中项
    s.showBar=function(){
        s.bar.classList.add(s.params.activeClass);
    }
    //隐藏选中项
    s.hideBar=function(){
        s.bar.classList.remove(s.params.activeClass);
    }
    
    s.reset=function(){
        s.removeAllSelected();
        s.removeAllExtand();
    }
    /*=========================
      Events
      ===========================*/
    //绑定事件
    s.events=function(detach){
        var action=detach?"removeEventListener":"addEventListener";
        //树结构
        s.container[action]("touchstart",s.onTouchStart,false);
        s.container[action]("touchend",s.onTouchEnd,false);
        //选中容器
        if(s.bar){
            s.bar[action]("click",s.onClickBar,false);
        }
    }
    //attach、dettach事件
    s.attach=function(event){
        s.events();
    }
    s.detach=function(event){
        s.events(true);
    }
    /*=========================
      Event Handler
      ===========================*/
    //Tap
    s.touches={
        startX:0,
        startY:0,
        endX:0,
        endY:0,
        diffX:0,
        diffY:0,
    };
    s.onTouchStart=function(e){
        s.touches.startX = e.touches[0].clientX;
        s.touches.startY = e.touches[0].clientY;
    }
    s.onTouchEnd=function(e){
        s.touches.endX = e.changedTouches[0].clientX,
        s.touches.endY = e.changedTouches[0].clientY;
        s.touches.diffX=s.touches.startX - s.touches.endX;
        s.touches.diffY=s.touches.startY - s.touches.endY;
        //单击事件
        if(Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6 ){
            s.onClickTree(e);
        }
    }
    //点击树
    s.onClickTree=function(e){
        //点击树
        s.targetLi,s.targetLine,s.target=e.target;
        
        if(s.target.classList.contains(s.params.lineClass)){//点击二级
            s.targetLine=s.target;
            s.targetLi=s.target.parentNode;
        }else if(s.target.classList.contains(s.params.iconClass)||
        s.target.classList.contains(s.params.titleClass)){//点击三级
            s.targetLine=s.target.parentNode;
            s.targetLi=s.target.parentNode.parentNode;
        }
        
        if(s.target.classList.contains(s.params.btnAddFinalClass)){//点击添加
            s.onClickBtnAdd(s.targetLine);
        }else{//点击其它元素
            //Callback onClickLastChild(点击底层)
            if((!s.targetLine.nextElementSibling || !s.targetLine.nextElementSibling.hasChildNodes()) && s.params.onClickLastChild)s.params.onClickLastChild(s);
            //展开与收缩
            s.targetLine.classList.toggle(s.params.extandClass);
        }
        //Callback onClick
        if(s.params.onClick)s.params.onClick(s);
    }
    //点击添加按钮
    s.onClickBtnAdd=function(elLine){
        s.addSelected(elLine);
    }
    //点击树bar
    s.onClickBar=function(e){
        if(e.target.classList.contains(s.params.btnDelFinalClass)){
            s.onClickBtnDel(e);
        }
    }
    //点击删除按钮
    s.onClickBtnDel=function(e){
        s.option=e.target.parentNode;
        s.target=e.target;
        //选中选中项
        var id=s.option.getAttribute(s.params.idAttr);
        s.removeSelected(id);
        //如果为空，则隐藏选中容器
        if(s.isEmptyJson(s.selected)){
            s.hideBar();
        }
    }

    //主函数
    s.init=function(){
        s.attach();
    }
    s.init();
}
})(window,document,undefined);