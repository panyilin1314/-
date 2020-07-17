$(function () {
    // 定义空对象
    var q = {
        pagenum: 1,	//页码值
        pagesize: 2, //	每页显示多少条数据
        cate_id: '',//	文章分类的 Id
        state: ''//	文章的状态
    }
    var form = layui.form;
    var laypage = layui.laypage;
    getdataTable()
    // 渲染页面
    function getdataTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            // dataType: "dataType",
            success: function (res) {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg('获取失败');
                var newdata = template('tbd', res)
                $('#tbody').html(newdata)
                // 调用渲染分页的方法
                renderPage(res.total)
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
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        q.cate_id = $('[name="cate_id"]').val();
        q.state = $('[name="state"]').val();
        // console.log(q);
        getdataTable()
    })

    // 定义渲染分页的方法
    function renderPage(num) {
        // console.log(num);
        laypage.render({
            elem: 'pagbox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: num //数据总数，从服务端得到
            , limit: q.pagesize
            , curr: q.pagenum
            , limits: [1, 2, 3, 4, 5]
            , layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;

                //首次不执行
                if (!first) {
                    //do something
                    getdataTable()
                }
            }
        })
    }
    // 删除请求事件
    $('tbody').on('click', '.del', function () {
        // 为啥这个是当前显示的页面个数不是总数呢？
        let len = $('.del').length;
        // console.log(len);
        var id = $(this).attr('data-id');
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                // dataType: "dataType",
                success: function (res) {
                    // console.log(res);
                    if (res.status != 0) return layui.layer.msg('删除失败')
                    getdataTable()
                    console.log(len);
                    if (len == 1) {
                        // console.log(11);
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
                        getdataTable()
                    }
                }
            });
            layer.close(index);
        });
        // console.log(id);

    })

})