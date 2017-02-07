(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('subcategory-publications', {
            parent: 'template-publications',
            url: '/subcategory/:id/publications',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.jUser.home.title'
            },
            views: {
                /*'right-sidebar-publications@template-publications': {
                    templateUrl: 'app/publications/template-right-sidebar-publications.html',
                    controller: 'CategoryPublicationsRightSidebarController',
                    controllerAs: 'vm'
                },*/
                'publications@template-publications':{
                    templateUrl: 'app/publications/template-list-publications.html',
                    controller: 'SubCategoryPublicationsListPublicationsController',
                    controllerAs: 'vm'
                }
            }
        });
    }

})();
