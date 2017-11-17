//Toast 提示框
(function(window, document, undefined) {

  window.Toast = function(params) {
    /*================
    Model
    ================*/
    var defaults = {
      parent: document.body,

      maskClass: "mask",
      type: "bottom",
      maskActiveClass: "active",
      maskFeatureClass: "toast-mask",

      toastClass: "toast",
      toastActiveClass: "active",
      wrapperClass: "toast-wrapper",

      isClickAllow: false,
      clickAllowClass: "toast-propagation",

      toastCss: {},
      wrapperCss: {},

      delay: 1500,
      html: "",

      /*callbacks
      onShowed(Toast)//显示动画结束后回调
      onHid(Toast)//隐藏动画结束后回调
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
    s.parent = typeof s.params.parent == "string" ? document.querySelector(s.params.parent) : s.params.parent;
    s.toast, s.wrapper;
    //Mask
    s.createMask = function() {
      var mask = document.createElement("div");
      mask.setAttribute("class", s.params.maskClass + " " + s.params.type + " " + s.params.maskFeatureClass);
      if (s.params.isClickAllow) mask.classList.add(s.params.clickAllowClass);
      return mask;
    }
    s.createToast = function() {
      var toast = document.createElement("div");
      toast.setAttribute("class", s.params.toastClass);
      return toast;
    }
    s.createToastContent = function() {
      var wrapper = document.createElement("div");
      wrapper.setAttribute("class", s.params.wrapperClass);
      if (s.params.html) wrapper.innerHTML = s.params.html;
      return wrapper;
    }
    s.create = function() {
      s.mask = s.createMask();
      s.toast = s.createToast();
      s.wrapper = s.createToastContent();
      s.toast.appendChild(s.wrapper);
      s.mask.appendChild(s.toast);
      s.parent.appendChild(s.mask);
    }
    s.create();
    s.update = function() {
      for (var c in s.params.toastCss) {
        s.toast.style[c] = s.params.toastCss[c];
      }
      for (var c in s.params.wrapperCss) {
        s.wrapper.style[c] = s.params.wrapperCss[c];
      }
    }
    s.update();

    /*================
    Method
    ================*/
    s.setToastClassName = function(className) {
      s.params.toastClass = className;
      s.toast.setAttribute("class", s.params.toastClass);
    };
    s.setHTML = function(html) {
      s.wrapper.innerHTML = html;
    };
    s.setDelay = function(delay) {
      s.params.delay = delay;
    };

    s.showMask = function() {
      s.mask.classList.add(s.params.maskActiveClass);
    }
    s.hideMask = function() {
      s.mask.classList.remove(s.params.maskActiveClass);
    }
    s.destroyMask = function() {
      s.parent.removeChild(s.mask);
    }

    s.showToast = function() {
      s.toast.classList.add(s.params.toastActiveClass);
    }
    s.hideToast = function() {
      s.toast.classList.remove(s.params.toastActiveClass);
    }
    s.destroyToast = function() {
      s.parent.removeChild(s.toast);
    }

    s.isHid = true;
    s.hide = function(fn) {
      s.isHid = true;
      s.hideMask();
      s.hideToast();
    };
    s.show = function(fn) {
      s.isHid = false;
      s.showMask();
      s.showToast();

      //显示数秒后，自动消失
      if (s.delayer) window.clearTimeout(s.delayer);
      s.delayer = setTimeout(function() {
        s.hide();
      }, s.params.delay);
    };
    s.destroy = function() {
      s.destroyMask
    };
    /*================
    Controller
    ================*/
    s.events = function(detach) {
      var target = s.toast;
      var action = detach ? "removeEventListener" : "addEventListener";
      target[action]("webkitTransitionEnd", s.onTransitionEnd, false);
      //target[action]("webkitAnimationEnd",s.onAnimationEnd,false);
    }
    s.attach = function() {
      s.events();
    }
    s.detach = function() {
      s.events(false);
    }
    //Events Handler
    s.onTransitionEnd = function(e) {
      if (e.propertyName == "visibility") return;
      if (s.isHid) {
        //Callback onHid
        if (s.params.onHid) s.params.onHid(s);
      } else {
        //Callback onShowed
        if (s.params.onShowed) s.params.onShowed(s);
      }
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