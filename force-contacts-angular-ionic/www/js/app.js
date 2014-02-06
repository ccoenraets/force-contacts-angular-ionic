// angular.module is a global place for creating, registering and retrieving Angular modules
// 'contactmgr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'contactmgr.services' is found in services.js
// 'contactmgr.controllers' is found in controllers.js
angular.module('contactmgr', ['ionic', 'contactmgr.services', 'contactmgr.controllers'])


    .config(function ($stateProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('contact-index', {
                url: '/contacts',
                templateUrl: 'templates/contact-index.html',
                controller: 'ContactIndexCtrl'
            })

            .state('contact-detail', {
                url: '/contact/:contactId',
                templateUrl: 'templates/contact-detail.html',
                controller: 'ContactDetailCtrl'
            });

    })

    .run(function(OAuthService) {

        // Not using Ionic "Platform" to listen to device ready because this application is using the Mobile SDK
        // which is built on top of Cordova 2.3
        document.addEventListener("deviceready", function() {
            OAuthService.initialize().then(
                function() {
                    window.location.hash = "contacts";
                },
                function() {
                    alert('Authentication error');
                });
        });
    });
