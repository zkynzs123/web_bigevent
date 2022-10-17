$(function() {
  //点去去注册账号的链接
  $('#link_reg').on('click' , function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击去登录账号的链接
  $('#link_login').on('click' , function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })
   
  //从layui中获取form对象
   let form = layui.form
   let layer = layui.layer
   //通过form.verify()函数自定义校验规则
   form.verify({
    //自定义一个密码的校验规则
    pwd : [/^[\S]{6,12}$/ , '密码必须6-12位,且不能出现空格'] ,
    repwd : function(value) {
        //通过value拿到确认密码框中的内容
      let pwd =  $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
   })

   //监听表单的注册事件
   $('#form_reg').on('submit' , function(e) {
     e.preventDefault()
     let data = {username : $('#form_reg [name=username]').val() ,password : $('#form_reg [name=password]').val()}
     $.post('/api/reguser' , data , function(res) {
      if (res.status != 0) {
        return layer.msg(res.message)
      }
     layer.msg('注册成功，正在前往登录页面')
     
     setTimeout(function() {
      $('#link_login').click()
     } ,2000)
     })
   })

   //监听登录表单的提交事件
   $('#form_login').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      url : '/api/login' ,
      method : 'POST' ,
      //快速获取表单数据
      data : $(this).serialize() ,
      success : function(res) {
        if (res.status != 0) {
        return layer.msg('登录失败')
      }
       layer.msg('登录成功')
      //  console.log(res.token);

      //将登录获取到的token值存储到本地存储中
      localStorage.setItem('token' , res.token)
       //跳转到后台主页
      //  location.href = './index.html'
      }
    })
   })
})