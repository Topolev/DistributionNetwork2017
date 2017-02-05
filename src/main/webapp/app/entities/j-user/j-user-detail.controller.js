(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('JUserDetailController', JUserDetailController);

    JUserDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'JUser', 'Publication'];

    function JUserDetailController($scope, $rootScope, $stateParams, previousState, entity, JUser, Publication) {
        var vm = this;

        vm.jUser = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('distributionNetworkApp:jUserUpdate', function(event, result) {
            vm.jUser = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
