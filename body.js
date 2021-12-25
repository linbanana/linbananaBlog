/***************************** include all files *****************************/
function include_head(file) {

  var css  = document.createElement('link');
  css.setAttribute("href", file);
  css.setAttribute("rel", "stylesheet");

  document.getElementsByTagName('head').item(0).appendChild(css);

}

function include_body(file) {

  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('body').item(0).appendChild(script);

}

function include_html(file,id) {

  var html  = document.createElement('div');
  html.setAttribute("w3-include-html", file);
  document.getElementById(id).prepend(html);

}

function include_ico(file) {
  var ico  = document.createElement('link');
  ico.setAttribute("href", file);
  ico.setAttribute("type", "image/x-icon");
  ico.setAttribute("rel", "icon");

  document.getElementsByTagName('head').item(0).appendChild(ico);
}

//判斷來源
var origin = window.location.origin + "\\";

if(origin.indexOf("localhost") == -1){

	origin = origin + "linbananaBlog\\";

}
var d = new Date();
include_html(origin + 'layouts\\navbar.html','navbar');
include_html(origin + 'layouts\\sidebar.html','sidebar');
include_html(origin + 'layouts\\footer.html','footer');

include_ico(origin + 'images\\linbananaBlig.ico');

include_head(origin + 'static\\font-awesome-4.7.0\\css\\font-awesome.min.css');
include_head(origin + 'static\\font-awesome-4.7.0\\css\\font-awesome.min.css');
include_head(origin + 'static\\css\\bootstrap.min.css');
include_head(origin + 'static\\css\\linbananaBlog.css');
include_head('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');

include_body(origin + 'static\\js\\jquery-3.4.1.slim.min.js');
include_body(origin + 'static\\js\\jquery-1.11.3.min.js');
include_body(origin + 'static\\js\\bootstrap.bundle.min.js');
include_body(origin + 'static\\js\\bootstrap.min.js');
include_body(origin + 'static\\js\\linbananaBlog.js');
include_body(origin + 'static\\js\\run_prettify.js');
include_body('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d49835d5bd6ff90');
include_body('//linbanana.disqus.com/count.js');


/***************************** include all files *****************************/

/***************************** index *****************************/
// **************************************************
// **@Function: include_index(html)
// **@Description: 會判斷是否為首頁，如果有window.location.search的參數，才進行資料排序
// **************************************************

function include_index(html){
	document.getElementById("main").innerHTML += html;
}

var loc = window.location.href.replace(window.location.origin + "/","");
loc = loc.replace("#","");
loc = loc.replace("linbananaBlog/","");
if((loc.indexOf("index") != -1) || (loc == "")){
	var sort = "";
	if(window.location.search){
		sort = window.location.search;
		sort = sort.substring(1,sort.length);
	}

	var xhr = new XMLHttpRequest();
	xhr.open('GET',"article.json",true);
	xhr.send(null);
	xhr.onload = function(){
	  var datastr = JSON.parse(xhr.responseText);

	  // 依照類別排序
	  if(sort == "sort=class"){
	  	  datastr.sort(function(x, y) {
	  		  	if(x.class > y.class) return 1;
	  		  	if(x.class < y.class) return -1;
	  	  });
	  	  // console.log(datastr);
	  }

	  var len  = datastr.length;
	  var html = "", html_li = "";

	  // 定義屬性和值，預設要有 ALL 類別並把資料大小賦予該值。
	  var json={ALL: len};

	  for (var i = 0; i < len; i++) {

	  	var key = datastr[i].class;

	  	if(json[key]){
	  		//去重+统计
	  		//存在
	  		json[key]++;//取出属性值+1
	  	}else{
	  		//不存在
	  		json[key]=1;//做一个属性赋值1
	  	}

		/*-----------去重、统计已经完成-----------*/

		if(i == 0){
			html_li += "<li class='no'>";
			html_li += "<div class='card mb-4 my-4'>";
			html_li += "<button class='btn btn-danger'>";
			html_li += "<span class='spinner-border spinner-border-sm'></span>";
			html_li += "UPDATE...</button>";
			html_li += "<div class='card-body'>";
			html_li += "<h2 class='card-title'>網站持續更新中...</h2>";
			html_li += "</div>";
			html_li += "<div class='card-footer text-muted'>";
			html_li += "by<a href='https://ubin.io/linbanana0803fb'>巴那那</a>";
			html_li += "</div>";
			html_li += "</div>";
			html_li += "</li>";

		}

		html_li += "<li class='"+ datastr[i].class +"'>";
		html_li += "<div class='card mb-4'>";


		html_li += "<div class='card-body'>";
		html_li += "<h2 class='card-title'>"+ datastr[i].title +"</h2>";
		html_li += "<a href='#' onclick='change_html("+ (i+1) +")' class='btn btn-primary'>看更多 &rarr;</a>";
		html_li += "</div>";

		html_li += "<div class='card-footer text-muted fa fa-calendar'>"+ datastr[i].date +" by";
		html_li += "<a href='https://ubin.io/linbanana0803fb'>巴那那</a>";
		html_li += "<span class='badge badge-pill badge-primary float-right'>"+ datastr[i].class +"</span>";
		html_li += "</div>";

		html_li += "</div>";
		html_li += "</li>";


	  };

	  var arr2=[];

	  for(var key in json){

	  	arr2.push({name:key,count:json[key]});

	  }

	  var date_disabled, class_disabled;
	  var date_selected, class_selected;
	  // 依照類別排序
	  if(sort == "sort=class"){
	  	arr2.sort(function(x,y){
	  		if(x.key > y.key) return 1;
	  		if(x.key < y.key) return -1;
	  	});
	  	class_disabled = "disabled";
	  	class_selected = "selected";

	  }else{
	  	date_disabled = "disabled";
	  	date_selected = "selected";
	  }

	  // filterBtn
	  html = "<div class='clearfix col-md-12 py-2'>";
	  html += "<select id='sort' class='custom-select-sm col-12 my-2'>";
	  html += "<option value='date' "+ date_disabled + " " + date_selected + ">依照日期排序</option>";
	  html += "<option value='class' "+ class_disabled + " " + class_selected + ">依照類別排序</option>";
	  html += "</select>";
	  html += "<div id='filterBtn'>";

	  for(var i=0;i<arr2.length;i++){

	  	if(i == 0){
	  		html += "<a href='javascript:void(0);' class='allItem active col-12'>"+ arr2[i].name;
	  	}else{
	  		html += "<a href='javascript:void(0);' class='"+ arr2[i].name +" col-6'>"+ arr2[i].name;
	  	}

	  	html += "<span class='badge badge-pill badge-primary float-right'>" + arr2[i].count + "</span>";
	  	html += "</a>";

	  }

	  html += "</div></div>";

	  // filterList
	  html += "<div class='col-md-12' id='filterList'>";
	  html += "<ul>";
	  html += html_li;
	  html += "</ul></div>";
	  include_index(html);

	};

}
/***************************** index *****************************/

/***************************** article *****************************/
// **************************************************
// **@Function: change_html(num)，find_page(num)，include(file,num,len)
// **@Description: 當點擊文章時會觸發 change_html(num)，
// 然後依window.location.search判斷目前頁數進行find_page(num)，
// 最後才透過include(file,num,len)將文章顯示出來並處理分頁。
// **************************************************

function include(file,num,len) {

  var html = document.createElement('div');
  html.setAttribute("w3-include-html", file);
  html.setAttribute("id", "article");
  document.getElementById("main").prepend(html);

  /************************ 分頁 ************************/
  var startnum = 0, endnum = 0;
  var disabled = "";
  num = parseInt(num);

  startnum = num - 2;
  endnum = num + 2;

  if(num <= 2){
  	startnum = 1;
  	endnum = 5;
  }

  if(num >= (len-2)){
  	startnum = len - 4;
  	endnum = len;
  }

  html = "<ul class='pagination justify-content-center mb-4'>";

  if(num === 1){
  	disabled = "disabled";
  }

  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html(1)'><i class='fa fa-fast-backward' aria-hidden='true'></i></a>";
  html += "</li>";
  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html("+ (num-1) +")'><i class='fa fa-step-backward' aria-hidden='true'></i></a>";
  html += "</li>";

  for (var i = startnum; i <= endnum; i++) {

  	if(i == num){
  		disabled = "disabled";
  	}else{
  		disabled = "";
  	}

  	html += "<li class='page-item "+ disabled +"'>";
  	html += "<a class='page-link' href='#' onclick='change_html("+ i +")'>"+ i +"</a>";
  	html += "</li>";

  }

  if(num === len){
  	disabled = "disabled";
  }

  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html("+ (num+1) +")'><i class='fa fa-step-forward' aria-hidden='true'></i></a>";
  html += "</li>";
  html += "</li>";
  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html("+ len +")'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>";
  html += "</li>";
  html += "</ul>";

  if(document.getElementById("Pagination")){
  	document.getElementById("Pagination").innerHTML += html;
  }
  /************************ 分頁 ************************/

}

function find_page(num){
	var html = "", datastr = "";

	var xhr = new XMLHttpRequest();
	xhr.open('GET',origin + "article.json",true);
	xhr.send(null);
	xhr.onload = function(){
	  datastr = JSON.parse(xhr.responseText);
	  var len  = datastr.length;

	  if(num > len){
	  	var htmlurl = origin + "404.html";
	  	window.location = htmlurl;
	  }

	  for (var i = 0; i < len; i++) {

	  	if(i == (num-1)){
	  		html = origin + datastr[i].url;
	  		include(html,num,len);
	  		break;
	  	}

	  }
	}


}

function change_html(num){

	var htmlurl = origin + "article\\article.html?page=" + num;
	window.location = htmlurl;

}

if(window.location.search){
	var page = window.location.search;
	page = parseInt(page.substring(6,page.length));
	find_page(page);
}
/***************************** article *****************************/


