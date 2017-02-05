(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('JUserDialogController', JUserDialogController);

    JUserDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'JUser', 'Publication'];

    function JUserDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, JUser, Publication) {
        var vm = this;

        vm.jUser = entity;
        vm.clear = clear;
        vm.save = save;
        vm.publications = Publication.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.jUser.id !== null) {
                JUser.update(vm.jUser, onSaveSuccess, onSaveError);
            } else {
                JUser.save(vm.jUser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('distributionNetworkApp:jUserUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
