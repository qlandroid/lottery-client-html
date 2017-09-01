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
            console.log(d);
        })


    })
})