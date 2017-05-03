(function(window){
	/**
	 * [initial description]
	 * @type {Object}
	 */
	var initial = {
		level : 1,
		dom : $(".select"),
		fisrtlist : $(".menu"),
		childlists : $(".childmenu"),
		// columnSpace : 0,  未用 鼠标滑入滑出时有影响
 		dataId :　"data-id",
		innerlist : $(".inner"),
		selectCallback : null
	}


	/**
	 * [Drop description]
	 * @param {[type]} config 
	 *        @param {[type]} level [选择框的级数，eq:一级、二级]                
	 *        @param {[type]} dom [默认选择框]                
	 *        @param {[type]} fisrtlist [一级下拉框]                
	 *        @param {[type]} childlists [除了一级的子级框]                
	 *        @param {[type]} columnSpace [下拉框的间隙]                
	 *        @param {[type]} attr [数据的id值]                
	 *        @param {[type]} selectCallback [description]                 
	 */
	function Drop(config){
		this.config = $.extend({} , initial , config);
		this.init();
	}
	Drop.prototype = {
		init : function(){
			//样式部分待改善，做的并不好
			this.render();
			// 展开列表
			this.showSelect();
			//设置鼠标滑过
			this.hoverList();
			//鼠标离开
			this.leaveList();
			//select
			this.select();
		},
		render : function(){
			var that = this;
			var c_lists = that.config.childlists;
			
			// 设置一级列表样式
			that.config.fisrtlist.hide();

			// 设置后续多级列表样式
			for(var i =0; i< c_lists.length; i++){
				c_lists.eq(i).css({
					"position" : "absolute",
					// "borderLeft" : "0"
					// "top" : that.config.dom.height() + parseInt( that.config.dom.css("borderTopWidth")) , 
					// "left" : ( that.config.level - 1 ) * that.config.dom.width() + parseInt( that.config.dom.css("borderLeftWidth") )
				});
				c_lists.eq(i).hide();
			};

		},
		showSelect : function(){
			var that = this;
			that.config.dom.on("click" , function(e){
				e.stopPropagation();
				if( $(this).hasClass("down") ){
					$(this).removeClass("down");
				}else{
					$(this).addClass("down")
				}
				that.config.fisrtlist.toggle();
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
				$(item).on("mouseover" , function(){
					$(item).parent().find(that.config.childlists).each(function( idx , i){
						$(i).hide();
					});
					var parentlist = $(item).parent();

					var left = $(item).width() + parseFloat( parentlist.css("border-left-width")) + parseFloat( parentlist.css("border-right-width"));
					// console.log(left);
					if( parseFloat( parentlist.css("top") ) >= 0 ){
						var top = 0;
					}else if( !parseFloat( parentlist.css("top")) ){
						var top = that.config.dom.height() + parseFloat( that.config.dom.css("border-top-width"));
					}

					$(item).children( that.config.childlists ).eq(0).css( "left" , left ).css( "top" , top ).show();
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
					that.config.dom.html( $(this).html() ).attr( that.config.dataId , $(this).attr( that.config.dataId ) );
					that.config.fisrtlist.hide();
					that.config.childlists.hide();
					that.config.selectCallback && that.config.selectCallback();
				});
			});
		}

	}
	window.Drop = Drop;

})(window)