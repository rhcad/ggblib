'use strict';

angular.module('ggbApp', ['ui.router', 'ngAnimate', 'mgcrea.ngStrap', 'pascalprecht.translate', 'LocalStorageModule'])
  .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $stateProvider
      .state('home', {
        url: '/',
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
      .state('preview', {
        url: '/preview/:id',
        templateUrl: 'views/preview/preview.html',
        controller: 'PreviewController'
      });

    localStorageServiceProvider.setPrefix('ggb');
  })
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://rhcad.com/**']);
  });
