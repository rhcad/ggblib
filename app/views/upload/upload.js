angular.module('ggbApp')
  .controller('UploadController', function($scope, ggbProp) {
    'use strict';

    $scope.tmp = {};
    $scope.ggbProp = { keys: [] };
    $scope.addKeyword = ggbProp.addKeyword;
    $scope.removeKeyword = ggbProp.removeKeyword;

    $scope.fileSelected = function (file) {
      if (file.name.indexOf('.ggb') > 0) {
        var article = angular.element('.geogebrawebs');
        var reader = new FileReader();

        reader.onload = function (e) {
          $scope.ggbProp.title = file.name.replace('.ggb', '');
          loadProp(e.target.result, article);
          $scope.$applyAsync();

          reader.onload = function (e) {
            loadContent(e.target.result, article);
          };
          reader.readAsDataURL(file);
        };
        reader.readAsBinaryString(file);
      }
    };

    function loadProp(data, article) {
      var zip = new JSZip(data);
      var size = getWindowSize(zip.file('geogebra.xml').asText());

      $scope.ggbProp.width = size.width;
      $scope.ggbProp.height = size.height;
      article.attr('data-param-width', size.width);
      article.attr('data-param-height', size.height);
      readThumbnail(zip);
    }

    function readThumbnail(zip) {
      var zobj = zip.file('geogebra_thumbnail.png');
      if (!zobj) {
        return;
      }
      var blob = new Blob([zobj.asArrayBuffer()], {type: 'image/png'});
    }

    function loadContent(data, article) {
      $scope.tmp.base64 = data;
      article.attr('data-param-ggbBase64', data);
      if (window.webSimple) {
        angular.element('.geogebraweb-dummy-invisible').remove();
        angular.element('.GeoGebraFrame').remove();
        window.webSimple.succeeded = window.webSimple();
      }
    }

    function getWindowSize(xml) {
      var start = xml.search(/(?=window.*width=")/),
          len = xml.substring(start, start + 50).search(/(?=>)/),
          str = '{' + xml.substring(start + 7, start + len - 1) + '}';
      str = str.replace(/=/g, ':').replace(' h', ',h').replace(/"/g, '');
      return JSON.parse(str.replace('width', '\"width\"').replace('height', '\"height\"'));
    }

    $scope.submit = function() {
      var info = ggbProp.saveProp($scope.ggbProp);

      if (info && window.ggbApplet) {
      }
    };
  });
