$(function () {
    // 定义空对象
    var q = {
        pagenum: 1,	//页码值
        pagesize: 2, //	每页显示多少条数据
        cate_id: '',//	文章分类的 Id
        state: ''//	文章的状态
    }
    var form = layui.form
    getdataTable()
    // 渲染页面
    function getdataTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            // dataType: "dataType",
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layui.layer.msg('获取失败');
                var newdata = template('tbd', res)
                $('#tbody').html(newdata)
            }
        });
    }
    // 过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取文章分类列表并渲染
    function getClassification() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            // data: "data",
            // dataType: "dataType",
            success: function (res) {
                if (res.status != 0) return layui.layer.msg('获取失败');
                let newdata = template('classification', res)
                $('#cate_id').html(newdata)
                form.render();
            }
        });
    }
    getClassification();
    // 监听分类获取渲染事件
    // 可否用click事件？
    $('.layui-form').click(function (e) {
        e.preventDefault();
        q.cate_id = $('[name="cate_id"]').val();
        q.state = $('[name="state"]').val();
        console.log(q);
        getdataTable()
    })
    // 删除请求事件
    $('tbody').on('click','.del',function(){
        var id=$(this).prop('id');
        $.ajax({
            type: "method",
            url: "url",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                
            }
        });
    })

})