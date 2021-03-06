// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.order', {
    url: '/order',
    views: {
      'order': {
        templateUrl: 'templates/order.html',
        controller: 'NavCtrl'
      }
    }
  })
  .state('tab.gas_ticket', {
    url: '/gas_ticket',
    views: {
      'action': {
        templateUrl: 'templates/gas_ticket.html',
        controller: 'NavCtrl'
      }
    }
  })
  .state('tab.search', {
    url: '/search',
    views: {
      'search': {
        templateUrl: 'templates/search.html',
        controller: 'NavCtrl'
      }
    }
  })  
  .state('tab.action', {
    url: '/action',
    views: {
      'action': {
        templateUrl: 'templates/action.html',
        controller: 'NavCtrl'
      }
    }
  })
  .state('tab.report', {
    url: '/report',
    views: {
      'action': {
        templateUrl: 'templates/report.html',
        controller: 'NavCtrl'
      }
    }
  })
  .state('tab.store', {
    url: '/store',
    views: {
      'action': {
        templateUrl: 'templates/store.html',
        controller: 'NavCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'templates/account.html',
        controller: 'NavCtrl'
      }
    }
  })
  .state('tab.paycheck', {
    url: '/paycheck',
    views: {
      'account': {
        templateUrl: 'templates/paycheck.html',
        controller: 'NavCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/order');

});
