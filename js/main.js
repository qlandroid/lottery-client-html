/**
 * Created by mrqiu on 2017/8/27.
 */
$(document).ready(function () {
    layui.use(['layer', 'laytpl'], function () {
        var layer = layui.layer;
        var laytpl = layui.laytpl;
        var url = base + "/a/fill/list";
        /**
         * {"code":200,"total":1,"list":
         * [{"lotteryFillOpenId":8,"lotteryFillCreaterDate":1503814720000,"
         * fillLBi":11.00000,"awardLBi":10.00000,
         * "lotteryRemark":"积分数量满足11积分即进行抽奖，中奖用户返还10积分。",
         * "lotteryClzzId":11,"lotteryName":"满11返10积分",
         * "lotteryRule":"积分数量满足11积分即进行抽奖，中奖用户返还10积分。",
         * "lotteryType":"0","buyQty":1}]}
         */
        $.post(url, {
            page:1,
            pageSize:20,
            lotteryTypeId:10
        }, function (d) {
            console.log(d);
            if (d.code == 200) {
                console.log(d);
                var list = d.list;
                var innerHtml = "";
                for (var i = 0; i < list.length; i++) {
                    laytpl(fillItem.innerHTML).render(list[i], function (html) {
                        innerHtml = innerHtml + html;
                    })
                }
                $(".lottery-list").html(innerHtml);
            }
        })
    })
});