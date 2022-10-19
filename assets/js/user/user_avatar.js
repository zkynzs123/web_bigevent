$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
 let layer = layui.layer
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //模拟点击事件
  $('#btnChooseImage').on('click' , function() {
    $('#file').click()
  })   

  //添加图书覆盖事件
  $('#file').on('change', function(e) {
    let filelist = e.target.files
    if (filelist.length === 0) {
        return layer.msg('请选择图片')
    }
  //拿到用户选择文件
  let file = e.target.files[0]
  //将文件转化为路径
  let imgUrl = URL.createObjectURL(file)
  //重新初始化裁剪区域
  $image
  .cropper('destroy')//销毁旧的裁剪区域
  .attr('src' , imgUrl)//新图片路径
  .cropper(options) //初始化裁剪区域
  })

  //为确定按钮绑定一个提交用户头像的事件
  $('#btnUpload').on('click' , function() {
    //拿到用户裁剪的头像
    let dataURL = $image
    .cropper('getCroppedCanvas' , {
        //创建一个画布
        width : 100 ,
        height : 100
    })
    .toDataURL('image/png')//将画布上的内容转化为base64格式的字符串
    //2.调用接口
    $.ajax({
        method : 'POST' ,
        url : '/my/update/avatar',
        data : {
            avatar : dataURL 
        },
        success : function(res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败')
            }
            layer.msg('更换头像成功')
            window.parent.getUserinfo()
        }
    })
  })
})