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
            require([], function (html) {
                $("#main").html("shop");
            });
        },
        my: function () {
            let self = this;
            require(["text!../../my/my.html", "text!../../my/css/my.css"], function (html, css) {
                self.$main.html("<style>" + css + "</style>");
                self.$main.append(html);
            });
        },
        // 初始化
        initialize: function () {
            window.location.hash = "home";
        }
    });

    // 实例化
    let router = new setting();
    router.on("route", function (name) {
        $(".home").css("background-image", "url('./public/img/home.png')");
        $(".foudre").css("background-image", "url('./public/img/foudre.png')");
        $(".order").css("background-image", "url('./public/img/order.png')");
        $(".shop").css("background-image", "url('./public/img/shop.png')");
        $(".my").css("background-image", "url('./public/img/my.png')");
        $("." + name).css("background-image", "url('./public/img/" + name + "2.png')");
    });
    // 启动路由功能
    backbone.history.start();
});