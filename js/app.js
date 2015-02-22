$(document).ready(function(){

    Modernizr.Detectizr.detect({detectDevice:true})
    $('body').addClass('' + Modernizr.Detectizr.device.type + ' ' + Modernizr.Detectizr.device.browser);

    $.fn.isOnScreen = function(){
        var viewport = {};
        viewport.top = $(window).scrollTop();
        viewport.bottom = viewport.top + $(window).height();
        var bounds = {};
        bounds.top = this.offset().top;
        bounds.bottom = bounds.top + this.outerHeight();
        return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
    };

    if (Modernizr.Detectizr.device.type !== 'mobile'){
        var map;
        function initialize() {
            var latlng = new google.maps.LatLng(44.42694,11.91532);
            var mapOptions = {zoom: 16,center: latlng};
        map = new google.maps.Map($('#map')[0], mapOptions);
        var marker = new google.maps.Marker({position: latlng, map: map});
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    else{
        var contatti = "<a href='#contatti' class='go-to-contact' style='position: fixed; bottom: 1em; right: 1em;'><span>Contatti</span></a>";
        $('body').append(contatti);
        $('.go-to-contact').click(function(event) {
            event.preventDefault();
            var eletarget=$(this).attr('href');
            var eleposition = $(eletarget).position().top;
            $('html, body').animate({scrollTop: eleposition}, 1000);
        });

        $(window).scroll(function() {
            if ($('#contatti').isOnScreen()){
                $('.go-to-contact').fadeOut();
            }
            else{$('.go-to-contact').fadeIn();}
        })

        var map_url = "http://maps.googleapis.com/maps/api/staticmap?center=Via%20Quarantola%203%20Lugo%20IT&zoom=14&size=750x350&maptype=roadmap&markers=color:red%7Clabel:S%7C44.42694,11.91532"
        $('#map').append("<a href="+"http://www.google.it/maps/place/Via+Quarantola,+3,+48022+Lugo+RA/@44.42694,11.91532,17z/data=!3m1!4b1!4m2!3m1!1s0x477e0333fda3dc85:0xb9d6bb66b15ec0b7"+"><img src="+ map_url +">");
        $('p.phone span').wrap("<a href='tel:0545 31921'></a>");
    }
})
