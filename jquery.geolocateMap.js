// Generated by CoffeeScript 1.4.0
(function() {
  var GeolocateMap, Marker;

  GeolocateMap = (function() {

    function GeolocateMap($element, settings) {
      var markers_options;
      this.map = new google.maps.Map($element[0], settings['google_maps']);
      this.rand = (new Date()).getTime();
      this.markers = Marker.markers_from_objects(this.map, settings['markers']);
      markers_options = settings['markers_options'];
      if (markers_options['fit_bounds']) {
        if (this.markers.length > 2) {
          this.map.fitBounds(Marker.bounds_for_markers(this.markers));
        } else if (this.markers.length === 1) {
          this.map.setCenter(this.markers[0].get_position());
        }
      }
    }

    return GeolocateMap;

  })();

  (function($) {
    var defaults, methods;
    defaults = {
      google_maps: {
        zoom: 0,
        center: new google.maps.LatLng(0.0, 0.0),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true
      },
      markers: [],
      markers_options: {
        fit_bounds: true
      }
    };
    methods = {
      init: function(args) {
        var settings;
        settings = $.extend(true, {}, defaults, args);
        return this.data("geolocate_map", new GeolocateMap(this, settings));
      }
    };
    return $.fn.geolocateMap = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.geolocateMap");
      }
    };
  })(jQuery);

  Marker = (function() {

    function Marker(map, settings) {
      var latitude, longitude, pos;
      latitude = settings['lat'];
      longitude = settings['lng'];
      pos = new google.maps.LatLng(latitude, longitude);
      this.gmark = new google.maps.Marker({
        'position': pos,
        'map': map,
        'draggable': true
      });
    }

    Marker.prototype.get_position = function() {
      return this.gmark.getPosition();
    };

    Marker.markers_from_objects = function(map, markers) {
      return $(markers).map(function(i, e) {
        return new Marker(map, e);
      });
    };

    Marker.bounds_for_markers = function(markers) {
      var bounds;
      bounds = new google.maps.LatLngBounds();
      markers.each(function(i, marker) {
        var latlng;
        if (marker instanceof Marker) {
          latlng = marker.gmark.getPosition();
          return bounds.extend(latlng);
        }
      });
      return bounds;
    };

    return Marker;

  })();

}).call(this);
