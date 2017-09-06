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
            if (d.code == 200) {
                var list = d.list;
                var innerHtml = "";
                for (var i = 0; i < list.length; i++) {
                    console.log(list[i]);
                    laytpl(fillItem.innerHTML).render(list[i], function (html) {
                        innerHtml = innerHtml + html;
                    })
                }
                $(".lottery-list").html(innerHtml);
            }
        })
        var token = getCookie("token");
        if(token){
            $.post(base+"/user/manager/details",{
                token:token
            },function(d){
                if(d.code == 200){
                    var name = d.data.name;
                    var headerLoginHtml = "欢迎用户";
                    if(!name){
                        name = "……"
                    }else{

                    }

                    headerLoginHtml = headerLoginHtml + name;

                    $(".header-nav-left").html(headerLoginHtml);


                    $(".header-nav-right .out-login").html("<a href='#' onclick='outLogin()'>退出</a>");

                }
            })
        }

    })
});

function outLogin(){
    delCookie("token");
    window.location.reload();
}