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


        // .service('imageService',['$q','$http',function($q,$http){
        //         this.loadImages = function(){
        //             return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        //         };
        //     }])



.service('imageService',['$q','$http',function($q,$http){
                this.loadImages = function(x){
                    return $http.get(x);
                };
            }])


            .controller('grid', ['$scope','$state','imageService','angularGridInstance', function ($scope,$state,imageService,angularGridInstance) {
              //  imageService.loadImages().then(function(data){
              //       data.data.items.forEach(function(obj){
              //           var desc = obj.description,
              //               width = desc.match(/width="(.*?)"/)[1],
              //               height = desc.match(/height="(.*?)"/)[1];
               //
              //           obj.actualHeight  = height;
              //           obj.actualWidth = width;
              //       });
              //      $scope.pics = data.data.items;
              //   });
                $scope.refresh = function(){
                    angularGridInstance.gallery.refresh();
                }

                $scope.item=function(){
                  $state.go('item');
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

        .controller('PlaylistCtrl', function($scope) {
          $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
          ];
        })


              .controller('load', function($scope,$http,imageService,angularGridInstance,$state) {




                $scope.item=function(){
                  $state.go('item');
                }

            $scope.choice={
            mclothing:false,
            fclothing:false,
            Accesories:false,
            Gadgets:false,
            Food:false,
            Gaccessory:false,
            HomeI:false,
            others:false
          }

          $scope.data={};


            $scope.find=function(x){
               $scope.choice={
            mclothing:false,
            fclothing:false,
            Accesories:false,
            Gadgets:false,
            Food:false,
            Gaccessory:false,
            HomeI:false,
            others:false
          }
            $scope.choice[x]=true;
            console.log($scope.choice);
                                // $http.get("http://localhost:8080/routes/pullall/:"+x ).success(function(data, status) {

                 // $scope.data=data;
                   imageService.loadImages("http://localhost:8080/routes/oop/:"+x ).then(function(data){
                    console.log(data.data);
                    data.data.forEach(function(obj){
                        var desc = obj.description,
                            // width = desc.match(/width="(.*?)"/)[1],
                            // height = desc.match(/height="(.*?)"/)[1];

                             width = 80;
                            height = 90;

                        obj.actualHeight  = height;
                        obj.actualWidth = width;
                    });
                   $scope.pics = data.data;
                });
                $scope.refresh = function(){
                    angularGridInstance.gallery.refresh();
                }

               // });///clears stuff
            }


        })

         .controller('post', function($scope,$http,$localStorage,$state) {
          var category="";
          $scope.log={
            login:false
          }
          $scope.data={
            name:"",
            description:"",
            token:$localStorage.token,
            date: new Date()
          }

          $scope.login=function(){
              $state.go('login');
          }


          if (!$localStorage.token) {
              $scope.log={
                        login:true,
                        post:false
                      }
          }

          else if ($localStorage.token  && true) {
              $scope.log={
              login:false,
              post:true
              }
          }

          $scope.choice={
            mclothing:false,
            fclothing:false,
            Accesories:false,
            Gadgets:false,
            Food:false,
            Gaccessory:false,
            HomeI:false,
            others:false
          }

          $scope.selectcat=function(x){
             $scope.choice={
            mclothing:false,
            fclothing:false,
            Accesories:false,
            Gadgets:false,
            Food:false,
            Gaccessory:false,
            HomeI:false,
            others:false
          }
            $scope.choice[x]=true;
            category=x;
            console.log($scope.choice);
          }

            $scope.post=function(){


              if(category==""){
                alert("select category");
              }

              else  if($scope.data.description.length<11){
                alert("description too short must be above 19 characters");
              }

              else if(false){
                //for images
              }

              else if($scope.data.name.length<1){
                alert("name empty");
              }

             else{
                $http.post("http://localhost:8080/routes/post/:"+$localStorage.token
                +"-:"+$scope.data.name+"-:"+$scope.data.description+"-:"+category+"-:"+$scope.data.date, {params: {name: 'somto'}} ).success(function(data, status) {
               if(data.status==1){
                  alert("saved");
                   $scope.data={
                    name:"",
                    description:"",
                    token:$localStorage.token,
                    date: new Date()
                  }///clears stuff


                   $scope.choice={
            mclothing:false,
            fclothing:false,
            Accesories:false,
            Gadgets:false,
            Food:false,
            Gaccessory:false,
            HomeI:false,
            others:false
          }///clear more stuff

               }
             })
             }
            }

        })

        .controller('profilepageseller',function($scope,$http,$state,$localStorage){
            $scope.show={
            nopage:false,
            profile:false,
            spinner:true
            }


          $scope.checker=function(){
            $http.get("http://localhost:8080/routes/getalluserdatauser/:"+$localStorage.token+"" ).success(function(data, status) {
             console.log(data)
              $scope.data=data[0];
              $scope.show={
              nopage:false,
              profile:true,
              spinner:false
              }///query success
            }) .error(function(err)
               {
              ////error
              ///
              $scope.show={
              nopage:true,
              profile:false,
              spinner:false
              }
               });
          }

  // $http.post("http://localhost:8080/routes/login/:somto-:password", {params: {name: 'somto'}} ).success(function(data, status) {
  //    console.log(data)
  //     })
  // console.log($localStorage.token);
  //       $scope.data="";
  //     $http.post("http://localhost:8080/routes/user/:"+$localStorage.token+"", {params: {name: 'somto'}} ).success(function(data, status) {
  //      console.log(data)
  //       $scope.data=data[0];
  //     })


        })


         .controller('check',function($scope,$localStorage){
          console.log($localStorage.token);
            $scope.view={
              check:true,
              login:false,
              profile:false
            };

            if($localStorage.token){
             if($localStorage.token.length==40){
               $scope.view={
                check:false,
                login:false,
                profile:true
            }
            }
            else{
              $scope.view={
              check:false,
              login:true,
               profile:false
            };
            }
          }
          else{
              $scope.view={
              check:false,
              login:true,
               profile:false
            };
            }

        })


        .controller('signup',function($localStorage,$scope,$http,$state,$window){

                  $scope.user={
                    name:"",
                    email:"",
                    password:"",
                    password1:""
                  }
               $scope.signup=function(){

                  if($scope.user.password.length<1||$scope.user.email.length<1||$scope.user.name.length<1){
                    alert("field empty");
                  }
                    else if ($scope.user.password.length<6&&$scope.user.password.length>1) {
                    alert("password too short");
                  }

                  else if($scope.user.password!=$scope.user.password1){
                           alert("password dont match");
                 }

                  else if($scope.user.name.length<6){
                            alert("name too short");
                }

                  else if(1!=1){
                    ////eamail validation
                  }

                  else{
                  $http.post("http://localhost:8080/routes/signup/:"+$scope.user.name+"-:"+$scope.user.password+"-:"+$scope.user.email+"", {params: {name: 'somto'}} ).success(function(data, status) {
                        $window.location.reload(true);
                    console.log(data[0].tokken);
                    if(data[0].tokken.length==40){
                    $localStorage.token=data[0].tokken;
                    console.log($localStorage.token);
                    $state.go($state.current, {}, {reload: true});
                   }
                  })
                  }
        }
      })

          .controller('login',function($scope,$http,$state,$window){

            $scope.data={
              password:"",
              name:""
            }


            $scope.login=function(){
      //             var data = $.param({
      //             book: JSON.stringify({
      //             author: $scope.author,
      //            title : $scope.title,
      //              body : $scope.body
      //   })
      // });

      $http.post("http://localhost:8080/routes/login/:"+$scope.data.name+"/:"+$scope.data.password+"", ).success(function(data, status) {

        if (data) {
          if (data.tokken) {
            $localStorage.token=data.tokken;
            $window.location.reload(true);
          }
          else {

          }
        }

      })
            }


            $scope.signupm=function(){

              $state.go("signup");
            }

             $scope.forgot=function(){

            }


        })

        .controller('PlaylistsCtrl', function($scope,$state,imageService,angularGridInstance,$localStorage) {

          $scope.check=[];

          $scope.check.chek=true;
                    $scope.check.chek1=false;
                    $scope.check.chek2=false;
          console.log( $scope.check.chek);

          $scope.refresh = function(){
              angularGridInstance.gallery.refresh();
          }

          $scope.switch=function(){
            if($scope.check.chek===false){
               $scope.check.chek=true;
                         $scope.check.chek1=false;
                console.log( $scope.check.chek);
            }
            else {
                    $scope.check.chek=false;
                              $scope.check.chek1=true;
                      console.log( $scope.check.chek);
            }
          }


          imageService.loadImages("http://localhost:8080/routes/location/:"+$localStorage.token).then(function(data){
            console.log(data);
               data.data.forEach(function(obj){
                   var desc = obj.description,
                       width = 70,
                       height = 160;

                   obj.actualHeight  = height;
                   obj.actualWidth = width;
               });
              $scope.pics = data.data;
           });
           $scope.refresh = function(){
               angularGridInstance.gallery.refresh();
           }

          $scope.close=function(){
            // $scope.check.chek2=true;
            var sa = document.getElementById('pop');
            sa.className="fat_";
            var ov = document.getElementById('ov');
            ov.className="non";
          }

          $scope.profilepageseller=function(){

            $state.go('profilepageseller');

          }


          $scope.data = [
            { title: 'img/ben.png', id: 1 },
            { title: 'img/ben.png', id: 2 },
            { title: 'img/ben.png', id: 3 },
            // { title: 'img/ben.png', id: 4 },
            // { title: 'img/ben.png', id: 5 },
            // { title: 'img/ben.png', id: 6 }
          ];

          $scope.location=[
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
