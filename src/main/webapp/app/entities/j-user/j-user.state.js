(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('j-user', {
            parent: 'entity',
            url: '/j-user',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.jUser.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/j-user/j-users.html',
                    controller: 'JUserController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jUser');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('j-user-detail', {
            parent: 'entity',
            url: '/j-user/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.jUser.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/j-user/j-user-detail.html',
                    controller: 'JUserDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jUser');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'JUser', function($stateParams, JUser) {
                    return JUser.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'j-user',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('j-user-detail.edit', {
            parent: 'j-user-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/j-user/j-user-dialog.html',
                    controller: 'JUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JUser', function(JUser) {
                            return JUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('j-user.new', {
            parent: 'j-user',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/j-user/j-user-dialog.html',
                    controller: 'JUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('j-user', null, { reload: 'j-user' });
                }, function() {
                    $state.go('j-user');
                });
            }]
        })
        .state('j-user.edit', {
            parent: 'j-user',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/j-user/j-user-dialog.html',
                    controller: 'JUserDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JUser', function(JUser) {
                            return JUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('j-user', null, { reload: 'j-user' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('j-user.delete', {
            parent: 'j-user',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/j-user/j-user-delete-dialog.html',
                    controller: 'JUserDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JUser', function(JUser) {
                            return JUser.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('j-user', null, { reload: 'j-user' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
