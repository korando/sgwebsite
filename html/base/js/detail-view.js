$(document).ready(function() {
    History.Adapter.bind(window, 'statechange', function() {
        var State = History.getState();
    });

    var ssClick = true;
    $('.box-news .grid-item').each(function(index) {
        clickItem($(this));
    });

    $('.ajax-popup').each(function(index) {
        clickItem($(this));
    });

    $('#content_detail').attr('loading', false);
    $('#content_detail .close-btn').on('click', function() {
        if (ssClick) {
            ssClick = false;
            javascript: History.pushState(null, "Square", " ");
            $('#content_detail').removeClass('open');
            $('#content_detail .content, #content_detail .close-btn').fadeOut(200);
            $('body').removeClass('ovf-hidden');
            setTimeout(function() {
                $('#content_detail').removeAttr('style');
                ssClick = true;
            }, 200);
        } else return false;
    });

    function clickItem(liContent) {
        liContent.find('a').on('click', function() {
            $('.header-welcome-home').removeClass('menu-open');
            var itemWidth = $(this).width();
            var itemHeight = $(this).height();
            if (ssClick) {
                ssClick = false;
                showPDetail($(this), itemWidth, itemHeight);
                setTimeout(function() {
                    ssClick = true;
                }, 400);
            } else return false;
        });
    };

    $("#content_detail .close-btn").click(function() {
        $("#content_detail .content").html('');
    });

    function showPDetail(el, itemWidth, itemHeight) {
        var modal = $('#content_detail');
        var cbtn = $('#content_detail .close-btn');
        var content = $('#content_detail .content');
        var offset = el.offset();
        var sTop = $(window).scrollTop();
        var id = el.attr('data-id');
        var slug = el.attr('data-slug');

        // javascript: History.pushState({
        //     slug: slug
        // }, "Square", slug);

        if (modal.attr('loading') === 'false') {
            modal.attr('loading', true);
            content.html();
            el.parent().addClass('loading');
            var dataObj = {
                "action": "detail_works",
                'id': id,
                'type': 'id'
            };
            $.ajax({
                url: slug,
                type: "GET",
                data: dataObj,
                dataType: "html",
                success: function(re, status, jsXHR) {
                    new Clipboard('[data-clipboard-text]');
                    modal.attr('loading', false);
                    if (re.length > 0) {
                        el.parent().removeClass('loading');
                        modal.css({
                            width: itemWidth + 10 + "px",
                            height: itemHeight + 4 + "px",
                            top: offset.top - sTop + "px",
                            left: offset.left + "px"
                        });
                        modal.find('.header-news').height($(window).height());
                        modal.fadeIn(100);
                        content.html(re);
                        modal.addClass('open');
                        setTimeout(function() {
                            $('body').addClass('ovf-hidden');
                            content.delay(600).fadeIn(200);
                            cbtn.fadeIn(600);
                        }, 100);
                        detail_animation();
                        //$('.slide-other').slick('unslick');

                        if ($('.slide-other').length) {
                            var item_length = $('.slide-other > div').length - 1;
                            var slider = $('.slide-other').slick({
                                autoplay: true,
                                // infinite: true,
                                autoplay: true,

                                dots: false,
                                infinite: false,
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                responsive: [{
                                            breakpoint: 700,
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 2
                                            }
                                        }, {
                                            breakpoint: 480,
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1
                                            }
                                        }
                                        // You can unslick at a given breakpoint now by adding:
                                        // settings: "unslick"
                                        // instead of a settings object
                                    ]
                                    // speed: 100,
                                    // autoplaySpeed: 1000
                            });

                            setTimeout(function() {
                                $('.relate-block').show();
                            }, 1000);
                        }

                        if ($('#timeline').length) {
                            setTimeout(function() {
                                $().timelinr({
                                    arrowKeys: 'true',
                                    containerDiv: '#timeline',
                                    startAt: 4,
                                    orientation: ($(window).width() > 800) ? 'horizontal' : 'vertical'
                                })

                                $('.mission-block .box').each(function(i) {
                                    var boxWidth = $(this).width();
                                    // alert($this);
                                    $(this).css('height', boxWidth);
                                    // return false;
                                });
                            }, 800);
                        }
                    }

                }
            });
        }
    };

    function detail_animation() {
        $('#content_detail').scroll(function() {
            var bgHeight = $('#content_detail .header-news').height();
            var scrollTop = $(this).scrollTop();
            var percent = scrollTop / bgHeight;
            var alpha = 1 - percent;
            if (percent <= 1) {
                $('#content_detail .overlay-header').css('background', 'rgba(0, 0, 0,' + percent + ')');
                $('#content_detail .overlay-header .content-header').css('opacity', alpha);
            }
        });
    };

    check_slug();

    function check_slug() {
        url = window.location.pathname;
        var segments = url.split('/');
        var slug = segments[2];
        //console.log(slug);
        //console.log(segments);
        if (slug != undefined && slug != '') {
            var modal = $('#content_detail');
            var cbtn = $('#content_detail .close-btn');
            var content = $('#content_detail .content');
            //var offset = el.offset();
            var sTop = $(window).scrollTop();

            if (modal.attr('loading') === 'false') {
                modal.attr('loading', true);
                content.html();

                var dataObj = {
                    "action": "detail_works",
                    'slug': slug,
                    'type': 'slug'
                };
                $.ajax({
                    url: "about.html",
                    type: "GET",
                    data: dataObj,
                    dataType: "html",
                    success: function(re, status, jsXHR) {
                        modal.attr('loading', false);
                        if (re.length > 0) {
                            modal.find('.header-news').height($(window).height());
                            modal.fadeIn(100);
                            content.html(re);
                            modal.addClass('open');
                            setTimeout(function() {
                                $('body').addClass('ovf-hidden');
                                content.delay(600).fadeIn(200);
                                cbtn.fadeIn(600);
                            }, 100);
                            detail_animation();
                        }

                        $('#content_detail .close-btn').one('click', function() {
                            //var bloginfo = "<?php bloginfo('name'); ?>";
                            /* remove link popup work detail */
                            javascript: History.pushState(null, "DSquare - An Integrated Digital Solution provider", "../../");
                        });

                    }
                });

            }

        }
    }

});
