$(function () {
    getClassification()
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 获取文章分类
    function getClassification() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status != 0) return layui.layer.msg('获取失败');
                let newdata = template('cate_id', res);
                $('[name="cate_id"]').html(newdata);
                layui.form.render();
            }
        });
    }
    // 选择封面事件
    $('#chooseImgBtn').on('click', function () {
        // console.log(1);
        $('#coverFile1').click();
    })
    $('#coverFile1').on('change', function (e) {
        console.log(e);
        if (e.target.files.length == 0) return;
        var newImgURL = URL.createObjectURL(e.target.files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    let stateBtn = '已发布';
    $('#btnsave').on('click', function () {
        stateBtn = '草稿';
    })
    // 表单提交
    $('#form-article').on('submit', function (e) {
        // alert(111)
        e.preventDefault();
        let fd = new FormData($(this)[0])
        fd.append('state', stateBtn);
        // console.log(fd);
        
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // console.log(blob);
                fd.append('cover_img', blob);
                fd.forEach((el,i)=>{
                    console.log(el,i);
                })
                $.ajax({
                    type: "post",
                    url: "/my/article/add",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        console.log(res);
                        if (res.status != 0) return layui.layer.msg('发布失败');
                        // console.log(1);
                        location.href = '/article/art_list.html';
                    }
                });
            })
        return false;
    })
})