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
                console.log(data)
                var d = data.data;
                console.log(d);
                $("#lotteryTitle").html(d.lotteryFillName);
                $("#lotteryStage").html(d.lotteryStage);
                $("#lotteryTotal").html(d.totalQty);
                $("#lotteryCanBugQty").html(d.overBuyQty)
                $("#priceUnit").html(d.lotteryFillUnitPrice);
            }else{
                layer.msg(data.message,function(){});
            }
        });

        $("#putQty").on("focus",function(){


        });


        var index ;
        $('#btnBuyLottery').on('click',function(){
            var token = getCookie("token");
            console.log(token);
            if (!token){
                layer.msg("请登陆",function(){});
                return
            }

            //询问框
            var confirm =layer.confirm('确定要支付'+$("#inputQty").val()+'积分吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                //loading层
                layer.close(confirm);
                index = layer.load(1, {
                    shade: [0.1,'#4f3800'] //0.1透明度的白色背景
                });

               createManifest();
            }, function(){

            });
        });

        function createManifest(){
            $.post(base+"/fill/user/createManifest",{
                fillId:GetQueryString("id"),
                payQty:$("#inputQty").val(),
                token:getCookie("token")
            },function(d){
                layer.close(index);
                if(d.code==200){
                    //询问框
                    window.open("manifest_pay.html?expendDocNo="+d.data.docNo);
                    var confirm =layer.confirm('支付是否完成', {
                        btn: ['支付完成','取消支付',"支付出现问题"] //按钮
                    }, function(){
                        //loading层
                        layer.close(confirm);


                    }, function() {
                        alert("取消支付")
                    },function () {
                        alert("支付出现问题");
                    });

                }else{
                    layer.msg(d.message,function(){});
                }
            })
        }
    })
})
function  inputQtyChange(){
    alert("输入了了")
}

