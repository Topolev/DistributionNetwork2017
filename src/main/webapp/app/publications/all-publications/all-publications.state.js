(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('all-publications', {
            parent: 'template-publications',
            url: '/publications/all',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.jUser.home.title'
            },
            views: {
                'right-sidebar-publications@template-publications': {
                    templateUrl: 'app/publications/template-right-sidebar-publications.html',
                    controller: 'AllPublicationsRightSidebarController',
                    controllerAs: 'vm'
                },
                'publications@template-publications':{
                    templateUrl: 'app/publications/template-list-publications.html',
                    controller: 'AllPublicationsListPublicationsController',
                    controllerAs: 'vm'
                }
            }
        });
    }

})();
