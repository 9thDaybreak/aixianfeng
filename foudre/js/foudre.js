define(["jquery", "lazyload"], function ($) {
    let obj = {};
    // 添加数据
    obj.reqData = function () {
        // 热销榜
        $.ajax({
            type: "GET",
            async: true,
            url: "./lib/json/热销榜.json",
            dataType: "json",
            success: function (data) {
                let $article_content = $("<ul class='article_content 热销榜'></ul>");
                // 处理数据,添加到 ul 中
                data["data"].map(function (element) {
                    let $li = $("<li class='" + element["id"] + "'></li>"),
                        li1 = `<figure class='article_content_list'>
                                <div class='article_content_list_left'>
                                    <img class='lazy' data-original='${element["img"]}' width='2.7813rem' height='2.7813rem'>
                                </div>
                                <figcaption class='article_content_list_right'>
                                    <p class='p_name'>${element["name"]}</p>`,
                        li2 = element["pm_desc"] ? `<p class='p_desc'><span>精选</span><span>${element["pm_desc"]}</span></p>` : `<p class='p_desc'><span>精选</span></p>`,
                        li3 = `<p class='p_specifics'>${element["specifics"]}</p>
                               <p class='p_num'><span class="price">¥${element["price"]}</span>&nbsp;<b class="market_price">¥${element["market_price"]}</b></p>
                               <div class="addOrSub">
                                <i></i><span></span><i></i>
                               </div>
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
                getLocalStorage("热销榜");
                addShop($(".addOrSub"));
            }
        });
    };
    // 点击左侧列表更改右侧列表数据
    obj.init = function () {
        let $asideUl = $(".aside ul");
        // 给 ul 添加事件托管
        $asideUl.on("click", function (event) {
            // 确认事件对象不为 ul
            if (event.target !== $asideUl[0]) {
                // 左侧更改样式
                $(".leftColor").removeClass("leftColor");
                $(event.target).attr("class", "leftColor");

                // 获取事件对象 text
                let text = $(event.target).html(),
                    $text = $("." + text);
                if ($text.length === 0) {
                    // 如果数据不存在，则调用 ajax
                    $.ajax({
                            type: "GET",
                            async: true,
                            url: "./lib/json/" + text + ".json",
                            dataType: "json",
                            success: function (data) {
                                // 是否获取到数据
                                let $article_content = $("<ul class='article_content " + text + "'></ul>");
                                data["data"].map(function (element) {
                                    let $li = $("<li class='" + element["id"] + "'></li>"),
                                        li1 = `<figure class='article_content_list'>
                                                <div class='article_content_list_left'>
                                                    <img class='lazy' data-original='${element["img"]}' width='2.7813rem' height='2.7813rem'>
                                                </div>
                                                <figcaption class='article_content_list_right'>
                                                <p class='p_name'>${element["name"]}</p>`,
                                        li2 = element["pm_desc"] ? `<p class='p_desc'><span>精选</span><span>${element["pm_desc"]}</span></p>` : `<p class='p_desc'><span>精选</span></p>`,
                                        li3 = `<p class='p_specifics'>${element["specifics"]}</p>
                                               <p class='p_num'><span class="price">¥${element["price"]}</span>&nbsp;<b class="market_price">¥${element["market_price"]}</b></p>
                                               <div class="addOrSub">
                                               <i></i><span></span><i></i>
                                               </div>
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
                                getLocalStorage(text);
                                addShop($("." + text + " .addOrSub"));
                                $(".article_content").css("display", "none");
                                $("." + text).css("display", "block");
                            },
                            error: function () {
                                let $article_content = $("<ul class='article_content " + text + "'></ul>");
                                $(".article").append($article_content);
                                $(".article_content").css("display", "none");
                                $("." + text).css("display", "block");
                            }
                        }
                    );
                } else {
                    // 如果数据存在则将数据显示
                    $(".article_content").css("display", "none");
                    $text.css("display", "block");
                }
            }
        });
    };

    function getLocalStorage(text) {
        // 加载时调用数据库
        let storage = window.localStorage,
            data = JSON.parse(storage.getItem(text));
        for (let key in data) {
            let addOrSub = $("." + text + " ." + key + " .addOrSub");
            addOrSub.children().eq(0).css("visibility", "visible");
            addOrSub.children().eq(1).html(data[key].num);
            addOrSub.children().eq(2).css("background-image", "url('./public/img/add.png')");
        }
    }

    // 给加号减号添加点击事件
    function addShop($addOrSub) {
        $addOrSub.on("click", function (event) {
            if (event.target !== this) {
                let $sub = $(this).children().eq(0),
                    $num = $(this).children().eq(1),
                    $add = $(this).children().eq(2),
                    // 获取仓库
                    storage = window.localStorage,
                    // 类目名
                    mark = $(this.parentNode.parentNode.parentNode.parentNode).attr("class").slice(16),
                    // id
                    id = $(this.parentNode.parentNode.parentNode).attr("class"),
                    // 需要存储的数据
                    name = this.parentNode.firstElementChild.innerHTML,
                    price = this.previousElementSibling.firstElementChild.innerHTML,
                    img = $(this.parentNode.previousElementSibling.firstElementChild).attr("data-original"),
                    // 从本地获取到数据
                    data = JSON.parse(storage.getItem(mark)) || {},
                    $mark = $(".mark"),
                    $markNum = +$mark.html();
                // 触发加号时的情况
                if (event.target === $add[0]) {
                    // 如果 span 是否为零
                    if ($num.html() === "") {
                        $sub.css("visibility", "visible");
                        $add.css("background-image", "url('./public/img/add.png')");
                        $num.html("1");
                        data[id] = {
                            name: name,
                            price: price,
                            img: img,
                            num: 1,
                        };
                    } else {
                        let value = +$num.html();
                        $num.html(++value);
                        data[id].num++;
                    }
                    $mark.html(++$markNum);
                }
                // 触发减号时的情况
                if (event.target === $sub[0]) {
                    if ($num.html() === "1") {
                        $sub.css("visibility", "hidden");
                        $add.css("background-image", "url('./public/img/add0.png')");
                        $num.html("");
                        delete data[id];
                    } else {
                        let value = +$num.html();
                        $num.html(--value);
                        data[id].num--;
                    }
                    $mark.html(--$markNum);
                }
                // 将修改后的数据存入服务器中
                storage.setItem(mark, JSON.stringify(data));
            }
        });
    }

    return obj;
});