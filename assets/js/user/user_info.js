$(function() {
    let form = layui.form
    let layer =layui.layer
    form.verify({
        nickname : function(value) {
            if (value.trim().length > 6) {
             return '昵称长度必须在1-6个字符'  
            }
        }
    })

    // 初始化用户信息
    initUserInfo()
   function initUserInfo()    {
    $.ajax({
      method : 'GET'  ,
      url : '/my/userinfo' ,
      success : function(res) {
        if (res.status !=0) {
            return layer.msg('获取用户信息失败')
        }
        // console.log(res);

        // 调用form.val()快速为表单赋值
        form.val('formUserInfo' ,res.data)
      }
    })
   }  

   //重置表单数据
   $('#btnReset').on('click' , function(e) {
        e.preventDefault()
        initUserInfo()
   })

   //提交表单数据
   $('.layui-form').on('submit' , function(e) {
     //阻止默认提交行为
     e.preventDefault()
     $.ajax({
      method: 'post' ,
      url : '/my/userinfo',
      data : $(this).serialize()
      , success : function(res) {
        if (res.status !=0) {
          return layer.msg('更新用户数据失败')
        }
        layer.msg('更新用户数据成功')
        //调用父页面的方法，重新渲染用户信息
        window.parent.getUserinfo()
      }
     })
   })
})