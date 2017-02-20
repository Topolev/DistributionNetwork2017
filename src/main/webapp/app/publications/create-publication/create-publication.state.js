(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('create-publication', {
            parent: 'app',
            url: '/publications/create',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'distributionNetworkApp.jUser.home.title'
            },
            views: {
                'content@':{
                    templateUrl: 'app/publications/create-publication/create-publication.html',
                    controller: 'CreatePublicationController',
                    controllerAs: 'vm'
                }
            }
        });
    }

})();
