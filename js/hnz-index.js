$(function(){
	//导航 小屏 点击按钮显示 菜单列表
	var minNavMore=$('.min-nav-more');
	var minNavList=$('.min-nav-list');
	var flag=true;
	touch.on('.min-nav-more','tap',function(){
		if(flag){
			flag=false;
			minNavList.css('height','auto');
		}else{
			flag=true;
			minNavList.css('height','0')
		}
	})
	//banner
	var imgs=$('.hnz-banner img');
	var clientW=$(window).width();
	$(window).resize(imgResize);
	imgResize();
	function imgResize(){
		clientW=$(window).width();
		imgs.attr('src',function(){
			if(clientW>768){
				console.log(1)
				return $(this).attr('data-lg')
			}else{
				console.log(2)
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
		
	hnzWheelLeft();
	console.log("向右滑动.");
	});
	touch.on(allLis, 'swipeleft', function(ev){
	console.log("向左滑动.");
		hnzWheel();
	});

	//学生作品
	var stuLinks=$('.stu-l-t a');
	stuLinks.each(function(i){
		this.index=i;
	})
	var stuLists=$('.stu-l-list>ul');
	touch.on('.stu-l-t a','tap', function(ev){
		var Elm=this.nodeName=='SPAN'?this.parentNode:this;
		stuLinks.removeClass("hnz-stu-hot");
		$(Elm).addClass("hnz-stu-hot");
		stuLists.css('display','none').eq(Elm.index).css("display",'block');
	});

	//stu-l-t
	var stuLT=$('.stu-l-t');
	touch.on(stuLT[0], 'touchstart', function(ev){
		ev.preventDefault();
	});
	var ow=stuLT.width()-clientW;
	touch.on(stuLT[0], 'swiperight', function(ev){
		stuLT[0].style.left = "0px";
	});
	touch.on(stuLT[0], 'swipeleft', function(ev){
		stuLT[0].style.left = -ow+'px';
	});
})