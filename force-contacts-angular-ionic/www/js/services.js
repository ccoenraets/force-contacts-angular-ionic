angular.module('contactmgr.services', [])

    .factory('OAuthService', function($q) {

        var apiVersion = "v29.0", // The version of the REST API you wish to use in your app.
            forcetkClient,
            oauth;

        function initialize() {
            var deferred = $q.defer();

            oauth = cordova.require("salesforce/plugin/oauth");

            // Call getAuthCredentials to get the initial session credentials
            oauth.getAuthCredentials(
                function (creds) {
                    salesforceSessionRefreshed(creds);
                    deferred.resolve();
                },
                function(error) {
                    alert("Authentication Error: " + error);
                    deferred.fail(error);
                });

            // Register to receive notifications when autoRefreshOnForeground refreshes the sfdc session
            document.addEventListener("salesforceSessionRefresh", salesforceSessionRefreshed, false);

            return deferred.promise;
        }

        function salesforceSessionRefreshed(creds) {
            // Depending on how we come into this method, `creds` may be callback data from the auth
            // plugin, or an event fired from the plugin.  The data is different between the two.
            var credsData = creds;
            if (creds.data)  // Event sets the `data` object with the auth data.
                credsData = creds.data;

            forcetkClient = new forcetk.Client(credsData.clientId, credsData.loginUrl, null, oauth.forcetkRefresh);
            forcetkClient.setSessionToken(credsData.accessToken, apiVersion, credsData.instanceUrl);
            forcetkClient.setRefreshToken(credsData.refreshToken);
            forcetkClient.setUserAgentString(credsData.userAgent);
        }

        return {
            initialize: initialize,
            getClient: function() {
                return forcetkClient;
            }
        }

    })

    .factory('ContactService', function($q, OAuthService) {

        function query(queryStr) {
            var deferred = $q.defer();
            OAuthService.getClient().query(queryStr,
                function(response) {
                    var contacts = response.records;
                    deferred.resolve(contacts);
                },
                function(error) {
                    alert(JSON.stringify(error));
                    deferred.fail(error);
                });
            return deferred.promise;
        }

        return {
            findAll: function() {
                return query('SELECT Id, Name, Title FROM contact LIMIT 50');
            },

            findByName: function(searchKey) {
                return query('SELECT Id, Name, Title FROM contact WHERE name LIKE \'%' + searchKey + '%\' LIMIT 50');
            },

            findById: function(contactId) {
                var deferred = $q.defer();
                OAuthService.getClient().retrieve('Contact', contactId, ['Id', 'Name', 'Title', 'Department', 'Phone', 'MobilePhone', 'Email'],
                    function(contact) {
                        deferred.resolve(contact);
                    },
                    function(error) {
                        alert(JSON.stringify(error));
                        deferred.fail(error);
                    });
                return deferred.promise;
            }

        }
    });
