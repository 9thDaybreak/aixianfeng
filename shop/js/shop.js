define(["jquery"], function () {
    let obj = {};
    obj.init = function () {
        let storage = window.localStorage,
            $total = $(".total"),
            num = 0,
            $allBull = $(".allBull");
        // 从 localstorage 中获取数据
        for (let key in storage) {
            if (storage.getItem(key)[0] === "{") {
                let classes = JSON.parse(storage.getItem(key));
                for (let i in classes) {
                    let div = `<div class="shopChioce">
                                <span class="enter"></span>
                                <img src="${classes[i].img}">
                                <div class="title">
                                    <div class="name">${classes[i].name}</div>
                                    <div class="price">${classes[i].price}元</div>
                                </div>
                                <div class="count" id="${classes[i].id}" mark="${classes[i].mark}">
                                    <b>-</b>
                                    <span class="num">${classes[i].num}</span>
                                    <b>+</b>
                                </div>
                               </div>`;
                    $total.append(div);
                    num += +classes[i].price.slice(1) * +classes[i].num;
                }
            }
        }
        $allBull.html("¥" + num.toFixed(1) + "元");
        $(".count").on("click", function (event) {
            let $add = $(this).children().eq(2),
                $num = $(this).children().eq(1),
                $sub = $(this).children().eq(0),
                mark = $(this).attr("mark"),
                id = $(this).attr("id"),
                storage = window.localStorage,
                money = +$(this).prev().children().eq(1).html().slice(1).slice(0, -1),
                totalMoney = +$allBull.html().slice(1).slice(0, -1),
                obj = JSON.parse(storage.getItem(mark)),
                totalNumber = +$(".mark").html();
            // 触发减号的情况
            if (event.target === $sub[0]) {
                let num = +$num.html();
                // 如果 num 为零则直接删除整个元素
                if (num === 1) {
                    $(this.parentNode).remove();
                } else {
                    $num.html(--num);
                }
                // 从数据库中删除数据
                obj[id].num = obj[id].num === 1 ? delete obj[id] : --obj[id].num;
                // 更改总价
                $allBull.html("¥" + (totalMoney - money).toFixed(1) + "元");
                // 保存数据库
                storage.setItem(mark, JSON.stringify(obj));
                if (totalNumber === 1) {
                    $(".mark").css("display", "none").html("");
                } else {
                    $(".mark").html(--totalNumber);
                }
            }
            // 触发加号的情况
            if (event.target === $add[0]) {
                let num = +$num.html();
                $num.html(++num);
                // 从数据库中删除数据
                obj[id].num = ++obj[id].num;
                // 更改总价
                $allBull.html("¥" + (totalMoney + money).toFixed(1) + "元");
                // 保存数据库
                storage.setItem(mark, JSON.stringify(obj));
                $(".mark").html(++totalNumber);
            }
        });
        $(".shopChioce .enter").on("click", function () {
            let money = +$(this).next().next().children().eq(1).html().slice(1).slice(0, -1),
                num = +$(this).next().next().next().children().eq(1).html(),
                total = +$(".allBull").html().slice(1).slice(0, -1),
                markNum = +$(".mark").html();
            if ($(this).attr("class").indexOf("noEnter") === -1) {
                // 取消选中
                $(this).addClass("noEnter");
                $(".shopDownOrder .enter").addClass("noEnter");
                $(".allBull").html("¥" + (total - (num * money)).toFixed(1) + "元");
                $(".mark").html(markNum - num);
            } else {
                $(this).removeClass("noEnter");
                $(".allBull").html("¥" + (total + (num * money)).toFixed(1) + "元");
                $(".mark").html(markNum + num);
            }
            if ($(".shopChioce .enter").attr("class").indexOf("noEnter") === -1) {
                $(".shopDownOrder .enter").removeClass("noEnter");
            }
        });
        let temp;
        $(".shopDownOrder .enter").on("click", function () {
            let $allBull = $(".allBull");
            if ($(this).attr("class").indexOf("noEnter") === -1) {
                $(this).addClass("noEnter");
                $(".shopChioce .enter").addClass("noEnter");
                temp = $allBull.html();
                $allBull.html("¥0.0元");
                $(".mark").css("display", "none");
            } else {
                $(this).removeClass("noEnter");
                $(".shopChioce .enter").removeClass("noEnter");
                $allBull.html(temp);
                $(".mark").css("display", "flex");
            }
        });
    };
    return obj;
});