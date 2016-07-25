define(
    [
        'Core/module',
        'domReady!'
    ],
    function () {
        'use strict';
        var dependencies = ['Core'];
        angular.bootstrap(document.documentElement, dependencies);
        console.log("boot");
    }
);
