define([], function(){
	var _isShow = false;
	var $tag, $aboutme, $friends;

	var ctn,radio,scaleW,idx,basicwrap;

	var reset = function() {
		radio = document.body.scrollHeight/document.body.scrollWidth;
		scaleW = document.body.scrollWidth;
		idx = 0;
	};
	var combine = function(){
		if($tag){
			document.getElementById("js-mobile-tagcloud").innerHTML = $tag.innerHTML;
		}
		if($aboutme){
			document.getElementById("js-mobile-aboutme").innerHTML = $aboutme.innerHTML;
		}
		if($friends){
			document.getElementById("js-mobile-friends").innerHTML = $friends.innerHTML;
		}
	}
	var renderDOM = function(){
		var $viewer = document.createElement("div");
		$viewer.id = "viewer";
		$viewer.className = "hide";
		$tag = document.getElementById("js-tagcloud");
		$aboutme = document.getElementById("js-aboutme");
		$friends = document.getElementById("js-friends");
		var tagStr = $tag?'<span class="viewer-title">标签</span><div class="viewer-div tagcloud" id="js-mobile-tagcloud"></div>':"";
		var friendsStr = $friends?'<span class="viewer-title">友情链接</span><div class="viewer-div friends" id="js-mobile-friends"></div>':"";
		var aboutmeStr = $aboutme?'<span class="viewer-title">关于我</span><div class="viewer-div aboutme" id="js-mobile-aboutme"></div>':"";

		$viewer.innerHTML = '<div id="viewer-box">\
		<div class="viewer-box-l">\
			<div class="viewer-box-wrap">'+aboutmeStr+friendsStr+tagStr+'</div>\
		</div>\
		<div class="viewer-box-r"></div>\
		</div>';

		document.getElementsByTagName("body")[0].appendChild($viewer);
		var wrap = document.getElementById("viewer-box");
		basicwrap = wrap;
		wrap.style.height = document.body.scrollHeight + 'px';
	};

	var show = function(target, idx){
		document.getElementById("viewer").className = "";
		setTimeout(function(){
			basicwrap.className = "anm-swipe";
		},0);
		_isShow = true;
		document.ontouchstart=function(e){
			if(e.target.tagName != "A"){
				return false;
			}
		}
	}

	var hide = function(){
		document.getElementById("viewer-box").className = "";
		_isShow = false;
		document.ontouchstart=function(){
			return true;
		}
	}

	var bindDOM = function(){
		var scaleW = scaleW;
		document.getElementById("viewer-box").addEventListener("webkitTransitionEnd", function(){

			if(_isShow == false){
				document.getElementById("viewer").className = "hide";
				_isShow = true;
			}else{
			}
			
		}, false);

		ctn.addEventListener("touchend", function(){
			show();
		}, false);

		var $right = document.getElementsByClassName("viewer-box-r")[0];
		var touchStartTime;
		var touchEndTime;
		$right.addEventListener("touchstart", function(){
			touchStartTime = + new Date();
		}, false);
		$right.addEventListener("touchend", function(){
			touchEndTime = + new Date();
			if(touchEndTime - touchStartTime < 300){
				hide();
			}
			touchStartTime = 0;
			touchEndTime = 0;
		}, false);

		var $overlay = $("#mobile-nav .overlay");
		var $header = $(".js-mobile-header");
		window.onscroll = function(){
		    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
		    if(scrollTop >= 69){
		    	$overlay.addClass("fixed");
		    }else{
		    	$overlay.removeClass("fixed");
		    }
		    if(scrollTop >= 160){
		    	$header.removeClass("hide").addClass("fixed");
		    }else{
		    	$header.addClass("hide").removeClass("fixed");
		    }
		};
		$header[0].addEventListener("touchstart", function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		}, false);
	};

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	return{
		init: function(){
			ctn = document.getElementsByClassName("slider-trigger")[0];
			reset();
			renderDOM();
			combine();
			bindDOM();
			resetTags();
		}
	}
})