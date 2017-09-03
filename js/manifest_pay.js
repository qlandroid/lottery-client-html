/**
 * Created by android on 2017/9/1.
 */

$(document).ready(function () {
    layui.use(['layer'],function () {
        var layer = layui.layer;

        var docNo = GetQueryString("expendDocNo");
        if (!docNo){
            layer.msg("没有任务单据号");
            return;
        }

        var detailsUrl = base + "/fill/user/manifest/details";
        $.post(detailsUrl,{
            expendDocNo:docNo
            ,token:getCookie("token")
        },function(d){
            if(d.code == 200){
                var data = d.data;

                $("#docNo").html(data.docNo);
                $("#docNo").data("docNo",data.docNo);
                $("#fillName").html(data.fillName);
                $("#payMoney").html(data.payMoney);
            }else{
                layer.msg(d.message);
            }
        });
        $("#btnPay").on("click",function(){
            var pw = $("#inputPw").val();
            if(!pw){
                layer.msg("请输入密码",function(){});
                return
            }
            var payUrl = base +"/fill/user/payMoney";
            $.post(payUrl,{
                payPw:$("#inputPw").val()
                ,expendDocNo:$("#docNo").data("docNo")
                ,token:getCookie("token")
            }, function (d) {
                if(d.code == 200){
                    layer.msg("支付成功");
                    window.location.href = "over_pay_money.html";
                }else{
                    layer.msg(d.code +"--" + d.message,function(){});
                }
            })
        })


    })
})