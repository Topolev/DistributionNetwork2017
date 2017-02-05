(function() {
    'use strict';
    angular
        .module('distributionNetworkApp')
        .factory('JUser', JUser);

    JUser.$inject = ['$resource'];

    function JUser ($resource) {
        var resourceUrl =  'api/j-users/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
