// Ganti token di bawah ini dengan token Mapbox milikmu
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWlhbCIsImEiOiJjbTlvYWN5OWQxMXBnMmpwdnRzdTV4cmc5In0.VymfG9imlHRmesF14V6Sww';

const latitude = -7.955021350451982;
const longitude = 110.34178270615465;

// Inisialisasi peta
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [longitude, latitude],
  zoom: 14
});

// Tambahkan marker lokasi restoran
new mapboxgl.Marker({ color: 'green' })
  .setLngLat([longitude, latitude])
  .setPopup(new mapboxgl.Popup().setHTML("<strong>Rica Rica \"Bhetenk'z\" Pundong</strong>"))
  .addTo(map);

// Tambahkan kontrol navigasi (zoom & rotate)
map.addControl(new mapboxgl.NavigationControl());

// Tambahkan kontrol rute Directions (A → B)
const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: 'mapbox/driving', // bisa diganti: 'mapbox/walking', 'mapbox/cycling'
  controls: {
    instructions: true
  }
});
map.addControl(directions, 'top-left');
