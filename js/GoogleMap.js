
            createMap();
            var markers = [];
            var infowindow = new google.maps.InfoWindow();
            var bounds = new google.maps.LatLngBounds();
            function createMap()
            {

                var map = new google.maps.Map(document.getElementById('map_canvas'), {
                    center: new google.maps.LatLng(-6.946475, 107.663090),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 6,
                    disableDefaultUI: true
                });
                var input = (document.getElementById('target'));
                var searchBox = new google.maps.places.SearchBox(input);
                var marker;
                google.maps.event.addListener(searchBox, 'places_changed', function () {
                    var places = searchBox.getPlaces();
                    placeMarker(places[0].geometry.location);
                    map.setZoom(10);
                    map.setCenter(marker.getPosition());
                });
                function placeMarker(location)
                {
                    marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });

                    markers.push(marker);
                    var mid = markers.length - 1;
                    updateLocation(location, mid);
                    bounds.extend(marker.position);
                    map.fitBounds(bounds);

                    var locName = $('#target').val();
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.setContent('<div><strong>' + locName + '</strong><br>' +
                                'Lat: ' + location.lat().toFixed(5) + '<br>' +
                                'Lng' + location.lat().toFixed(6) + '</div>');
                        infowindow.open(map, this);
                        map.setZoom(10);
                        map.setCenter(marker.getPosition());
                    });


                    $('#target').html('');
                }

                console.log(markers);

                function updateLocation(event, mid)
                {
                    if ($('#target').val() !== '') {
                        $('#locationname').val($('#target').val());
                    }
                    $('#userlat').val(event.lat().toFixed(5));
                    $('#userlong').val(event.lng().toFixed(6));

                    $('#address_markers').append("<section id='" + mid + "' class='well'>");
                    $('section#' + mid).append("<p><label>Location Name :</label> " + $('#target').val() + "</p>");
                    $('section#' + mid).append("<p><label>Lat :</label> " + event.lat().toFixed(5) + "</p>");
                    $('section#' + mid).append("<p><label>Lng : </label>" + event.lng().toFixed(6) + "<span><button value='" + mid + "' id='removemarker' class='btn btn-info pull-right' onclick='clearSingleMarker(this.value)' type='button'><i class='fa fa-trash-o'></i></button></span></p>");
                    $('#address_markers').append("</section>");

                }

                google.maps.event.addListener(map, 'click', function (event) {
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        "latLng": event.latLng
                    }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            $("#locationname").val(results[0].formatted_address);
                        }
                    });
                });
            }


            function clearSingleMarker(id) {
                map = null;
                console.log(id);
                for (var i = 0; i < markers.length; i++) {
                    if (id == i) {
                        markers[i].setMap(map);
                    }
                }
                $('#address_markers').find("section#" + id).remove();
            }

