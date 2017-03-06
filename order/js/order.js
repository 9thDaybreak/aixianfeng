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
                    let $section = $("<section class='section' id='" + element["id"] + "'></section>"),
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
                addShop($(".shoppingCart"));
            }
        });
    };

    // 给购物号添加点击事件
    function addShop($shoppingCart) {
        $shoppingCart.on("click", function (event) {
                // 获取仓库
                let storage = window.localStorage,
                    // 类目名
                    mark = "新鲜预定",
                    // id
                    id = $(this.parentNode).attr("id"),
                    // 需要存储的数据
                    name = this.previousElementSibling.firstElementChild.innerHTML,
                    price = this.previousElementSibling.lastElementChild.firstChild.nextSibling,
                    img = $(this.previousElementSibling.previousElementSibling.firstChild).attr("data-original"),
                    // 从本地获取到数据
                    data = JSON.parse(storage.getItem(mark)) || {},
                    $mark = $(".mark"),
                    $markNum = +$mark.html();
                // 判断该类目是否存在
                if (data[id]) {
                    data[id].num++;
                } else {
                    data[id] = {
                        name: name,
                        price: price,
                        img: img,
                        num: 1
                    };
                }
                $mark.html(++$markNum);
                // 将修改后的数据存入服务器中
                storage.setItem(mark, JSON.stringify(data));
            }
        );
    }

    return obj;
});