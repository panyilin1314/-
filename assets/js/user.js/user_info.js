$(function () {
    // 验证内容
    layui.form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        email: [
            /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            , '邮箱格式错误'
        ]
    });
    getUserInfo();
    // 获取初始资料
    function getUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg('获取失败');
                // 快速表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        });
    }

    $('button[type="reset"]').on('click', function () {
        getUserInfo()
        return false;
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg('获取失败');
                layer.msg('修改成功');
                window.parent.getUserinfo();
            }
        });
    })
})