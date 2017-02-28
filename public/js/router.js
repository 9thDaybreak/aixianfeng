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
            require(["text!../../home/home.html", "../home/js/home.js"], function (html, obj) {
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
        let $li = $(".public_footer li"),
            $id2 = $("#2");
        $id2.attr("id", "1");
        $($id2[0].firstElementChild).css("background-image", "url('../public/img/" + $($id2[0].firstElementChild).attr("href").slice(1) + ".png')");
        $.each($li.children(), function (key, value) {
            if ($(value).attr("href").slice(1) === name) {
                $(value).css("background-image", "url('../public/img/" + name + "2.png')");
                $(value.parentNode).attr("id", "2");
            }
        });
    });

// 启动路由功能
    backbone.history.start();
});