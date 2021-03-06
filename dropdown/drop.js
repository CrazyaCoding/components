/*
	comment: 支持多级下拉框 
	marks: 需要引用样式 以及jquery
	<link rel="stylesheet" href="//c.58cdn.com.cn/ui7/job/hire/reset_v20170117194024.css">
	<link rel="stylesheet" href="//j1.58cdn.com.cn/n/css/drop.css">
	样式根据需要自己拿取
	var data = [
		{id : 0 , text : "test1" , childList :[
		 	{ id : 01 , text : "test11"},
		 	{ id : 02 , text : "test12"},
		 	{ id : 03 , text : "test13"} 
		 	]
		},
		{ id : 1 , text : "test2" ,  childList :[
		 	{ id : 11 , text : "test21"},
		 	{ id : 12 , text : "test22"},
		 	{ id : 13 , text : "test23"}
		 	] 
		},
		{ id : 2 , text : "test3" ,  childList :[
		 	{ id : 21 , text : "test31"},
		 	{ id : 22 , text : "test32"},
		 	{ id : 23 , text : "test33"} 
		 	]
		}
	]
 */
	(function(window){
	/**
	 * [initial description]
	 * @type {Object}
	 * 默认参数
	 */
	var initial = {
		dom : $(".select"),
		data : [],
		selectCallback : function(){}
	}

	/**
	 * [Drop description]
	 * @param {[type]} config                
	 *        @param {[type]} dom [默认选择框]                
	 *        @param {[type]} data [数据数组]                
	 *        @param {[type]} selectCallback [description]                 
	 */
	function Drop(config){
		this.config = $.extend({} , initial , config);
		this.init();
	}
	Drop.prototype = {
		init : function(){
			// 样式渲染
			this.render();
			// 展开列表
			this.showSelect();
			// 鼠标滑过显示子列表
			this.hover();
			// select
			this.select();
		},

		/**
		 * [render description]
		 * @return {[type]} [加载数据 渲染下拉框]
		 */
		render : function(){
			var that = this;

			var c_lists = that.config.childlists;
			var origin = that.config.data;
			var html = "";
			var flag = 0;

			function createLi( origin ){
				
				if( !Array.isArray( origin )){
					throw new Error("Incorrect array format in :" + origin );
				}

				if( flag == 0 ){
					html += "<ul class='menu'>";
					flag += 1;
				}else{
					html += "<ul class='childmenu'>";
				}
				

				for( var i = 0; i<origin.length; i++){

					html += "<li data-id='"+ origin[i].id +"'>" + origin[i].text;
					if( origin[i].childList ){
						createLi( origin[i].childList );
					}
					html += "</li>"
				}

				html += "</ul>";
			}

			createLi(origin);
			$('.dropbox').append( html );
				
			// 设置一级列表样式
			$(".menu , .childmenu").hide();

		},
		/**
		 * [showSelect 点击展示下拉框]
		 * @return {[type]} [description]
		 */
		showSelect : function(){
			var that = this;
			that.config.dom.on("click" , function(e){
				if( $(this).hasClass("down") ){
					$(this).removeClass("down");
				}else{
					$(this).addClass("down")
				}
				$(".menu").toggle();
			});
		},
		/**
		 * [hover 鼠标滑过下拉框列表 ]
		 * @return {[type]} [description]
		 */
		hover : function(){
			var that = this;
			$(".menu").on("mouseenter" , "li" , function(event){
				var e = event || window.event ;
				$(".childmenu").hide();
				$(this).parents(".childmenu").show()
				$(this).children().show();
				e.stopPropagation();
			});
			$(".menu").on("mouseleave" , function(){
				$(".menu").hide();
				$(".childmenu").hide();
			})

		},
		/**
		 * [select 点击事件]
		 * @return {[type]} [description]
		 */
		select : function(){	
			var that = this;
			$(".menu").on("click" , "li" , function(e){
				if( $(this).children("ul").length > 0 ){
					return false;
				};
				that.config.dom.html( $(this).html() );
				that.config.selectCallback && that.config.selectCallback(  $(this).attr("data-id") );
				$(".menu").hide();
				$(".childmenu").hide();				
				e.stopPropagation();
			});
		}
	}
	window.Drop = Drop;

})(window)
