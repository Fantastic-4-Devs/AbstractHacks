$(document).ready(function(){
    $('img').wrap('<div class="pic"><div class="panel">');
    $('.panel').append('<div></div>');
    leftClip = 0;
    topClip = 0;
    topPos = 0;
    leftPos = 0;
    rotate = 0;
    width = $('body').width();
    height = $('body').height();
    pics = $('body').find('.panel div');
    names = ["Bark Twain", "Chewbarka", "Doc McDoggins", "Droolius Caesar", "Franz Fur-dinand", "Fyodor Dogstoevsky & <br>Leo Chew-toy", "Hairy Paw-ter", "Sarah Jessica Barker", "Kareem Abdul Ja-Bark", "Rick & Gary"];
  
    for (let j = 0; j < 11; j++) {
       $(pics[j]).attr('data-num', (j + 1)).append('<span>' + names[j] + '</span>');
    }
  
    $('.panel div').hover(function() {
      $('body').toggleClass('active');
        var picNum = $(this).attr('data-num');
        if (picNum > 6){
          var num =  (rotate - (picNum * 30)) + 6;
        }else{
          var num =  (rotate - (picNum * 30)) + 18;
      } 
        
        
    $(".clip").get(0).style.setProperty( "--zoom", num + "deg");
    });
    $('.panel').mouseleave(function() {
        $('body').removeClass('zoom').removeClass('active'); 
      });
   $('body').click(function(){
           if ($('body').hasClass('active')){
             $(this).toggleClass('zoom');
           }
      });
  
$(document).on('mousemove', function(e){
  
   leftPos = e.pageX;
   topPos = e.pageY;
   leftRot =  leftPos/(width/100);
   leftClip =  (leftPos/(width/30) + 37.5);
   topRot =  topPos/(width/50);
   topShift =  ((height/2) - topPos) * -0.0125;
   topClip =  (topPos/(height/80) + 12.5);
   rotate = (leftRot * 3);
   rotate2 = ((leftRot/6) * 1.8) - 15;
   rotateY = ((topRot * -3.6)/5) - 80;

  $(".wrap").get(0).style.setProperty( "--bg", (leftRot * 6) + "px");
  $(".wrap").get(0).style.setProperty( "--rotateY", rotateY + "deg");
  $(".wrap").get(0).style.setProperty( "--rotateWrap", rotate + "deg");
  $(".clip").get(0).style.setProperty(
          "--clip", "radial-gradient(circle at bottom, transparent, transparent 5vw, rgba(255,255,255,0.5) 5.5vw, rgba(255,255,255,0.5)) calc(" + leftClip + "vw - 100vw) calc(" + (topClip - 100) + "vh + 0.015px) / 200% 100% no-repeat, radial-gradient(circle at " + leftClip + "% " + topClip + "%, transparent, transparent 5vw, rgba(255,255,255,0.5) 5.5vw, rgba(255,255,255,0.5)), linear-gradient(85deg, rgba(255,255,255,0.5) calc(100% - 5.5vw), transparent calc(100% - 5vw)) calc(" + (leftClip - 0) + "vw - 200vw) " + topClip + "vh / 200% 200% no-repeat, linear-gradient(-85deg, rgba(255,255,255,0.5) calc(100% - 5.5vw), transparent calc(100% - 5vw)) calc(" + (leftClip + 0) + "vw + 0vw) " + topClip + "vh / 200% 200% no-repeat");
  $(".clip").get(0).style.setProperty( "--rotate2", rotate2 + "deg");
  $(".clip").get(0).style.setProperty( "--x", rotate2 + "vw");
  $(".clip").get(0).style.setProperty( "--y", topShift + "vh");
});
setTimeout(function(){
  $('body').addClass('ready')
}, 2000);
});