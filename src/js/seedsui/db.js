//DB 本地数据库
var DB=(function(){
    function checkManifest() {
        window.addEventListener("updateready", function(e) {
            console.log("离线缓存状态：" + window.applicationCache.status);
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('发现此manifest文件有更新，是否更新？')) {
                    window.location.reload();
                }
            } else {
                console.log('manifest文件没有变化');
            }
        }, false);
    }

    function setCookie(key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(key) {
        var valExpr = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        var match = valExpr.exec(document.cookie);
        if (match && match[2]) {
            return unescape(match[2]);
        }
        return null;
    }

    function delCookie(key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var val = getCookie(key);
        if (val != null) {
            document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
        }
    }

    var store = window.localStorage;
    var session = window.sessionStorage;
    if (!store) {
        doc.style.behavior = 'url(#default#userData)'; //保存表单的值
        //console.log("您当前的设备不支持本地数据库localstore");
    }
    return {
        //application cache
        checkManifest: checkManifest,
        /**
         * 保存数据
         * 
         * @method set
         * @param key //键
         * @param val //值
         * @return void
         */
        set: function(key, val) {
            if (store) {
                store.setItem(key, val);
            } else {
                setCookie(key, val);
            }
        },
        /**
         * 保存数据
         * 
         * @method get
         * @param key //键
         * @return string //返回您所存储的值
         */
        get: function(key) {
            if (store) {
                if (typeof key == "number") {
                    return store.key(key);
                }
                return store.getItem(key);
            } else {
                return getCookie(key);
            }
        },
        /**
         * 删除数据
         * 
         * @method del
         * @param key //根据键删除此项
         */
        del: function(key) {
            if (store) {
                store.removeItem(key);
            } else {
                delCookie(key);
            }
        },
        /**
         * 清空数据
         * 
         * @method clear
         * @return void
         */
        clear: function() {
            if (store) {
                return store.clear();
            } else {
                alert("抱歉，cookie不可以全部清空!");
            }
        },

        setSession: function(key, value) {
            session.setItem(key, value);
        },
        getSession: function(key) {
            if (typeof key == "number") {
                return session.key(key);
            }
            return session.getItem(key);
        },
        delSession: function(key) {
            session.removeItem(key);
        },
        clearSession: function() {
            session.clear();
        }
    };
})();