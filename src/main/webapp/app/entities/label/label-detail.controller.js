(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('LabelDetailController', LabelDetailController);

    LabelDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Label', 'Publication'];

    function LabelDetailController($scope, $rootScope, $stateParams, previousState, entity, Label, Publication) {
        var vm = this;

        vm.label = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('distributionNetworkApp:labelUpdate', function(event, result) {
            vm.label = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
