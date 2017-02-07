(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('CategoryPublicationsListPublicationsController', CategoryPublicationsListPublicationsController);

    CategoryPublicationsListPublicationsController.$inject = ['$scope', '$state', 'Publication','$stateParams'];

    function CategoryPublicationsListPublicationsController ($scope, $state, Publication, $stateParams) {
        var vm = this;

        vm.publications = [];


        loadAll();


        function loadAll() {
            Publication.query({category: $stateParams.id}, function(result) {
                vm.publications = result;
                console.log(vm.publications)
                vm.searchQuery = null;
            });
        }
    }
})();
