(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('CategoryPublicationsRightSidebarController', CategoryPublicationsRightSidebarController);

    CategoryPublicationsRightSidebarController.$inject = ['$scope', '$state', 'SubCategory', '$stateParams','$http'];

    function CategoryPublicationsRightSidebarController($scope, $state, SubCategory, $stateParams, $http) {
        var vm = this;

        vm.title = "SubCategory";
        vm.links = [];
        vm.routerTemplate = "subcategory-publications({id:%id%})";

        var templateUrl = "/api/categories/{id}/sub-categories";

        loadAll();

        function loadAll() {
            var url = templateUrl.replace("{id}",$stateParams.id);
            $http.get(url).then(function(resp){
               vm.links = resp.data;
            });

        }
    }
})();
