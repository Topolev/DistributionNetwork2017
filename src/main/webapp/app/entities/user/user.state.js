(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('user', {
                parent: 'entity',
                url: '/user?page&sort',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'userManagement.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/entities/user/user.html',
                        controller: 'UserController',
                        controllerAs: 'vm'
                    }
                }, params: {
                    page: {
                        value: '1',
                        squash: true
                    },
                    sort: {
                        value: 'id,asc',
                        squash: true
                    }
                },
                resolve: {
                    pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                        return {
                            page: PaginationUtil.parsePage($stateParams.page),
                            sort: $stateParams.sort,
                            predicate: PaginationUtil.parsePredicate($stateParams.sort),
                            ascending: PaginationUtil.parseAscending($stateParams.sort)
                        };
                    }],
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('user-management');
                        return $translate.refresh();
                    }]

                }
            });
    }
})();
