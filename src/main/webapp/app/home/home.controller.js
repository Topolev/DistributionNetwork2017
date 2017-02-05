(function () {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;

        vm.currentIndexSlide = 0;
        vm.slickConfig = {
            autoplay: false,
            autoplaySpeed: 1000,
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    console.log("Change")
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            }
        }


        vm.slides = [
            {
                "image": "content/images/main-carousel/001.jpg"
            },
            {
                "image": "content/images/main-carousel/002.jpg",
            },
            {
                "image" : "content/images/main-carousel/003.jpg",
            }
        ]
        console.log(vm.slides.length)
        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }
    }
})();
