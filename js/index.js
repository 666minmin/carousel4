var $buttons=$("#buttonWrapper li.button");
var $slides=$("#slides");
var $imgs=$slides.children('img');
var $firstCopy=$imgs.eq(0).clone(true);
var $lastCopy=$imgs.eq($imgs.length-1).clone(true);
$slides.append($firstCopy);
$slides.prepend($lastCopy);
//第一张图片 current=1;最后一张图片current=$button.length;
var current=0;
$slides.css({transform:'translateX(-920px)'});

$("#buttonWrapper").on('click','li.button',function(e){
   var  $button=$(e.currentTarget);
   var  index=$button.index();
   goToSlide(index);
});

function goToSlide(index){
   if(index>$buttons.length-1){
        index=0;
    }else if(index<0){
        index=$buttons.length-1;
    }
    if(current===$buttons.length-1 && index===0){
        $slides.css({transform:'translateX(-'+($buttons.length+1)*920+'px)'})
             .one("transitionend",function(){
                 $slides.hide().offset();
                 $slides.css({transform:'translateX(-'+(index+1)*920+'px)'})
                 .show();
             });
 
    }else if(current===0 && index===$buttons.length-1){
        $slides.css({transform:'translateX(0px)'})
        .one("transitionend",function(){
            $slides.hide().offset();
            $slides.css({transform:'translateX(-'+(index+1)*920+'px)'})
            .show();
        });
 
    }else{
       $slides.css({transform:'translateX(-'+(index+1)*920+'px)'})
     
    }
    current=index;
}

// $("#prevBtn").on('click',function(){
//     console.log(current);
//     goToSlide(current-1);
// });
// $("#nextBtn").on('click',function(){
//     console.log(current);
//     goToSlide(current+1);
// });
var timer=setInterval(function(){
    goToSlide(current+1);

},2000);
$(".container").on('mouseenter',function(){
    window.clearInterval(timer);
});
$(".container").on('mouseleave',function(){
    timer=setInterval(function(){
        goToSlide(current+1);
    },2000);
});
document.addEventListener("visibilitychange",function(e){
    if(document.hidden){
       clearInterval(timer);
    }else{
        timer=setInterval(function(){
            goToSlide(current+1);
        },2000);
    }
 });