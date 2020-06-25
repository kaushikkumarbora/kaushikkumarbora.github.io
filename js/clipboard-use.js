$(document).ready(function() {
	$(".highlight").append('<a class="btn-copy" href onClick="CopyCode($(this));return false;">Copy</a>');
});

function CopyCode(e){
	try {
		var text = e.parent().find("table tbody tr .code")[0].innerText;
		let cp = document.createElement('div');
		cp.id = 'tempTarget';
		cp.style.opacity = '0';
		cp.innerText = text;
		document.body.appendChild(cp);
		let range = document.createRange();
		range.selectNode(cp);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
		CopyOver('Copied!')
		cp.parentElement.removeChild(cp);
	} catch (e) {
		CopyOver('Hey? Copy Failed?')
	}
}

function CopyOver(msg){
	if(device.mobile()){
		$(".nav-tip")[0].innerText = msg;
		$(".nav-tip").fadeTo(0,1);
		setTimeout(function(){$(".nav-tip").stop().animate({opacity: 0},1000)},3000);
	}else{
		msgTip(msg);
	}
}