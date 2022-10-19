$(function() {
    let form = layui.form
    // let layer = layui.layer

    form.verify({
        pwd : [/^[\S]{6,12}$/ , '密码必须6-12位且不能出现空格'],
        samePwd : function(value) {
          if (value === $('[name=oldPwd]').val() ) {
          return '新旧密码不能相同'  
          }
        },
        rePwd : function(value) {
         if (value != $('[name=newPwd]').val())   {
            return '两次密码不一致'
         }
        }
    })

    //发起数据请求
    $('.layui-form').on('submit', function(e) {
     e.preventDefault()
     $.ajax({
        method : 'POST',
        url : '/my/updatepwd',
        data : $(this).serialize(),
        success : function(res) {
            if (res.status != 0) {
          return layui.layer.msg('密码修改失败')
            }
            layui.layer.msg('更新密码成功')
            //重置表单
            $('.layui-form')[0].reset()
        }

     })
    })
})