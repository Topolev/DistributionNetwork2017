(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('SubCategoryDetailController', SubCategoryDetailController);

    SubCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SubCategory', 'Publication', 'Category'];

    function SubCategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, SubCategory, Publication, Category) {
        var vm = this;

        vm.subCategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('distributionNetworkApp:subCategoryUpdate', function(event, result) {
            vm.subCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
