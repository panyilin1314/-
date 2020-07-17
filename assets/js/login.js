$(function () {
    // 登录事件
    $('#linkreg').on('click', function () {
        $('.loginBox').hide();
        $('.regBox').show();
    })
    // 注册事件
    $('#linklogin').on('click', function () {
        $('.regBox').hide();
        $('.loginBox').show();
    })
    // 监听注册提交事件
    $('#regForm').on('submit', function (e) {
        let password = $('.regBox [name="password"]').val();
        let username = $('.regBox [name="username"]').val();
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username,
                password
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('.regBox [name="password"]').val('');
                $('.regBox [name="username"]').val('');
                $('.regBox [name="repassword"]').val('');

                $('#linklogin').click()
            }
        });
        // return false;
    })
    // 监听登录提交事件
    $('#loginForm').on('submit', function () {
        // return false;
        
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message + '账号密码错误');
                layer.msg(res.message);
                localStorage.setItem('token',res.token)
                // 跳转后台主页
                // console.log(location.href);
                location.href='/index.html'
            }
        });
        return false;
    })


    // 正则判断
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
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ], 
        repass: function () {
            let val = $('.regBox [name="password"]').val();
            let reVal = $('.regBox [name="repassword"]').val();
            // console.log(val, reVal);
            if (val != reVal) {
                return '两次密码不相同'
            }
        }

    })

})
