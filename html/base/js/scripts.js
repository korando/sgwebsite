var $ = jQuery.noConflict();

$(function() {
    // Check mobile
    var isMobile = false;
    if ((/Mobile|Android|webOS|iP(hone|ad|od)|BlackBerry|IEMobile|Opera M(ob|in)i|Windows Phone/i.test(navigator.userAgent)))
        isMobile = true;

    if (!isMobile) {
        $('.menu-inner-wrapper').enscroll();
    }

    //simulate viewport for lanscape phone and Portrait ipad
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    if (Math.abs(window.orientation) === 90) {
        //if in Landscape phone
        var viewport = $('meta[name="viewport"]');
        if (screen.width <= 560) {
            viewport.attr("content", "width=560, initial-scale=0.5");
        } else {
            viewport.attr("content", "width=device-width, initial-scale=1");
        }
    } else {
    	// if Portrait and is iPad
      if (is_iPad==true) {
        var viewport = $('meta[name="viewport"]');
        viewport.attr("content", "width=1024");
        $('.header-welcome-home').css('min-height', '65vh');
        $('.intro').css('height', '65vh');
        $('.fit-height').css('height', '65vh');
        $('.scrolldown').hide();


      }
    }

    //reload page when orientation change
    window.onorientationchange = function()
    {
       window.location.reload();
    }

});


jQuery(document).ready(function($) {
    //Convert img svg to svg code
    jQuery('img.svg').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });

    //scrolldown
    $('.scrolldown').click(function() {
        $('html, body').animate({
            scrollTop: $('section.second-box').offset().top
        }, 'slow');
        return false;
    });


    //scroll to
    $('.nav-client').click(function() {
        $('html, body').animate({
            scrollTop: $('section.whowork-box').offset().top
        }, 'slow');
        return false;
    });

    // $('.outcompany').click(function() {
    //     $('html, body').animate({
    //         scrollTop: $('section.squares-box-wrap').offset().top
    //     }, 'slow');
    //     return false;
    // });

    $('.nav-talks').click(function() {
        $('html, body').animate({
            scrollTop: $('section.lettalk-box').offset().top
        }, 'slow');
        return false;
    });

    $('.nav-career').click(function() {
        $('html, body').animate({
            scrollTop: $('section.career-box').offset().top
        }, 'slow');
        return false;
    });



    //show fading words
    $('.fade-box').waypoint(function() {
        $(this.element).addClass('show-fade');
    }, {
        offset: '40%'
    });


    if ($('.career-wrapper').length && $(window).width() > 970) {
        var highestBox = 0;
        $('.career-wrapper .box-content', this).each(function() {

            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });
        $('.career-wrapper .box-content', this).height(highestBox);
    };

    // Click open menu
    $(".opem-main-menu").click(function(e) {
        $('.header-welcome-home').toggleClass('menu-open');
        $('body').toggleClass('body-sticky');
    });

    //set equal heigh column in menu
    if ($('.menu-inner').length && $(window).width() > 970) {
        var highestBox = 0;
        $('.menu-inner .col', this).each(function() {

            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });
        $('.menu-inner .col', this).height(highestBox);
    };

    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

    // Toggle Search form
    $('.btn-more').on('click', function(e) {
        e.stopPropagation();
        $('.box-news').addClass('show-fade');
        $(this).parent().hide();
    });

    //Click show logo companys (for mobile menu)
    $('.outcompany').click(function(e) {
        e.preventDefault();
        $(this).parent().next().toggleClass('active');
    })

    // Click Join and back for CAREER OPPORTUNITIES block
    $('.btn-join-career').on('click', function(e) {
        $('.career-wrapper').addClass('full-expand');
        // $(this).hide();
    });

    //btn back
    $('.btn-back').on('click', function(e) {
        $('.career-wrapper').removeClass('full-expand');
        // $(this).hide();
    });

    //Custom select box
    $('select').each(function() {
        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function() {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    // Filter tabs  jobs
    $('.dd-filter').click(function() {
        $(this).parent().removeClass('active');
        $(this).parent().addClass('active');
    });

    $('.tabs li span').click(function() {
        $('.dd-filter span').text($(this).text());
        $('.tab-wrap').removeClass('active');
    });

    //stick Nav when scroll
    if ($('.second-box').length) {
        var stickyNavTop = $('.second-box').offset().top;
        //console.log('stickyNavTop='+stickyNavTop);
        var stickyNav = function() {
            var scrollTop = $(window).scrollTop();
            //console.log('scrollTop='+scrollTop);
            if (scrollTop > stickyNavTop) {
                $('.sticky').addClass('fixed');
                //$('header').css('margin-bottom', '160px');
            } else {
                $('.sticky').removeClass('fixed');
                //$('header').css('margin-bottom', '80px');
            }
        };
    }

    // if ($(window).width() > 969) {
    if ($('.second-box').length) {
        stickyNav();
        console.log('trigger stickyNav');
    }
    //Toggle for footer address
    $('.address-box ul').hide();
    $('.address-box h2:first').addClass('active').next().slideDown('slow');
    $('.address-box h2').click(function() {
        if ($(this).next().is(':hidden')) {
            $('.address-box h2').removeClass('active').next().slideUp('slow');
            $(this).toggleClass('active').next().slideDown('slow');
        }
    });
    // }

    // $(window).scroll(function() {
    //     if ($(window).width() < 969) {
    //         if ($('.second-box').length) {
    //             stickyNav();
    //         }
    //     }
    // });


    //set equal heigh for mission block
    $('.mission-block .box').each(function(i) {
        var boxWidth = $(this).width();
        // alert($this);
        $(this).css('height', boxWidth);
        // return false;
    });

    //Other news carosel
    if ($('.slide-other').length) {
        $('.slide-other').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
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
        });
    };


    // Milestones
    $().timelinr({
        arrowKeys: 'true',
        containerDiv: '#timeline',
        startAt: 4,
        autoplay: 'true',
        orientation: ($(window).width() > 800) ? 'horizontal' : 'vertical'
    })

    //typing effect
    $(function() {
        $(".welcome-text h2 span").typed({
            strings: ["of Money", "of Client and Society."],
            typeSpeed: 50,
            callback: function() {
                $(".typed-cursor").hide();
            },
        });
    });

    //counting effect
    $('.count').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now) + "+");
            }
        });
    });

    //maps switch
    $('.hoadao').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/hoadao.jpg)');
    });
    $('.thichquangduc').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/thichquangduc.jpg)');
    });
    $('.dongkhoi').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/dongkhoi.jpg)');
    })
    $('.truongquocdung').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/truongquocdung.jpg)');
    })
    $('.nguyentieula').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/nguyentieula.jpg)');
    })
    $('.catlai').click(function functionName() {
        $('.address-box').css('background-image', 'url(base/images/maps/catlai.jpg)');
    })



});


$(window).load(function() {
    $('.hideload').each(function(i) {
        var imgHeight = $(this).height(),
            imgWidth = $(this).width();

        $('.box-square').css({
            'width': imgWidth,
            'height': imgHeight
        });
        $('.hideload').hide();

        var logoHide = $('.box-square').height() - $('.box-square .logo-square').height() - 60,
            logolistH = $('.box-square .logo-box-hidden ul').height();
        $('.box-square .logo-box-hidden').css({
            'height': logoHide,
            'padding-top': (logoHide - logolistH) / 3,
            'padding-bottom': (logoHide - logolistH) / 2
        });
        return false;
    });

    // if ($('.box-square').length) {
    //     var highestBox = 0;
    //     $('.box-square .content', this).each(function() {
    //
    //         if ($(this).height() > highestBox) {
    //             highestBox = $(this).height();
    //         }
    //     });
    //     $('.box-square .content', this).height(highestBox);
    // };
});
