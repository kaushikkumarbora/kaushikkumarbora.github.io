var MsgList=["Where are you looking at...", "Are you curious about me?", "Out of sync...", "WDNMD, don't look at me when you read the post.", "I don't like someone to mess around<br> Don’t look at others, it’s you!", "Hurry up! <br>What do you want to do with'beautiful young boy'?", "Let... let me go! I can still goo!", "Come on. .. You can’t learn after reading it.", "Want to fish! Want to eat chicken! Want to coo!", "What? You have been punished?", "How to fix a bug! Don't make trouble!", "O -oooooooooo AAAAE-AAIAU- JO-oooooooooooo AAE-OAAUUA- E-eee-ee-eee AAAAE-AEIEA- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA", "Let's'fall free' together","Ok!<br>——The metaphor Freedom D↓ve","I think you are lying to me...","What are you doing here?","Just like to see me so much?","emmmm, no problem Lao Tie.","Compared to MineCraft<br>I actually prefer audio games!","Goo~","Oh?", "Is this hero, do you see enough?","It’s just a metamorphosis,<br>but why is it so cute?","Is my post not attractive enough,<br>or I look more attractive?","I went to the audio tour,<br> Dare to disturb me and kill you!", "Don't! Don't touch me! It's disgusting!", "Ah~ come in~ so deep and big~<br> Don't~ it will break!", "I heard, Boy, do you want to fuck me?", "I smoke only the Yellow Crane Tower,<br>I drink only whiskey,<br>but women, I all need it.","Once the sea and turf, now the hairline is delayed.", "I love lemons the most...<br>No, no, I really like lemons,<br>not CNM...","I choose to die...","All night madman is me!"];

var l2dlv=1;
var TipTimer=30;

$(document).ready(function(){
	setInterval(checkTip,100);
});

$(document).mousemove(function(e){
	var l2d = $('#live2d-widget');
	if(l2d.length!=0){
		if((checkCursorl2d(e.pageX, e.pageY, l2d.offset()))&&(localStorage.l2dShow==1)&&l2dlv==0){
			msgTip(MsgList[Math.floor(Math.random()*MsgList.length)],0);
			l2dlv=1;
		}else if(!(checkCursorl2d(e.pageX, e.pageY, l2d.offset()))&&l2dlv==1){
			l2dlv=0;
		}
	}
});

$(document).click(function(e){
	var l2d = $('#live2d-widget');
	if(l2d.length!=0){
		if(checkCursorl2d(e.pageX, e.pageY, l2d.offset())){
			if(localStorage.l2dShow==1){
				msgTip("(Pigeon called) Goo?<br>Translation: Okay Okay I'm going",20);
				l2dFade(l2d, false);
				localStorage.l2dShow = 0;
			}else{
				msgTip("(Dove call) Goo?<br>Translation: Why did you call me suddenly??",0);
				l2dFade(l2d, true);
				localStorage.l2dShow = 1;
				l2dlv=1;
			}
			return false;
		}
	}
});

function checkCursorl2d(x,y,e){
	if(y>e.top+50&&x>e.left+100&&x<e.left+200) return true;
	return false;
}

function l2dFade(e,mode){
	e.stop().animate({bottom:(mode?-100:-120)+'px', opacity:(mode?1:0.5)},(mode?200:500));
}

function checkTip(){
	var l2d = $('#live2d-widget');
	if(l2d.length!=0){
		if($("#l2dTipBar").length==0){
			$("body").append('<div id="l2dTipBar" style="position: fixed; right: 50px; bottom: 140px; width: 200px;  z-index: 100000; opacity: 1; background: rgb(245,245,245); border: 2px solid #777; border-radius: 20px;opacity:0;text-align:center;padding:10px 5px 10px 5px;pointer-events:none;"><font id="l2dTip" color="#222" size="2">测试</font></div>');
			l2dFade(l2d, (localStorage.l2dShow==1));
			if(localStorage.l2dShow==1){
				if($("#back-main").length!=0){
					msgTip("Oh oh...<br>You seem to be in a place you shouldn’t have...",-20);
				}
			}
		}else{
			var l2dTip = $("#l2dTipBar")
			if(TipTimer<30){
				if(l2dTip[0].style.opacity==0){
					l2dTip.stop().animate({opacity:0.8},200);
					l2dFade(l2d, true);
				}
				TipTimer++;
			}else{
				if(l2dTip[0].style.opacity==0.8){
					if(!(localStorage.l2dShow==1) || l2dlv==2){l2dFade($('#live2d-widget'), false);}
					l2dTip.stop().animate({opacity:0},300);
				}
			}
		}
	}
}

function msgTip(msg,time){
	if($("#l2dTip").length!=0){
		TipTimer=(time)?time:0;
		$("#l2dTip")[0].innerHTML=msg;
	}
}

window.onfocus = function(){
	if(localStorage.l2dShow==1){
		msgTip("Am i ugly?<br>Is that why you abandoned me?");
		l2dlv=0;
	}
}

window.onblur = function(){
	if(localStorage.l2dShow==1){
		msgTip("Why did this man run so fast?<br>Goo?~");
		l2dlv=2;
	}
}