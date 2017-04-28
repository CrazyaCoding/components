(function(window){
	var initial = {
		level : 1,
		dom : $(".select"),
		fisrtlist : $(".menu"),
		childlists : $(".childmenu"),
		firstCallback : "",
		secondCallback : "",
		thirdCallback : "",
		fourCallback : ""
	}
	function Drop(config){
		
		this.config = $.extend({} , initial , config);
		this.init();
	}
	Drop.prototype = {
		init : function(){
			this.render();
		},
		render : function(){
			var config = this.config;
			var select = config.dom;
			var f_list = config.fisrtlist;
			var c_lists = config.childlists;
			var level = config.level;
			
			f_list.css("border" , select.css("border") ).css("borderTop" , "none").width(select.width());
			f_list.find("li").height(select.height()).css("lineHeight" , select.height()+"px").css("textIndent" ,select.css("textIndent") );
			
			for(var i =0; i<c_lists.length; i++){
				c_lists.eq(i).css("border" , select.css("border"))
				.css("position" , "absolute")
				.css("top" , select.height())
				.css("left" , level * select.width() )
				;
				c_lists.eq(i).width( select.width() ).height( select.height());
			}
			
		}
	}
	window.Drop = Drop;

})(window)