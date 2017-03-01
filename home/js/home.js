define(["jquery", "swiper"], function ($) {
    let obj = {};
    obj.reqData = function () {
        $.ajax({
            type: "GET",
            url: "./lib/json/apihome.json",
            async: true,
            success: function (req) {
                let $warpper = $(".swiper-wrapper"),
                    $channelUl = $(".channel ul"),
                    // 轮播图
                    fragmentBanner = document.createDocumentFragment(),
                    // 菜单
                    fragmentChannel = document.createDocumentFragment();
                // 处理轮播图数据
                req.data["slide"].map(function (element, index) {
                    let $li = $("<div class='swiper-slide'></div>").css("background-image", "url('" + element["activity"]["img"] + "')");
                    $(fragmentBanner).append($li);
                });
                $warpper.append($(fragmentBanner));
                let mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,//可选选项，自动滑动
                    pagination: '.swiper-pagination',
                    loopAdditionalSlides: 1,
                    loop: true,
                    autoplayDisableOnInteraction: false
                });

                // 处理菜单数据
                req.data["menu"].map(function (element, index) {
                    let $li = $("<li><a href='javascript:void(0);' style='background-image: url(" + element["activity"]["img"] + ")'>" + element["activity"]["name"] + "</a></li>");
                    $(fragmentChannel).append($li);
                });
                $channelUl.append($(fragmentChannel));
            }
        });
    };
    return obj;
});