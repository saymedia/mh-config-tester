define(
    [],
    function () {
        'use strict';

        return ['$scope', '$http', '$q','ObjectDiff', function ($scope, $http, $q, ObjectDiff) {
            console.log("CFG Base init");
            $scope.id = "CfgBaseCtrl";
            $scope.sites = null;

            $scope.sitesProd = null;
            $scope.sitesQA = null;

            $scope.previewIp = '192.168.0.3';
            $scope.styleDefaults = [];

            $scope.styleProps = null;
            $scope.selectedSite = null;
            $scope.searchedStylePropA = {};
            $scope.searchedStylePropB = 'color_ui_primary';
            $scope.searchedStylePropC = 'colorUiPrimary';
            $scope.searchedStylePropD = 'deprecatedUiPrimary';

            $scope.dataSet = 'qa';

            $scope.sProps = [];
            $scope.searchPropAObj = {};


            $scope.confSiteHandle = null;
            $scope.confQa = {};
            $scope.confProd = {};
            $scope.diffViewEnabled = false;



            var sortObject = function (o) {

                var sorted = {},
                    key, a = [];

                for (key in o) {
                    if (o.hasOwnProperty(key)) {
                        a.push(key);
                    }
                }

                a.sort();

                for (key = 0; key < a.length; key++) {
                    sorted[a[key]] = o[a[key]];
                }
                return sorted;
            };

            var toSnakeCase = function (string) {
                return string.replace(/([A-Z])/g, function ($1) {
                    return "_" + $1.toLowerCase();
                });
            };

            var convertPropNameToScss = function (propName) {
                return propName;
            };

            var cleanSProps = function () {
                    for (var prop in $scope.styleProps) {
                        $scope.sProps.push({js: prop, sass: prop});
                    }
            }


            var parseSearchData = function (searchJsonData) {

                var output = [];

                $scope.styleProps = [];

                var root = searchJsonData.hits.hits;

                for (var i = 0; i < root.length; i++) {
                    var re = /tempest-published-(.*)-./gmi;
                    var found = null;
                    if (found = re.exec(root[i]._index)) {

                        var siteHandle = found[1];

                        // output[found[1]] = root[i]._source;
                        root[i]._source.siteHandle = siteHandle;
                        output.push(root[i]._source);


                        // preparse styling variables
                        var styleProps = root[i]._source.styleVariableData;
                        for (var prop in styleProps) {
                            var propName = prop.toString();

                            // if(propName.indexOf("_") > -1 ) {
                            //     console.log(siteHandle + " > " + propName);
                            // }

                            $scope.styleProps[propName] = convertPropNameToScss(propName);
                        }
                    }
                }
                console.dir($scope.styleProps);

                return output;
            };


            $scope.closeDiff = function () {
               $scope.diffViewEnabled = false;
            };

            $scope.openDiff = function (siteHandle) {
                $scope.confSiteHandle = siteHandle;

                var a = $scope.getSiteDataset(siteHandle, 'qa');
                var b = $scope.getSiteDataset(siteHandle, 'prod');

                if(!a) {
                    $scope.confQa = {};
                } else {
                    $scope.confQa = a.styleVariableData;
                }

                if(!b) {
                    $scope.confProd = {};
                } else {
                    $scope.confProd = b.styleVariableData;
                }






                // dif

                // This is required only if you want to show a JSON formatted view of your object without using a filter
                $scope.diffObjectAJsonView = ObjectDiff.objToJsonView($scope.confQa);
                $scope.diffObjectBJsonView = ObjectDiff.objToJsonView($scope.confProd);

                // you can directly diff your objects js now or parse a Json to object and diff
                 var diff = ObjectDiff.diffOwnProperties($scope.confQa, $scope.confProd);

                // you can directly diff your objects including prototype properties and inherited properties using `diff` method
                // var diffAll = ObjectDiff.diff($scope.confQa, $scope.confProd);

                // gives a full object view with Diff highlighted
                $scope.diffValue = ObjectDiff.toJsonView(diff);

                // gives object view with onlys Diff highlighted
                // $scope.diffValueChanges = ObjectDiff.toJsonDiffView(diff);

                $scope.diffViewEnabled = true;
            };

            $scope.logSite = function (site) {
                $scope.selectedSite = site;
            };

            $scope.switchDataset = function (datasetId) {

                if (datasetId === 'qa') {
                    $scope.dataSet = 'qa';
                    $scope.sites = $scope.sitesQA;
                }
                if (datasetId === 'prod') {
                    $scope.dataSet = 'prod';
                    $scope.sites = $scope.sitesProd;
                }
            };

            $scope.getSiteDataset = function (siteHandle, dataSetId) {
                var dataset = $scope.sitesQA;
                if(dataSetId === 'prod') {
                    dataset = $scope.sitesProd;
                }

                for(var idx in dataset) {
                    if (dataset[idx].siteHandle == siteHandle) {
                        console.dir(dataset[idx]);
                        return dataset[idx];
                    }
                }

                return null;
            };



            $scope.showDefault = function (prop) {
                var propDefault = $scope.styleDefaults[prop];
                if (!propDefault) {
                    return "SCSS default not defined";
                } else {
                    return propDefault;
                }
            };

            $scope.searchedPropValue = function (site, prop) {

                var output = site.styleVariableData[prop];
                if (!output) {
                    if ($scope.styleDefaults[prop]) {
                        return "using default";

                    } else {
                        return "missing _settings.scss default";
                    }
                }
                return output;
            };

            $scope.isDefined = function (site, prop) {
                return site.styleVariableData[prop];
            };

            // dif





            var loadConfs = function ($scope, $http, $q) {
                var qa = $http.get('/data/grab/qa-site-configs.json'),
                    prod = $http.get('/data/grab/prod-site-configs.json'),
                    defa = $http.get('/data/phx-defaults.json');

                $q.all([qa, prod, defa]).then(function (response) {
                    console.log("allou");

                    $scope.sitesQA = parseSearchData(response[0].data);
                    $scope.sitesProd = parseSearchData(response[1].data);
                    $scope.styleDefaults = response[2].data;

                    cleanSProps();
                    $scope.switchDataset('qa');

                });
            };

            loadConfs($scope, $http, $q);

        }

        ]
    }
);
