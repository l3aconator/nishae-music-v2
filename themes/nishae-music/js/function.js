$( document ).ready(function() {

    // Smooth Scroll to next song

    var scrollSpeed = 800

    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, scrollSpeed);
                    return false;
                }
            }
        });
    });

    $('.js-next.song-Com').on('click', function() {
        $('html, body').animate({
            scrollTop: parseInt($("#One").offset().top)
        }, scrollSpeed);
    });

    $('.js-next.song-One').on('click', function() {
        $('html, body').animate({
            scrollTop: parseInt($("#Sou").offset().top)
        }, scrollSpeed);
    });

    $('.js-next.song-Sou').on('click', function() {
        $('html, body').animate({
            scrollTop: parseInt($("#Com").offset().top)
        }, scrollSpeed);
    });

    // End smooth scroll to next song NOTE: REFACTOR

    $('.js-menuToggle').on('click', function() {
        var menu =  $('.js-menu');

        menu.slideToggle();
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var header = $('.header');

        if (scroll > 0) {
            header.addClass('scroll');
        } else {
            header.removeClass('scroll');
        }
    });

});
