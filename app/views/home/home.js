angular.module('ggbApp')
  .controller('HomeController', function($scope, $stateParams, model) {
    'use strict';

    var q = $stateParams.q,
        max_count = 20,
        page = parseInt($stateParams.page);

    $scope.q = q;
    $scope.items = model.findGgb(q && q.split(/(\s|\+|;|,)+/));
    $scope.pages = new Array(Math.ceil($scope.items.length / max_count));
    $scope.currentPage = page ? Math.max(1, Math.min(page, $scope.pages.length)) : 1;
    var start = ($scope.currentPage - 1) * max_count;
    $scope.items = $scope.items.slice(start, start + max_count);

    $scope.findGgb = function (q) {
      $scope.go('search', typeof(q) === 'string' ? { q: q } : q);
    };
    $scope.goPage = function (page) {
      $scope.go('search', { q: q, page: page });
    };
    $scope.preview = function (id) {
      $scope.go('preview', {id: id});
    };
  });
