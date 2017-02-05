'use strict';

describe('Controller Tests', function() {

    describe('Publication Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPublication, MockLabel, MockJUser, MockSubCategory;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPublication = jasmine.createSpy('MockPublication');
            MockLabel = jasmine.createSpy('MockLabel');
            MockJUser = jasmine.createSpy('MockJUser');
            MockSubCategory = jasmine.createSpy('MockSubCategory');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Publication': MockPublication,
                'Label': MockLabel,
                'JUser': MockJUser,
                'SubCategory': MockSubCategory
            };
            createController = function() {
                $injector.get('$controller')("PublicationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'distributionNetworkApp:publicationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
