$.ajaxPrefilter(function (data) {
    // console.log(data);
    data.url = 'http://ajax.frontend.itheima.net' + data.url;
    // 统一为有权限的加请求头
    if (data.url.indexOf('/my') != -1) {
        data.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    data.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = '/login.html'
            // 这里有必要清空token吗
            // localStorage.removeItem('token')
            // location.href = '/login.html'
        }
    }

})