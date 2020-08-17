function include(file) {

  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('body').item(0).appendChild(script);

}

/* Include Many js files */
<<<<<<< HEAD
include('./Scripts/jquery-3.4.1.slim.min.js');
include('./Scripts/jquery-1.11.3.min.js');
include('./Scripts/popper.min.js');
include('./Scripts/bootstrap.min.js');
include('./Scripts/linbananaBlog.js');
include('./s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d49835d5bd6ff90');
include('./linbanana.disqus.com/count.js');
=======
include('\\linbananaBlog/Scripts/jquery-3.4.1.slim.min.js');
include('\\linbananaBlog/Scripts/jquery-1.11.3.min.js');
include('\\linbananaBlog/Scripts/popper.min.js');
include('\\linbananaBlog/Scripts/bootstrap.min.js');
include('\\linbananaBlog/Scripts/linbananaBlog.js');
include('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d49835d5bd6ff90');
include('//linbanana.disqus.com/count.js');
>>>>>>> parent of abdfbef... Update body.js
