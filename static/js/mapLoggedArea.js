let mapPointer;

const initMapStudent = () => {
    let map, infoWindow;
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -6.88634, lng: -38.5614 },
            zoom: 12,
            mapTypeId: 'roadmap',
        });
        mapPointer = map;
        infoWindow = new google.maps.InfoWindow();

        const locationButton = document.createElement("button");

        locationButton.textContent = "Usar localização do dispositivo";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        locationButton.addEventListener("click", () => {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent(`Localização aproximada: lat ${pos.lat}, lng ${pos.lng}`);
                        updateCoords(pos.lat, pos.lng);
                        infoWindow.open(map);
                        map.setCenter(pos);
                    },
                    () => {
                        handleLocationError(true, infoWindow, map.getCenter());
                    }
                );
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        });
        map.addListener("click", (mapsMouseEvent) => {
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow({
              position: mapsMouseEvent.latLng,
            });
            const coords = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2);
            infoWindow.setContent(coords);
            infoWindow.open(map);
            const coordsJSON = JSON.parse(coords);
            console.log(coordsJSON);
            updateCoords(coordsJSON.lat, coordsJSON.lng);
        });
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
    }

    window.initMap = initMap;
    initMap();
}

const updateCoords = (lat, lng) => {
    const formLat = document.querySelector('#latitude');
    const formLng = document.querySelector('#longitude');
    formLat.value = lat;
    formLng.value = lng;
}

let markers = [];
const drawDriverOnMap = (obj) => {
    markers.length > 0 ? markers[0].setMap(null): '';
    markers = [];
    const svg = {
        path: "M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
        fillColor: "blue",
        fillOpacity: 1,
        scale: 2
    }
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(obj.latitude, obj.longitude),
        title: "Motorista: " + obj.name,
        map: mapPointer,
        icon: svg,
        animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
}

const drawStudentsOnMap = (objArray) => {
    markers.length > 0 ? markers[0].setMap(null): '';
    markers = [];
    const svg = {
        path: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z",
        fillColor: "blue",
        fillOpacity: 1,
        scale: 2
    }
    objArray.forEach(obj => {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(obj.latitude, obj.longitude),
            title: "Aluno: " + obj.name,
            map: mapPointer,
            icon: svg,
            animation: google.maps.Animation.DROP,
        });
        markers.push(marker);
    });
}
