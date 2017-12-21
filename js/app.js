$(function() {

    var data;
    function getCountryInfo(name) {
        var url = 'https://restcountries.eu/rest/v2/name/' + name;

        $.ajax({url: url, type: 'GET', dataType: 'json'}).done(function(r) {
            console.log(r);
            data=r;
            var name = r[0].name;
            var nativeName = r[0].nativeName;
            var code1 = r[0].alpha2Code;
            var capital = r[0].capital;
            var region = r[0].region;
            var subregion = r[0].subregion;
            var population = r[0].population;
            var language = r[0].languages[0].name;
            var currency = r[0].currencies[0].code;
            var flag = r[0].flag;

            $(".name").text(name);
            $(".nativeName").html('<span class="title">Native name:</span>' + " " + nativeName);
            $(".code").html('<span class="title">Two-letter country codes:</span>' + " " + code1);
            $(".capital").html('<span class="title">Capital:</span>' + " " + capital);
            $(".region").html('<span class="title">Geographical location:</span>' + " " + region);
            $(".subregion").html('<span class="title">Subregion:</span>' + " " + subregion);
            $(".population").html('<span class="title">Population:</span>' + " " + population);
            $(".language").html('<span class="title">Language:</span>' + " " + language);
            $(".currency").html('<span class="title">Currency:</span>' + " " + currency);
            $(".image").attr("src", flag).show();

        })
    }
    //getCountryInfo();

    var button = $("[type=submit]");
    var input = $("#find");
    console.log(input);
    console.log(button);
    button.on("click", function(e) {
        //console.log("click");
        //console.log(input.val());
        $(".info").show();
        getCountryInfo(input.val());
        $(".search_map").show();
        $(".map").show();
        google.maps.event.trigger(map, 'resize');
    })

    input.on("keyup", function(e) {
        $(".search_map").find("#address").val(input.val());
    })

    var map;
    function initMap() {

        var styledMapType = new google.maps.StyledMapType(
            [
                {   "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {"hue": "#ffaa00"},
                        {"saturation": "-33"},
                        {"lightness": "10"}]},
                {   "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#9c5e18"}]},
                {   "featureType": "landscape.natural.terrain",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "simplified"}]},
                {   "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "simplified"}]},
                {   "featureType": "road.highway",
                    "elementType": "labels.text",
                    "stylers": [{"visibility": "on"}]},
                {   "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"visibility": "simplified"}]},
                {   "featureType": "transit.line",
                    "elementType": "all",
                    "stylers": [{"visibility": "off"}]},
                {   "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {"saturation": "-23"},
                        {"gamma": "2.01"},
                        {"color": "#f2f6f6"}
                    ]},
                {   "featureType": "water",
                    "elementType": "geometry.stroke",
                    "stylers": [{"saturation": "-14"}]
                }],
                {name: 'Styled Map'});

        map = new google.maps.Map($(".map")[0], {
            center: {
                lat: 51,
                lng: 19
            },
            zoom: 4,
            mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

    }
    $(function() {
        initMap();
    })

    var geocoder = new google.maps.Geocoder();

    $('#submit').on('click', function() {
        geocodeAddress(geocoder, map);
    });

    function geocodeAddress(geocoder, resultsMap) {
        var address = $(".search_map").find("#address").val();
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                //var imageMmarker = 'images/marker.png'
                var marker = new google.maps.Marker({map: resultsMap, position: results[0].geometry.location, /*icon: imageMmarker*/});
                var contentString = data[0].name + ", " + "Capital:" + " " + data[0].capital + ", " + "Language:" + " " + data[0].languages[0].name;
                var tooltip = new google.maps.InfoWindow({content: contentString});
                marker.addListener('click', function() {
                    tooltip.open(map, marker);
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    
//animacja h1 header
    $('.heading').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    anime.timeline({loop: true})
    .add({
        targets: '.heading .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: function(el, i) {
            return 500 + 30 * i;
        }
    }).add({
        targets: '.heading .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: function(el, i) {
            return 100 + 30 * i;
        }
    });
});
