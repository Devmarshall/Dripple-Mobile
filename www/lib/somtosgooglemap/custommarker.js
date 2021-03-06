function CustomMarker(latlng, map, args) {
	this.latlng = latlng;
	this.args = args;
	this.setMap(map);
}



CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

	var self = this;

	var div = this.div;

  var img =this.img;

	if (!div) {

		div = this.div = document.createElement('div');
		img = this.img = document.createElement('img');
		img.id="immagemarker";
		div.id = 'marker';
		img.src='img/user.png';
		 div.appendChild(img);
		// div.style.position = 'absolute';
		// div.style.cursor = 'pointer';
		// div.style.width = '20px';
		// div.style.height = '20px';
		// div.style.background = 'blue';

		if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}

		google.maps.event.addDomListener(div, "click", function(event) {
			var sa = document.getElementById('pop');
			sa.className="fat_2";

			var ov = document.getElementById('ov');
			ov.className="ov";
		});

 
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

	if (point) {
		div.style.left = (point.x - 10) + 'px';
		div.style.top = (point.y - 20) + 'px';
	}
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;
};
