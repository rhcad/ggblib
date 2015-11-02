angular.module('ggbApp')
  .controller('HomeController', function($scope, $stateParams, model) {
    'use strict';

    $scope.findGgb = function (q) {
      $scope.items = model.findGgb(q);
    };
    $scope.findGgb($stateParams.q && $stateParams.q.split(/(\s|\+|;|,)+/));

    $scope.preview = function(id) {
      $scope.go('preview', {id: id});
    };
  });
