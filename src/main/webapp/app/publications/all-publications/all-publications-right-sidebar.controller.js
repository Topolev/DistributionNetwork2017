(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('AllPublicationsRightSidebarController', AllPublicationsRightSidebarController);

    AllPublicationsRightSidebarController.$inject = ['$scope', '$state', 'Category'];

    function AllPublicationsRightSidebarController ($scope, $state, Category) {
        var vm = this;

        vm.title = "Category";
        vm.links = [];

        loadAll();

        function loadAll() {
            Category.query(function(result) {
                vm.links = result;
                vm.searchQuery = null;
            });
        }
    }
})();
