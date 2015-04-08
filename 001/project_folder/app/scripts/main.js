(function() {
    var $deviceExplorer = $('.device-explorer'),
        $slideContainer = $('.page-section-inner', $deviceExplorer),
        $slides = $('.page-slide', $slideContainer),
        $slideNav = $('.page-slide-nav', $deviceExplorer),
        $slideNavButtons = $('span', $slideNav),
        $carouselControlButtons = $('.carousel-controls li', $deviceExplorer),
        $mobilePhotoCarousel,
        $mobilePhotoCarouselSlides,
        $mobileContentCarousel,
        $mobileContentCarouselSlides,
        hammeMobilePhotoCar;

    $('a[href=#]').click(function() {
        return false;
    });

    function pageSlideNavigate(index) {
        if (typeof index === 'number') {
            if (index === 0) {
                $slideNav.addClass('fade-out')
                    .removeClass('fade-in');
            } else {
                $slideNav.addClass('fade-in')
                    .removeClass('fade-out');                
            }

            $slides.eq(index)
                .removeClass('animate-on')
                .addClass('animate-prepare');

            $slideNavButtons.filter('.active')
                .removeClass('active');

            $slideContainer.animate({
                scrollTop: $slideContainer.height() * index
            }, 250, function() {
                $slideNavButtons.eq(index)
                    .addClass('active');

                $slides.eq(index)
                    .removeClass('animate-prepare')
                    .addClass('animate-on');
            });
        }
    }

    $('.device-note-edge a', $deviceExplorer).click(function() {
        pageSlideNavigate(1);
    });

    $slideNavButtons.click(function(e) {
        pageSlideNavigate(
            $(this).parents('li').index()
        );
    });

    // set-up the mobile carousels
    $mobilePhotoCarousel = $('.carousel-photos').carousel({
        interval: false
    });

    $mobilePhotoCarousel.on('slide.bs.carousel', function (e) {
        var $target = $(e.relatedTarget);

        $carouselControlButtons.removeClass('active');
        $target.removeClass('animate-on')
            .addClass('animate-prepare');
        $mobileContentCarousel.carousel($target.index());
    }).on('slid.bs.carousel', function (e) {
        var $target = $(e.relatedTarget);

        $target.removeClass('animate-prepare')
            .addClass('animate-on');
        $carouselControlButtons.eq($target.index())
            .addClass('active');
    });

    $mobileContentCarousel = $('.carousel-text-content').carousel({
        interval: false
    });

    $carouselControlButtons.click(function(e) {
        $mobilePhotoCarousel.carousel($(this).index());
    });

    $mobilePhotoCarouselSlides = $('.item', $mobilePhotoCarousel);
    $mobileContentCarouselSlides = $('.item', $mobileContentCarousel);

    // set-up touch events for the mobile photo carousel
    hammeMobilePhotoCar = new Hammer($mobilePhotoCarousel[0], {});
    hammeMobilePhotoCar.on('panend', function(e) {
        if (e.offsetDirection === 4) {
            $mobilePhotoCarousel.carousel('next');
        } else {
            $mobilePhotoCarousel.carousel('prev');
        }
    });

    // Depending on what media query is active, set the height of
    // carousel / slide containers to be a percentage of their width.
    // (i.e. have them maintin a specific aspect ratio)
    function setContainerHeights() {
        var curPageSlideIndex;

        if (Modernizr.mq('(min-width: 769px)')) {
            if (Modernizr.mq('(max-width: 1200px)')) {
                $slideContainer.add($slides)
                    .height(
                        Math.floor($slideContainer.width() * (789 / 1216))
                    );
            }

            // adjust the scroll position of the page slides
            // ======
            // todo: kind of entering spaghetti code territory here.
            // it would be better to bulk up the pageSlide API to
            // expose centralized method(s) of handling the following
            // few lines, rather than mucking with the pageSlide here.
            curPageSlideIndex = $slideNavButtons.filter('.active')
                .parents('li')
                .index();
            curPageSlideIndex = curPageSlideIndex === -1 ? 0 : curPageSlideIndex;                
            $slideContainer.scrollTop($slideContainer.height() * curPageSlideIndex);
        } else {
            $slideContainer.add($slides)
                .css('height', '');

            if (Modernizr.mq('(max-width: 768px)')) {
                var largestSize;

                $mobilePhotoCarouselSlides.height($mobilePhotoCarousel.width() * (335 / 375));

                // for this one, we will size the slides to be equal to the height
                // of the largest one. Would using display:table do just that for us
                // albeit with pure css? hmm...
                $mobileContentCarouselSlides.each(function() {
                    var $this = $(this),
                        height;

                    $this.css('height', '');
                    height = $(this).outerHeight();

                    if (largestSize) {
                        if (height > largestSize) {
                            largestSize = height;
                        }
                    } else {
                        largestSize = height;
                    }
                });

                $mobileContentCarouselSlides.height(largestSize);
            }
        }
    }
    setContainerHeights();

    $(window).resize(
        _.throttle(function() {
            setContainerHeights();

            // reset page slide nav when entering mobile layout
            if (Modernizr.mq('(max-width: 768px)')) {
                $slideNav.removeClass('fade-in');
                $slideNavButtons.removeClass('active');
            }
        }, 100)
    );

    $('[data-toggle="tooltip"]').tooltip();    
})();