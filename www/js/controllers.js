

   angular.module('starter.controllers', [])


                .service('saver',function(){
                  var bidid=''
                  return {
                    savebidid:function(x){
                      bidid=x
                    },
                    getbidid:function(){
                      return bidid
                    }
                  }
                })


               .service('stater', function($state,$ionicPopup) {

                 return {
                   get:function(x){
                     $state.go('sellerinit');
                   },alert:function(title,text){
                       $ionicPopup.alert({
                        title:title,
                          templates:text
                            })
                   }
                 }

            })

            .factory('socket', ['$rootScope', function($rootScope) {
            //  var url = "https://warm-plateau-82871.herokuapp.com/";
            var url="http://localhost:3200";
               var url="https://dripplechatserver.herokuapp.com/";
               var socket = io.connect(url);
               console.log("connecting");
               return {
                  url: function() {
                     return url;
                  },
                  on: function(eventName, callback) {
                     socket.on(eventName, callback);
                  },
                  emit: function(eventName, data) {
                     socket.emit(eventName, data);
                  },
                  ioo: function() {
                     console.log(socket);
                     return socket;
                  }
               };
            }])


             .factory('sock', ['$rootScope', function($rootScope) {
            //  var url = "https://warm-plateau-82871.herokuapp.com/";
            // var url="http://localhost:3200";
               var socket = io.connect('http://localhost:3002');
               console.log("connecting");
               return {
                  url: function() {
                     return url;
                  },
                  on: function(eventName, callback) {
                     socket.on(eventName, callback);
                  },
                  emit: function(eventName, data) {
                     socket.emit(eventName, data);
                  },
                  ioo: function() {
                     console.log(socket);
                     return socket;
                  }
               };
            }])




                .service('im',['$q','$http','$localStorage',function($q,$http,$localStorage){
                    this.loadImages = function(x){
                        return $http.get(x);
                    };
                }])
                .controller('demo',function ($scope,im,angularGridInstance,$localStorage,$location,$state,$http) {
              var kk=[{},{},{}];
              $scope.pics = [];  
              var searchvar='';
              $scope.toggle=false;
              var pos=0
              $scope.count=''
              $scope.more=true;
              $scope.pics.text=''
              var view_=''

                    $http.get('https://dripplemain.herokuapp.com/routes/num/'+$localStorage.token).success(function(data,stat){
                        $scope.count=data.result_
                    })

          $scope.next =function(x){
            if (x.price) {
              $location.path('/item/'+x.id)
            }
          }


           $scope.messagecap=function(){
           // alert(4)
            var john=false
             if($localStorage.token){
                if ($localStorage.token.length>2) {
                    john=true
              }
             }
             else{
               
             }
             return john
            }

              // $scope.$watch('pp', function (newValue) {
              // setTimeout(function () {
              // $scope.$apply(function () {
              // $scope.pp=kk;
              // console.log($scope.pp);
              //   });
              //   }, 200);
              //   //  $scope.pic=newValue;
              //     });


          $scope.tog_=function(){
            $state.go('dms');
          }


           $scope.searchtoggle=1;

        //  $scope.pp=[];
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

        $scope.moreDataCanBeLoaded=true;
        load('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+$scope.pics.length)


          $scope.toggle_=function(){
            if ($scope.toggle==false) {
              $scope.toggle=true;
            }
            else {
              $scope.toggle=false;
            }
          }


            $scope.find=function(x){
                $scope.pics.splice(0,$scope.pics.length);////clear array
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
            load("https://dripplemain.herokuapp.com/routes/oop/"+x+'/'+$localStorage.token+'/'+$scope.pics.length)
            pos=3
            view_=x
          }

                $scope.loadMore = function() {
                  if (pos==0) {
                     load('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+ $scope.pics.length ) 
                  }

                  else if(pos==1){
                             load('https://dripplemain.herokuapp.com/routes/searchitems/'+$localStorage.token+'/'+text+'/'+$scope.pics.length )
                      }

                      else if(pos==2){
                                 load('https://dripplemain.herokuapp.com/routes/searchusers/'+$localStorage.token+'/'+text+'/'+$scope.pics.length )
                      }

                      else if(pos==3){
                         load("https://dripplemain.herokuapp.com/routes/oop/"+view_+'/'+$localStorage.token+'/'+$scope.pics.length)
                      }
                    }

           
         
            function load(x){
         //   alert($scope.pics.length)
                    im.loadImages(x).then(function(data){
                        if (data.data.length==0) {
                              $scope.moreDataCanBeLoaded=false;

                            }
                       for(var i=0;i<=(data.data.length-1);i++)
                            // var desc = obj.description,
                            //     width = desc.match(/width="(.*?)"/)[1],
                            //     height = desc.match(/height="(.*?)"/)[1];

                            // obj.actualHeight  = height;
                            // obj.actualWidth = width;
                            
                           {
                            $scope.pics.push(data.data[i])
                            if (i==(data.data.length-1) ) {
                                $scope.$broadcast('scroll.infiniteScrollComplete');  
                            }
                          }
                        
                     });
                    $scope.refresh = function(){
                        angularGridInstance.gallery.refresh();
                    }
            }


               $scope.init=function(x){
          $scope.pics.splice(0,$scope.pics.length);//clear array
    //      $scope.moreDataCanBe oaded=true;
          $scope.pics['i']=false;
          $scope.pics['e']=false;
          $scope.pics['all']=false;
          ini_(x);


        }

        function ini_(x){
          var text=''
          if ($scope.pics.text.length==0) {
            text='**none**'
          }
          else{
            text=$scope.pics.text
          }
          if ($scope.pics.text=='') {
            $scope.pics.text='**none**';
          }
          if (x==1) {
            $scope.pics['i']=true;
            // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchitems/'+$localStorage.token+'/'+$scope.pics.text+'/'+kk.length).then(function(data){
                load('https://dripplemain.herokuapp.com/routes/searchitems/'+$localStorage.token+'/'+text+'/'+$scope.pics.length )
              pos=1
          }

          else   if (x==-1) {
            $scope.pics['all']=true;
                load('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+ $scope.pics.length )
              pos=0
            }
          else {
          $scope.pics['e']=true;
          // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchusers/'+$localStorage.token+'/'+$scope.pics.text+'/'+kk.length).then(function(data){
                load('https://dripplemain.herokuapp.com/routes/searchusers/'+$localStorage.token+'/'+text+'/'+$scope.pics.length )
              pos=2
          }
          setTimeout(function () {

      
        }, 20);
        }





                })


             .controller('mainpage',function($scope,imageService,$localStorage,$http){
              var kk=[{},{},{}];
              $scope.pp = [{},{},{}];  
              var searchvar='';
              $scope.toggle=false;
              $scope.more=true;
              // $scope.$watch('pp', function (newValue) {
              // setTimeout(function () {
              // $scope.$apply(function () {
              // $scope.pp=kk;
              // console.log($scope.pp);
              //   });
              //   }, 200);
              //   //  $scope.pic=newValue;
              //     });


          $scope.tog_=function(){
            $state.go('dms');
          }


           $scope.searchtoggle=1;

        //  $scope.pp=[];
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


          $scope.toggle_=function(){
            if ($scope.toggle==false) {
              $scope.toggle=true;
            }
            else {
              $scope.toggle=false;
            }
          }
                $scope.loadMoreData = function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');    
            }

                loadata()
                function loadata(){
             // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+0).then(function(data){

                $http.get('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+0).success(dhand);

                function dhand(x){
                    $scope.pp = x;
                  }
                $scope.refresh = function(){
                 angularGridInstance.gallery.refresh();
                }
                }
          

              })
 

            .controller('mod__',function($scope,sock,$localStorage,saver,stater,$http,$rootScope){
               //  alert(JSON.stringify(saver.getbidid()))
               var minBidPrice = Number(saver.getbidid().highestBid);
               minBidPrice = Math.floor((104 / 100) * minBidPrice);

               sock.on('alertnewbid',function(x){
                        stater.alert('sucess','bid has been posted')
                         $rootScope.$broadcast('BOOM!2', $scope.bid.bidPrice)
               })

               $scope.pricelowes=minBidPrice
                $scope.placeBid = function () {
              //    alert(saver.getbidid().lowestBid_pos)
                  if (minBidPrice>=$scope.bid.bidPrice) {
                      stater.alert('error','bid is too low increase it ')
                  }
              else
                {             

                              $scope.bid.userId = $localStorage.tokken;
                              $scope.bid.productId = saver.getbidid()._id;
                              console.log($scope.bid);
              
                                sock.emit('newBid', $scope.bid);
                                   
                              $http.post('http://localhost:3002/api/products/auction/placebid', $scope.bid).then(function (response) {
                                  console.log('bid sucess');
                              
                              }, function (err) {
                                  console.log(err);
                              });
                          }
                        }
            })




            .controller('bid',function($interval,$http,$scope,saver,$location){
                $scope.data={
                  products:[]
                }


                $scope.move_=function(x){
                  saver.savebidid(x)
                  $location.path('/bidding/product')
                }

                $http.get('http://localhost:3002/api/products/getproducts').success(dhand);

                function dhand(x){
                    $scope.products = x;


                $interval(function () {
                    var now = new Date().getTime();

                    $scope.products.forEach(function (product) {
                        temp_endDate_Time = new Date(product.endDate).getTime();

                        var diff = temp_endDate_Time - now;

                        if (diff < 0) {

                            product.timeRemaining = 'EXPIRED';

                        } else {
                            product.endDate_Days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            if (product.endDate_Days < 10) {
                                product.endDate_Days = '0' + product.endDate_Days;
                            }
                            product.endDate_Hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            if (product.endDate_Hours < 10) {
                                product.endDate_Hours = '0' + product.endDate_Hours;
                            }
                            product.endDate_Minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            if (product.endDate_Minutes < 10) {
                                product.endDate_Minutes = '0' + product.endDate_Minutes;
                            }
                            product.endDate_Seconds = Math.floor((diff % (1000 * 60)) / 1000);
                            if (product.endDate_Seconds < 10) {
                                product.endDate_Seconds = '0' + product.endDate_Seconds;
                            }
                            product.timeRemaining = product.endDate_Days + ':' + product.endDate_Hours + ':' + product.endDate_Minutes + ':' + product.endDate_Seconds;
                        }
                    });

                }, 10);
                }

            })

            .controller('auction',function($scope,$location,$http,saver,$interval,$ionicModal,sock){
            
          //  alert(saver.getbidid())
            

 $scope.$on('$ionicView.enter', function() {
      getBids();
 })


        $scope.$on('BOOM!2', function(events, args){
          $scope.auctionProduct.highestBid=args
        })


         $ionicModal.fromTemplateUrl('templates/modalbid.html', {
         scope: $scope,
         animation: 'slide-in-up',
         //  controller:"loaduserstuff"
      }).then(function(modal) {
         $scope.modal = modal;
      });
      $scope.openModal = function() {
         $scope.modal.show();
      };
      $scope.closeModal = function() {
         $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
         $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
         // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
         // Execute action
      });
           



            function getBids() {
                $http.get('http://localhost:3002/api/products/auction/getproduct/'+saver.getbidid()._id).then(function (response) {
                    $scope.auctionProduct = response.data;
                    $scope.auctionEndDate = response.data.endDate;

                    var lowestBid = Number(angular.copy($scope.auctionProduct.highestBid)) + 1;
                    $scope.auctionProduct.highestBid=lowestBid

                    var auctionCountdown = $interval(function () {
                        var now = new Date().getTime();
                        endDate = new Date(angular.copy($scope.auctionEndDate)).getTime();
                        var diff = endDate - now;

                        if (diff < 0) {
                            $scope.timeRemaining = 'Auction Expired';
                            $scope.showNewBidInput = false;
                            $interval.cancel(auctionCountdown);
                            loop = undefined;

                        } else {
                            $scope.showNewBidInput = true;
                            endDate_Days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            if (endDate_Days < 10) {
                                endDate_Days = '0' + endDate_Days;
                            }
                            endDate_Hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            if (endDate_Hours < 10) {
                                endDate_Hours = '0' + endDate_Hours;
                            }
                            endDate_Minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            if (endDate_Minutes < 10) {
                                endDate_Minutes = '0' + endDate_Minutes;
                            }
                            endDate_Seconds = Math.floor((diff % (1000 * 60)) / 1000);
                            if (endDate_Seconds < 10) {
                                endDate_Seconds = '0' + endDate_Seconds;
                            }
                            $scope.timeRemaining = endDate_Days + ':' + endDate_Hours + ':' + endDate_Minutes + ':' + endDate_Seconds;
                        }
                    }, 20);
                }, function (err) {
                    console.log(err);
                });

            }


            $scope.placeBid = function () {
                $scope.bid.userId = angular.copy($scope.user._id);
                $scope.bid.productId = $scope.currentProduct.id;
                console.log($scope.bid);

                sock.emit('newBid');
                console.log('newBid emitted');

                $http.post('/api/products/auction/placebid', $scope.bid).then(function (response) {
                    console.log('bid sucess');
                }, function (err) {
                    console.log(err);
                });
            }

            sock.on('refresh', function () {
                for(var i =0;i<=2;i++){
                    getBids();
                }
            });

            })



            .controller('dms',function($ionicScrollDelegate,$http,$scope,$localStorage,$location){

              $scope.messages=[]
              $scope.$on('$ionicView.enter', function() {
                    if (true) {
                         $http.get("https://dripplemain.herokuapp.com/routes/message/"+$localStorage.token).success(handleSuccess3);
                          }

                          function handleSuccess3(x){
                            $scope.messages=x
                          }


                            console.log($localStorage);
                            $scope.load=false
                          $scope.search__={fun_:function(){
                                if ($scope.search__.text.length>3) {
                                  if (true) {
                                    $http.get("https://dripplemain.herokuapp.com/routes/usersearch/"+$scope.search__.text).success(handleSuccess2);
                                    }
                                }
                                else {
                                  $scope.search__.lists=[]
                                }
                                },

                                  text:'',
                                  lists:[],
                                  history:$localStorage.historyvi
                                }

                                function handleSuccess2(x){
                                  $scope.load=true
                                      $scope.search__.lists=x;
                                }



            })
          })

            .controller('test', function(socket,$rootScope, $localStorage, $interval, $scope, $state) {
              $scope.data_={
                name:'',
                message:''
              };
              socket.on('message_',function(data){
                console.log('received'+JSON.stringify(data));
              //  alert(data.message)
                      setTimeout(function () {
                   $scope.$apply(function () {
                     $scope.data_={
                       name:data.name,
                       message:data.message
                     };
                    // initchat(data)
                     document.getElementById("a").style.zIndex = '10';
                     setTimeout(function(){document.getElementById("a").style.zIndex = '0'},2000);
                   });
                    }, 2);



                        $rootScope.$broadcast('BOOM!', data)

                        //   $state.reload();
                     })

                     function initchat(x){

                       var history=[];
                       if ($localStorage.historyvi) {
                         $localStorage.history_v={}
                       }
                       else {
                         $localStorage.historyvi=[];
                         }
                     //  if (!$localStorage.historyvi[x.tokken]) {
                       //}
                       if (!contains($localStorage.historyvi,x.name)) {
                         $localStorage.historyvi.push({id:x.tokken,name:x.name});
                       }
                         console.log($localStorage);
                     }

                     function contains(x,y){
                       var  val = false;
                       if (x.length>0) {
                       x.forEach(function(obj){
                         if (obj.name==y) {
                           val=true;
                         }
                       })
                       }
                     }
          })


.controller('chat',function(socket,$scope,$state,$ionicScrollDelegate,$stateParams,$localStorage,$http){
  //alert(JSON.stringify($stateParams))

   var id=0;
   var authors=['bob','raymond','elisa'];

   function createRandomMessage(id){
     return {
       id:id,
       author:authors[Math.floor(Math.random()*2)],
       message:'whout whout'
     }
   }
 
  
    $scope.$on('$ionicView.enter', function() {
     if($localStorage.token){
        if ($localStorage.token.length<2) {
            $state.go('main.trade')
}
     }
     else{
        $state.go('main.trade')
     }
 })

   function loadBunch(n){
     var data=[];
     var i=0, l=n || 20;
     for(i=0;i<l;i++){
       data.push(createRandomMessage(++id));
     }
     return data;
   }

   $scope.messages=[].concat(loadBunch(30));
   $scope.isLoading=false;
   //fake call to the server and insert new nodes at the begining
   $scope.loadOlder=function(){
     $scope.isLoading=true
     $timeout(function(){
       loadBunch(20).map(function(val){
         $scope.messages.unshift(val);
         console.log($scope.messages);
       })
       $scope.isLoading=false;
     },1000);
   }



        var chatinit=false;
        $scope.data='';
        $scope.m={
          message:'',
          messages:[]
        }

        $scope.$on('BOOM!', function(events, args){
          initchat(args);
          setTimeout(function() {
               $scope.$apply(function() {
                 $scope.m.messages.push({message:args.message,tokken:args.tokken,name:args.name})
                 $ionicScrollDelegate.scrollBottom();
                 });
             }, 20);
           })


        $scope.contains=function(x) {
          var to_=false;
          var check='img/ben.png';
          if (x==check) {
            to_=true;
          }
          return to_;
        }


        $scope.me=function(x) {
          var to_=false;
          var check=$localStorage.token;
          if (x==check) {
            to_=true;
          }
          return to_;
        }

        var tokken='';
        $scope.uname='';
        var exist=false;
        tokken=$stateParams.tokken;
        $scope.$on('$ionicView.enter', function() {



           $http.get('https://dripplemain.herokuapp.com/routes/turntoseen/'+$localStorage.token+'/'+tokken).success(function(exist__){
              
          });

           $http.get('https://dripplemain.herokuapp.com/routes/exist/'+$localStorage.token+'/'+tokken).success(function(exist__){
                exist=exist__
                console.log(exist)
               $http.get('https://dripplemain.herokuapp.com/routes/conversations/'+tokken+'/'+$localStorage.token+'/'+$scope.m.messages.length).success(function(x){
               console.log(x);
               x.forEach(function(obj){
               $scope.m.messages.push({message:obj.message,tokken:obj.tokken,time:obj.time})
               })
               $scope.loaded=true
               $ionicScrollDelegate.scrollBottom();
          });

          });

          $scope.loaded=false
         tokken=$stateParams.tokken;
         $scope.uname=$stateParams.uname;
       //    if (true) {
       //      if(tokken.charAt( 0 ) === ':' ){
    			//      tokken =  tokken.slice( 1 );
    			// 		 console.log({token:tokken});
    			// }
         
        //  Chats.http('user/'+tokken).success(handleSuccess);
        
      });

      function handleSuccess(x){
        console.log(x);
        $scope.data=x;
        if (  $scope.data.name) {
          chatinit=true
        }
      }

      $scope.send=function(){
        console.log($scope.m);
        if ($scope.m.message.length>0) {
          console.log('texting');
          initchat(  $scope.data);
        //  sendmessage();
        $scope.m.messages.push({message:$scope.m.message,tokken:$localStorage.token})
          socket.emit('message',
                      {message:$scope.m.message,
                    //    name:$localStorage.user.name,
                        exist:exist,
                        name:$scope.uname,
                        uname:$localStorage.name,
                        time:Date.now(),
                        tokken:$localStorage.token,
                        to:tokken});
          exist=true////makes the app know weve initialised him
         $ionicScrollDelegate.scrollBottom();
          }
          $scope.m.message=''
          }

          function initchat(x){

            var history=[];
            if ($localStorage.historyvi) {
              $localStorage.history_v={}
            }
            else {
              $localStorage.historyvi=[];
              }
          //  if (!$localStorage.historyvi[x.tokken]) {
            //}
            if (!contains($localStorage.historyvi,x.name)) {
              $localStorage.historyvi.push({id:x.tokken,name:x.name});
            }
              console.log($localStorage);
          }

          function contains(x,y){
            var  val = false;
            if (x.length>0) {
            x.forEach(function(obj){
              if (obj.name==y) {
                val=true;
              }
            })
            }

            return val;
          }
})


        .controller('itemctrl',function($scope,$localStorage,$state,$http,$stateParams){
            var id='';
            $scope.m={
              message:'',
              messages:[]
            }
            $scope.loaded=false
            $scope.message='.......loading'
            var description=document.getElementById('description');
            var comment=document.getElementById('comment');
            $scope.data={};
            $scope.comments=[];
          $scope.$on('$ionicView.enter', function(e) {
            $scope.message='.......loading'
            id=$stateParams._id;
            $scope.loaded=false
            $http.get('https://dripplemain.herokuapp.com/routes/item/'+id+'/'+$localStorage.token).success(function(data,stat){
              console.log(data);
              $scope.loaded=true
              $scope.data=data;
            })
            $http.get('https://dripplemain.herokuapp.com/routes/getcomments/'+id+'/'+$localStorage.token).success(function(data,stat){
              console.log(data);
              $scope.comments=data;
            })
          });

          $scope.user = function(){
            var bo=false;
            if ($localStorage.token.length>30) {
              bo=true;
            }
            return bo;
          }

          $scope.send = function(){
            $http.get('https://dripplemain.herokuapp.com/routes/comment/'+id+'/'+$localStorage.token+'/'+$scope.m.message+'/'+$localStorage.name).success(function(data,stat){
            $scope.comments.push({message:$scope.m.message,name:$localStorage.name})
            })
          }

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
            }

            description.className='selected';
            comment.className='nselected';
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
          description.className='nselected';
          comment.className='selected';
        }

           $scope.messagecap=function(){
           // alert(4)
            var john=false
             if($localStorage.token){
                if ($localStorage.token.length>2) {
                    john=true
              }
             }
             else{
               
             }
             return john
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
          $http.post('https://dripplemain.herokuapp.com/routes/updateuser/'+$localStorage.token+'/latitude/'+position.coords.latitude).success(function(data,status){
          })

          $http.post('https://dripplemain.herokuapp.com/routes/updateuser/'+$localStorage.token+'/longitude/'+position.coords.longitude).success(function(data,status){
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
            $http.post('https://dripplemain.herokuapp.com/routes/updateuser/'+$localStorage.token+'/password/'+$scope.pass.one).success(function(data,status){


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

              .controller('load', function($scope,$http,imageService,angularGridInstance,$state,$window) {




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
                                // $http.get("https://dripplemain.herokuapp.com/routes/pullall/"+x ).success(function(data, status) {

                 // $scope.data=data;
                   imageService.loadImages("https://dripplemain.herokuapp.com/routes/oop/"+x+'/'+$localStorage.token+'/'+$scope.pics.length ).then(function(data){
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

         .controller('post', function($httpParamSerializer,stater,$ionicLoading,$ionicPopup,$scope,$http,$localStorage,$state,$cordovaFile,$ionicPlatform,$window) {
          var category="";
          $scope.log={
            login:false
          }
          $scope.array_=[];
          $scope.blogs=[];
          var check=[];

         var d=[];
          $scope.img={
            'd1':'img/upload-picture.png',
            'd2':'img/upload-picture.png',
            'd3':'img/upload-picture.png'
          }


          //   $scope.$on('img',function(data){
           // $scope.img=data.targetScope.img;
          //console.log($scope.img);
          //setTimeout(function() {
            // console.log( $scope.img);
         //  $scope.$apply(); //this triggers a $digest
         //}, 20);
        ///})

        $scope.$watch('img', function (newValue) {
          setTimeout(function () {
           $scope.$apply(); //this triggers a $digest
        }, 200);
        //  $scope.pic=newValue;
          });

          function isnot(array,value){
            var d=true;
            for (var i = array.length - 1; i >= 0; i--) {
              if (array[i]==value) {
                  d=false;
              }
            }
            return d;
          }   
        
          function saveToFirebase2(point,data,array_,link ) {    
            if (data[point]&&isnot(check,point)) {
            check=check.concat(point)
            console.log('i');
            console.log(point);
            console.log(array_);
            console.log(data)
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('images/' + data[point].fileName).put(data[point].imageBlob).then(function(snapshot){
            $scope.array_ = $scope.array_.concat({url:snapshot.metadata.downloadURLs["0"]});
            console.log($scope.array_.length);
            console.log($scope.blogs.length);
            console.log($scope.array_);
            if ($scope.array_.length===$scope.blogs.length) {
            var link=$localStorage.token+"/"+$scope.data.name+"/"+$scope.data.description+"/"+category+"/"+$scope.data.date+"/"+$scope.data.price;
            moveon($scope.array_,link)
            }
            });
            }
          }

          var moveon =function(data,link){
            console.log(data)
            console.log("https://dripplemain.herokuapp.com/routes/post/"+link)
              $http({
                  url: "https://dripplemain.herokuapp.com/routes/post/"+link,
                  method: "POST",
                  data:  $httpParamSerializer(data),
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
             }
              }).success(function(data){
                    if(data.status==1){
                 $ionicLoading.hide();
                  stater.alert('success',"Saved data");
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
              }).error(function(err){
                stater.aler('fail','fail');
                $ionicLoading.hide()
              });
          }

            var save =function (point,data,blogarray) {
              var fileName, path;
              console.log(blogarray)
              fileName = data[point].replace(/^.*[\\\/]/, '');


              if ($ionicPlatform.is("android")) {
                 path = cordova.file.cacheDirectory
              } else {
                 path = cordova.file.tempDirectory
              }

              $cordovaFile.readAsArrayBuffer(path, fileName).then(function(success) {
                 // success - get blob data
                 var imageBlob = new Blob([success], {
                    type: "image/jpeg"
                 });

                 blogarray=blogarray.concat({imageBlob:imageBlob,fileName:fileName})
                  //console.log(imageBlob);
                 if(point==(data.length-1))
                  {
                    $scope.blogs=blogarray;
                    $ionicLoading.hide()
                      //do nothing
                 }
                 else{
                  save(point+1,data,blogarray)
                 }
              }, function(error) {
                 //console.log(error);
              });
           }



          $scope.imgup =function(x){
            window.imagePicker.getPictures(
                	function(results) {
                      for (var i = 1; i <= results.length; i++) {
                      $scope.img['d'+i] = results[i-1];
                      d['d'+i] = results[i-1];
                    }

                     setTimeout(function () {
                     $scope.$apply(); //this triggers a $digest
                   }, 200);
                    console.log($scope.img)

                      var dataarray=[]
                          $ionicLoading.show();
                			save(0,results,dataarray);
                	 
                  }, function (error) {
                		console.log('Error: ' + error);
                	}, {
                		maximumImagesCount: 3,
                	}
                );

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
                stater.alert('oops',"select category");
              }

              else  if($scope.data.description.length<11){
                stater.alert('oops',"description too short must be above 19 characters");
              }

             
              else if($scope.data.name.length<1){
                stater.alert('oops',"name empty");
              }

               else if($scope.blogs.length<3){
                 stater.alert('oops',"select 3 images");
              }

             else{
                $ionicLoading.show();
              var array_=[];
              var link=$localStorage.token+"/"+$scope.data.name+"/"+$scope.data.description+"/"+category+"/"+$scope.data.date+"/"+$scope.data.price;
               saveToFirebase2(0,$scope.blogs,array_,link);
               saveToFirebase2(1,$scope.blogs,array_,link);
               saveToFirebase2(2,$scope.blogs,array_,link);
             }
             }
           // StrictlyKIRFoundation2017

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
                $http.get('https://dripplemain.herokuapp.com/routes/sellerinit/'+$localStorage.token+'/'+$scope.shop.shopname+'/'+$scope.shop.chosenPlace+'/'+lat+'/'+lng+'/'+$scope.shop.description).success(function(data,status){

                    alert('success');
                    $state.go('main.trade');
                })

            }
            // if (  $scope.gplace.place.length>0) {//means their is lat and lng to use
            //   alert($scope.gplace/place[3]);
            // }
            // $http.post('https://dripplemain.herokuapp.com/routes/updateuser/'+$localStorage.token+'/latitude/'+position.coords.latitude).success(function(data,status){
            // })
          }
        })

        .controller('profilepageseller',function($scope,$http,$state,$localStorage,$location){
            $scope.show={
            nopage:false,
            profile:false,
            spinner:true,
            sell:false    }

            $scope.imgs=[]

            $scope.wm={fulldress:'',
            address_1:''}

            $scope.gPlace={
              place:''
            };

            $scope.sell=function(){
            $state.go('sellerinit');
            }

            $scope.next =function(x){
            if (x.price) {
              $location.path('/item/'+x.id)
            }
          }


            $scope.change=function(){
              $state.go('edit');
            }


          $scope.checker=function(){
            $http.get("https://dripplemain.herokuapp.com/routes/getalluserdatauser/"+$localStorage.token+"" ).success(function(data, status) {
             console.log(data)
             console.log()
             if (data.data == 'kill') {
                  $localStorage.token='';
                  $location.path('/');
             }
             else if (data.err) {

             }

             else{
                $scope.data=data[0];
                $scope.img=data[0].imgage
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
             }
              ///query success
             
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

  // $http.post("https://dripplemain.herokuapp.com/routes/login/somto/password", {params: {name: 'somto'}} ).success(function(data, status) {
  //    console.log(data)
  //     })
  // console.log($localStorage.token);
  //       $scope.data="";
    $http.get("https://dripplemain.herokuapp.com/routes/useritems/"+$localStorage.token ).success(function(data, status) {
        console.log(data)
         $scope.pics=data;
       })


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
                  $http.post("https://dripplemain.herokuapp.com/routes/signup/"+$scope.user.name+"/"+$scope.user.password+"/"+$scope.user.email+"", {params: {name: 'somto'}} ).success(function(data, status) {
                    if (data.error) {
                      alert(data.message);
                    }

                    else {
                  $state.go('main.trade')
                  console.log(data[0].tokken);
                  alert('welcome  '+data[0].name)
                  if(data[0].tokken.length==40){
                  $localStorage.token=data[0].tokken;
                  $localStorage.name=data[0].name
                  console.log($localStorage.token);
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

      $http.get("https://dripplemain.herokuapp.com/routes/login/"+$scope.data.name+"/"+$scope.data.password+"" ).success(function(data, status) {
console.log(data);

        if (data.status==1) {
          if (data.tokken) {
            $localStorage.token=data.tokken;
            $localStorage.name=data.name
            $window.location.reload(true);
            alert('welcome  '+$localStorage.name)
            $state.go('main.trade');
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

        .controller('PlaylistsCtrl', function($scope,$state,imageService,angularGridInstance,$localStorage,$http,$location) {
          var kk=[];
          var searchvar='';
          $scope.toggle=false;
          $scope.moreDataCanBeLoaded=true;
          $scope.$watch('pp', function (newValue) {
          setTimeout(function () {
            $scope.$apply(function () {
              $scope.pp=kk;
              console.log($scope.pp);
                });
        }, 200);
        //  $scope.pic=newValue;
          });

          $scope.tog_=function(){
            $state.go('dms');
          }

          $scope.searchtoggle=1;

          $scope.pp=[];
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



          $scope.find=function(x){
            kk.splice(0,kk.length);
          //  $scope.moreDataCanBeLoaded=true;
            find_(x)
             // });///clears stuff
          }
          function find_(x){

              console.log(x);
            $scope.searchtoggle=0;
            searchvar=x;
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
                                // $http.get("https://dripplemain.herokuapp.com/routes/pullall/"+x ).success(function(data, status) {

                 // $scope.data=data;
    

  //                  imageService.loadImages("https://dripplemain.herokuapp.com/routes/oop/"+x+'/'+$localStorage.token+'/'+kk.length ).then(function(data){
  //                   console.log(data.data);
  //                   if (data.data.length==0) {
  //                       $scope.moreDataCanBeLoaded=false;
  //                   }
  //                   else {
  //                   data.data.forEach(function(obj){
  //                       var desc = obj.description,
  //                           // width = desc.match(/width="(.*?)"/)[1],
  //                           // height = desc.match(/height="(.*?)"/)[1];

  //                            width = 80;
  //                           height = 90;

  //                       obj.actualHeight  = height;
  //                       obj.actualWidth = width;
  //                       console.log(obj);
  //                       kk =kk.concat(obj);
  //                       $scope.pp='';
  //                   });
  // }
  //               });

  //               $scope.refresh = function(){
  //                   angularGridInstance.gallery.refresh();
  //               }

          }

          $scope.next =function(x){
            if (x.price) {
              $location.path('/item/'+x.id)
            }
          }

          $scope.toggle_=function(){
            if ($scope.toggle==false) {
              $scope.toggle=true;
            }
            else {
              $scope.toggle=false;
            }
          }

          $scope.pic={
            text:'',
            map:[]
          };

          // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+kk.length).then(function(data){

          //   console.log(data.data);
          //      data.data.forEach(function(obj){
          //          var desc = obj.description,
          //              width = 70,
          //              height = 160;

          //          obj.actualHeight  = height;
          //          obj.actualWidth = width;
          //      });
          //      data.data.forEach(function(obj){
          //       kk =kk.concat(obj);
          //       $scope.pp='';
          //      })
          //  });
          //  $scope.refresh = function(){
          //      angularGridInstance.gallery.refresh();
          //  }


          $scope.pics={
          e:false,
          i:false,
          all:true,
          text:'',
          map:[]
        };
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

          $scope.loadmore=function(){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if ($scope.searchtoggle==1) {
              if($scope.pics.all) ini_(-1);
              else if ($scope.pics.i) ini_(1);
              else ini_(0);
            }
            else {
            //find_(searchvar);
            }
          }


        $scope.init=function(x){
          kk.splice(0,kk.length);
    //      $scope.moreDataCanBeLoaded=true;
          $scope.pics['i']=false;
          $scope.pics['e']=false;
          $scope.pics['all']=false;
          ini_(x);


        }

        function ini_(x){
          if ($scope.pics.text=='') {
            $scope.pics.text='**none**';
          }
          if (x==1) {
            $scope.pics['i']=true;
            // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchitems/'+$localStorage.token+'/'+$scope.pics.text+'/'+kk.length).then(function(data){

            //     if (data.data.length==0) {
            //        // $scope.moreDataCanBeLoaded=false;
            //     }
            //     else {
            //       data.data.forEach(function(obj){
            //           var desc = obj.description,
            //               width = 70,
            //               height = 160;
            //           obj.actualHeight  = height;
            //           obj.actualWidth = width;
            //           setTimeout(function () {
            //             $scope.$apply(function () {
            //               kk =kk.concat(obj);
            //               $scope.pp='';
            //                 });
            //         }, 200);
            //           console.log(obj);
            //       });
            //     }
            //      $scope.pics.filter=0;


            //  });
            //  $scope.refresh = function(){
            //      angularGridInstance.gallery.refresh();
            //  }
          }

          else   if (x==-1) {
            $scope.pics['all']=true;
            // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchall/'+$localStorage.token+'/'+$scope.pics.text+'/'+kk.length).then(function(data){

            //   if (data.data.length==0) {
            //       $scope.moreDataCanBeLoaded=false;
            //   }
            //   else {
            //     data.data.forEach(function(obj){
            //         var desc = obj.description,
            //             width = 70,
            //             height = 160;
            //         obj.actualHeight  = height;
            //         obj.actualWidth = width;
            //         setTimeout(function () {
            //           $scope.$apply(function () {
            //             kk =kk.concat(obj);
            //             $scope.pp='';
            //               });
            //       }, 200);
            //         console.log(obj);
            //     });
            //   }
            //      $scope.pics.filter=0;


            //  });
            //  $scope.refresh = function(){
            //      angularGridInstance.gallery.refresh();
            //  }
            }
          else {
          $scope.pics['e']=true;
          // imageService.loadImages('https://dripplemain.herokuapp.com/routes/searchusers/'+$localStorage.token+'/'+$scope.pics.text+'/'+kk.length).then(function(data){

          //   if (data.data.length==0) {
          //       $scope.moreDataCanBeLoaded=false;
          //   }
          //   else {
          //     data.data.forEach(function(obj){
          //         var desc = obj.description,
          //             width = 70,
          //             height = 160;
          //         obj.actualHeight  = height;
          //         obj.actualWidth = width;
          //         setTimeout(function () {
          //           $scope.$apply(function () {
          //             kk =kk.concat(obj);
          //             $scope.pp='';
          //               });
          //       }, 200);
          //         console.log(obj);
          //     });
          //   }
          //     // angularGridInstance.gallery.refresh();

          //      $scope.pics.filter=0;


          //  });
          //  $scope.refresh = function(){
          //      angularGridInstance.gallery.refresh();
          //  }
          }
        //  $scope.check.chek1=false;
          setTimeout(function () {

        //  $scope.check.chek1=true;

        }, 20);
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
        //    $scope.pp=$scope.pp;
        //  }),10000);

          });
