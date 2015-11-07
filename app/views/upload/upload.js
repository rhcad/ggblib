angular.module('ggbApp')
  .controller('UploadController', function($scope, ggbProp) {
    'use strict';

    $scope.tmp = {};
    $scope.ggbProp = { keys: [] };
    $scope.addKeyword = ggbProp.addKeyword;
    $scope.removeKeyword = ggbProp.removeKeyword;

    $scope.fileSelected = function (file) {
      $scope.ggbProp.title = file.name.replace('.ggb', '');
      $scope.$applyAsync();

      if (file.name.indexOf('.ggb') > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
          load(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    function load(data) {
      var article = angular.element('#ggb-preview');
      article.attr('data-param-ggbBase64', data);
      if (window.webSimple) {
        window.webSimple.succeeded = window.webSimple();
      }
    }
  });
