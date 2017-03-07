define(["jquery", "underscore", "backbone", "text", "async!mapAPI"], function ($, _, backbone) {
    let Comp = null,
        totalNumber = 0;
    // 设置路由
    let setting = backbone.Router.extend({
        $main: $("#main"),
        routes: {
            "home": "home",
            "foudre": "foudre",
            "order": "order",
            "shop": "shop",
            "my": "my",
            "*defAction": "defAction"
        },
        home: function () {
            // 导入 HTML 及 JS
            let self = this;
            require(["text!../../home/home.html", "text!../../home/css/home.css", "./home/js/home.js", "async!mapAPI"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.reqData();
                if (Comp) {
                    $(".public_header > p").html("" + Comp.district + Comp.street + Comp.streetNumber);
                }
            });
        },
        foudre: function () {
            let self = this;
            require(["text!../../foudre/foudre.html", "text!../../foudre/css/foudre.css", "./foudre/js/foudre.js", "async!mapAPI"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.reqData();
                obj.init();
                if (Comp) {
                    $(".public_header > p").html("" + Comp.district + Comp.street + Comp.streetNumber);
                }
            });
        },
        order: function () {
            let self = this;
            require(["text!../../order/order.html", "text!../../order/css/order.css", "./order/js/order.js", "async!mapAPI"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.reqData();
            });
        },
        shop: function () {
            let self = this;
            require(["text!../../shop/shop.html", "text!../../shop/css/shop.css", "./shop/js/shop.js", "async!mapAPI"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.init();
                if (Comp) {
                    $(".public_header > p").html("" + Comp.district + Comp.street + Comp.streetNumber);
                }
            });
        },
        my: function () {
            let self = this;
            require(["text!../../my/my.html", "text!../../my/css/my.css", "async!mapAPI"], function (html, css) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
            });
        },
        // 初始化
        initialize: function () {
            if (window.location.hash === "") {
                window.location.hash = "home";
            }
        }
    });

    // 获取当前地址
    (function () {alert("zhixing")
        let geoLocation = new BMap.Geolocation();
        geoLocation.getCurrentPosition(function (location) {
            // 将经纬度逆运算
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                let geoc = new BMap.Geocoder();
                geoc.getLocation(location.point, function (rs) {
                    let addComp = rs.addressComponents;
                    $(".public_header > p").html("" + addComp.district + addComp.street + addComp.streetNumber);
                    $(".loading").css("display", "none");
                    Comp = addComp;
                });
            } else {
                alert('failed' + this.getStatus());
            }
        });
    })();

    // 初始化购物车右上角的数目
    (function () {
        let storage = window.localStorage;
        for (let key in storage) {
            if (storage.getItem(key)[0] === "{") {
                let classes = JSON.parse(storage.getItem(key));
                for (let i in classes) {
                    totalNumber += +classes[i].num;
                }
            }
        }
        if (totalNumber !== 0) {
            $(".mark").css("display", "flex").html(totalNumber);
        }
    })();
    // 实例化
    let router = new setting();
    router.on("route", function (name) {
        let $before = $("#b"),
            $choice = $("." + name),
            $public_header = $(".public_header>p"),
            storage = window.localStorage,
            num = 0,
            $mark = $(".mark");
        $before.attr("id", "a");
        $before.css("background-image", "url('./public/img/" + $before.attr("class") + ".png')");
        $choice.css("background-image", "url('./public/img/" + name + "2.png')");
        $choice.attr("id", "b");
    });
    // 启动路由功能
    backbone.history.start();
});