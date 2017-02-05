(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('UploadAvatarController', UploadAvatarController);

    UploadAvatarController.$inject = ['$timeout','$uibModalInstance','$scope','Upload','Principal','parent'];

    function UploadAvatarController ($timeout, $uibModalInstance, $scope, Upload, Principal, parent) {
        var vm = this;

        vm.isInvalidImageExt = false;
        vm.uploadImage = '';
        vm.croppedImage = '';

        console.log(parent);

        $timeout(function (){
            angular.element(document.querySelector('#field-upload-avatar')).on('dragover',vm.handleDragOver);
            angular.element(document.querySelector('#field-upload-avatar')).on('dragleave',vm.handleDragLeave);
            angular.element(document.querySelector('#field-upload-avatar')).on('drop',vm.handleDropFile);
            angular.element(document.querySelector('#choose-file-avatar')).on('change',vm.handleSelectFile);
        });

        Principal.identity().then(function(account) {
            vm.settingsAccount = account;
        });


        vm.handleDragLeave = function(evt){
             evt.currentTarget.classList.remove("over-field-crop-avatar") ;
        };

        vm.cancel = function(){
            $uibModalInstance.close();
        };


        vm.handleDragOver = function(evt){
            evt.stopPropagation();
            evt.preventDefault();

            evt.currentTarget.classList.add("over-field-crop-avatar");


            evt.originalEvent.dataTransfer.dropEffect = 'copy';
        };

        vm.returnUploadImage = function(){
            vm.uploadImage='';
        }

        vm.handleDropFile = function(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.originalEvent.dataTransfer.files; // FileList object.
            evt.currentTarget.classList.remove("over-field-crop-avatar") ;

            handleFile(files[0]);
        }

        vm.handleSelectFile = function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            var files = evt.currentTarget.files;

            handleFile(files[0]);
        }

        vm.saveImage = function(){
            parent.avatarPhoto = vm.croppedImage;
            parent.deletedAvatar = false;
            $uibModalInstance.close();
        }



        var availableExt = ['JPG', 'PNG', 'BMP'];
        var isAvailableExt = function(nameFile){
            var ext = nameFile.split(".")[1] != undefined ? nameFile.split(".")[1].toUpperCase(): '';
            for (var i in availableExt){
                if (availableExt[i] == ext) {
                    return true;
                }
            }
            return false;
        }

        function handleFile(file){
            if (isAvailableExt(file.name)) {
                vm.isInvalidImageExt = false;
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function () {
                        vm.uploadImage = evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            } else {
                $scope.$apply(function () {
                    vm.isInvalidImageExt = true;
                    vm.messageError = 'Invalid extension for image. Available extension JPG, PNG, BMP';
                });
            }
        }




    }
})();
