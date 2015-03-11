(function() {
    var $deviceExplorer = $('.device-explorer'),
        $slideContainer = $('.page-section-inner', $deviceExplorer),
        $slides = $('.slide', $slideContainer),
        $slideNav = $('.slide-nav', $deviceExplorer);
        $slideNavButtons = $('span', $slideNav);

    $('a[href=#]').click(function() {
        return false;
    });

    // If below the largest break point, adjust the height of the
    // slides and their container to be a percentage of their width
    // (i.e. maintain the ratio of 1216 X 789)
    function setSlideHeights() {
        if (Modernizr.mq('(max-width: 1200px)')) {
            $slideContainer.add($slides)
                .height($slideContainer.width() * (789 / 1216));
        } else {
            $slideContainer.add($slides)
                .css('height', '');
        }
    }
    setSlideHeights();

    $(window).resize(
        _.throttle(function() {
            setSlideHeights();
        }, 100)
    );

    function pageSlideNavigate(index) {
        if (typeof index === 'number') {
            if (index === 0) {
                $slideNav.addClass('fade-out')
                    .removeClass('fade-in');
                $slides.eq(0)
                    .removeClass('animate-on')
                    .addClass('animate-prepare');
            } else {
                $slideNav.addClass('fade-in')
                    .removeClass('fade-out');                
            }

            $slideNavButtons.filter('.active')
                .removeClass('active');

            $slideContainer.animate({
                scrollTop: $slideContainer.height() * index
            }, 250, function() {
                $slideNavButtons.eq(index)
                    .addClass('active');

                if (index === 0) {
                    $slides.eq(index)
                        .removeClass('animate-prepare')
                        .addClass('animate-on');
                }
            });
        }
    }

    $('.device-note-4 a', $deviceExplorer).click(function() {
        pageSlideNavigate(1);
    });

    $slideNavButtons.click(function(e) {
        pageSlideNavigate(
            $(this).parents('li').index()
        );
    });
})();