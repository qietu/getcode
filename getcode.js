/*
 * getcode.js 
 *
 * Copyright (c) 2007-2015 Qietu inc
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.qietu.com/p/getCode.js
 *
 * Version:  1.0.0
 */


(function($){
	
	/*var a = function(){
			
		}
		
		var methods = {
			init:function(){
				
			},
			destory: function(){
				
			},
			val:function(){
					
			}
		}*/
	var methods = {
		init: function(options){
			
		},
		show: function(){
			
		},
		hide: function(){
			
		},
		update: function(){
			
		}
	};
	
	$.fn.getcode = function(setting){
		
		/*var settings = $.extend({
			'location': 'top',
			'background-color': 'blue'
		},options)*/
		
		var defaults = {
			time : 60,
			before : null, //当插件开始run的时候执行的回调函数， 默认为null
			after : null //当插件初始化完成后执行的回调函数， 默认为null
		  };
		  
		  //默认值继承
		  var config = $.extend( defaults, setting || {});
		  
		  var time = config.time;
		
		  
  
		
		obj = $(this);
		
		obj.each(function(){
			
			$(this).bind('click',function(event){
				
				// 引用回调函数
				  if (typeof config.before == 'function') { // 确保类型为函数类型
						config.before.call(this); // 执行回调函数
				  }
				 
		  
				if($(this).hasClass('disabled')){
					return false;	
				}
				
				$(this).addClass('disabled');
									 
				 var ths = $(this);
				 var val = $(event.target)[0].tagName == 'INPUT' ? ths.val() : ths.html();
				 var isinput = $(event.target)[0].tagName == 'INPUT' ? true : false;
				 //var time = 60;
				 
				 if(isinput){
						ths.val(time+ '秒后可重发');		 
					}
					else{
						ths.html(time + '秒后可重发');
					}
					
				 _timeRun = setInterval(function(){
					// 加载完成
					if(time==1){
						ths.css('cursor','pointer');
						if(isinput){
						
							ths.val(val);		 
						}
						else{
						
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
					if(time>1){
						time--;
						//console.log(time);
						ths.css('cursor','default');
						
						
						
						 //alert($(event.target)[0].tagName);
						 if(isinput){
							ths.val(time+ '秒后可重发');		 
						}
						else{
							ths.html(time + '秒后可重发');
						}
					}
					
					
				},1000);
									
			
			return false;			
		
			})
			
		})
		
	}
})(jQuery);




