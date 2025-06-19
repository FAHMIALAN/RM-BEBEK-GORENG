// Token dari akun Mapbox kamu
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWlhbCIsImEiOiJjbTlvYWN5OWQxMXBnMmpwdnRzdTV4cmc5In0.VymfG9imlHRmesF14V6Sww';

// Lokasi pusat peta (rumah makan utama)
const centerLat = -7.955021350451982;
const centerLng = 110.34178270615465;

// Inisialisasi peta
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [centerLng, centerLat],
  zoom: 15
});

// Daftar titik marker (koordinat, deskripsi)
const locations = [
  {
    lat: -7.954758188,
    lng: 110.3417863,
    popup: "Rica Rica \"Bhetenk'z\" Pundong"
  },
  {
    lat: -7.721345,
    lng: 110.403137,
    popup: "Lokasi Terbaik<br>Skor : 0.926"
  },
  {
    lat: -7.829841,
    lng: 110.287713,
    popup: "Lokasi Cabang Alternatif<br>Skor : 0.902"
  },
  {
    lat: -7.753728,
    lng: 110.395401,
    popup: "Lokasi Cabang Alternatif<br>Skor : 0.895"
  }
];

// Tambahkan marker dari daftar di atas
locations.forEach(loc => {
  new mapboxgl.Marker()
    .setLngLat([loc.lng, loc.lat])
    .setPopup(new mapboxgl.Popup().setHTML(`<strong>${loc.popup}</strong>`))
    .addTo(map);
});

// Tambahkan marker lokasi pengguna jika tersedia
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([userLng, userLat])
      .setPopup(new mapboxgl.Popup().setHTML("<strong>Lokasi Anda Saat Ini</strong>"))
      .addTo(map);

    // Zoom ke lokasi pengguna
    map.flyTo({ center: [userLng, userLat], zoom: 14 });
  }, () => {
    alert("Gagal mendeteksi lokasi Anda. Pastikan izin lokasi diaktifkan.");
  });
} else {
  alert("Browser Anda tidak mendukung fitur geolokasi.");
}
