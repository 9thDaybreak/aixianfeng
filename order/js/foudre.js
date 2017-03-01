define(["jquery"], function ($) {
    let obj = {};
    obj.reqData = function () {
        // 热销榜
        $.ajax({
            type: "GET",
            async: true,
            url: "./lib/json/hotSell.json",
            success: function (data) {
                let $article = $(".article"),
                    $article_content = $("<ul class='article_content'></ul>");
                data["data"].map(function (element) {
                    let $li = $("<li></li>"),
                        $figure = $("<figure class='article_content_list'></figure>"),
                        $figure_div = $("<div class='article_content_list_left'><img src='" + element["img"] + "'></div>"),
                        $figcaption = $("<figcaption class='article_content_list_right'></figcaption>"),
                        $p_name = $("<p class='p_name'>" + element["name"] + "</p>"),
                        $p_desc = $("<p class='p_desc'><span>精选</span><span>" + element["pm_desc"] + "</span></p>"),
                        $p_specifics = $("<p class='p_specifics'>" + element["specifics"] + "</p>"),
                        $p_num = $("<p class='p_num'><span class='price'>¥" + element["price"] + "</span>&nbsp;<b class='market_price'>¥" + element["market_price"] + "</b></p>"),
                        $addOrSub = $(" <div class='addOrSub'><i>-</i><span></span><i>+</i></div>");
                    $figcaption.append($p_name).append($p_desc).append($p_specifics).append($p_num);
                    $figure.append($figure_div).append($figcaption);
                    $li.append($figure).append($addOrSub);
                    $article_content.append($li);
                });
                $article.html("");
                $article.append($article_content);
            }
        });
    };
    return obj;
});