'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('blog', {
      url: '/',
      templateUrl: 'modules/core/client/views/blog.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('startup', {
      url: '/startup',
      templateUrl: 'modules/core/client/views/startup.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('browse_startup', {
      url: '/browse_startup',
      templateUrl: 'modules/core/client/views/company-view.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('investor', {
      url: '/investor',
      templateUrl: 'modules/core/client/views/investor.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('trends', {
      url: '/trends',
      templateUrl: 'modules/core/client/views/trends.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('browse', {
      url: '/browse',
      templateUrl: 'modules/core/client/views/browse.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('home.workspace', {
      url: 'workspace',
      templateUrl: 'modules/core/client/views/workspace.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('home.profile', {
      url: 'profile',
      templateUrl: 'modules/core/client/views/profile.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
