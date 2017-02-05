(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', '$uibModal','$scope','$http', 'Upload'];

    function SettingsController (Principal, Auth, JhiLanguageService, $translate, $uibModal, $scope, $http, Upload) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.success = null;

        vm.avatarPhoto = undefined;
        vm.isNonAvailableInitialAvatar = true;
        vm.deletedAvatar = false;




        /**
         * Store the "settings account" in a separate variable, and not in the shared "account" variable.
         */
        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login,
                avatar: account.avatar
            };
        };

        Principal.identity().then(function(account) {
            vm.settingsAccount = copyAccount(account);
        }).then(function(){
            $http({
                method: 'HEAD',
                url: '/api/users/photo/' + vm.settingsAccount.login
            }).then(function(response) {
                if (response.status == 200){
                    vm.isNonAvailableInitialAvatar = false;
                }
            });
        });

        function save () {
            Auth.updateAccount(vm.settingsAccount).then(function() {
                vm.error = null;
                vm.success = 'OK';
                Principal.identity(true).then(function(account) {
                    vm.settingsAccount = copyAccount(account);
                });

                JhiLanguageService.getCurrent().then(function(current) {
                    if (vm.settingsAccount.langKey !== current) {
                        $translate.use(vm.settingsAccount.langKey);
                    }
                });
            }).catch(function() {
                vm.success = null;
                vm.error = 'ERROR';
            });

            if (vm.avatarPhoto != undefined && !vm.deletedAvatar){
                Upload.upload({
                    url: 'api/users/uploadlogo',
                    data: {
                        file: vm.avatarPhoto,
                        login: vm.settingsAccount.login
                    }
                }).then(function (resp) {
                    vm.avatarPhoto = undefined;
                    vm.isNonAvailableInitialAvatar = false;
                });
            }

            if (vm.deletedAvatar){
                $http.delete("/api/users/photo/" + vm.settingsAccount.login)
                     .then(function(){
                         vm.deletedAvatar = false;
                         vm.avatarPhoto = undefined;
                         vm.isNonAvailableInitialAvatar = true;
                     });
            }
        }


        vm.updateAvatar = function(){
            var modalInstance = $uibModal.open({
                controller: 'UploadAvatarController',
                controllerAs: 'vm',
                templateUrl: 'app/account/settings/upload-avatar-dialog.html',
                resolve: {
                    parent: function(){
                        return vm
                    }
                }
            });
        }

        vm.deleteAvatar = function(){
            vm.deletedAvatar = true;
        }


    }
})();
