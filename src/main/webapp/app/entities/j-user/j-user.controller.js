(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('JUserController', JUserController);

    JUserController.$inject = ['$scope', '$state', 'JUser'];

    function JUserController ($scope, $state, JUser) {
        var vm = this;

        vm.jUsers = [];

        loadAll();

        function loadAll() {
            JUser.query(function(result) {
                vm.jUsers = result;
                vm.searchQuery = null;
            });
        }
    }
})();
