(function() {
    var $deviceExplorer = $('.device-explorer'),
        $slideContainer = $('.page-section-inner', $deviceExplorer),
        $slides = $('.slide', $slideContainer),
        $slideNavButtons = $('.slide-nav span', $deviceExplorer);

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
            $slideNavButtons.filter('.active')
                .removeClass('active');

            $slideContainer.animate({
                scrollTop: $slideContainer.height() * index
            }, 400, function() {
                $slideNavButtons.eq(index)
                    .addClass('active');
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