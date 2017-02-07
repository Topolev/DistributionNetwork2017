(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('PublicationDetailController', PublicationDetailController);

    PublicationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Publication', 'Label', 'SubCategory'];

    function PublicationDetailController($scope, $rootScope, $stateParams, previousState, entity, Publication, Label, SubCategory) {
        var vm = this;

        vm.publication = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('distributionNetworkApp:publicationUpdate', function(event, result) {
            vm.publication = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
