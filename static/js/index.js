let map;

const initMap = async () => {  
  map = new google.maps.Map(document.querySelector('#map'), {
    center: { lat: -6.88634, lng: -38.5614 },
    zoom: 12,
  });
  fetchInstitutionsLocation(map);
}

window.initMap = initMap;

initMap();

if (getToken()) {
  logOut();
}