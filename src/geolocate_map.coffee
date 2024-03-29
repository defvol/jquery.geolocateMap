class GeolocateMap
  constructor: ($element, settings) ->
    @map = new google.maps.Map($element[0], settings['google_maps'])

    @markers = Marker.markers_from_objects(@map, settings['markers'], settings['markers_settings'])

    markers_options = settings['markers_settings']

    if markers_options['fit_bounds']
      if @markers.length > 2
        @map.fitBounds(Marker.bounds_for_markers(@markers))
      else if @markers.length == 1
        @map.setCenter(@markers[0].get_position())

