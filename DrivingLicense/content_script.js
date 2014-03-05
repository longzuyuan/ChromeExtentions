var autoT;
var url = window.location.href;
url = decodeURI(url); //解码中文

addTextDiv(); //加入提示DIV

//根据不同页面做不同的操作
if(url == "http://cgs1.stc.gov.cn/frame1.htm") { //登录后的主页面
	//var leftFrame = window.frames['leftmain'].document;
	//var nav = $("#navitable", leftFrame);
	
	//nav.before("<div><input id='lonstart' type='button' value='看不到菜单？''/></div>");
	//$("#lonstart", leftFrame).click(function() {
	//	loadAgain();
	//});
	
	setTimeout("loadAgain()",1000);
	//loadAgain();
} else if(url.indexOf("Msg.aspx") > 5) { //提示页面
	if(url.indexOf("非法访问") > 5 || url.indexOf("禁止") > 5) {
		setText("悲剧了，你IP已进入黑名单，明天再来吧！！！");
	} else if(url.indexOf("访问太频繁") > 5) {
		setText("悲剧了，重新登录吧！20秒后自动跳转");
		addTimer();
		setTimeout("toLogin()",20000);
	} else if(url.indexOf("登录太频繁") > 5) {
		setText("悲剧了，重新登录吧！55秒后自动跳转");
		addTimer();
		setTimedCount(55);
		setTimeout("toLogin()",55000);
	} else {
		setText("悲剧了，重新登录吧！20秒后自动跳转");
		addTimer();
		setTimeout("toLogin()",20000);
	}
} else if(url == "http://cgs1.stc.gov.cn/id.html") { //提示页面
	setText("阿哈，你被踢出来了！重新登录吧！3秒后自动跳转");
	addTimer();
	setTimedCount(3);
	setTimeout("toLogin()",3000);
} else if(url == "http://cgs1.stc.gov.cn/SanXueYueKao.aspx") { //登录页面
	setText("点登录按钮，20秒内不要刷新，一天内不要尝试登录多个号！");
	//去除提示框
	var btn = $("#form1 input:first");
	btn.attr('onclick','');
	btn.click(function() {
		$("#type").val("dl");
		$("#form1").submit();
	});
} else if(url == "http://cgs.stc.gov.cn/" || url == "http://cgs1.stc.gov.cn/" || url == "http://cgs1.stc.gov.cn/index.aspx") {
	setText("<a style='color:red;font-size:40px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>点击进入散学登录</a>");
} else if(url.indexOf("CoutesyReminder.html") > 5) { //又一个提示页面
	addTimer();
	var tex = $("#lbltishi").text();
	if(tex.indexOf("系统繁忙") >= 0) {
		setText("系统说它忙！20秒后自动跳转刷新或点击<a style='color:blue;font-size:20px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>重新登录</a>");
		
		setTimeout("toRemindPage()",20000);
	}
} else if(url.indexOf("Exam1_Sanxue.aspx") > 5) { //科目一预约
	addTimer();
	if($("#LabelAllowNum").text().substring(1) == '/0') {
		setText("该场次已满，20秒后请手动重新打开页面！");
		return;
	}
	autoT = setTimeout("submitExam1()",20000);
	setText("请手动输验证码，20秒后自动提交。<input value='取消自动' type='button' id='cancelSubmit'/>");
	$("#cancelSubmit").click(function(){
		clearTimeout(autoT);
		setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
		$("#txtVail").focus();
	});
	$("#txtVail").focus();
} else if(url.indexOf("Exam2_Sanxue.aspx") > 5) { //科目二预约
	addTimer();
	$("#HiddenFieldshift_id").attr('type','text');
	$("#HiddenFieldshift_no").attr('type','text');
	$("#HiddenFieldshift_id").before('场次ID:');
	$("#HiddenFieldshift_no").before('场次NO:');
	$("#HiddenFieldshift_no").after('<input type="button" value="改下一场" id="changeToNext2"/>');
	$("#changeToNext2").click(function(){
		fChangeToNext2();
	});
	if($("#LabelAllowNum").text().substring(1) == '/0') {
		setText("该场次已满，20秒后请手动重新打开页面或在下方修改场次！");
		//return;
	} else {
		autoT = setTimeout("submitExam1()",20000);
		setText("请手动输验证码，20秒后自动提交。<input value='取消自动' type='button' id='cancelSubmit'/>");
		$("#cancelSubmit").click(function(){
			clearTimeout(autoT);
			setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
			$("#txtVail").focus();
		});
		$("#txtVail").focus();
	}
	addPlayNoInfo();
} else if(url.indexOf("Exam3_Sanxue.aspx") > 5) { //科目三预约
	addTimer();
	if($("#LabelAllowNum").text().substring(1) == '/0') {
		setText("该场次已满，20秒后请手动重新打开页面！");
		return;
	}
	autoT = setTimeout("submitExam1()",20000);
	setText("请手动输验证码，20秒后自动提交。<input value='取消自动' type='button' id='cancelSubmit'/>");
	$("#cancelSubmit").click(function(){
		clearTimeout(autoT);
		setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
		$("#txtVail").focus();
	});
	$("#txtVail").focus();
} else if(url.indexOf("cgs1.stc.gov.cn/") > 0) { //其它页面
	addTimer();
}

//科目二改下一场
function fChangeToNext2() {
	var i = parseInt($("#HiddenFieldshift_id").val());
	var n = parseInt($("#HiddenFieldshift_no").val());
	if(i == 175563) {
		alert("没有下场了，下次再试吧！"); return;
	}
	i = i+1;
	n = n+1;
	if(n == 29009) n = 29001;
	$("#HiddenFieldshift_id").val(i);
	$("#HiddenFieldshift_no").val(n);
}
function submitExam1() {
	$("#Button1").click();
}

//加载菜单
function loadAgain() {
	var leftFrame = window.frames['leftmain'].document;
	var nav = $("#navitable", leftFrame);
	//alert(nav.attr("id"));
	if(nav.attr("id") != 'navitable') {
		setTimeout("loadAgain()",500); return;
	}
	
	$("tr#item2", nav).show();
	
	$(".div_sty", nav).show();
	$(".div_sty a", nav).removeAttr('onmouseover');
	$(".div_sty a", nav).removeAttr('onmouseout');
	$(".div_sty a", nav).hover(function(){$(this).css('color','red');}, 
														 function(){$(this).css('color','');});
														 
	handleSingleMenu($("td#item2", nav));
	handleSingleMenu($("td#item0", nav));
	handleSingleMenu($("td#item100", nav));
}
//使菜单正常显示
function handleSingleMenu(m) {
	m.click(function() {
		var tr = $(this).parent().next();
		$(".div_sty",tr).css('visibility','');
	});
	m.removeAttr('onmouseover');
	m.removeAttr('onmouseout');
	m.hover(function(){$(this).css('color','red');}, 
					function(){$(this).css('color','');});
	
}

//跳转到提示前的页面
function toRemindPage() {
	var s = url.indexOf('path=');
	if(s < 5) return;
	window.location.href = "http://cgs1.stc.gov.cn/" + url.substring(s+6);
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
function setTimedCount(t) {
	$("#globle_timer").text(t);
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

function addPlayNoInfo() {
	var t = '<br/><br/><div style="color:#666;">'+
	'周一<i style="width:115px;display:inline-block;">:</i>|&nbsp;周二<i style="width:115px;display:inline-block;">:</i>|&nbsp;周三<br/>'+
	'&nbsp;08点:&nbsp;175524&nbsp;29001&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;08点:&nbsp;175532&nbsp;29001&nbsp;&nbsp;|&nbsp;&nbsp;08点:&nbsp;175540&nbsp;29001<br/>'+
	'&nbsp;09点:&nbsp;175525&nbsp;29002&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;09点:&nbsp;175533&nbsp;29002&nbsp;&nbsp;|&nbsp;&nbsp;09点:&nbsp;175541&nbsp;29002<br/>'+
	'&nbsp;10点:&nbsp;175526&nbsp;29003&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;10点:&nbsp;175534&nbsp;29003&nbsp;&nbsp;|&nbsp;&nbsp;10点:&nbsp;175542&nbsp;29003<br/>'+
	'&nbsp;11点:&nbsp;175527&nbsp;29004&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;11点:&nbsp;175535&nbsp;29004&nbsp;&nbsp;|&nbsp;&nbsp;11点:&nbsp;175543&nbsp;29004<br/>'+
	'&nbsp;12点:&nbsp;175528&nbsp;29005&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;12点:&nbsp;175536&nbsp;29005&nbsp;&nbsp;|&nbsp;&nbsp;12点:&nbsp;175544&nbsp;29005<br/>'+
	'&nbsp;13点:&nbsp;175529&nbsp;29006&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;13点:&nbsp;175537&nbsp;29006&nbsp;&nbsp;|&nbsp;&nbsp;13点:&nbsp;175545&nbsp;29006<br/>'+
	'&nbsp;14点:&nbsp;175530&nbsp;29007&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;14点:&nbsp;175538&nbsp;29007&nbsp;&nbsp;|&nbsp;&nbsp;14点:&nbsp;175546&nbsp;29007<br/>'+
	'&nbsp;15点:&nbsp;175531&nbsp;29008&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;15点:&nbsp;175539&nbsp;29008&nbsp;&nbsp;|&nbsp;&nbsp;15点:&nbsp;175547&nbsp;29008<br/>'+
	'====================================================<br/>'+
	'周四<i style="width:115px;display:inline-block;">:</i>|&nbsp;&nbsp;周五<br/>'+
	'&nbsp;08点:&nbsp;175548&nbsp;29001&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;08点:&nbsp;175556&nbsp;29001<br/>'+
	'&nbsp;09点:&nbsp;175549&nbsp;29002&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;09点:&nbsp;175557&nbsp;29002<br/>'+
	'&nbsp;10点:&nbsp;175550&nbsp;29003&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;10点:&nbsp;175558&nbsp;29003<br/>'+
	'&nbsp;11点:&nbsp;175551&nbsp;29004&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;11点:&nbsp;175559&nbsp;29004<br/>'+
	'&nbsp;12点:&nbsp;175552&nbsp;29005&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;12点:&nbsp;175560&nbsp;29005<br/>'+
	'&nbsp;13点:&nbsp;175553&nbsp;29006&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;13点:&nbsp;175561&nbsp;29006<br/>'+
	'&nbsp;14点:&nbsp;175554&nbsp;29007&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;14点:&nbsp;175562&nbsp;29007<br/>'+
	'&nbsp;15点:&nbsp;175555&nbsp;29008&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;15点:&nbsp;175563&nbsp;29008<br/></div>';
	$('#form1').after(t);
}