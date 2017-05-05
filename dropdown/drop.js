
	(function(window){
	/**
	 * [initial description]
	 * @type {Object}
	 * 默认参数
	 */
	var initial = {
		level : 1,
		dom : $(".select"),
		fisrtlist : $(".menu"),
		childlists : $(".childmenu"),
 		dataId :　"data-id",
		innerlist : $(".inner"),
		selectCallback : function(){}
	}

	/**
	 * [Drop description]
	 * @param {[type]} config 
	 *        @param {[type]} level [选择框的级数，eq:一级、二级]                
	 *        @param {[type]} dom [默认选择框]                
	 *        @param {[type]} fisrtlist [一级下拉框]                
	 *        @param {[type]} childlists [除了一级的子级框]               
	 *        @param {[type]} attr [数据的id值]                
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
			this.hoverList();
			// 鼠标离开
			this.leaveList();
			// select
			this.select();
		},
		render : function(){
			var that = this;
			var c_lists = that.config.childlists;
			
			var origin = that.config.data;

			var html = "<ul class='menu'>";
			// var li = "";
			
			//数据渲染
			for( var i = 0; i<origin.length; i++){
				// createLi( origin[i] );
				html += "<li data-id='"+ origin[i].id +"'>" + origin[i].text +"<div></div><li>";
			}

			html += "</ul>";

			/*function createLi( item ){
				li += "<li data-id='"+ item.id +"'>";
				if( Arrary.isArrary( item.childList ) ){
					for( var i = 0; i < item.childList.length; i++){
						createLi( item.childList );
					}
				}
				li += item.text +"<li>";
				return li;
			}*/
				
			// 设置一级列表样式
			that.config.fisrtlist.hide();

			// 设置后续多级列表样式
			for(var i =0; i< c_lists.length; i++){
				c_lists.eq(i).css({
					"position" : "absolute"
				});
				c_lists.eq(i).hide();
			};
		},
		showSelect : function(){
			var that = this;
			that.config.dom.on("click" , function(e){
				if( $(this).hasClass("down") ){
					$(this).removeClass("down");
				}else{
					$(this).addClass("down")
				}
				that.config.fisrtlist.css({
					"position":"absolute",
					"top" : that.config.dom.height() + parseInt(that.config.dom.css("border-bottom-width")),
					"left" : "0"
				}).toggle();
			});
		},
		hoverList : function(){
			var that = this;
			if( that.config.level <= 1 ){
				return false;
			}
			var hoverLiList = [];
			that.config.fisrtlist.children("li").each(function(index , item){
				hoverLiList.push(item);
			});
			that.config.childlists.find("li").not( that.config.innerlist ).each(function(index , item){
				hoverLiList.push(item);
			});

			$.each(hoverLiList , function(index ,item){
				/*$('.menu').on('hover','li',function(){
					this.
				})*/
				$(item).on("mouseover" , function(){
					$(item).parent().find(that.config.childlists).each(function( idx , i){
						$(i).hide();
					});

					var parentlist = $(item).parent();

					var left = $(item).width() + parseFloat( parentlist.css("border-right-width"));
					var top = 0 - parseFloat( that.config.dom.css("border-top-width"));

					$(item).children( that.config.childlists ).eq(0).css({
						"top" : top ,
						"left" : left
					}).show();
					return false;
				})
			});
		},
		leaveList : function(){
			var that = this;
			that.config.fisrtlist.on("mouseleave" , function(e){
				$(e.currentTarget).hide();
				return false;
			});
		},
		select : function(){	
			var that = this;
			$.each(that.config.innerlist , function(index , item){
				$(item).children("li").on("click" , function(){
					that.config.dom.html( $(this).html() );
					that.config.fisrtlist.hide();
					that.config.childlists.hide();
					that.config.selectCallback && that.config.selectCallback( that.config.dataId );
				});
			});
		}
	}
	window.Drop = Drop;

})(window)
