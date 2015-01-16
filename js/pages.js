(function () {
    App.controller('intro', function (page) {
        setTimeout(function() {
            App.load('home', 'fade');
        }, 5000);
    });

    App.controller('test', function (page) {
    // put stuff here
    });

    App.controller('page2', function (page) {
    // put stuff here
    });

    App.load('intro', 'fade');
})();
