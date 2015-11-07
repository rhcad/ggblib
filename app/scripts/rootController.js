angular.module('ggbApp')
  .controller('RootController', function($scope, $state, $http, model) {
    'use strict';

    $scope.isState = function(name) {
      return $state.$current.name.indexOf(name) >= 0;
    };

    $scope.go = function(name, param) {
      return $state.go(name, param);
    };

    $scope.edit = function(id) {
      window.open(
        $scope.rootURL + 'edit/?id=' + id,
        '_blank' // open in a new window.
      );
    };

    $scope.ggbCount = function (q, ggbs) {
      return model.findGgb(q, ggbs).length;
    };

    model.debugging = window.location.port==='9000';
    model.dataURL   = model.debugging ? 'ggbdata/' : '../ggbdata/';
    model.ggbJS     = model.debugging ? 'ggb/web/' : '../ggb/web/';
    $scope.rootURL  = model.debugging ? '' : 'http://rhcad.com/ggblib/';
    $scope.dataURL  = model.dataURL;
    $scope.ggbJS    = model.ggbJS;

    $scope.data = { ggbs: model.ggbs, keys: model.keys, debugging: model.debugging };
    $http.get(model.dataURL + 'index.json')
      .success(function (data) {
        model.ggbs = data;
        model.keys = model.collectKeys();
        $scope.data.ggbs = data;
        $scope.data.keys = model.keys;
      }).error(function() {
        console.log('Fail to get index.json');
      });

    $http.get(model.dataURL + 'users.json')
      .success(function (data) {
        model.users = data;
      }).error(function() {
        console.log('Fail to get users.json');
      });

    $scope.getUser = function(id) {
      return model.getUser(id) || {};
    };

  });
