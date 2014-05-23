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
	//var btn = $("#form1 input:first");
	//btn.unbind("click");
	//btn.get(0)=function(){}
	//btn.removeAttr('onclick','');
	//btn.click(function() {
		$("#type").val("dl");
		$("#form1").submit();
	//});
} else if(url == "http://cgs1.stc.gov.cn/TestOrderMonthsInfo_Sanxue.aspx") { //查询界面
	addTimer();
	setTimedCount(10);
	if($("#Button1").val()) setTimeout('$("#Button1").click()', 10000);
	else setTimeout("toURL('TestOrderMonthsInfo_Sanxue.aspx')", 10000);
} else if(url.indexOf("oauth/stc_auth") > 5) { //验证界面
	if($("body").attr("id") == "t" || $("body").text() == "") { 
		addTimer();
		setText("验证失败！20秒后自动跳转刷新或点击<a style='color:blue;font-size:20px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>重新登录</a>");
		setTimedCount(20);
		setTimeout("toLogin()", 20000);
	}
} else if(url == "http://cgs.stc.gov.cn/" || url == "http://cgs1.stc.gov.cn/" || url == "http://cgs1.stc.gov.cn/index.aspx") {
	setText("<a style='color:red;font-size:40px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>点击进入散学登录</a>");
	if(url == "http://cgs.stc.gov.cn/") $("#ad").css('display', 'none');
} else if(url.indexOf("CoutesyReminder.html") > 5) { //又一个提示页面
	addTimer();
	var tex = $("#lbltishi").text();
	if(tex.indexOf("系统繁忙") >= 0) {
		setText("系统说它忙！20秒后自动跳转刷新或点击<a style='color:blue;font-size:20px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>重新登录</a>");
		
		setTimeout("toRemindPage()",20000);
	}
} else if(url.indexOf("Exam1_Sanxue.aspx") > 5) { //科目一预约
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
		setText("该场次已满，请迅速手动重新打开页面！");
		//return;
	} else {
		setText("请超快速输验证码然后提交。");
		//autoT = setTimeout("submitExam1()",20000);
		//setText("请手动输验证码，20秒后自动提交。<input value='取消自动' type='button' id='cancelSubmit'/>");
		//$("#cancelSubmit").click(function(){
		//	clearTimeout(autoT);
		//	setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
		//	$("#txtVail").focus();
		//});
		$("#txtVail").focus();
	}
	addPlayNoInfo1();
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
		setText("该场次已满，请迅速手动重新打开页面或在下方修改场次！");
		//return;
	} else {
		//autoT = setTimeout("submitExam1()",20000);
		setText("请超快速输验证码然后提交。");
		//$("#cancelSubmit").click(function(){
		//	clearTimeout(autoT);
		//	setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
		//	$("#txtVail").focus();
		//});
		$("#txtVail").focus();
	}
	addPlayNoInfo2();
} else if(url.indexOf("Exam3_Sanxue.aspx") > 5) { //科目三预约
	addTimer();
	$("#HiddenFieldshift_id").attr('type','text');
	$("#HiddenFieldshift_no").attr('type','text');
	$("#HiddenFieldshift_id").before('场次ID:');
	$("#HiddenFieldshift_no").before('场次NO:');
	$("#HiddenFieldshift_no").after('<input type="button" value="改下一天同场" id="changeToNext3"/>');
	$("#HiddenFieldshift_no").after('<input type="button" value="改下一场" id="changeToNext2"/>');
	$("#changeToNext2").click(function(){
		fChangeToNext2();
	});
	$("#changeToNext3").click(function(){
		fChangeToNext3();
	});
	if($("#LabelAllowNum").text().substring(1) == '/0') {
		setText("该场次已满，请迅速手动重新打开页面！");
		//return;
	} else {
		setText("请超快速输验证码然后提交。");
		//autoT = setTimeout("submitExam1()",20000);
		//setText("请手动输验证码，20秒后自动提交。<input value='取消自动' type='button' id='cancelSubmit'/>");
		//$("#cancelSubmit").click(function(){
		//	clearTimeout(autoT);
		//	setText("请手动输验证码，20秒后手动点‘确定预约’按钮！");
		//	$("#txtVail").focus();
		//});
		$("#txtVail").focus();
	}
	addPlayNoInfo3();
} else if(url.indexOf("dengjichenggongtishi.aspx") > 5) { //验证失败
		addTimer();
		setText("验证失败！20秒后自动跳转到登录界面或点击<a style='color:blue;font-size:20px;text-decoration:underline' href='http://cgs1.stc.gov.cn/SanXueYueKao.aspx'>重新登录</a>");
		setTimeout("toLogin()", 20000);
} else if(url.indexOf("cgs1.stc.gov.cn/") > 0) { //其它页面
	addTimer();
}

//科目二改下一场
function fChangeToNext2() {
	var i = parseInt($("#HiddenFieldshift_id").val());
	var n = parseInt($("#HiddenFieldshift_no").val());
	//if(i == 175563) {
	//	alert("没有下场了，下次再试吧！"); return;
	//}
	i = i+1;
	n = n+1;
	if(n == 29009) n = 29001; //科目二
	if(n == 28985) n = 28981; //科目一
	if(n == 34153) n = 34141; //科目三
	$("#HiddenFieldshift_id").val(i);
	$("#HiddenFieldshift_no").val(n);
}
function fChangeToNext3() {
	var i = parseInt($("#HiddenFieldshift_id").val());
	//var n = parseInt($("#HiddenFieldshift_no").val());
	//if(i == 175563) {
	//	alert("没有下场了，下次再试吧！"); return;
	//}
	i = i+12;
	//n = n;
	//if(n == 29009) n = 29001; //科目二
	//if(n == 28985) n = 28981; //科目一
	//if(n == 34153) n = 34141; //科目三
	$("#HiddenFieldshift_id").val(i);
	//$("#HiddenFieldshift_no").val(n);
}
function submitExam1() {
	$("#Button1").click();
}

//加载菜单
function loadAgain() {
	var leftFrame = window.frames['leftmain'].document;
	var nav = $("#navitable", leftFrame);
	alert(nav.attr("id"));
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
	
	var mainFrame = window.frames['mainframe'].document;
	
	addTimer2(mainFrame);
	$("body", mainFrame).prepend("<div id='info_text' style='color:red;font-size:25px;padding:20px;height:90px;position:fixed;top:0;left:90px'></div>");
	var txt = $("#form1", mainFrame).text(); var ifE=0;
	if(txt.indexOf("没有任何一个科目") > 1) {$("#info_text", mainFrame).append("<br/><span style='background-color: #ff0;'>暂时不能约考！</span>");ifE=1;}
	else if(txt.indexOf("科目一") > 1) $("#info_text", mainFrame).append("<br/><span style='background-color: #ff0;'>可约科目一！</span>");
	else if(txt.indexOf("科目二") > 1) $("#info_text", mainFrame).append("<br/><span style='background-color: #ff0;'>可约科目二！</span>");
	else if(txt.indexOf("科目三") > 1) $("#info_text", mainFrame).append("<br/><span style='background-color: #ff0;'>可约科目三！</span>");
	if(ifE==0) {
		$("#info_text", mainFrame).prepend("19秒后<span id='auto_m'>将自动</span>打开预约界面<input value='取消自动' type='button' id='cancelSubmit'/>，然后请在1秒内快速填完验证码然后提交！<br/>"
								+ "<a id='l_exam1' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam1_Sanxue.aspx'>约科一</a>"
								+ "<a id='l_exam2' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam2_Sanxue.aspx'>约科二</a>"
								+ "<a id='l_exam3' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam3_Sanxue.aspx'>约科三</a>"
								+ "<a style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/TestOrderMonthsInfo_Sanxue.aspx'>预约情况</a>");
		var autoO = setTimeout("openExamPage()",18500);
		$("#cancelSubmit", mainFrame).click(function(){
			clearTimeout(autoO);
			$(this).hide();
			$("#info_text #auto_m", mainFrame).text("请手动");
		});
	} else {
		$("#info_text", mainFrame).prepend("没有约考资格！<br/>"
								+ "<a id='l_exam1' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam1_Sanxue.aspx'>约科一</a>"
								+ "<a id='l_exam2' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam2_Sanxue.aspx'>约科二</a>"
								+ "<a id='l_exam3' style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/Exam3_Sanxue.aspx'>约科三</a>"
								+ "<a style='color:blue;font-size:16px;text-decoration:underline;margin-right:10px' target='_blank' href='http://cgs1.stc.gov.cn/TestOrderMonthsInfo_Sanxue.aspx'>预约情况</a>");
	}
}
function openExamPage() {
	var mainFrame = window.frames['mainframe'].document;
	var txt = $("#info_text span:last", mainFrame).text();
	if(txt.indexOf("科目一") > 1) window.open("http://cgs1.stc.gov.cn/Exam1_Sanxue.aspx", "_blank");
	else if(txt.indexOf("科目二") > 1) window.open("http://cgs1.stc.gov.cn/Exam2_Sanxue.aspx", "_blank");
	else if(txt.indexOf("科目三") > 1) window.open("http://cgs1.stc.gov.cn/Exam3_Sanxue.aspx", "_blank");
		
	$("#info_text input:first", mainFrame).hide();
	$("#info_text #auto_m", mainFrame).text("请手动");	
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
//跳转到指定页面
function toURL(url) {
	window.location.href = "http://cgs1.stc.gov.cn/" + url;
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

var selector;
//加入时钟DIV，默认20秒
function addTimerDiv2() {
	if(!$("#globle_timer", selector).attr('id'))
		$("body", selector).prepend("<div id='globle_timer' style='color:green;font-size:50px;padding:20px;height:90px;position:fixed;top:0;left:0'>19</div>");
}
function setTimedCount2(t, selector) {
	$("#globle_timer", selector).text(t);
}
//添加时钟，默认20秒
function addTimer2(sel) {
	selector = sel;
	addTimerDiv2();
	
	setTimeout("timedCount2()",1000);
}
//时钟倒计时
function timedCount2() {
	var t = $("#globle_timer", selector).text();
	if(!t) return;
	else if(t>1) {
		t = t-1;
		$("#globle_timer", selector).text(t);
		setTimeout("timedCount2()",1000);
	} else if(t==1) {
		$("#globle_timer", selector).text("GO");
	}
}

//自动刷新
function autoRefreshPage() {
	setTimeout("refreshPage()",3000);
}
function refreshPage() {
	location.reload();
}

function addPlayNoInfo1() {
	var t = '<br/><br/><div style="color:#666;">场次ID逐场递增，场次NO如下：<br/>'+
	'&nbsp;15点:&nbsp;28981<br/>'+
	'&nbsp;16点:&nbsp;28982<br/>'+
	'&nbsp;17点:&nbsp;28983<br/>'+
	'&nbsp;18点:&nbsp;28984<br/></div>';
	$('#form1').after(t);
}
function addPlayNoInfo2() {
	var t = '<br/><br/><div style="color:#666;">场次ID逐场递增，场次NO如下：<br/>'+
	'&nbsp;08点:&nbsp;29001<br/>'+
	'&nbsp;09点:&nbsp;29002<br/>'+
	'&nbsp;10点:&nbsp;29003<br/>'+
	'&nbsp;11点:&nbsp;29004<br/>'+
	'&nbsp;12点:&nbsp;29005<br/>'+
	'&nbsp;13点:&nbsp;29006<br/>'+
	'&nbsp;14点:&nbsp;29007<br/>'+
	'&nbsp;15点:&nbsp;29008<br/></div>';
	$('#form1').after(t);
}
function addPlayNoInfo3() {
	var t = '<br/><br/><div style="color:#666;">场次ID逐场递增，场次NO如下：<br/>'+
	'&nbsp;08点:&nbsp;34141<br/>'+
	'&nbsp;09点:&nbsp;34142<br/>'+
	'&nbsp;10点:&nbsp;34143<br/>'+
	'&nbsp;11点:&nbsp;34144<br/>'+
	'&nbsp;12点:&nbsp;34145<br/>'+
	'&nbsp;13点:&nbsp;34146<br/>'+
	'&nbsp;14点:&nbsp;34147<br/>'+
	'&nbsp;15点:&nbsp;34148<br/>'+
	'&nbsp;16点:&nbsp;34149<br/>'+
	'&nbsp;17点:&nbsp;34150<br/>'+
	'&nbsp;18点:&nbsp;34151<br/>'+
	'&nbsp;19点:&nbsp;34152<br/></div>';
	$('#form1').after(t);
}