/**
 * Created by android on 2017/8/31.
 */
var layer;
var timerTransform;
$(document).ready(function () {
    layui.use(['layer'], function () {
        layer = layui.layer;

        $("#btnLogin").on('click', function () {
            if (!checkAccount()) {
                return false;
            }
            if (!checkPw()) {
                return false;
            }
            var url = base + "/user/manager/login";

            $.ajax({
                url: url
                , data: {
                    account: $("#account").val()
                    , pw: $("#pw").val()
                }
                , type: "post"
                , dataType: "json"
                , success: function (d) {
                    if (d.code == 200) {
                        var token = d.data.token;
                        setCookie("token", token);
                        window.location.href = "main.html";
                    } else {
                        errorHint(d.code + "---" + d.message);
                    }
                }
                , error: function () {
                    alert("错误");
                }
            });

        })
        $("#btnPw").on("click", function () {
            if (isTransforming) {
                return
            }
            isToShowLogin = false;
            isTransforming = true;
            timerTransform = setInterval("loginTransForm();", 10);
        });
        $("#toShowLogin").on("click", function () {
            if (isTransforming) {
                return;
            }
            isTransforming = true;
            isToShowLogin = true;
            timerTransform = setInterval("loginTransForm();", 10);
        })
    })
});
function errorHint(hint) {
    $("#regErrorHint").html(hint);
}

function checkAccount() {
    var account = $("#account").val();
    if (account.trim().length < 6) {
        var e = "账号长度必须大于6个字符";
        layer.tips(e, '#account', {tips: [1, '#ff4828']});
        errorHint(e);
        return false;
    }

    var ma = /^[A-Za-z][A-Za-z0-9_-]+$/;
    if (!ma.test(account)) {
        var e2 = "账号格式不正确，首字符必须为a-zA-Z可包含符号'-''_'";
        layer.tips(e2, '#account', {
            tips: [1, '#ff4828']
        });
        errorHint(e2);
        return false;
    }

    return true;
}

function checkPw() {
    var pw = $("#pw").val();
    if (pw.trim().length < 6) {
        var e = "密码长度不能小于6";
        layer.tips(e, "#pw", {tips: ['1', '#ff4828']})
        errorHint(e);
        return false;
    }

    return true;
}
var i = 0;
var isToShowLogin = true;
var isTransforming = false;
function loginTransForm() {
    if (i >= 180) {
        window.clearInterval(timerTransform);
        isTransforming = false;
        i = 0;
        return
    }
    i = i + 1;
    if (i >= 90) {
        if (!isToShowLogin) {
            $(".login").addClass("layui-hide");
            $(".reg").removeClass("layui-hide");
        } else {
            $(".reg").addClass("layui-hide");
            $(".login").removeClass("layui-hide");
        }

        $(".login-transform").css(getTransformCss(180 - i));
    } else {
        $(".login-transform").css(getTransformCss(i));
    }

}
function getTransformCss(i) {
    return {
        "-webkit-transform": "rotateY(" + i + "deg)",
        "-moz-transform": "rotateY(" + i + "deg)",
        "-ms-transform": "rotateY(" + i + "deg)",
        "-o-transform": "rotateY(" + i + "deg)",
        "transform": "rotateY(" + i + "deg)"
    };
}

