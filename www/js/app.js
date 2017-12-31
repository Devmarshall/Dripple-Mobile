// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularMoment', 'ngStorage', 'ngMaterial', 'angularGrid', 'starter.controllers', 'ngCordova', 'selector', 'smap', 'angularRipple', 'starter.mod'])

  .run(function ($ionicPlatform, $interval, amMoment, socket, $localStorage, $http) {

    var config = {
      apiKey: "AIzaSyAUJMG0nXuxPQVo9MCvLiiB70VamKHfoYk",
      authDomain: "dripple-82679.firebaseapp.com",
      databaseURL: "https://dripple-82679.firebaseio.com",
      // databaseURL: 'mongodb://localhost:27017/Dripple',
      projectId: "dripple-82679",
      storageBucket: "dripple-82679.appspot.com",
      messagingSenderId: "359156677593"
    };
    firebase.initializeApp(config);

    firebase.auth().signInAnonymously()
      .then(function (_auth) {
        // console.log("Logged In!")

        // after we login, we want to load up any data
        // loadData();

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

      });


    if ($localStorage.location) {/////means its not null now
      $interval(ping, 960000);///pings after 16 minutes your location if ur active or set it
    }



    amMoment.changeLocale('en');
    console.log($localStorage.token);
    if ($localStorage.token) {
      if ($localStorage.token.length > 20) {
        socket.emit('adduser', { data: $localStorage.token });
      }
      else {
      }
    }
    else {
      //alert($localStorage.token)
    }

    function ping() {
      console.log('ping');
      navigator.geolocation.getCurrentPosition(showPosition);

    }
    function showPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      $http.post('http://localhost:8080/routes/updateuser/:' + $localStorage.token + '-:latitude-:' + position.coords.latitude).success(function (data, status) {
      })

      $http.post('http://localhost:8080/routes/updateuser/:' + $localStorage.token + '-:Longitude-:' + position.coords.longitude).success(function (data, status) {
      })
    }
    $ionicPlatform.ready(function () {
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

  .config(function ($stateProvider, $urlRouterProvider) {
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


      .state('sellerinit', {
        url: '/sellerinit',
        templateUrl: 'templates/sellinit.html',
        controller: 'sellerinit'
      })


      .state('dms', {
        url: '/dms',
        templateUrl: 'templates/dms.html',
        controller: 'dms'
      })

      .state('chat', {
        url: '/chat/:tokken/:uname',
        templateUrl: 'templates/chat.html',
        controller: 'chat'
      })


      .state('bidding', {
        url: '/bidding',
        abstract: true,
        templateUrl: 'templates/bidding.html'
      })

      .state('postitem', {
        url: '/postitem',
        templateUrl: 'templates/post.html',
        controller: 'post'
      })

      .state('postservice', {
        url: '/postservice',
        templateUrl: 'templates/postservice.html',
        controller: 'post'
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


      .state('bidding.product', {
        url: '/product',
        views: {
          'bidding_product': {
            templateUrl: 'templates/productbid.html',
            controller: 'auction'
          }
        }
      })



      .state('bidding.room', {
        url: '/room',
        views: {
          'bidding_room': {
            templateUrl: 'templates/productroom.html',
            controller: 'bidhistory'
          }
        }
      })



      .state('bidding.similar', {
        url: '/similar',
        views: {
          'bidding_similar': {
            templateUrl: 'templates/productsimilar.html',
            controller: 'bidding'
          }
        }
      })

      .state('main.trade', {
        url: '/trade',
        views: {
          'main_trade': {
            templateUrl: 'templates/playlists.html',
            controller: 'demo'
          }
        }
      })
      .state('main.hot', {
        url: '/hot',
        views: {
          'main_hot': {
            templateUrl: 'templates/bid.html',
            controller: 'bid'
          }
        }
      })

      .state('main.post', {
        url: '/post',
        views: {
          'main_post': {
            templateUrl: 'templates/postmain.html',
            controller: 'post'
          }
        }
      })

      .state('main.trends', {
        url: '/trends',
        views: {
          'main_trends': {
            templateUrl: 'templates/trends.html',
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
        url: '/item/:_id',
        templateUrl: 'templates/item.html',
        controller: 'itemctrl'
      })

      .state('edit', {
        url: '/edit',
        templateUrl: 'templates/edit.html',
        controller: 'editctrl'
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

      .state('profilepageseller', {
        url: '/profilepageseller',
        templateUrl: 'templates/profilepageseller.html',
        controller: 'grid'
      })


      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'grid'
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
