// Copyright (c) 2015 Zhang Yungui, GNU GPL v3 licensed.
//

angular.module('ggbApp')
  .controller('PreviewController', function($scope, $stateParams, $http, model) {
    'use strict';

    var id = $stateParams.id || model.ggbid,
        info = model.getGgb(id),
        article = angular.element('#ggb-preview');

    $scope.ggb = { id: id, info: info };
    $scope.ggbCount = function (q, ggbs) {
      return model.findGgb(q, ggbs).length;
    };

    if (info && article.length === 1) {
      model.ggbid = id;
      article.attr('data-param-width', info.width);
      article.attr('data-param-height', info.height);

      $http.get(model.dataURL + 'ggb64/' + id + '.b64')
        .success(function (data) {
          data = data.replace(/\n/g, '');
          article.attr('data-param-ggbBase64', data);
          if (window.webSimple) {
            window.webSimple.succeeded = window.webSimple();
          }
        }).error(function() {
          console.log('Fail to get %d.b64' % id);
        });
    }
  });
