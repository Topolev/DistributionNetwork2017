(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('CreatePublicationController', CreatePublicationController);

    CreatePublicationController.$inject = ['Category', '$scope', 'Hierarchy','Publication','Principal'];

    function CreatePublicationController(Category, $scope, Hierarchy, Publication, Principal) {
        var vm = this;

        vm.publication = {
            name: '',
            text: '',
            labels: [],
            subCategories:[]
        };

        vm.categories = [];
        vm.selectedCategory = {};

        vm.subCategories = [];
        vm.selectedSubCategory = {};


        load();

        function load() {
            Hierarchy.getAllCategories()
                .then(function (resp) {
                    vm.categories = resp.data;
                    console.log(vm.categories);
                })
        }

        Principal.identity().then(function(account) {
            vm.publication.user = account;
            console.log('USER');
            console.log(account)
        });

        $scope.$watch('vm.selectedCategory', function () {
            if (vm.selectedCategory.id) {
                Hierarchy.getSubCategoriesBelongCategory(vm.selectedCategory.id)
                    .then(function (resp) {
                        vm.selectedSubCategory = {};
                        vm.subCategories = resp.data;
                    })
            }
        })

        vm.options = {
            language: 'en',
            allowedContent: true,
            entities: false,
            filebrowserUploadUrl: vm.rootUriApp + "api/template/upload",
            toolbarGroups: [
                {name: 'undo'},
                {name: 'insert'},
                {name: 'forms'},
                {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
                {name: 'paragraph', groups: ['list', 'blocks']},
                {name: 'styles'},
                {name: 'colors'}]
        };

        vm.refreshLabel = function (select) {
            Hierarchy.getPublicationsByPartialLabelName(select.search)
                .then(function (resp) {
                    select.items = resp.data;
                })
        }





        vm.save = function() {
            vm.isSaving = true;
            console.log(vm.publication)
            if (vm.publication.id !== null) {
                Publication.update(vm.publication, onSaveSuccess, onSaveError);
            } else {
                Publication.save(vm.publication, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('distributionNetworkApp:publicationUpdate', result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
