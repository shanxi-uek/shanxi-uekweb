$(function(){
	//banner
	var imgs=$('.hnz-banner img');
	var clientW=$(window).width();
	$(window).resize(imgResize);
	imgResize();
	function imgResize(){
		clientW=$(window).width();
		imgs.attr('src',function(){
			if(clientW>768){
				return $(this).attr('data-lg')
			}else{
				return $(this).attr('data-xs')
			}
		})	
	}

	var hnzLis=$('.hnz-banner li');
	var hnzBtns=$('.hnz-banner-index li');
	var hnzIndex=0;
	var hnzNext=0;
	hnzLis.each(function(i){
		if(i==0){
			return;
		}
		$(this).css("left","100%")
	})
	var hnzT=setInterval(hnzWheel,3000);
	var hnzFlag=true;
	function hnzWheel(){
		if(!hnzFlag){
			return;
		}
		hnzFlag=false;
		hnzNext++;
		if(hnzNext==hnzLis.length){
			hnzNext=0;
		}
		hnzLis.eq(hnzNext).css("left","100%")
		hnzLis.eq(hnzIndex).animate({left:"-100%"},200,function(){
			hnzFlag=true;
		});
		hnzLis.eq(hnzNext).animate({left:0},200);
		hnzBtns.eq(hnzIndex).removeClass("hnz-banner-hot");
		hnzBtns.eq(hnzNext).addClass("hnz-banner-hot");
		hnzIndex=hnzNext;
	}

	var hnzLeftBtn=$('.hnz-left');
	var hnzRightBtn=$('.hnz-right');
	hnzLeftBtn.add(hnzRightBtn).mousedown(function(){return false;})
	hnzLeftBtn.add(hnzRightBtn).hover(function(){
		clearInterval(hnzT);
	},function(){
		hnzT=setInterval(hnzWheel,3000);
	})
	hnzRightBtn.click(function(){
		hnzWheel();
	});
	hnzLeftBtn.click(hnzWheelLeft)
	function hnzWheelLeft(){
		if(!hnzFlag){return;}
		hnzFlag=false;
		hnzNext--;
		if(hnzNext==-1){hnzNext=hnzLis.length-1;}
		hnzLis.eq(hnzNext).css("left","-100%")
		hnzLis.eq(hnzIndex).animate({left:"100%"},200,function(){
			hnzFlag=true;
		});
		hnzLis.eq(hnzNext).animate({left:0},200);
		hnzBtns.eq(hnzIndex).removeClass("hnz-banner-hot");
		hnzBtns.eq(hnzNext).addClass("hnz-banner-hot");
		hnzIndex=hnzNext;
	}

	var allLis=hnzLis.get();
	touch.on(allLis, 'touchstart', function(ev){
		clearInterval(hnzT);
		ev.preventDefault();
	});
	touch.on(allLis, 'touchend', function(ev){
		hnzT=setInterval(hnzWheel,3000);
		ev.preventDefault();
	});
	touch.on(allLis, 'swiperight', function(ev){	
		ev.preventDefault();
		hnzWheelLeft();
	});
	touch.on(allLis, 'swipeleft', function(ev){
		ev.preventDefault();
		hnzWheel();
	});

})