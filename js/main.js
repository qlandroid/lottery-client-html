/**
 * Created by mrqiu on 2017/8/27.
 */
$(document).ready(function(){
    layui.use(['layer'],function(){
        var layer = layui.layer;

        $(".btn-login").on("click",function(){
            var account =$("#account").val();
            var pw = $("#pw").val();
            if(!account){
                $("#account").focus();
                layer.msg("请填写账号");
                return false;
            }

            if(!pw){
                $("#pw").focus();
                layer.msg("请填写密码");
                return false;
            }
            $.post(base +"/userClient/operate/login",{
                account:account,
                pw:pw
            },function(data){
                if(data.code == 200){
                    layer.msg("登陆成功");
                }else{
                    layer.msg(data.message,function(){});
                }
            })
        })

    })
});