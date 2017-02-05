/**
 * Created by Vladimir on 29.10.2016.
 */
/**
 * Created by Vladimir on 29.10.2016.
 */
(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .directive('checkImageUser', CheckImageUser);

    CheckImageUser.$inject = ['$http'];

    function CheckImageUser($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('ngSrc', function (ngSrc) {
                    $http({
                        method: 'HEAD',
                        url: ngSrc
                    }).then(function (response) {
                        console.log("Directive");
                        console.log(response);
                        if (response.status == 204){
                            element.attr('src', '/content/images/nologo.png');
                        }
                        },
                        function () {
                            element.attr('src', '/content/images/nologo.png');
                        });

                });
            }
        };
    }
})();
