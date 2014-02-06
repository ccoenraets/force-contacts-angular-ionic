angular.module('contactmgr.controllers', [])

    .controller('ContactIndexCtrl', function ($scope, ContactService) {

        $scope.searchKey = "";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            findAllContacts();
        };

        $scope.search = function () {
            ContactService.findByName($scope.searchKey).then(function (contacts) {
                console.log(contacts);
                $scope.contacts = contacts;
            });
        };

        var findAllContacts = function() {
            ContactService.findAll().then(function (contacts) {
                $scope.contacts = contacts;
            });
        };

        findAllContacts();

    })

    .controller('ContactDetailCtrl', function ($scope, $stateParams, ContactService) {
        ContactService.findById($stateParams.contactId).then(function(contact) {
            $scope.contact = contact[0];
        });
    });
