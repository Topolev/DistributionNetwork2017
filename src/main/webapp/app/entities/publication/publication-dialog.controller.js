(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('PublicationDialogController', PublicationDialogController);

    PublicationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Publication', 'Label', 'JUser', 'SubCategory'];

    function PublicationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Publication, Label, JUser, SubCategory) {
        var vm = this;

        vm.publication = entity;
        vm.clear = clear;
        vm.save = save;
        vm.labels = Label.query();
        vm.jusers = JUser.query();
        vm.subcategories = SubCategory.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.publication.id !== null) {
                Publication.update(vm.publication, onSaveSuccess, onSaveError);
            } else {
                Publication.save(vm.publication, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('distributionNetworkApp:publicationUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
