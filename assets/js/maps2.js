mapboxgl.accessToken = 'pk.eyJ1IjoiZmFobWlhbCIsImEiOiJjbTlvYWN5OWQxMXBnMmpwdnRzdTV4cmc5In0.VymfG9imlHRmesF14V6Sww';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [110.3417, -7.92],
  zoom: 10.5
});

map.addControl(new mapboxgl.NavigationControl());

// Fungsi untuk menggeser posisi koordinat agar marker tidak tumpang tindih
function applyOffset(coord, index) {
  const offsetMeters = 20;
  const offsetLng = (offsetMeters / 111320) * Math.cos(coord[1] * Math.PI / 180);
  const offsetLat = offsetMeters / 110540;
  return [
    coord[0] + (offsetLng * Math.cos(index * (Math.PI / 3))),
    coord[1] + (offsetLat * Math.sin(index * (Math.PI / 3)))
  ];
}

map.on('load', () => {
  const ruteList = [
    { id: 'rute1', file: 'data/Bantul.geojson', color: '#3498db', namaTitik: 'Titik 1 dari Pusat Kota Bantul' },
    { id: 'rute2', file: 'data/Sleman.geojson', color: '#2ecc71', namaTitik: 'Titik 2 dari Pusat Kota Sleman' },
    { id: 'rute3', file: 'data/KotaYogyakarta.geojson', color: '#9b59b6', namaTitik: 'Titik 3 dari Pusat Kota Yogyakarta' },
    { id: 'rute4', file: 'data/Kulonprogo.geojson', color: '#e74c3c', namaTitik: 'Titik 4 dari Pusat Kota Kulonprogo' },
    { id: 'rute5', file: 'data/GunungKidul.geojson', color: '#f39c12', namaTitik: 'Titik 5 dari Pusat Kota Gunung Kidul' }
  ];

  ruteList.forEach((rute, index) => {
    fetch(rute.file)
      .then(res => res.json())
      .then(data => {
        // Tambahkan source dan layer rute
        map.addSource(rute.id, {
          type: 'geojson',
          data: data
        });

        map.addLayer({
          id: rute.id,
          type: 'line',
          source: rute.id,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': rute.color,
            'line-width': 4
          }
        });

        // Ambil koordinat AWAL dari LineString
        const coords = data.features[0].geometry.coordinates;
        const firstCoord = coords[0];
        const offsetCoord = applyOffset(firstCoord, index);

        // Tambahkan marker di titik awal rute
        new mapboxgl.Marker({ color: rute.color })
          .setLngLat(offsetCoord)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${rute.namaTitik}</strong><br>`))
          .addTo(map);

          // === Titik pusat hanya di rute terakhir ===
        if (rute.id === 'rute5') {
          const lastCoord = coords[coords.length - 1];
          new mapboxgl.Marker({ color: '#000000' }) // warna hitam
            .setLngLat(lastCoord)
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>Titik Pusat</strong><br>RM Rica Rica Bhetenk'z`))
            .addTo(map);
        }
      })
      .catch(err => console.error(`Gagal memuat ${rute.file}`, err));
  });
});
