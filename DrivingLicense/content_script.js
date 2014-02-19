
var url = window.location.href;
url = decodeURI(url); //解码中文
addTextDiv(); //加入提示DIV

//根据不同页面做不同的操作
if(url.indexOf("Msg.aspx") > 5) { //提示页面
	if(url.indexOf("非法访问") > 5) {
		setText("悲剧了，你IP已进入黑名单，明天再来吧！！！");
	} else if(url.indexOf("访问太频繁") > 5) {
		setText("悲剧了，重新登录吧！20秒后自动跳转");
		addTimer();
		setTimeout("toLogin()",20000);
	} else {
		setText("悲剧了，重新登录吧！20秒后自动跳转");
		addTimer();
		setTimeout("toLogin()",20000);
	}
} else if(url == "http://cgs1.stc.gov.cn/SanXueYueKao.aspx") { //登录页面
	setText("点登录按钮，20秒内不要刷新，一天内不要尝试登录多个号！");
	//去除提示框
	var btn = $("#form1 input:first");
	btn.attr('onclick','');
	btn.click(function() {
		$("#type").val("dl");
		$("#form1").submit();
	});
} else if(url == "http://cgs.stc.gov.cn/" || url == "http://cgs1.stc.gov.cn" || url == "http://cgs1.stc.gov.cn/index.aspx") {
	setText("<a style='color:red;font-size:40px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>点击进入散学登录</a>");
} else if(url == "http://cgs1.stc.gov.cn/frame1.htm") {//登录后的主页面
	
} else if(url.indexOf("CoutesyReminder.html") > 5) { //又一个提示页面
	addTimer();
	var tex = $("#lbltishi").text();
	if(tex.indexOf("系统繁忙") >= 0) {
		setText("系统说它忙！20秒后自动跳转刷新或点击<a style='color:blue;font-size:20px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>重新登录</a>");
		
		setTimeout("toRemindPage()",20000);
	}
} else if(url.indexOf("cgs1.stc.gov.cn/") > 0) { //其它页面
	addTimer();
}

//登录后的主页面
if(url == "http://cgs1.stc.gov.cn/frame1.htm") {
	var leftFrame = window.frames['leftmain'].document;
	var nav = $("#navitable", leftFrame);
	
	nav.before("<div><input id='lonstart' type='button' value='看不到菜单？''/></div>");
	$("#lonstart", leftFrame).click(function() {
		loadAgain();
	});
	
	loadAgain();
}

//加载菜单
function loadAgain() {
	var leftFrame = window.frames['leftmain'].document;
	var nav = $("#navitable", leftFrame);
	
	$("tr", nav).each(function() {
		$(this).show();
	});
	
}

//跳转到提示前的页面
function toRemindPage() {
	window.location.href = "http://cgs1.stc.gov.cn/" + url.substring(url.indexOf("path=")+6);
}
//跳转到登录页面
function toLogin() {
	window.location.href = "http://cgs1.stc.gov.cn/SanXueYueKao.aspx";
}

//加入提示DIV
function addTextDiv() {
	if(!$("#globle_text").attr('id'))
		$("body").prepend("<div id='globle_text' style='color:red;font-size:25px;padding:20px;height:90px;position:fixed;top:0;left:90px'></div>");
}
//设置提示文字
function setText(t) {
	$("#globle_text").html(t);
}

//加入时钟DIV，默认20秒
function addTimerDiv() {
	if(!$("#globle_timer").attr('id'))
		$("body").prepend("<div id='globle_timer' style='color:green;font-size:50px;padding:20px;height:90px;position:fixed;top:0;left:0'>20</div>");
}
//添加时钟，默认20秒
function addTimer() {
	addTimerDiv();
	
	setTimeout("timedCount()",1000);
}
//时钟倒计时
function timedCount() {
	var t = $("#globle_timer").text();
	if(!t) return;
	else if(t>1) {
		t = t-1;
		$("#globle_timer").text(t);
		setTimeout("timedCount()",1000);
	} else if(t==1) {
		$("#globle_timer").text("GO");
	}
}

//自动刷新
function autoRefreshPage() {
	setTimeout("refreshPage()",3000);
}
function refreshPage() {
	location.reload();
}