(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('SubCategoryPublicationsListPublicationsController', SubCategoryPublicationsListPublicationsController);

    SubCategoryPublicationsListPublicationsController.$inject = ['$scope', '$state', 'Publication','$stateParams'];

    function SubCategoryPublicationsListPublicationsController ($scope, $state, Publication, $stateParams) {
        var vm = this;

        vm.publications = [];


        loadAll();


        function loadAll() {
            Publication.query({subcategory: $stateParams.id}, function(result) {
                vm.publications = result;
                console.log(vm.publications)
                vm.searchQuery = null;
            });
        }
    }
})();
