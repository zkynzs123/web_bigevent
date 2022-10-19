//每次调用$.ajxa $.get $.post时候都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  // console.log(options.url);
  
  //给索引头添加判断条件
  if (options.url.indexOf('/my/')) {
  options.headers = {Authorization : localStorage.getItem('token') || '' }
  }

  options.complete =  function(res) {
    // console.log(res);
        // console.log('执行了res回调');
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {  
    //强制清空token
    localStorage.removeItem('token')
    //强制跳转到登录页面
    location.href = './login.html'
 }  
 } 
})