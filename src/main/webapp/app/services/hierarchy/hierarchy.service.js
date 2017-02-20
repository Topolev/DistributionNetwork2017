(function() {
    'use strict';

    angular
        .module('distributionNetworkApp')
        .factory('Hierarchy', Hierarchy);

    Hierarchy.$inject = ['$http'];

    function Hierarchy ($http) {


        var templateUrlGetAllCategories = "/api/categories";
        var templateUrlGetSubCategoriesBelongCategory = "/api/categories/{id}/sub-categories";
        var templateUrlGetLabelByPartilaName = "/api/labels?partialName={partialName}"

        function getAllCategories(){
            return $http.get(templateUrlGetAllCategories);
        }

        function getSubCategoriesBelongCategory(categoryId){
            var url = templateUrlGetSubCategoriesBelongCategory.replace("{id}",categoryId);
            return $http.get(url);
        }

        function getPublicationsByPartialLabelName(partialName){
            var url = templateUrlGetLabelByPartilaName.replace("{partialName}",partialName);
            return $http.get(url);
        }

        return {
            getAllCategories: getAllCategories,
            getSubCategoriesBelongCategory: getSubCategoriesBelongCategory,
            getPublicationsByPartialLabelName:getPublicationsByPartialLabelName
        };
    }
})();


