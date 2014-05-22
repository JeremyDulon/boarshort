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
            
            //catégories events
            $('.event_categorie').click(function()
            {
                if (!$(this).hasClass('active'))
                {
                    $('.event_categorie').removeClass('active');
                    $(this).addClass('active');
                    $('.events_list').hide();
                    $('#event_'+$(this).attr('name')).show();
                }
            });
            
            $('#event_all_carousel').jcarousel({
                scroll: 1,
                wrap: 'both',
                initCallback : allEventsInit,
                itemVisibleInCallback: {
                    onAfterAnimation: allEventsAfter
                }
            });

            $('#event_all .jcarousel-next, #event_all .jcarousel-prev').wrapAll('<div class="pagination_container " />');
            
            $('.event_all_carousel_controls_bullets a:eq(0)').addClass('active');
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

function allEventsInit(carousel)
{
    $('.event_all_carousel_controls_bullets a').bind('click', function() {
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        $('.event_all_carousel_controls_bullets a').removeClass('active');
        $(this).addClass('active');
        return false;
    });
}

function allEventsAfter(carousel, item, idx, state) 
{
    idx--;
    $('.event_all_carousel_controls_bullets a').removeClass('active');
    $('.event_all_carousel_controls_bullets a:eq('+idx+')').addClass('active');
}