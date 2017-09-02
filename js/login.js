/**
 * Created by android on 2017/8/31.
 */
$(document).ready(function(){
   layui.use(['layer'],function () {
       var layer = layui.layer;

       $("#btnLogin").on('click',function () {

           var url = base+"/user/manager/login";

           $.ajax({
               url:url
               ,data:{
                   account:$("#account").val()
                   ,pw:$("#pw").val()
               }
               ,type:"post"
               ,dataType:"json"
               ,success:function (d) {
                   if(d.code == 200){
                       var token = d.data.token;
                       setCookie("token",token);
                       window.location.href = "main.html";
                   }else {
                       layer.msg(d.code + "---" +d.message);
                   }
               }
               ,error:function(){
                   alert("错误")
               }
           });

       })
   })
});