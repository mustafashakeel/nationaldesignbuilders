jQuery(document).ready(function($) {
    "use strict";

/*********** Parallax ************************************************************/
    
    $('.revel-parallax').each(function(){
        var parallax_amount = $(this).data('parallax');
        if(!jQuery.browser.mobile){
            $(this).css('background-image', 'url(' + $(this).data('background_image') + ')');
            $(this).parallax("50%", parallax_amount,false);
        }
        else{
            $(this).css('background-attachment', 'scroll');
        }
    });


/*********** Parallax ************************************************************/
    $('.ABt_testimonials_wrapper').each(function() {
        var $slider = $(this).find('.ABt_testimonials_slide');
        var fx = $slider.data("fx");
        var play = $slider.data("play");
        var easing = $slider.data("easing");
        var direction = $slider.data("direction");
        var duration = parseInt($slider.data("duration"), 10);
        var pauseonhover = $slider.data("pauseonhover");
        var timeoutduration = parseInt($slider.data("timeoutduration"), 10);
        var $prev = $(this).find('.ABt_prev');
        var $next = $(this).find('.ABt_next');
        var $pagination = $(this).find('.ABt_pagination');
        $slider.carouFredSel({
            prev   : $prev,
            next   : $next,
            pagination: $pagination,
            direction       : direction,
            responsive : true,
            auto   : {
                play            : play,
                fx              : fx,
                easing          : easing,
                duration        : duration,
                pauseOnHover    : pauseonhover,
                timeoutDuration : timeoutduration
            },
            scroll   : {
                fx              : fx,
                easing          : easing,
                duration        : duration
            },
            width  : 'auto',
            items  : {
                visible:1
            }
        });
    });


    function revel_resize_video_bg($section){
        var $video = $section.find('.revel_video_background');
        $video.width('auto');
        var video_height = $video.height();
        var ratio = $video.width()/video_height;
        var difference = $section.height()-video_height;
        if(difference>0){
            $video.width((video_height+difference)*ratio);
        }
    }

    $('.revel-video-bg').each(function(){
        revel_resize_video_bg($(this));
        $(this).find('.revel_video_background').css({'visibility':'visible'});
    });


/*********** Animations ************************************************************/
    if(!jQuery.browser.mobile){
        $(".revel-animo").one('inview', function(event, isInView) {
            if (isInView) {
                var animation = $(this).data('animation');
                var duration = $(this).data('duration')/1000;
                var delay = parseInt($(this).data('delay'),10);
                var $element = $(this);
                $element.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
            }
        });
    }
    else{
        $(".revel-animo").css({visibility: "visible"});
    }

    $(".revel-animo-children").one('inview', function(event, isInView) {
        var animation = $(this).data('animation');
        var duration = $(this).data('duration')/1000;
        var delay = parseInt($(this).data('delay'),10);
        if (isInView) {
            $(this).children().each(function(){
                var $element = $(this);
                $element.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
            });
        }
    });


/*********** Accordions ************************************************************/
    $( ".revel-accordion" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        create: function( event, ui ) {
            var expanded = $(this).data("expanded");
            if(expanded===0){
                expanded = false;
            }
            else{
                expanded = expanded-1;
            }
            $(this).accordion( "option", "active", expanded);
        },
    }); 


/*********** Tabs ************************************************************/
    $('.revel-tabs').each(function() {
        var $tabs = $(this);
        var effect = $tabs.data("effect");
        var optionSelected = $tabs.data("selected")-1;
        var directions;
        if($tabs.hasClass('revel-tabs-horizontal')){
            directions = {'after':'right', 'before':'left'};
        }
        else{
            directions = {'after':'down', 'before':'up'};
        }
        $tabs.tabs({ 
            active:optionSelected,
            beforeActivate: function( event, ui ) {
                if(effect==='slide'){
                    var parent = ui.oldPanel.parent();
                    var diffHeight = parent.height() - (ui.oldPanel.height() - ui.newPanel.height());
                    parent.animate({height: diffHeight}, 300, function() {
                        parent.height('auto');
                    });
                    if (ui.newTab.index() > ui.oldTab.index()){
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.after, duration: 400 } );
                    }
                    else{
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.before, duration: 400 } );
                    }
                }
                else if(effect==='fade'){
                    $tabs.tabs( "option", "show", true );
                }
            },
        });
    });

    function revel_tabs_responsive(){
        $('.revel-tabs').each(function(){
            var $tabs = $(this);
            if($tabs.width() < parseInt($tabs.data('break_point'),10)){
                $tabs.addClass('revel-tabs-fullwidthtabs');
            }
            else{
                $tabs.removeClass('revel-tabs-fullwidthtabs');
            }
        });
    }

    revel_tabs_responsive();



/*********** Alert Box ************************************************************/
    $( ".revel_alert_box_close" ).on( "click", function(){
        var $parent = $(this).parent();
        $parent.animate({height:"0px", paddingTop:"0px", paddingBottom:"0px", margin:"0px", opacity:"0"},400);
    });


/*********** Stats excerpt counter ************************************************************/
    function revel_counter($object,interval,max,increment,se_timer) {
        var number = parseInt($object.text(),10) + increment;
        if (number < max){
            se_timer = setTimeout(function() {revel_counter($object,interval,max,increment);} ,interval);
            $object.text(number);
        }
        else{
            $object.text(max);
            clearTimeout(se_timer);
        }
    }

    if(!jQuery.browser.mobile){
        $(".revel_stats_number").one('inview', function(event, isInView) {
            if (isInView) {
                var max = $(this).data("number");
                var increment = 1;
                if (max > 50) increment = 10;
                if (max > 500) increment = 100;
                if (max > 5000) increment = 200;
                if (max > 10000) increment = 1000;
                var interval = $(this).data("duration")/(max/increment);
                $(this).text('0');
                var se_timer;
                revel_counter($(this),interval,max,increment,se_timer);
            }
        });
    }
    else{
        $(".revel_stats_number").each(function() {
            var max = $(this).data("number");
            $(this).text(max);
        });
    }


/*********** Knob ************************************************************/
    $(".revel_knob_wrapper").each(function(){
        var $knob = $(this).find(".revel_knob");
        var $number_sign = $(this).find(".revel_knob_number_sign");
        var $number = $(this).find(".revel_knob_number");

        $knob.knob({
            'displayInput' : false,
        });

        var canvas_width = $(this).find("canvas").width();

        $number_sign.css({
            'visibility' : 'visible',
            'lineHeight' : canvas_width+'px',
        });
    
        if(!jQuery.browser.mobile){
            $knob.val(0).trigger('change');
            $(this).one('inview', function(event, isInView) {
                if (isInView) {
                    $({value: 0}).animate({value: $knob.data("number")}, {
                        duration: 1000,
                        easing:'swing',
                        step: function() 
                        {
                            var current = Math.ceil(this.value);
                            $knob.val(current).trigger('change');
                            $number.html(current);
                        }
                    })
                }
            });
        }
        else{
            $number.html($knob.data("number"));
        }
    });

    

/*********** PrettyPrint ************************************************************/
    $(function(){
      window.prettyPrint && prettyPrint(); 
    });


/*********** Tooltip ************************************************************/
    $('.revel_tooltip').tipsy({
        fade: true,
        opacity: '0.8',
        gravity: function(){
            var gravity = $(this).data("gravity");
            gravity = (gravity !== undefined) ? gravity : 's';
            return gravity;
        }
    });


/*********** Back to Top ************************************************************/
    $('.revel_divider a').on( "click", function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });


/*********** Team Member ************************************************************/
    $('.revel_team_member_modal_link').on( "click", function(e){
        e.preventDefault();
        var $parent = $(this).closest('.revel_team_member');
        var $modal = $parent.find('.revel_team_member_modal');
        var $section = $parent.closest('.revel_section_DD');
        $modal.detach().appendTo('body').fadeIn().addClass('revel_team_member_modal_opened');
        $parent.addClass('revel_team_member_with_opened_modal');
    });
    $('.revel_team_member_modal_close').on( "click", function(e){
        e.preventDefault();
        $(this).parent().fadeOut('slow', function(){
            $(this).detach().appendTo($('.revel_team_member_with_opened_modal')).removeClass('revel_team_member_modal_opened');
            $('.revel_team_member_with_opened_modal').removeClass('revel_team_member_with_opened_modal');
        })
    });
    $(document).on('keydown', function(e) {
        if ( e.keyCode === 27 ) { //ESC
            $('.revel_team_member_modal_opened').fadeOut('slow', function(){
                $(this).detach().appendTo($('.revel_team_member_with_opened_modal')).removeClass('revel_team_member_modal_opened');
                $('.revel_team_member_with_opened_modal').removeClass('revel_team_member_with_opened_modal');
            })
        }
    });


/*********** Progress Bar ************************************************************/
    if(!jQuery.browser.mobile){
        $(".revel_meter .revel_meter_percentage").width(0).one('inview', function(event, isInView) {
          if (isInView) {
            var newwidth = $(this).data("percentage") + '%';
            $(this).animate({width: newwidth}, {
                duration:1500,
                step: function(now) {
                    $(this).find('span').html(Math.floor(now) + '%');
                    var above_tenths = Math.floor(now/10);
                    for(var i=1; i<=above_tenths; i++){
                        $(this).addClass('revel_meter_above'+above_tenths*10);
                    }
                }
            });
          }
        });
    }
    else{
        $(".revel_meter .revel_meter_percentage").each(function(){
            var newwidth = $(this).data("percentage");
            $(this).css('width', newwidth+'%');
            for(var i=0; i<=newwidth; i++){
                var above_tenths = Math.floor(i/10);
                $(this).addClass('revel_meter_above'+above_tenths*10);
            }

        });
    }


    $(window).resize(function() {
        "use strict";
        $(".revel_knob_wrapper").each(function(){
            var $number_sign = $(this).find(".revel_knob_number_sign");
            var canvas_width = $(this).find("canvas").width();
            $number_sign.css({
                'lineHeight' : canvas_width+'px',
            });
        });

        $('.revel-video-bg').each(function(){
            revel_resize_video_bg($(this));
        });

        revel_tabs_responsive();

    });



});



/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);