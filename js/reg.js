/**
 * Created by android on 2017/9/8.
 */
var accountPattern = /^[A-Za-z][A-Za-z0-9_-]+$/;//账号的正则表达式
layui.use(['form', 'layer'], function () {
    var form = layui.form;
    $(".input-pw").on("blur", function () {
        var type = $(this).data("type");
        active[type]?active[type].call(this):'';
    });
    var active = {
        pw1:function(){
            var pw1 = $("#pw1").val();
            if(pw1.trim().length <6){
                pw1HintHtml("密码长度必须大于6位");
            }else{
                removeHint("#pw1Hint");
            }
        },
        pw2:function () {
            var pw1 = $("#pw1").val();
            var pw2 = $("#pw2").val();
            var type = $(this).data("type");
            if (pw2.trim().length != 0) {
                if ($(this).val() == pw1 && $(this).val() == pw2) {
                    removeHint("#pw2Hint");
                } else {
                    pw2HintHtml("两次输入密码不匹配");
                }
            }
        }
    }

    var accountPattern = /^[A-Za-z][A-Za-z0-9_-]+$/;//账号的正则表达式
    $("#reset").on("click", function () {
        replace();
    });
    $("#account").on("blur",function () {
        var account = $(this).val();
        checkAccount(account);
    });
    $("#btnSubmit").on('click', function () {
        var pw1 = $('#pw1').val(),
            pw2 = $('#pw2').val(),
            account = $("#account").val(),
            params = {};
        if(!checkAccount(account)){
            return false;
        }

        if (pw1.trim().length < 6) {
            pw1HintHtml("密码长度不能小于6");
            return false;
        }

        if (pw1 != pw2) {
            regHintHtml();
            return false;
        }
        params.account = account;
        params.pw = pw1;

        $.post(base + "/user/manager/reg", params, function (d) {
            if (d.code == 200) {
                console.log("注册成功---- " + d);
                removeHint("#regHint");
            } else {
                regHintHtml(d.code + "---" + d.message);
            }
        });
    })
});

function checkAccount(account){
    if (!account || account.trim().length == 0) {
        accountHintHtml("必须填写账号");
        return false;
    } else if (!accountPattern.test(account)) {
        accountHintHtml("首位必须为字符型，符号只能包含'_'和'-'");
        return false;
    } else if(account.trim().length <6){
        accountHintHtml("账号长度必须大于6个字符");
        return false;
    }else {
        $("#accountHint").addClass("layui-hide");
        return true;
    }
}

function replace() {
    $("#account").val("");
    $("#pw1").val("");
    $("#pw2").val("");
    $(".error-hint").addClass("layui-hide");
}
/**
 * 账号错误提示信息
 */
function accountHintHtml(hint) {
    $("#accountHint").removeClass("layui-hide");
    $("#accountHint").html(hint);
}
function pw1HintHtml(hint) {
    $("#pw1Hint").removeClass("layui-hide");
    $("#pw1Hint").html(hint);
}
function pw2HintHtml(hint) {
    $("#pw2Hint").removeClass("layui-hide");
    $("#pw2Hint").html(hint);
}

function removeHint(id){
    $(id).addClass("layui-hide");
}

/**
 * 错误提示信息
 */
function regHintHtml(hint) {
    $("#regHint").removeClass("layui-hide");
    $("#regHint").html(hint);
}
function hideRegHintHtml() {
    $("#regHint").addClass("layui-hide");
}
