// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','angularMoment','ngStorage', 'ngMaterial','angularGrid' ,'starter.controllers','ngCordova','selector','smap','angularRipple'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


   .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

.state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/tabsshome.html'
  })

 .state('main.profile', {
      url: '/profile',
      views: {
        'main_profile': {
          templateUrl: 'templates/check.html',
          controller: 'check'
        }
      }
    })

  .state('main.trade', {
      url: '/trade',
      views: {
        'main_trade': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
   .state('main.hot', {
      url: '/hot',
      views: {
        'main_hot': {
          templateUrl: 'templates/grid.html',
          controller: 'load'
        }
      }
    })

    .state('main.post', {
      url: '/post',
      views: {
        'main_post': {
          templateUrl: 'templates/post.html',
          controller: 'post'
        }
      }
    })

     .state('main.trends', {
      url: '/trends',
      views: {
        'main_trends': {
          templateUrl: 'templates/signup.html',
          // controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/login.html',
          // controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.sign_up', {
      url: '/sign_up',
      views: {
        'tab_sign_up': {
          templateUrl: 'templates/signup.html',
          // controller: 'ChatDetailCtrl'
        }
      }
    })




  .state('app', {
  url: '/app',
  abstract: true,
  templateUrl: 'templates/menu.html',
  controller: 'AppCtrl'
})

.state('item', {
url: '/item',
templateUrl: 'templates/item.html',
controller: 'itemctrl'
})

.state('signup', {
url: '/signup',
templateUrl: 'templates/signup.html',
controller: 'signup'
})


.state('grid', {
url: '/grid',
templateUrl: 'templates/grid.html',
controller: 'grid'
})

.state('profilepageseller',{
  url:'/profilepageseller',
  templateUrl:'templates/profilepageseller.html',
  controller:'grid'
})


.state('login',{
  url:'/login',
  templateUrl:'templates/login.html',
  controller:'grid'
})

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/playlists');
  // $urlRouterProvider.otherwise('/item');
  // $urlRouterProvider.otherwise('/grid');
    // $urlRouterProvider.otherwise('/profilepageseller');
      // $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.otherwise('/main/trade');
});
