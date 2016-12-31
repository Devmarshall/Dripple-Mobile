var module = angular.module('smap', []);
module.directive('smap', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
          function includeJs(jsFilePath) {
          var js = document.createElement("script");

          js.type = "text/javascript";
          js.src = jsFilePath;

          document.body.appendChild(js);
          }


          includeJs("lib/somtosgooglemap/custominfobox.js");
          includeJs("lib/somtosgooglemap/custommarker.js");
            console.log(element);

              var myOptions = {
                zoom: 16,
                center: new google.maps.LatLng(4.7774200, 7.0134000),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            var map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
            map.setOptions({styles: stylejson()});
            google.maps.event.addListener(map, 'click', function(e) {
                scope.$apply(function() {
                    addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                  });

                    console.log(e.ba);
                });

            }); // end click listener


            addMarker= function(pos){
          		 var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);

               /////pass the image value to the image here
          		overlay = new CustomMarker(myLatlng,	map,
          			{
          				marker_id: '123'
          			}
          		  );

              var infoBox = new InfoBox({
                 latlng: myLatlng,
                 map: map,
                 content: this.content
             });

          	} //end addMarker

        }
    };
});

function MapCtrl($scope) {

    $scope.mapPin = 'No pin set yet';

}


function stylejson(){
  var style = {
  default: null,
  silver: [
    {
      elementType: 'geometry',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#f5f5f5'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#bdbdbd'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#ffffff'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [{color: '#757575'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#dadada'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#616161'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#e5e5e5'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#eeeeee'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#c9c9c9'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9e9e9e'}]
    }
  ],

  night: [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ],

  retro: [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    }
  ],

  hiding: [
    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    }
  ]
};
  return style.silver;
}
