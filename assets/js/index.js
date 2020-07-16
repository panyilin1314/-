$(function () {

    getUserinfo()


    // ---------这个坑一定要记住不能写在里面！！！！----------
    // // 获取用户信息
    // function getUserinfo() {
    //     $.ajax({
    //         type: "get",
    //         url: "/my/userinfo",
    //         data: "data",
            
    //         success: function (res) {
    //             // console.log(res);
    //             if (res.status != 0) return layer.msg('获取失败');
    //             // 渲染函数头像
    //             renderAvatar(res.data);
    //         },
    //     });
    // }
    // // 渲染头像函数
    // function renderAvatar(data) {
    //     // 渲染名字
    //     var uname = data.nickname || data.username;
    //     $('#welcome').html(`欢迎&nbsp;${uname}`)
    //     // 渲染头像
    //     if (data.user_pic != null) {
    //         $('.layui-nav-img').prop('src', data.user_pic);
    //         $('.textAvatar').hide()
    //     } else {
    //         let firstText = uname[0].toUpperCase()
    //         $('.layui-nav-img').hide()
    //         $('.textAvatar').show().html(firstText)
    //     }
    // }
    // 退出功能
    $('#close').on('click', function () {
        layer.confirm('确定退出吗', { icon: 3, title: '提示' }, function (index) {
            location.href = 'login.html'
            localStorage.removeItem('token')
            layer.close(index);
        });
    })
})
function getUserinfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        data: "data",
        
        success: function (res) {
            // console.log(res);
            if (res.status != 0) return layer.msg('获取失败');
            // 渲染函数头像
            renderAvatar(res.data);
        },
    });
}
function renderAvatar(data) {
    // 渲染名字
    var uname = data.nickname || data.username;
    $('#welcome').html(`欢迎&nbsp;${uname}`)
    // 渲染头像
    if (data.user_pic != null) {
        $('.layui-nav-img').prop('src', data.user_pic).show();
        $('.textAvatar').hide()
    } else {
        let firstText = uname[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.textAvatar').show().html(firstText)
    }
}