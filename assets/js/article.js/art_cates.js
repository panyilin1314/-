$(function () {
    getData()
    // 获取数据渲染页面
    function getData() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            // data: "data",
            // dataType: "dataType",
            success: function (res) {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg('获取失败');
                let newdata = template('tbd', res);
                $('#tbody').html(newdata)
            }
        });
    }
    let indexAdd = null
    let indexamend = null
    // 添加按钮事件
    $('#btnAddcates').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#addCategories').html()
        });
    })
    // 添加请求
    $('body').on('submit', '#formAdd', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                if (res.status != 0) return layer.msg('添加错误');
                getData()
                layer.close(indexAdd);
                layer.msg('添加成功');
            }
        });
    })
    // 修改按钮事件
    $('tbody').on('click', '.amend', function () {
        // console.log($(this));
        indexamend = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#amendCategories').html()
        });
        // 获取当前内容
        let id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                console.log(res);
                if (res.status != 0) return layui.layer.msg('获取错误');
                layui.form.val('amendForm', res.data);
            }
        });


    })
    // 请求修改
    $('body').on('submit', '#formAmend', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                alert('更新成功')
                getData()
                layer.close(indexamend);
            }
        });
    })
    // 删除事件
    $('tbody').on('click', '.del', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确定删除吗', { icon: 3, title: '提示' },(index) =>{
            // console.log(num);
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    console.log(res);
                    getData()
                }
            });

            layer.close(index);
        });

    })
})