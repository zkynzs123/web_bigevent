//每次调用$.ajxa $.get $.post时候都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  console.log(options.url);

})