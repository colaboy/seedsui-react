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

        btnAddFinalClass:"tree-btnadd",
        btnAddClass:"icon-rdoadd-fill",
        btnDelFinalClass:"tree-btndel",
        btnDelClass:"icon-clear-fill",

        idAttr:"data-id",
        parentidAttr:"data-parentid",
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
    s.updateBar=function(){
        if(s.params.bar){
            s.bar=typeof s.params.bar=="string"?document.querySelector(s.params.bar):s.params.bar;
            if(!s.bar){
                console.log("SeedsUI Error：未找到Bar的DOM对象，请检查传入参数是否正确");
                return;
            }
        }
    }
    s.updateBar();
    s.setBar=function(bar){
        s.params.bar=bar;
    }

    //Selected
    s.selected={};
    var _data=s.params.data;
    s.getChildren=function(id){
        var children = [];
        for(var i=0,child; child=_data[i++];) {
            if (id && child.parentid == id) {
                children.push(child);
            }
        }
        return children;
    }
    s.initData=function(id,ulContainer){//指定的部门id，根节点为-1
        var group = this.getChildren(id);
        for(var i=0,option; option=group[i++];) {
            //拷贝option，方便传入回调中而不影响原option
            var copyOption=Object.create(option);
            //line的data-xxx属性html
            var lineDataHTML="";
            for(var n in option){
                lineDataHTML+='data-'+n+'="'+option[n]+'" ';
            }

            //tree-icon和tree-title的html
            copyOption.html='<div class="'+s.params.iconClass+'">'+
                            '<i class="'+s.params.arrowClass+'"></i>'+
                        '</div>'+
                        '<div class="'+s.params.titleClass+'">'+option.name+'</div>';
            //Callback onData
            if(s.params.onData)s.params.onData(copyOption);

            var li = document.createElement("li");
            
            //tree-btnadd
            var addBtnHTML="";
            if(s.bar){
                if(!s.selected[option.id]){
                    addBtnHTML='<span class="'+s.params.iconClass+' '+s.params.btnAddClass+' '+s.params.btnAddFinalClass+'"></span>';
                }
            }else{
                addBtnHTML='';
            }

            //判断当前option和父级是否已经被选中
            var activeClass="",isSelected=s.isSelected(option.id,option.parentid);
            if(isSelected==2){//父级和当前都被选中
                s.removeSelected(option.id);
            }else if(isSelected==1){//当前选中
                activeClass=" "+s.params.activeClass;
            }
            //生成完整的html
            var html='<div class="'+s.params.lineClass+activeClass+'" '+lineDataHTML+'>'+copyOption.html+addBtnHTML+'</div><ul></ul>';
            li.innerHTML=html;

            ulContainer.appendChild(li);
            var ul = s.container.querySelector("["+s.params.idAttr+"='"+option.id+"']").nextElementSibling;
            s.initData(option.id,ul);
        }
    }
    s.update=function(){
        if(!s.params.data){
            console.log("SeedsUI Warn：未找到Tree的Data数据，可在初始化时传入data参数，或者通过setData方法设置数据");
            return;
        }
        if(!s.params.data[0].id || !s.params.data[0].parentid || !s.params.data[0].name){
            console.log("SeedsUI Error：Tree的Data数据格式不正确，请检查data参数是否有id、name、parentid属性");
            return;
        }
        s.updateBar();

        s.container.innerHTML="";
        s.initData(-1,s.container);//根节点
    }
    s.update();
    /*=========================
      Method
      ===========================*/
    s.setData=function(data){
        _data=s.params.data=data;
    }
    //添加数据
    s.addData=function(data,id,childNode){
        _data=data;
        s.initData(id,childNode);
    }
    //获得数据
    s.getDataByTarget=function(target){
        var opts={};
        for (var i=0,att;att=target.attributes[i++];){
            if(att.nodeName.indexOf("data-")!=-1){
                opts[att.nodeName.substring(5)]=att.nodeValue;
            }
        }
        return opts;
    }
    //异步添加节点，判断节点是否已经被选中
    //当前被选中返回1，父级被选中返回-1，当前和父级都被选中返回2，没有被选中返回0
    s.isSelected=function(id,parentid){
        var flag=0,currentFlag=0,parentFlag=0;
        //判断当前是否被选中
        if(s.selected[id]){
            currentFlag=1;
        }
        //判断父级是否被选中
        if(s.selected[parentid]){
            parentFlag=-1;
        }

        //判断树中是否存在此ID
        var parentNode=s.container.querySelector("["+s.params.idAttr+"='"+parentid+"']");
        if(!parentNode){
            return 0;
        }

        //向上查询是否已添加到选中项，一直查到顶级
        while(!parentNode.classList.contains(s.params.treeClass) && parentNode.tagName!="BODY"){
            parentNode=parentNode.parentNode.parentNode;
            var lineNode=parentNode.previousElementSibling;
            if(lineNode && lineNode.classList.contains(s.params.lineClass)){
                var id=lineNode.getAttribute(s.params.idAttr);
                if(s.selected[id]){
                    parentFlag=-1;
                    break;
                }
            }
        }

        if(currentFlag && parentFlag)return 2;
        return currentFlag+parentFlag;

        //经过以上过滤，仍然未找到存在于选中项的迹象，说明没有存在于选中列表中
        return 0;
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
    s.createBarOption=function(id,name,parentid){
        var div=document.createElement("span");
        div.setAttribute("class",s.params.barOptionClass);
        div.setAttribute(s.params.idAttr,id);
        if(parentid)div.setAttribute(s.params.parentidAttr,parentid);
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
    s.addSelected=function(opts){
        if(!opts.id || !opts.name || !opts.parentid){
            console.log("SeedsUI Error:id、name、parentid三个参数不正确");
            return;
        }
        if(s.selected[opts.id]){
            console.log("SeedsUI Info:您要选中的节点已经选中");
            return;
        }
        if(s.isSelected(opts.id,opts.parentid)){
            console.log("SeedsUI Info:您要选中的节点已经选中");
            return;
        }

        //bar上添加选中
        var barOption=s.createBarOption(opts.id,opts.name,opts.parentid);
        s.bar.appendChild(barOption);
        s.showBar();

        //tree中激活选中
        var treeOption=s.container.querySelector("["+s.params.idAttr+"='"+opts.id+"']");
        if(treeOption)treeOption.classList.add(s.params.activeClass)

        //s.selected中添加选中
        s.selected[opts.id]=opts;
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
            
            //展开与收缩
            s.targetLine.classList.toggle(s.params.extandClass);
            var lines=s.targetLine.nextElementSibling.querySelectorAll("li > ."+s.params.lineClass)
            for(var i=0,line;line=lines[i++];){
                if(s.selected[line.getAttribute(s.params.idAttr)]){
                    line.classList.add(s.params.activeClass);
                }
            }

            //Callback onClickLastChild(点击底层)
            if((!s.targetLine.nextElementSibling || !s.targetLine.nextElementSibling.hasChildNodes()) && s.params.onClickLastChild)s.params.onClickLastChild(s);
        }
        //Callback onClick
        if(s.params.onClick)s.params.onClick(s);
    }
    //点击添加按钮
    s.onClickBtnAdd=function(elLine){
        //删除子级
        var elLines=elLine.parentNode.querySelectorAll("."+s.params.lineClass);
        for(var i=0,el;el=elLines[i++];){
            var elId=el.getAttribute(s.params.idAttr);
            s.removeSelected(elId);
        }
        //显示此级
        elLine.classList.add(s.params.activeClass);
        /*var id=elLine.getAttribute(s.params.idAttr);
        var name=elLine.getAttribute(s.params.nameAttr);
        var parentid=elLine.getAttribute(s.params.parentidAttr);*/
        var opts=s.getDataByTarget(elLine);
        //添加到s.selected
        s.addSelected(opts);
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