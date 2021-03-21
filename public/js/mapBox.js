const mapBox = document.getElementById('map');


const displayMap = (locations) =>{
mapboxgl.accessToken =
  'pk.eyJ1IjoiamFtZXNjaHJpczg1NCIsImEiOiJja21iejRuZXQwNWdyMm5wNzBkODd6cXhoIn0.QZIJVJ8rceEXA4rKbNAmTA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jameschris854/ckmds7b9sjihj17rytg54xxrl',
  scrollZoom: false  
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';
  //add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  //add popup
  new mapboxgl.Popup({
      offset:30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  //extends the map bound to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});

}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
