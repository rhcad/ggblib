angular.module('ggbApp')
  .config(['$translateProvider', function($translateProvider) {
    'use strict';
    var lang = navigator ? (navigator.language || navigator.userLanguage) : null;

    $translateProvider
      .translations('cn', {
        'Languages': '界面语言',
        'Options': '选项'
      })
      .preferredLanguage(!lang || lang.toLowerCase().indexOf('cn') >= 0 ? 'cn' : 'en')
      .useSanitizeValueStrategy(null);
  }]);
