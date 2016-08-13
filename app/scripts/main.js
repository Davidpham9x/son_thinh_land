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
                    dots: true
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
                    goldenLand.Global.initGallerySlider();
                } else {
                    $('.zoom-gallery').slick('unslick');
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
        }
    };
})(jQuery);

$(document).ready(function() {
    goldenLand.Global.init();
});
