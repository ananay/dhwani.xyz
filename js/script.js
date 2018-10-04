$(document).ready(function(){

	window.cards = {

		current: 1,
		count: $(".menu-item").length,
		inAnimation: false,

		open: function(n){
			if(n < 1 || n > this.count || n == this.current || this.inAnimation){
				return false;
			}

			this.inAnimation = true;

			$("#menu-highlight").stop().velocity({
				left: $(window).width() / cards.count * (n - 1)
			}, {
				duration: 800,
				easing: "easeInQuart",
			});

			$(".menu-item").removeClass("active-menu-item");
			$("#menu-item-"+n).addClass("active-menu-item");

			if(this.current == 1){
				$("#right-card, #left-card").stop().velocity({
					"top": "0%",
					"scaleX": "1.0",
					"scaleY": "1.0",
					"opacity": "1",
				},{
					duration: 800,
					easing: "easeInQuart"
				});	

				setTimeout(function(){
					cards.inAnimation = false;

					if(cards.current != 1){
						$("#hero").css("display", "none");
					}

					if(cards.current != 1){
						$("#right-card-content-" + (n-1)).velocity("scroll", {
							duration: 800,
							container: $("#right-card"),				
							easing: "easeOutQuart",
						});

						$("#left-card-content-" + (n-1)).velocity("scroll", {
							duration: 800,
							container: $("#left-card"),
							easing: "easeOutQuart"
						});

						this.current = n;
						return true;

					}
				}, 800);

			}else if(n == 1){
				$("#hero").css("display", "block");
				$("#right-card, #left-card").stop().velocity({
					"scaleX": "0.85",
					"scaleY": "0.85",
					"top": "100%",					
					"opacity": "0.3"
				},{
					duration: 800,
					easing: "easeInQuart"
				});		
				setTimeout(function(){
					cards.inAnimation = false;
				}, 800);
				this.current = 1;
				return true;
			}

			$("#right-card-content-" + (n-1)).velocity("scroll", {
				duration: 800,
				container: $("#right-card"),				
				easing: "easeInQuart",
			});

			$("#left-card-content-" + (n-1)).velocity("scroll", {
				duration: 800,
				container: $("#left-card"),
				easing: "easeInQuart"
			});

			$("#left-card, #right-card").stop().velocity({
				"scaleX": "0.85",
				"scaleY": "0.85",
			},{
				duration: 400,
				easing: "easeInQuart"
			}).velocity({
				"scaleX": "1",
				"scaleY": "1",
			},{
				duration: 400,
				easing: "easeInQuart"
			});		

			setTimeout(function(){
				cards.inAnimation = false;
			}, 800);

			this.current = n;
			return true;
		}
	}

	window.menu = {
		
		status: false,
		
		open: function(){
			if(this.status){
				return false;
			}
			this.status = true;

			$("header").removeClass("header-closed");

			$("header, .menu-item").stop().velocity({
				"height": "100px"
			}, {
				easing: "easeOutQuart",
				duration: 300
			});

			$("#toggle-menu").stop().velocity({
				"top": "120px",
			}, {
				easing: "easeInQuart",
				duration: 300
			});

			$("#toggle-menu-inner").stop().velocity({
				height: "28px",
				width: "28px"
			}, {
				easing: "easeInQuart",
				duration: 300
			});

			$("#toggle-menu-inner img").stop().velocity({
				"opacity": "1"
			}, {
				easing: "easeInQuart",
				duration: 300
			});

			$("#dis").css("display", "block").stop().velocity({
				"opacity": "1"
			}, {
				easing: "easeInQuart",
				duration: 300
			});

		},
		close: function(){
			if(!this.status){
				return false;
			}
			this.status = false;

			$("header").addClass("header-closed");

			$("header, .menu-item").stop().velocity({
				height: "4px",				
			}, {
				easing: "easeInQuart",
				duration: 200,
			});			

			$("#toggle-menu-inner").stop().velocity({
				height: "17px",
				width: "17px"
			},{
				easing: "easeOutQuart",
				duration: 200				
			});

			$("#toggle-menu").stop().velocity({
				"top": "20px",
			}, {
				easing: "easeInQuart",
				duration: 200
			});

			$("#toggle-menu-inner img").stop().velocity({
				"opacity": "0"
			},{
				easing: "easeOutQuart",
				duration: 200				
			});

			$("#dis").stop().velocity({
				"opacity": "0"
			}, 300);

			setTimeout(function(){
				if(!menu.status){
					$("#dis").css("display", "none");
				}
			}, 300);
		}
	}


	$("#hero-down").click(function(){
		cards.open(2);
	});


	$(window).keydown(function (e){

		if(e.keyCode == 38 && cards.current > 1){
			cards.open(cards.current - 1);
			e.preventDefault();
		}else if(e.keyCode == 40 && cards.current < 5){
			cards.open(cards.current + 1);
			e.preventDefault();
		}else if(e.keyCode == 27 && menu.status){
			menu.close();
		}else if(e.keyCode == 9){
			e.preventDefault();
			return false;
		}

	});


	$("#toggle-menu").click(function(){
		if(menu.status){
			menu.close();
		}else{
			menu.open();			
		}
	});


	$(".menu-item").click(function(){
		var n = $(this).attr("id").substr(10);
		if(cards.open(Number(n))){
			menu.close();
		}	
	});


	$(".left-card-content .btn").click(function(){
		var n = Number($(this).parent().attr("id").substr(-1));
		if(n <= 4){
			cards.open(n+2);
		}
	});

	$(document).mousewheel(function(e){
		if(e.deltaY * e.deltaFactor < -250 && cards.current <= 4){
			cards.open(cards.current + 1);
			if(menu.status){
				menu.close();
			}
		}else if(e.deltaY * e.deltaFactor > 250 && cards.current >= 2){
			cards.open(cards.current - 1);
			if(menu.status){
				menu.close();
			}
		}
	});

	$("#dis").click(function(){
		if(menu.status){
			menu.close();
		}
	});
});