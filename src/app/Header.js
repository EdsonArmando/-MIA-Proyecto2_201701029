$(document).ready(function(){
  $(window).scroll(function () {
      if($(this).scrollTop()>0){
         $('nueva').addClass('nueva2');
      }else{
        $('nueva').removeClass('nueva2');
      }
  });
});
