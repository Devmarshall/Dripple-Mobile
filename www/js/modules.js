//
angular.module('starter.mod', []).directive('googleplace', [ function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                componentRestrictions: {}
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                var addressComponents = geoComponents.address_components;
                // console.log(geoComponents);
                addressComponents = addressComponents.filter(function(component){
                    switch (component.types[0]) {
                        case "locality": // city
                            return true;
                        case "administrative_area_level_1": // state
                            return true;
                        case "country": // country
                            return true;
                        default:
                            return false;
                    }
                }).map(function(obj) {
                    return obj.long_name;
                });

                addressComponents.push(latitude, longitude);

                scope.$apply(function() {
                  // console.log(addressComponents);
                    scope.details = addressComponents; // array containing each location component
                    model.$setViewValue(element.val());
                });
            });
        }
    };
}])
//myApp.factory('myService', function() {});

.directive('geolocation', function($window) {
  return {
    restrict: "E",
    template: '<div></div>',
    link: function (scope, element, attrs) {
      if ($window.navigator && $window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
          element.html('<div>Your geolocation is latitude:<span id="latitude"></span> and longitude:<span id="longitude"></span></div>');
          element.find('#latitude').text(position.coords.latitude);
          element.find('#longitude').text(position.coords.longitude);
        }, function(error) {
          element.text("Your geolocation is not available");
        });
      }
    }
  }
});
