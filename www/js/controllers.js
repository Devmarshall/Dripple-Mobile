   angular.module('starter.controllers', [])


               .service('stater', function($state) {

                 return {
                   get:function(x){
                     $state.go('sellerinit');
                   }
                 }

            })




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



        .controller('editctrl', function($scope,$http, $state, $localStorage,$window) {

          $scope.vm={data:'on'}
          function getLocation() {
          if (navigator.geolocation) {
            // alert("hey");
            console.log("hey");
              navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert("no geo");
          }
          return 1;
        }

        $scope.changep=function(x){
          console.log(x);
          if (x=='On') {
            console.log('ping');
            $localStorage.location=1;
            getLocation();
          }else{
            $localStorage.location=null;
          }
          console.log($localStorage.location);
        }

        function showPosition(position) {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          $http.post('http://localhost:8080/routes/updateuser/:'+$localStorage.token+'-:latitude-:'+position.coords.latitude).success(function(data,status){
          })

          $http.post('http://localhost:8080/routes/updateuser/:'+$localStorage.token+'-:longitude-:'+position.coords.longitude).success(function(data,status){
      })

    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;
}

        $scope.m={chosenPlace:""};
        $scope.pass={
          one:'',
          two:''
        }

        $scope.change=function(){
          alert('changing');
          if ($scope.pass.one.length<6) {
            alert('password too short');
          }
        else  if ($scope.pass.one!=$scope.pass.two) {
          alert('passwords dont match');
          }
          else {
            $http.post('http://localhost:8080/routes/updateuser/:'+$localStorage.token+'-:password-:'+$scope.pass.one).success(function(data,status){


            })
          }


        }


        $scope.logout=function(){
          alert('logout');
          $localStorage.token=null;
          $state.go('main.trade');
            $window.location.reload(true);
        }
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
            price:'',
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
                +"-:"+$scope.data.name+"-:"+$scope.data.description+"-:"+category+"-:"+$scope.data.date+"-:"+$scope.data.price, {params: {name: 'somto'}} ).success(function(data, status) {
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
        .controller('sellerinit',function($scope,$http,$state,$localStorage){


          $scope.gplace;
          $scope.shop={
            shopname:'',
            place:'',
            chosenPlace:'',
            description:''
          }

          $scope.sell=function(){
            console.log($scope.shop);

            if ($scope.shop.shopname.length<6) {
              alert('the name too short must be above 6 characters');
            }
            else if ($scope.shop.description.length<20) {
              alert('your description doesnt sound fully explanatly try above 20 characters');
            }

            else if ($scope.shop.place.length<3) {
              alert('please select a place from the map list');
            }

            else {
               var lat,lng='';
              if ($scope.shop.place.length==5) {
                lat=$scope.shop.place[3];
                lng=$scope.shop.place[4];
              }

              else  if ($scope.shop.place.length==4) {
                  lat=$scope.shop.place[2];
                  lng=$scope.shop.place[3];
                }


                $scope.shop.chosenPlace=$scope.shop.chosenPlace.replace('-', '');
                $scope.shop.chosenPlace=$scope.shop.chosenPlace.replace(':', '');
                $scope.shop.chosenPlace=$scope.shop.chosenPlace.replace('/', '');
                lat=lat.toString().replace('-','*')
                lng=lng.toString().replace('-','*');
                $scope.shop.description=$scope.shop.description.replace('-', '');
                $scope.shop.description=$scope.shop.description.replace(':', '');
                $scope.shop.description=$scope.shop.description.replace('/', '');
                lat=lat.toString().replace('-','*')
                ///means where good to go
                $http.get('http://localhost:8080/routes/sellerinit/:'+$localStorage.token+'-:'+$scope.shop.shopname+'-:'+$scope.shop.chosenPlace+'-:'+lat+'-:'+lng+'-:'+$scope.shop.description).success(function(data,status){

                    alert('success');

                })

            }
            // if (  $scope.gplace.place.length>0) {//means their is lat and lng to use
            //   alert($scope.gplace/place[3]);
            // }
            // $http.post('http://localhost:8080/routes/updateuser/:'+$localStorage.token+'-:latitude-:'+position.coords.latitude).success(function(data,status){
            // })
          }
        })

        .controller('profilepageseller',function($scope,$http,$state,$localStorage){
            $scope.show={
            nopage:false,
            profile:false,
            spinner:true,
            sell:false    }

            $scope.wm={fulldress:'',
            address_1:''}

            $scope.gPlace={
              place:''
            };

            $scope.sell=function(){
            $state.go('sellerinit');
            }



            $scope.change=function(){
              $state.go('edit');
            }


          $scope.checker=function(){
            $http.get("http://localhost:8080/routes/getalluserdatauser/:"+$localStorage.token+"" ).success(function(data, status) {
             console.log(data)
              $scope.data=data[0];
              ///query success
              if ($scope.data.seller) {
                $scope.show={
                nopage:false,
                profile:true,
                spinner:false,
                sell:false
                }
              }else {
                $scope.show={
                nopage:false,
                profile:false,
                spinner:false,
                sell:true
                }
              }
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
          // console.log($localStorage.token);
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
                    if (data.error) {
                      alert(data.message);
                    }

                    else {
                      $window.location.reload(true);
                      $state.go('main.trade')
                  console.log(data[0].tokken);
                  if(data[0].tokken.length==40){
                  $localStorage.token=data[0].tokken;
                  console.log($localStorage.token);
                  $state.go($state.current, {}, {reload: true});
                 }
                    }

                  })
                  }
        }
      })

          .controller('login',function($scope,$localStorage,$http,$state,$window){

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

      $http.post("http://localhost:8080/routes/login/:"+$scope.data.name+"/:"+$scope.data.password+"", ).success(function(data, status) {
console.log(data);

        if (data.length>0) {
          if (data[0].tokken) {
            console.log(data[0]);
            $localStorage.token=data[0].tokken;
            $window.location.reload(true);
          }

        }
        else {
          alert('wrong details')
        }

      })
            }


            $scope.signupm=function(){

              $state.go("signup");
            }

             $scope.forgot=function(){

            }


        })

        .controller('PlaylistsCtrl', function($scope,$state,imageService,angularGridInstance,$localStorage,$http) {





          $scope.check=[];
          $scope.pics={};
          $scope.pics.text='';


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


        $scope.init=function(x){



          if (x==1) {
            if ($scope.pics.i==true) {
              $scope.pics.e=false;
            }
            $http.get('http://localhost:8080/routes/searchitems/:'+$localStorage.token+'-:'+$scope.pics.text).success(function(data,status){
              console.log(data);
              $scope.pics.map=data;
             $scope.pics.filter=0;
            })
          }
          else {
            if ($scope.pics.e==true) {
              $scope.pics.i=false;
            }
            $http.get('http://localhost:8080/routes/searchusers/:'+$localStorage.token+'-:'+$scope.pics.text).success(function(data,status){
              console.log(data);
              $scope.pics.map=data;
              $scope.pics.filter=1;
            })
          }

        }


          imageService.loadImages("http://localhost:8080/routes/location/:"+$localStorage.token).then(function(data){

            console.log(data.data);
            $scope.pics={};
               data.data.forEach(function(obj){
                   var desc = obj.description,
                       width = 70,
                       height = 160;

                   obj.actualHeight  = height;
                   obj.actualWidth = width;
               });
              $scope.pics.pic = data.data;

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
  $scope.f=$localStorage.token;
      //  setTimeout(  $scope.$apply(function() {
        //    $scope.pics.map=$scope.pics.map;
        //  }),10000);
        $scope.$watch('pics', function (newValue) {
    //Do anything with $scope.letters
    console.log($scope.pics);
    $scope.pics=newValue;
        });
          });
