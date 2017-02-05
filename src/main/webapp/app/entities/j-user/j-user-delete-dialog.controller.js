(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('JUserDeleteController',JUserDeleteController);

    JUserDeleteController.$inject = ['$uibModalInstance', 'entity', 'JUser'];

    function JUserDeleteController($uibModalInstance, entity, JUser) {
        var vm = this;

        vm.jUser = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            JUser.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
