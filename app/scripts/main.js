'use strict';
var goldenLand = window.goldenLand || {}; //global namespace for YOUR goldenLand, Please change goldenLand to your goldenLand name

var isMobile = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

(function($) {
    goldenLand.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            this.initMasheadSlider();
            this.initGallery();
            this.initHandleWebsiteResize();
            this.initToggleMenuMobile();
            this.initTriggerScroll();
            this.initShowHotLineMobile();
            this.initExpandCollapse();
            // this.initZoomImg();

            /*goldenLand.Global.initSliderBlockHome();*/
            /*goldenLand.Global.initModalSuccessful();*/
        },

        initFormElements: function() {
            $('input, textarea').placeholder();

            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {

                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
        },

        initMasheadSlider: function() {
            if ($('.masthead__banner').length && $('.masthead__banner').children().length > 2) {
                $('.masthead__banner').slick({
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    dots: true,
                    responsive: [{
                        breakpoint: 640,
                        settings: {
                            dots: false
                        }
                    }]
                });
            }
        },

        initGallerySlider: function() {
            if ($('.zoom-gallery').length && $('.zoom-gallery').children().length > 2) {
                $('.zoom-gallery').slick({
                    infinite: true,
                    speed: 500,
                    // fade: true,
                    cssEase: 'linear',
                    dots: true
                });
            }
        },

        initGallery: function() {
            if ($('.zoom-gallery').length && $('.zoom-gallery').children().length > 2) {
                $('.zoom-gallery').magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    closeOnContentClick: false,
                    closeBtnInside: false,
                    mainClass: 'mfp-with-zoom mfp-img-mobile',
                    image: {
                        verticalFit: true,
                        titleSrc: function(item) {
                            return item.el.attr('title');
                        }
                    },
                    gallery: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true,
                        duration: 300, // don't foget to change the duration also in CSS
                        opener: function(element) {
                            return element.find('img');
                        }
                    }
                });

            }
        },

        initHandleWebsiteResize: function() {
            window.windowWidth = 0;

            $(window).resize(function() {
                window.windowWidth = $(window).width();

                if (window.windowWidth <= 480) {
                    if ( !$('.zoom-gallery').hasClass('slick-initialized') ) {
                        goldenLand.Global.initGallerySlider();
                    }
                } else {
                    if ( $('.zoom-gallery').hasClass('slick-initialized') ) {
                        $('.zoom-gallery').slick('unslick');
                    }
                }

                if ( window.windowWidth >= 640 ) {
                    $('.interior__info').css('width', '');
                    $('.interior__info').find('.inner').css('padding', '');
                }

                if (window.windowWidth < 1024) {
                    if ( !$('.interior__img').hasClass('slick-initialized') ) {
                        goldenLand.Global.initSliderBlockHome();
                    }
                } else {
                    if ( $('.interior__img').hasClass('slick-initialized') ) {
                        $('.interior__img').slick('unslick');
                    }
                }

            }).trigger('resize');
        },

        initModalSuccessful: function () {
            $.magnificPopup.open({
                items: {
                    src: '#successful-modal',
                    type: 'inline',
                    closeOnContentClick: false,
                    closeOnBgClick: false,
                    closeBtnInside: false,
                    showCloseBtn: false,
                    enableEscapeKey: false
                }
            });

            $('#successful-modal').find('.close').off('click').on('click', function (e) {
                e.preventDefault();

                $.magnificPopup.close();
            });
        },

        initToggleMenuMobile: function () {
            var menuTag = $('.toggle-menu'),
                contentMenu = $('.menu__content');

                menuTag.off('click').on('click', function (e) {
                    e.preventDefault();

                    if ( $(this).hasClass('active') ) {
                        contentMenu.slideUp();
                        $(this).removeClass('active')
                    } else {
                        contentMenu.slideDown();
                        $(this).addClass('active')
                    }
                });
        },

        initTriggerScroll: function () {
            var menuContent = $('.menu__content'),
                liTags = menuContent.children();

                liTags.each(function () {
                    var _this = $(this);

                    _this.find('a').off('click').on('click', function (e) {
                        e.preventDefault();

                        liTags.removeClass('active');
                        _this.addClass('active');
                        $('html,body').animate({
                            scrollTop: $( $(this).attr('href') ).offset().top
                        }, 800 );
                    });
                });
        },

        initShowHotLineMobile: function () {
            var aTag = $('.hotline__icon'),
                hotlineContent = $('.hotline');

                aTag.off('click').on('click', function (e) {
                    e.preventDefault();

                    if ( $(this).hasClass('active') ) {
                        hotlineContent.css('right', -145);
                        $(this).removeClass('active')
                    } else {
                        hotlineContent.css('right', 0);
                        $(this).addClass('active')
                    }
                });
        },

        initSliderBlockHome: function () {
            var introductionContent = $('#introduction'),
                blockHome = introductionContent.find('.interior');

                blockHome.each(function () {
                    var _this = $(this);

                    _this.find('.interior__img').slick({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        arrows: false,
                        dots: true,
                        cssEase: 'linear',
                        responsive: [{
                            breakpoint: 640,
                            settings: {
                                fade: true
                            }
                        }]
                    });
                });
        },

        initExpandCollapse: function () {
            var infoContents = $('.interior__info');

                infoContents.each(function () {
                    var _this = $(this);

                        _this.find('i').off('click').on('click', function () {
                            if ( _this.hasClass('collapse') ) {
                                _this.removeClass('collapse').addClass('expand');
                                _this.css('width', '80%');
                                _this.find('.inner').css('padding', 30);
                            } else {
                                _this.removeClass('expand').addClass('collapse');
                                _this.css('width', 0);
                                _this.find('.inner').css('padding', 0);
                            }
                        });
                });
        },

        initZoomImg: function () {
            var imgContents = $('.interior__img');

                imgContents.each(function () {
                    var _this = $(this),
                        /*iTags =  _this.find('.inner');*/
                        iTags =  _this.find('i');
                        /*console.log(iTags);*/

                        iTags.each(function () {
                            var _iTag = $(this);

                            _iTag.zoom({
                                url: _iTag.attr('data-url'),
                                on:'click',
                                target: _iTag.parent()
                            });
                            /*_iTag.zoom({
                                on: 'grab',
                                url: _iTag.attr('data-url'),
                            });*/
                        });
                });
        }
    };
})(jQuery);

$(document).ready(function() {
    goldenLand.Global.init();
});
