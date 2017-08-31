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



        $('#btnBuyLottery').on('click',function(){
            //询问框
            var confirm =layer.confirm('确定要支付'+$("#inputQty").val()+'积分吗？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                //loading层
                layer.close(confirm);
                var index = layer.load(1, {
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
                if(d.code==200){
                    layer.msg(d.data.docNo,function(){});
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

