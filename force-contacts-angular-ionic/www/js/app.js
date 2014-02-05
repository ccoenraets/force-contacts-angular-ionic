// angular.module is a global place for creating, registering and retrieving Angular modules
// 'contactmgr' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'contactmgr.services' is found in services.js
// 'contactmgr.controllers' is found in controllers.js
angular.module('contactmgr', ['ionic', 'contactmgr.services', 'contactmgr.controllers'])


    .config(function ($stateProvider, $urlRouterProvider) {
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

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/contacts');

    });
