$(function () {
   let layer=layui.layer
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
        ],
        samepass: function () {
            if ($('[name="newPwd"]').val() == $('[name="oldPwd"]').val()) {
                return '不能和原密码一样'
            }
        },
        repass: function () {
            if ($('[name="newPwd"]').val() != $('[name="reNewPwd"]').val()) {
                return '两次密码不一样，请再次确认新密码！'
            }
        }
    })
    
    $('.layui-form').on('submit', function (e) {
        // console.log(111);
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layer.msg('更新失败');
                layer.msg(res.message);
                $('.layui-form')[0].reset()
            }
        });

    })
})