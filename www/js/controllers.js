angular.module('starter.controllers', [])
.controller('itemctrl',function($scope){





  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500,
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });





  $scope.d=function(){
    console.log("description");
    $scope.view={
      comments:false,
      d:true,
      // user:true/////////for now  true
    }
  }

$scope.view={
  comments:false,
  d:true,
  user:true/////////for now  true
}
$scope.comment=function(){
  console.log("comment");
  $scope.view={
    comments:true,
    d:false,
    // user:true/////////for now  true
  }
}


})


.service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        };
    }])
    .controller('grid', ['$scope','imageService','angularGridInstance', function ($scope,imageService,angularGridInstance) {
       imageService.loadImages().then(function(data){
            data.data.items.forEach(function(obj){
                var desc = obj.description,
                    width = desc.match(/width="(.*?)"/)[1],
                    height = desc.match(/height="(.*?)"/)[1];

                obj.actualHeight  = height;
                obj.actualWidth = width;
            });
           $scope.pics = data.data.items;
        });
        $scope.refresh = function(){
            angularGridInstance.gallery.refresh();
        }
    }])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope) {
  $scope.data = [
    { title: 'img/ben.png', id: 1 },
    { title: 'img/ben.png', id: 2 },
    { title: 'img/ben.png', id: 3 },
    // { title: 'img/ben.png', id: 4 },
    // { title: 'img/ben.png', id: 5 },
    // { title: 'img/ben.png', id: 6 }
  ];

  $scope.data2=[
    {name:"john",
    image:'img/ben.png',
    id:'xcdddd12',
    distance:10,
    lat:41.850034,
    lng:41.850030,
    images:[
      { image: 'img/ben.png', id: 1 },
      { image: 'img/ben.png', id: 2 },
      { image: 'img/ben.png', id: 3 },
    ]},
    {name:"john",
    image:'img/ben.png',
    id:'xcdddd12',
    distance:10,
    lat:42.050030,
    lng:41.850031,
    images:[
      { image: 'img/ben.png', id: 1 },
      { image: 'img/ben.png', id: 2 },
      { image: 'img/ben.png', id: 3 },
    ]},
    {name:"john",
    image:'img/ben.png',
    id:'xcdddd12',
    distance:10,
    lat:41.950030,
    lng:41.850030,
    images:[
      { image: 'img/ben.png', id: 1 },
      { image: 'img/ben.png', id: 2 },
      { image: 'img/ben.png', id: 3 },
    ]}
  ]
  });
