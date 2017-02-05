(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('publication', {
            parent: 'entity',
            url: '/publication',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.publication.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/publication/publications.html',
                    controller: 'PublicationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('publication');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('publication-detail', {
            parent: 'entity',
            url: '/publication/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.publication.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/publication/publication-detail.html',
                    controller: 'PublicationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('publication');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Publication', function($stateParams, Publication) {
                    return Publication.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'publication',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('publication-detail.edit', {
            parent: 'publication-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/publication/publication-dialog.html',
                    controller: 'PublicationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Publication', function(Publication) {
                            return Publication.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('publication.new', {
            parent: 'publication',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/publication/publication-dialog.html',
                    controller: 'PublicationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                text: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('publication', null, { reload: 'publication' });
                }, function() {
                    $state.go('publication');
                });
            }]
        })
        .state('publication.edit', {
            parent: 'publication',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/publication/publication-dialog.html',
                    controller: 'PublicationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Publication', function(Publication) {
                            return Publication.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('publication', null, { reload: 'publication' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('publication.delete', {
            parent: 'publication',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/publication/publication-delete-dialog.html',
                    controller: 'PublicationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Publication', function(Publication) {
                            return Publication.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('publication', null, { reload: 'publication' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
