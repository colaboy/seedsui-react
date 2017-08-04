//Actionsheet
(function(window, document, undefined) {

  window.Actionsheet = function(params) {
    /*================
    Model
    ================*/
    var defaults = {
      overflowContainer: document.body,
      overflowContainerActiveClass: "overflow-hidden",
      parent: document.body,

      maskClass: "mask",
      maskActiveClass: "active",
      maskFeatureClass: "actionsheet-mask",

      actionsheetClass: "actionsheet",
      groupClass: "actionsheet-group",
      buttonCancelClass: "actionsheet-cancel",
      buttonCancel: "取消",
      isClickMaskHide: true,
      data: []
      /*
      Callbacks:
      option.onClick:function(Actionsheet)
      onClickCancel:function(Actionsheet)
      onClickMask:function(Actionsheet)
      */
    }
    params = params || {};
    for (var def in defaults) {
      if (params[def] == undefined) {
        params[def] = defaults[def];
      }
    }
    var s = this;
    s.params = params;
    //Parent | OverflowContainer
    s.parent = typeof s.params.parent == "string" ? document.querySelector(s.params.parent) : s.params.parent;
    s.overflowContainer = typeof s.params.overflowContainer == "string" ? document.querySelector(s.params.overflowContainer) : s.params.overflowContainer;
    //Actionsheet | Mask
    s.actionsheet, s.mask;
    //Mask
    s.createMask = function() {
      var mask = document.createElement("div");
      mask.setAttribute("class", s.params.maskClass + " " + s.params.maskFeatureClass);
      return mask;
    }
    //Actionsheet
    s.createActionsheet = function() {
      var actionsheet = document.createElement("div");
      actionsheet.setAttribute("class", s.params.actionsheetClass);

      actionsheet.group = document.createElement("div");
      actionsheet.group.setAttribute("class", s.params.groupClass);

      s.updateData(actionsheet);

      actionsheet.appendChild(actionsheet.group);
      //创建取消按钮
      if (s.params.buttonCancel) {
        actionsheet.buttonCancel = document.createElement("a");
        actionsheet.buttonCancel.setAttribute("class", s.params.buttonCancelClass);
        actionsheet.buttonCancel.innerHTML = s.params.buttonCancel;

        actionsheet.appendChild(actionsheet.buttonCancel);
      }
      return actionsheet;
    }
    s.updateData = function(actionsheet) {
      actionsheet.group.innerHTML = "";
      actionsheet.options = [];
      for (var i = 0, dat; dat = s.params.data[i++];) {
        var option = document.createElement("a");
        option.innerHTML = dat.text;
        option.onClick = dat.handler;
        actionsheet.options.push(option);
        actionsheet.group.appendChild(option);
      }
    }
    s.create = function() {
      s.mask = s.createMask();
      s.actionsheet = s.createActionsheet();
      s.mask.appendChild(s.actionsheet);
      s.parent.appendChild(s.mask);
    }
    s.create();
    //设置数据
    s.setData = function(data) {
      s.params.data = data;
      if (s.actionsheet) s.updateData(s.actionsheet);
      else s.createActionsheet();
    }

    /*================
    Method
    ================*/
    s.showMask = function() {
      s.mask.classList.add(s.params.maskActiveClass);
    }
    s.hideMask = function() {
      s.mask.classList.remove(s.params.maskActiveClass);
    }
    s.destroyMask = function() {
      s.parent.removeChild(s.mask);
    }
    s.showActionsheet = function() {
      s.actionsheet.classList.add(s.params.maskActiveClass);
    }
    s.hideActionsheet = function() {
      s.actionsheet.classList.remove(s.params.maskActiveClass);
    }
    s.destroyActionsheet = function() {
      s.parent.removeChild(s.actionsheet);
    }

    s.isHid = true;
    s.hide = function() {
      s.isHid = true;
      //显示遮罩
      s.hideMask();
      //显示弹出框
      s.hideActionsheet();
      //显示滚动条
      if (s.overflowContainer) s.overflowContainer.classList.remove(s.params.overflowContainerActiveClass);
    };
    s.show = function() {
      s.isHid = false;
      //显示遮罩
      s.showMask();
      //显示弹出框
      s.showActionsheet();
      //禁用滚动条
      if (s.overflowContainer) s.overflowContainer.classList.add(s.params.overflowContainerActiveClass);
    };
    s.destroy = function() {
      //移动事件监听
      s.detach();
      //移除遮罩
      s.destroyMask();
      //移除弹出框
      s.destroyActionsheet();
    };
    //设置
    s.setOnClick = function(fn) {
      s.params.onClick = fn;
    }
    s.setOnClickMask = function(fn) {
      s.params.onClickMask = fn;
    }
    /*================
    Control
    ================*/
    s.events = function(detach) {
        var touchTarget = s.actionsheet;
        var action = detach ? "removeEventListener" : "addEventListener";
        touchTarget[action]("click", s.onClick, false);
        touchTarget[action]("webkitTransitionEnd", s.onTransitionEnd, false);
        //遮罩
        s.mask[action]("click", s.onClickMask, false);
      }
      //attach、dettach事件
    s.attach = function(event) {
      s.events();
    }
    s.detach = function(event) {
      s.events(true);
    }
    s.onClick = function(e) {
      s.target = e.target;
      //点击容器
      if (s.params.onClick) s.params.onClick(s);
      //点击项
      var options = s.actionsheet.options;
      for (var i = 0, opt; opt = options[i++];) {
        if (opt == s.target) {
          //Callback
          opt.onClick(s);
          return;
        }
      }
      //点击取消按钮
      if (s.params.onClickCancel && s.actionsheet.buttonCancel == s.target) {
        s.params.onClickCancel(s);
        return;
      }
      s.hide();
    };

    s.onClickMask = function(e) {
      if (e.target === s.mask) {
        s.target = e.target;
        if (s.params.onClickMask) s.params.onClickMask(s);
        if (s.params.isClickMaskHide) s.hide();
      }
    }

    s.onTransitionEnd = function(e) {
      if (e.propertyName == "visibility") return;
    }
    /*================
    Init
    ================*/
    s.init = function() {
      s.attach();
    }
    s.init();
  }
})(window, document, undefined);