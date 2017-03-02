define(["jquery", "lazyload"], function ($) {
    let obj = {};
    obj.reqData = function () {
        // 热销榜
        $.ajax({
            type: "GET",
            async: true,
            url: "./lib/json/apiyuding.json",
            success: function (data) {
                let $main = $(".main");
                data.product.map(function (element) {
                    let $section = $("<section class='section'></section>"),
                        $section_img = $("<div class='section_img'><img class='lazy' data-original='" + element["img"] + "' width='3.4375rem' height='3.4375rem'></div>"),
                        $shoppingCart = $("<div class='shoppingCart'></div>"),
                        $section_other;
                    if (element["price"] === element["market_price"]) {
                        $section_other = $("<div class='section_other'><p class='p_name'>" + element["name"] + "</p><p class='price'><i>¥</i>" + element["price"] + "</p></div>");
                    } else {
                        $section_other = $("<div class='section_other'><p class='p_name'>" + element["name"] + "</p><p class='price'><i>¥</i>" + element["price"] + "<span>¥" + element["market_price"] + "</span></p></div>");
                    }
                    $section.append($section_img).append($section_other).append($shoppingCart);
                    $main.append($section);

                    $("img.lazy").lazyload({
                        threshold: 200, // 提前开始加载
                        container: $(".main"),  // 对某容器中的图片实现效果
                        placeholder: "./public/img/loding.jpg", //用图片提前占位
                    });
                });
            }
        });
    };
    return obj;
});