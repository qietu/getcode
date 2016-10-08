/**
 * getcode.js
 * Version:  1.0.0
 */
(function($) {
  $.fn.getcode = function(setting) {
    var defaults = {
      time: 3,         //时间，默认60秒
      before: null,   //当插件开始run的时候执行的回调函数， 默认为null
      after: null     //当插件初始化完成后执行的回调函数， 默认为null
    };
    
    //默认值继承
    var config = $.extend(defaults, setting || {});
    var time = config.time;
    var obj = $(this);
    
    obj.each(function() {
      $(this).bind('click', function(event) {
        // 引用回调函数
        if (typeof config.before == 'function') { //确保类型为函数类型
          config.before.call(this); // 执行回调函数
        }
        
        if ($(this).hasClass('disabled')) {
          return false;
        }
        
        $(this).addClass('disabled');
        
        var ths = $(this);
        var val = $(event.target)[0].tagName == 'INPUT' ? ths.val() : ths.html();
        var isinput = $(event.target)[0].tagName == 'INPUT' ? true : false;
        
        if (isinput) {
          ths.val(time + '秒后可重发');
        }
        else {
          ths.html(time + '秒后可重发');
        }
        
        var _timeRun = setInterval(function() {
          // 加载完成
          if (time == 1) {
            ths.css('cursor', 'pointer');
            if (isinput) {
              ths.val(val);
            }
            else {
              ths.html(val);
            }
            clearInterval(_timeRun);
            ths.removeClass('disabled');
            
            // 引用回调函数
            if (typeof config.after == 'function') { // 确保类型为函数类型
              config.after.call(this); // 执行回调函数
            }
          }
          
          // 加载过程
          if (time > 1) {
            time--;
            //console.log(time);
            ths.css('cursor', 'default');
            
            //alert($(event.target)[0].tagName);
            if (isinput) {
              ths.val(time + '秒后可重发');
            }
            else {
              ths.html(time + '秒后可重发');
            }
          }
          else{
            time = config.time;
          }
        }, 1000);
        return false;
      });
    });
  }
})(jQuery);
