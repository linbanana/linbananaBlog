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

//判斷來源
var origin = window.location.origin + "\\";

if(origin.indexOf("localhost") == -1){

	origin = origin + "linbananaBlog\\";

}

include_html(origin + 'layouts\\navbar.html','navbar');
include_html(origin + 'layouts\\sidebar.html','sidebar');
include_html(origin + 'layouts\\footer.html','footer');


include_head(origin + 'static\\font-awesome-4.7.0\\css\\font-awesome.min.css');
include_head(origin + 'static\\css\\bootstrap.min.css');
include_head(origin + 'static\\css\\linbananaBlog.css');

include_body(origin + 'static\\js\\jquery-3.4.1.slim.min.js');
include_body(origin + 'static\\js\\jquery-1.11.3.min.js');
include_body(origin + 'static\\js\\popper.min.js');
include_body(origin + 'static\\js\\bootstrap.min.js');
include_body(origin + 'static\\js\\linbananaBlog.js');
include_body('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d49835d5bd6ff90');
include_body('//linbanana.disqus.com/count.js');


/***************************** include all files *****************************/

/***************************** index *****************************/
function filterBtn(html){
	document.getElementById("main").innerHTML += html;
}

function checktotal(num){

	if(num == 0){
		num = "";
	}else{
		num = "[" + num + "]";
	}

	return num;

}

var loc = window.location.href.replace(window.location.origin + "/","");
loc = loc.replace("#","");
loc = loc.replace("linbananaBlog/","");
if((loc.indexOf("index") != -1) || (loc == "")){

	var xhr = new XMLHttpRequest();
	xhr.open('GET',"article.json",true);
	xhr.send(null);
	xhr.onload = function(){
	  var datastr = JSON.parse(xhr.responseText);
	  var len  = datastr.length;
	  var HTMLnum=0, javascriptnum=0, JAVAnum=0, batnum=0, SQLnum=0, softwarenum=0, othernum=0;
	  var html = "", html_li = "";
	  for (var i = 0; i < len; i++) {

	  	switch(datastr[i].class){
		  case "HTML":
		    HTMLnum++;
		    break;
		  case "javascript":
		    javascriptnum++;
		    break;
		  case "JAVA":
		    JAVAnum++;
		    break;
		  case "bat":
		    batnum++;
		    break;
		  case "SQL":
		    SQLnum++;
		    break;
		  case "software":
		    softwarenum++;
		    break;
		  default:
		    othernum++;
		}

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

	  HTMLnum 		= checktotal(HTMLnum);
	  javascriptnum = checktotal(javascriptnum);
	  JAVAnum 		= checktotal(JAVAnum);
	  batnum 		= checktotal(batnum);
	  SQLnum 		= checktotal(SQLnum);
	  softwarenum 	= checktotal(softwarenum);
	  othernum 		= checktotal(othernum);

	  html = "<div class='clearfix col-md-12 py-2'>";
	  html += "<div id='filterBtn'>";
	  html += "<a href='javascript:void(0);' class='allItem active'>ALL</a>";
	  html += "<a href='javascript:void(0);' class='HTML'>HTML"+ HTMLnum +"</a>";
	  html += "<a href='javascript:void(0);' class='javascript'>javascript"+ javascriptnum +"</a>";
	  html += "<a href='javascript:void(0);' class='JAVA'>JAVA"+ JAVAnum +"</a>";
	  html += "<a href='javascript:void(0);' class='bat'>bat"+ batnum +"</a>";
	  html += "<a href='javascript:void(0);' class='SQL'>SQL"+ SQLnum +"</a>";
	  html += "<a href='javascript:void(0);' class='software'>software"+ softwarenum +"</a>";
	  html += "<a href='javascript:void(0);' class='other'>other"+ othernum +"</a>";
	  html += "</div></div>";
	  html += "<div class='col-md-12' id='filterList'>";
	  html += "<ul>";
	  html += html_li;
	  html += "</ul></div>";
	  filterBtn(html);

	};

}
/***************************** index *****************************/

/***************************** article *****************************/
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
  html += "<a class='page-link' href='#' onclick='change_html(1)'>&laquo;</a>";
  html += "</li>";
  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html("+ (num-1) +")'>&lt;</a>";
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
  html += "<a class='page-link' href='#' onclick='change_html("+ (num+1) +")'>&gt;</a>";
  html += "</li>";
  html += "<li class='page-item "+ disabled +"'>";
  html += "<a class='page-link' href='#' onclick='change_html("+ len +")'>&raquo;</a>";
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


