require.config({
    paths: {
        "flexible": "../../lib/js/flexible",
        "jquery": "../../lib/js/jquery-3.1.1.min",
        "swiper": "../../lib/js/swiper-3.4.1.jquery.min",
        "underscore": "../../lib/js/underscore",
        "backbone": "../../lib/js/backbone",
        "text": "../../lib/js/text",
        "router": "router",
    }
});

require(["flexible", "router"], function () {
});