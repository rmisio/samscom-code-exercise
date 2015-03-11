(function() {
    var $slideContainer = $('.device-explorer .page-section-inner');

    // If below the largest break point, adjust the height of the
    // Slide Container to be a percentage of it's width
    // (i.e. maintain the ratio of 1216 X 789)
    function setSlideContainerHeight() {
        if (Modernizr.mq('(max-width: 1200px)')) {
            $slideContainer.height($slideContainer.width() * (789 / 1216));
        } else {
            $slideContainer.css('height', '');
        }
    }
    setSlideContainerHeight();

    $(window).resize(
        _.throttle(function() {
            setSlideContainerHeight();
        }, 100)
    );
})();