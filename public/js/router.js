define(["jquery", "underscore", "backbone", "text"], function ($, _, backbone) {
    // 设置路由
    let setting = backbone.Router.extend({
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
            require(["text!../../home/home.html", "./home/js/home.js"], function (html, obj) {
                $("#main").html(html);
                obj.reqData();
            });
        },
        foudre: function () {
            //"../foudre/js/foudre.js"
            require(["text!../../foudre/foudre.html"], function (html, obj) {
                $("#main").html(html);
            });
        },
        order: function () {
            require([], function (html) {
                $("#main").html("order");
            });
        },
        shop: function () {
            require([], function (html) {
                $("#main").html("shop");
            });
        },
        my: function () {
            require([], function (html) {
                $("#main").html("my");
            });
        },
        defAction: function () {
            require([], function (html) {
                $("#main").html("报错!");
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