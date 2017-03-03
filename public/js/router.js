define(["jquery", "underscore", "backbone", "text"], function ($, _, backbone) {
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
            require(["text!../../home/home.html", "text!../../home/css/home.css", "./home/js/home.js"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.reqData();
            });
        },
        foudre: function () {
            let self = this;
            require(["text!../../foudre/foudre.html", "text!../../foudre/css/foudre.css", "./foudre/js/foudre.js"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.init();
                obj.reqData();
            });
        },
        order: function () {
            let self = this;
            require(["text!../../order/order.html", "text!../../order/css/order.css", "./order/js/order.js"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
                obj.reqData();
            });
        },
        shop: function () {
            let self = this;
            require(["text!../../shop/shop.html", "text!../../shop/css/shop.css", "./shop/js/shop.js"], function (html, css, obj) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
            });
        }, my: function () {
            let self = this;
            require(["text!../../my/my.html", "text!../../my/css/my.css"], function (html, css) {
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

    // 实例化
    let router = new setting();
    router.on("route", function (name) {
        let $before = $("#b"),
            $choice = $("." + name);
        $before.attr("id", "a");
        $before.css("background-image", "url('./public/img/" + $before.attr("class") + ".png')");
        $choice.css("background-image", "url('./public/img/" + name + "2.png')");
        $choice.attr("id", "b");
    });
    // 启动路由功能
    backbone.history.start();
});