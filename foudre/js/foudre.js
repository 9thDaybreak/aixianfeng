define(["jquery", "lazyload"], function ($) {
    let obj = {};
    obj.reqData = function () {
        // 热销榜
        $.ajax({
            type: "GET",
            async: true,
            url: "./lib/json/热销榜.json",
            dataType: "json",
            success: function (data) {
                let $article_content = $("<ul class='article_content 热销榜'></ul>");
                data["data"].map(function (element) {
                    let $li = $("<li></li>"),
                        li1 = `<figure class='article_content_list'>
                                <div class='article_content_list_left'>
                                    <img class='lazy' data-original='${element["img"]}' width='2.7813rem' height='2.7813rem'>
                                </div>
                                <figcaption class='article_content_list_right'>
                                    <p class='p_name'>${element["name"]}</p>`,
                        li2 = element["pm_desc"] ? `<p class='p_desc'><span>精选</span><span>${element["pm_desc"]}</span></p>` : `<p class='p_desc'><span>精选</span></p>`,
                        li3 = `<p class='p_specifics'>${element["specifics"]}</p>
                               <p class='p_num'><span class="price">${element["price"]}</span>&nbsp;<b class="market_price">${element["market_price"]}</b></p>
                                </figcaption>
                             </figure>`;
                    $li.html(li1 + li2 + li3);
                    $article_content.append($li);
                });
                $(".article").append($article_content);
                // 懒加载插件
                $("img.lazy").lazyload({
                    threshold: 200, // 提前开始加载
                    container: $(".article_content"),  // 对某容器中的图片实现效果
                    placeholder: "./public/img/loding.jpg", //用图片提前占位
                });
            }
        });
    };
    obj.init = function () {
        let $asideUl = $(".aside ul");
        $asideUl.on("click", function (event) {
            $(".leftColor").removeClass("leftColor");
            $(event.target).attr("class", "leftColor");
            let text = $(event.target).html();
            if (text === "优选水果" || text === "天天特价" || text === "牛奶面包" || text === "热销榜") {
                if ($("." + text).length === 0) $.ajax({
                    type: "GET",
                    async: true,
                    url: "./lib/json/" + text + ".json",
                    dataType: "json",
                    success: function (data) {
                        let $article_content = $("<ul class='article_content " + text + "'></ul>");
                        data["data"].map(function (element) {
                            let $li = $("<li></li>"),
                                li1 = `<figure class='article_content_list'>
                                <div class='article_content_list_left'>
                                    <img class='lazy' data-original='${element["img"]}' width='2.7813rem' height='2.7813rem'>
                                </div>
                                <figcaption class='article_content_list_right'>
                                    <p class='p_name'>${element["name"]}</p>`,
                                li2 = element["pm_desc"] ? `<p class='p_desc'><span>精选</span><span>${element["pm_desc"]}</span></p>` : `<p class='p_desc'><span>精选</span></p>`,
                                li3 = `<p class='p_specifics'>${element["specifics"]}</p>
                               <p class='p_num'><span class="price">${element["price"]}</span>&nbsp;<b class="market_price">${element["market_price"]}</b></p>
                                </figcaption>
                             </figure>`;
                            $li.html(li1 + li2 + li3);
                            $article_content.append($li);
                        });
                        $(".article").append($article_content);
                        // 懒加载插件
                        $("img.lazy").lazyload({
                            threshold: 200, // 提前开始加载
                            container: $("." + text),  // 对某容器中的图片实现效果
                            placeholder: "./public/img/loding.jpg", //用图片提前占位
                        });
                        $(".article_content").css("display", "none");
                        $("." + text).css("display", "block");
                    }
                });
                $(".article_content").css("display", "none");
                $("." + text).css("display", "block");
            } else {
                let $article_content = $("<ul class='article_content " + text + "'></ul>");
                $(".article").append($article_content);
            }
        });
    };
    return obj;
});