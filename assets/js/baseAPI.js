$.ajaxPrefilter(function (data) {
    console.log(data.url);
    data.url = 'http://ajax.frontend.itheima.net' + data.url;
})