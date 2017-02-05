(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .factory('Register', Register);

    Register.$inject = ['$resource'];

    function Register ($resource) {
        return $resource('api/register', {}, {});
    }
})();
