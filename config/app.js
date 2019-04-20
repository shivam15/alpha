var app = angular.module('blockchain', [ 'ngRoute', 'ngAnimate', 'oc.lazyLoad', 'ngCookies']).controller("mainController",function($scope, $http, $cookies,$location,$rootScope) {
    ($cookies.loggedIn == 'false' || $cookies.loggedIn == undefined)? $scope.logged = false : $scope.logged = true;
    if($scope.logged)
    {
        $rootScope.username = $cookies.firstName + $cookies.lastName;
    }
    else
    {
     window.location = '#/loginVendor';
 }
 $scope.logout = function () 
 {
     $cookies.loggedIn = 'false';
     $cookies.user = ""
     $cookies.userId = ""
     $cookies.firstName = ""
     $cookies.lastName = ""
     $cookies.userEmail = ""
     $cookies.userpwd = ""
     window.location = '#/loginVendor';
     $scope.username = "";
     $scope.logged = false;
 };
});


app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : './templates/dashboard.html',
        controller : 'dashboardController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/dashboardController.js' ]
                } ]);
            } ]
        }
    })
    .when('/dashboard', {
        templateUrl : './templates/dashboard.html',
        controller : 'dashboardController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/dashboardController.js' ]
                } ]);
            } ]
        }
    })
    .when('/loginVendor', {
        templateUrl : './templates/loginVendor.html',
        controller : 'loginController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/loginController.js' ]
                } ]);
            } ]
        }
    })
    .when('/buyCattle', {
        templateUrl : './templates/buyCattle.html',
        controller : 'buyCattleController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/buyCattleController.js' ]
                } ]);
            } ]
        }
    })
    .when('/manageCattles', {
        templateUrl : './templates/manageCattles.html',
        controller : 'manageCattlesController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/manageCattlesController.js' ]
                } ]);
            } ]
        }
    })
    .when('/rightMenuBar', {
        templateUrl : './templates/rightMenuBar.html',
        controller : 'rightMenuBarController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/rightMenuBarController.js' ]
                }]);
            }]
        }
    })

    .when('/leftMenuBar', {
        templateUrl : './templates/leftMenuBar.html',
        controller : 'leftMenuBarController',
        resolve : {
            lazy : [ '$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([ {
                    name : 'enmarq',
                    files : [ './controllers/leftMenuBarController.js' ]
                }]);
            }]
        }
    })




    .otherwise ({
        redirectTo : '/'
    });
});