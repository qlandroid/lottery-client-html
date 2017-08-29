/**
 * Created by mrqiu on 2017/8/29.
 */
$(document).ready(function(){
    layui.use(['layer'],function(){
        var layer = layui.layer;
        var detailsUrl = base + "/a/fill/details";
        var fillId =GetQueryString("id");
        $.post(detailsUrl ,{
            lotteryFillOpenId:fillId
        },function(data){
            if (data.code == 200){
                /**
                 * Object
                 awardLBi
                 :
                 10
                 createUserId
                 :
                 5
                 fillLBi
                 :
                 11
                 lotteryFillCreaterDate
                 :
                 1503814720000
                 lotteryFillName
                 :
                 "满11返10积分"
                 lotteryFillOpenId
                 :
                 8
                 lotteryFillUnitPrice
                 :
                 1
                 lotteryStage
                 :
                 "fill201708270000005"
                 lotteryTypeId
                 :
                 10
                 sendStatus
                 :
                 "0"
                 */
                var d = data.data;
                $("#lotteryTitle").html(d.lotteryFillName);
                $("#lotteryStage").html(d.lotteryStage);
                $("#lotteryTotal").html(d.totalQty);
                $("#priceUnit").html(d.lotteryFillUnitPrice);
                console.log(data);
            }else{
                layer.msg(data.message,function(){});
            }
        })

        $('#btnBuyLottery').on('click',function(){
            var buyQty = $("buyQty").val();
            var id = GetQueryString("id");
            $.post(base + "/fill")
        })
    })
})