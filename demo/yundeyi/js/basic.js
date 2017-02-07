
$(function(){

	$('#truck').click( function(){
		$('#consignor').removeClass('selected');
		$(this).addClass('selected');
		$('#downCode')[0].src = '../img/f-drv-e.png';
		return false;
	} );


	$('#consignor').click( function(){
		$('#truck').removeClass('selected');
		$(this).addClass('selected');
		$('#downCode')[0].src = '../img/f-fod-e.png';
		return false;
	} )



	$('#industry').click(  function(){

		$('#company').removeClass('selected');
		$(this).addClass('selected');

		$('#ul_new_1').removeClass('noselected_1');
		$('#ul_new_1').addClass('selected_1');
		$('#ul_new_2').removeClass('selected_1');
		$('#ul_new_2').addClass('noselected_1');
		return false;
	});

	$('#company').click(function(){

		$('#industry').removeClass('selected');
		$(this).addClass('selected');


		$('#ul_new_2').removeClass('noselected_1');
		$('#ul_new_2').addClass('selected_1');
		$('#ul_new_1').removeClass('selected_1');
		$('#ul_new_1').addClass('noselected_1');
		return false;
	});
	



	$('#new4').click( function(){

		window.open( '../pages/newsDeletail1.html','_self');

	} );

	$('#new1').click( function(){

		window.open( '../pages/newsDeletail2.html','_self');

	} );

	$('#new2').click( function(){

		window.open( '../pages/newsDeletail3.html','_self');

	} );

	$('#new3').click( function(){

		window.open( '../pages/newsDeletail4.html','_self');

	} );


	window.setInterval( function(){
		
		jump($('#toBottom1'))
		jump($('#toBottom2'))
		jump($('#toBottom3'))
		jump($('#toBottom4'))

	} ,500);



	var i=1;

	var toggleBanner = function toggleBanner(){
		var banner = $('.banner')
		if( i==1 ){

			banner.removeClass('part1')
			banner.removeClass('part3')
			banner.addClass('part2')

			$('#point2').addClass('point_selected')
			$('#point1').removeClass('point_selected')
			$('#point3').removeClass('point_selected')
			i++

		}else if( i==2 ){

			banner.removeClass('part1')
			banner.removeClass('part2')
			banner.addClass('part3')
			$('#point3').addClass('point_selected')
			$('#point1').removeClass('point_selected')
			$('#point2').removeClass('point_selected')
			i=0
		}else {

			banner.removeClass('part2')
			banner.removeClass('part3')
			banner.addClass('part1')
			$('#point1').addClass('point_selected')
			$('#point2').removeClass('point_selected')
			$('#point3').removeClass('point_selected')
			i++;
		}
	}

	timer =  window.setInterval( toggleBanner ,2000);

	$('#leftA,#rightA').mouseover(function(){

		clearInterval( timer );
		timer = null;

	}).mouseout( function(){

		if( timer == null ){

			timer =  window.setInterval( toggleBanner ,2000);
		}
		else
		{
		}

	} );

	$('#leftA').click( function(){

		i = (i+1)%3;
		toggleBanner();

	} );

	$('#rightA').click( function(){


		toggleBanner();

	} );



	function jump( o ){

		o.animate({

				top: parseInt(o.css('top'))-10

		},200,function(){

			o.animate( {

				top: parseInt(o.css('top'))+10
			},250 )
		});
	}




	$('#toBottom1').click( function(){

		$('body').animate( {
		
			scrollTop : 1300

		}, 500 );
		return false;
	} );


	$('#toBottom2').click( function(){

		$('body').animate( {
		
			scrollTop : 1970

		}, 500 );
		return false;
	} );


	$('#toBottom3').click( function(){

		$('body').animate( {
		
			scrollTop : 2670

		}, 500 );
		return false;

	} );


	$('#toBottom4').click( function(){

		$('body').animate( {
		
			scrollTop : 3380

		}, 500 );
		return false;

	} );





})