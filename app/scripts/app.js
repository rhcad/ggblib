'use strict';

angular.module('ggbApp', ['ui.router', 'ngAnimate', 'mgcrea.ngStrap',
      'pascalprecht.translate', 'LocalStorageModule', 'akoenig.deckgrid'])
  .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'
      })
      .state('search', {
        url: '/browse?:q&:page',
        templateUrl: 'views/home/browse.html',
        controller: 'HomeController'
      })
      .state('browse', {
        url: '/browse?:page',
        templateUrl: 'views/home/browse.html',
        controller: 'HomeController'
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'views/upload/upload.html',
        controller: 'UploadController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'LoginController'
      })
      .state('debug', {
        url: '/debug',
        templateUrl: 'views/home/debug.html'
      })
      .state('preview', {
        url: '/preview/:id',
        templateUrl: 'views/preview/preview.html',
        controller: 'PreviewController'
      })
      .state('preview.showProp', {
        templateUrl: '../views/preview/showProp.html'
      })
      .state('preview.editProp', {
        templateUrl: '../views/preview/editProp.html',
        controller: 'EditPropController'
      });

    $urlRouterProvider.otherwise('/browse');
    localStorageServiceProvider.setPrefix('ggb');
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://rhcad.com/**']);
  });
