$.ajax({
    type: "GET",
    url: "../lib/json/apimiaosha.json",
    async: true,
    success: function (req) {
        req.product.map(function (element) {
            let content = "",
                $ul = $(".active_list");
            if (element.enable) {
                content = `<li>
                            <div class="list_img">
                                <img class="lazy" data-original="${element['img']}" width="4.5000rem" height="100%">
                            </div>
                            <div class="list_detail">
                                <p>${element["name"]}</p>
                                <p>${element["specifics"]}</p>
                                <p><i>¥</i><span>${element["price"]}</span>/原价:${element["market_price"]}元</p>
                                <p>${element["btnText"]}</p>    
                            </div>
                           </li>`;
            } else {
                content = `<li>
                            <div class="list_img">
                                <img class="lazy" data-original="${element['img']}" width="4.5000rem" height="100%">
                            </div>
                            <div class="list_detail">
                                <p>${element["name"]}</p>
                                <p>${element["specifics"]}</p>
                                <p><i>¥</i><span>${element["price"]}</span>/原价:${element["market_price"]}元</p>
                                <p class="false">${element["btnText"]}</p>    
                            </div>
                           </li>`;
            }
            $ul.append(content);
            $("img.lazy").lazyload({
                threshold: 200, // 提前开始加载
                container: $(".main"),  // 对某容器中的图片实现效果
                placeholder: "../public/img/loding.jpg", //用图片提前占位
            });
        });
    }
});

