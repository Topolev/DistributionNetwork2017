(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('SubCategoryController', SubCategoryController);

    SubCategoryController.$inject = ['$scope', '$state', 'SubCategory'];

    function SubCategoryController ($scope, $state, SubCategory) {
        var vm = this;

        vm.subCategories = [];

        loadAll();

        function loadAll() {
            SubCategory.query(function(result) {
                vm.subCategories = result;
                vm.searchQuery = null;
            });
        }
    }
})();
