$(function() {
  //调用获取用户基本信息函数
  getUserinfo()

  //退出提示框
  $('#btnLogout').on('click' , () => {
    layer.confirm('确认退出登录？' , {icon : 3, title : '提示'}, (index) => {
        // console.log('ok');
        //清空本地存储的token
        localStorage.removeItem('token')
        //重新跳转到登录页
        location.href = './login.html'

        layer.close(index)
    })
  })
})

//封装函数 ： 获取用户基本信息
function getUserinfo() {
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
        //给headers请求头配置对象
        /* headers : {
            Authorization : localStorage.getItem('token') || ''
        }, */
        success : function(res) {
            // console.log(res );
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用渲染用户头像函数
            renderAvatar(res.data)
        },
            

            //无论成功还是失败都会调用complete回调函数
      /* complete : function(res) {
        console.log(res);
            console.log('执行了res回调');
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {  
        //强制清空token
        localStorage.removeItem('token')
        //强制跳转到登录页面
        location.href = './login.html'
     }  
     } */
    })
}

//渲染用户头像的函数
 function renderAvatar(user) {
   let name = user.nickname || user.username
   $('#welcome').html('欢迎  '  + name)

   //按需渲染用户头像
   if (user.user_pic != null) {
    $('.layui-nav-img').attr('src' ,user.user_pic).show()
    $('.text-avatar').hide()
   }  else {
    $('.layui-nav-img').hide()

    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
   }
 }