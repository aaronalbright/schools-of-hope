import L from 'leaflet';

class Schools {

  render(data) {

  let options = {
        attributionControl: false,
        center: [25.80607, -80.31281],
        zoom: 10,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        boxZoom: false
      }

  const map = new L.Map('map', options);

  map.on('click', function(e) {
    console.log(`${e.latlng}`);
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/aalbright-mh/cj4ojfvn49uob2smcdyi6qt3l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWFsYnJpZ2h0LW1oIiwiYSI6ImNqM3ExYTFrbzAwdWoyd3BmOXBsdWlraWoifQ.4ZSAZpc41c39EWcwFhUjoA').addTo(map);

  L.control.attribution({prefix: false})
           .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>')
           .addTo(map);

  data.forEach( (data) => {
    let circleOptions = {
      radius: 6,
      color: '#FFF',
      weight: 1,
      fillOpacity: 1,
      fillColor: '#379ad3'
    }
    let marker = L.circleMarker([data.Latitude, data.Longitude], circleOptions).addTo(map);

    marker.bindPopup(data.Address);
  })

  }
}

const charterMap = () => {
  $.getJSON('data.json', (json) => {
    new Schools().render(json);
  });
}

export { charterMap };
