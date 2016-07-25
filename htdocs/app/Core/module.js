/*global console*/
define(
    [
        'Core/controllers/cfgBaseCtrl',
        'Core/directives/cfgSites/cfgSites'
    ],
    function (

        cfgBaseCtrl,

        cfgSites

    ) {
        'use strict';


        var tester = angular.module(
            'Core',
            [
                'jsonFormatter',
                'angucomplete-alt',
                'ds.objectDiff'
            ]
        );

        tester

            .controller('cfgBaseCtrl', cfgBaseCtrl)
            .directive('cfgSites', cfgSites)

            .run([
                '$rootScope', '$timeout', '$location', '$document', '$window',

                function (
                    $rootScope, $timeout, $location, $document, $window

                ) {
                    console.log ('run');
                    $rootScope.location = $location;
                    $rootScope.currentTime = (new Date()).getTime();
                    $rootScope.DATETIME_FORMAT = 'yyyy-MM-ddTHH:mm';
                }
            ])

        ;

        return tester;
    }
);
