
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

			var html = "";

			var flag = 0;

			function createLi( origin ){
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
			// that.config.fisrtlist.hide();
			$(".menu , .childmenu").hide();

		},
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
			$(".menu").on("mouseover" , "li" , function(){
				$(this).parent().find(".childmenu").hide();
				debugger;
				$(this).children("ul").show();
			})
			$.each(hoverLiList , function(index ,item){
				/*$('.menu').on('hover','li',function(){
					this.
				})*/
				$(item).on("mouseover" , function(){
					$(item).parent().find(that.config.childlists).each(function( idx , i){
						$(i).hide();
					});
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
