(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('template-publications', {
            abstract: true,
            parent: 'app',
            views: {
                'content@': {
                    templateUrl: 'app/publications/template-publications.html'
                }
            }
        });
    }

})();
