(function($)
{
    "use strict";

    var tracking_category = 'empty_project';

    var site = {

        is_mobile: false,
        is_tablet: false,

        init: function()
        {
            track_my_event(tracking_category, 'Landing loaded', 'page loaded', false );

            if(/force_mobile/.test(location.href) ||  /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
            {
                this.is_tablet=false;
                this.is_mobile=true;
                $('head').append('<meta name="viewport" content="width=device-width" />');
            }
            if(/force_tablet/.test(location.href) ||  /iPad/i.test(navigator.userAgent) )
            {
                this.is_mobile=false;
                this.is_tablet=true;
            }

            this.onResize();

            var i=0 ;
            
            $('.boardshort_all_carousel').each(function() {
                $(this).jcarousel({
                    scroll: 1,
                    wrap: 'both',
                    itemVisibleInCallback: {
                        onBeforeAnimation: beforeAnimation,
                        onAfterAnimation: afterAnimation,
                    }
                });

                $('#carousel_'+i+' .jcarousel-next, #carousel_'+i+' .jcarousel-prev').wrapAll('<div class="pagination_container " id="'+i+'"/>');
                i++;
            
            });
        },


        onResize: function()
        {
        },

        onScroll: function()
        {
        }
    };

    $(document).ready(function() {
        window.site = site;
        site.init();
        $(window).resize(site.onResize);
        $(window).scroll(site.onScroll);
        $(window).bind("orientationchange", site.onScroll);
        $(window).bind("touchstart", site.onScroll);
        $(window).bind("touchmove", site.onScroll);
        $(window).bind("touchend", site.onScroll);
    });
})(jQuery);




function track_my_event(tracking_category, tracking_action, tracking_value, tracking_non_interaction ){
    //console.log('Track '+tracking_category+' / '+ tracking_action+' / '+ tracking_value);
    if(typeof _gaq !== 'undefined')
        _gaq.push(['_trackEvent',  tracking_category, tracking_action, tracking_value ]);     

}

function beforeAnimation(carousel, item, idx, state) 
{
    idx--;

    if (state!='init') {
        $(item).children('.item_info').stop(true, true).fadeOut(0);
    }
    $(item).parent().parent().parent().parent().find('.boarshort_carousel_controls_bullets a').removeClass('active');
    $(item).parent().parent().parent().parent().find('.boarshort_carousel_controls_bullets a:eq('+idx+')').addClass('active');
}

function afterAnimation(carousel, item, idx, state) 
{
    if (state!='init') {
        $(item).children('.item_info').stop(true,true).fadeIn(400);
    }
}