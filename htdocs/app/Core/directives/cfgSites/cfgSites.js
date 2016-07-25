define(
    [
        'text!Core/directives/cfgSites/cfgSites.html'
    ],

    function (template) {
        'use strict';
        return [
            '$timeout',
            function ($timeout) {
                return {
                    restrict: 'E',
                    template: template,
                    scope: true,


                    controller: ['$scope', '$http',
                        function ($scope, $http) {

                            $scope.servers = [];
                            $scope.selected = null;

                            // // parse json data
                            // var parse = function (jsonData) {
                            //
                            //     for (var server in jsonData) {
                            //         var re = /tempest-published-(.*)-b/gmi;
                            //         var found = null;
                            //         if (found = re.exec(server)) {
                            //             var sobj = {};
                            //             sobj['server'] = found[1];
                            //             sobj['link'] = 'http://tempest-es.qa.saymedia.com/tempest-published-' + found[1] + '-live/ContentSiteConfig/site-config';
                            //             $scope.servers.push(sobj);
                            //         }
                            //     }
                            //
                            //     console.dir($scope.servers);
                            // };

                            // $scope.grabConfig = function(site) {
                            //     $http({
                            //         method: 'GET',
                            //         //url: 'http://tempest-es.qa.saymedia.com/_aliases'
                            //         url: site.link
                            //     }).then(function successCallback(response) {
                            //         console.log("grabbed");
                            //         console.dir(response.data);
                            //         // this callback will be called asynchronously
                            //         // when the response is available
                            //     }, function errorCallback(response) {
                            //         console.log("err loaded");
                            //
                            //         // called asynchronously if an error occurs
                            //         // or server returns response with an error status.
                            //     });
                            // };

                            // $scope.data = null;
                            //
                            // $http({
                            //     method: 'GET',
                            //     //url: 'http://tempest-es.qa.saymedia.com/_aliases'
                            //     url: '/data/aliases.json'
                            // }).then(function successCallback(response) {
                            //     console.log("loaded");
                            //     parse(response.data);
                            //     // this callback will be called asynchronously
                            //     // when the response is available
                            // }, function errorCallback(response) {
                            //     console.log("loaded");
                            //
                            //     // called asynchronously if an error occurs
                            //     // or server returns response with an error status.
                            // });

                        }], // controller


                    link: function (scope, element, attrs) {

                    } // link

                }; // return


            }];
    }
);
