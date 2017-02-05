(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('AllPublicationsListPublicationsController', AllPublicationsListPublicationsController);

    AllPublicationsListPublicationsController.$inject = ['$scope', '$state', 'Publication'];

    function AllPublicationsListPublicationsController ($scope, $state, Publication) {
        var vm = this;

        vm.publications = [];

        loadAll();


        function loadAll() {
            Publication.query(function(result) {
                vm.publications = result;
                console.log(vm.publications)
                vm.searchQuery = null;
            });
        }
    }
})();
