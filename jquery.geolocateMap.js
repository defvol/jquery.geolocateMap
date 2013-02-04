// Generated by CoffeeScript 1.4.0
(function() {
  var GeolocateMap, Marker;

  GeolocateMap = (function() {

    function GeolocateMap($element, settings) {
      var markers_options;
      this.map = new google.maps.Map($element[0], settings['google_maps']);
      this.markers = Marker.markers_from_objects(this.map, settings['markers'], settings['markers_settings']);
      markers_options = settings['markers_settings'];
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
      markers_settings: {
        fit_bounds: true,
        draggable: true
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

    function Marker(map, data, settings) {
      var latitude, longitude, marker_position, pos;
      latitude = data['lat'];
      longitude = data['lng'];
      pos = new google.maps.LatLng(latitude, longitude);
      marker_position = {
        'position': pos,
        'map': map
      };
      settings = $.extend({}, settings, marker_position);
      this.gmark = new google.maps.Marker(settings);
    }

    Marker.prototype.get_position = function() {
      return this.gmark.getPosition();
    };

    Marker.markers_from_objects = function(map, markers, settings) {
      return $(markers).map(function(i, e) {
        return new Marker(map, e, settings);
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
