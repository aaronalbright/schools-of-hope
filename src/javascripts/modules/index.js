import L from 'leaflet';
import * as pym from 'pym.js';

class Schools {

  render(data) {

  let centerMarker = [25.81164, -80.21942]

  let mapOptions = {
        attributionControl: false,
        center: centerMarker,
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: false,
      }

  const map = new L.Map('map', mapOptions);

  map.on('click', (e) => {
    console.log(`${e.latlng}`);
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/aalbright-mh/cj4ojfvn49uob2smcdyi6qt3l/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWFsYnJpZ2h0LW1oIiwiYSI6ImNqM3ExYTFrbzAwdWoyd3BmOXBsdWlraWoifQ.4ZSAZpc41c39EWcwFhUjoA').addTo(map);

  L.control.attribution({prefix: false})
           .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>')
           .addTo(map);

  //  L.marker(centerMarker).addTo(map);

  data.forEach( (data) => {

    $(`.table`).append(`<tr>
      <td>${data.County}</td>
      <td>${data.Name}</td>
      <td>${data.Address}</td>
      </tr>`);

    let circleOptions = {
      radius: 8,
      color: '#FFF',
      weight: 1,
      fillOpacity: 1,
      fillColor: '#379ad3'
    }

    let marker = L.circleMarker([data.Latitude, data.Longitude], circleOptions).addTo(map);

    marker.bindTooltip(`<b>${data.Name}</b><br>${data.Address}`);

  });

  }
}

const schoolMap = () => {

  let iframeChild = new pym.Child();

  iframeChild.sendHeight();

  $.getJSON('data.json', (json) => {
    new Schools().render(json);
  });
}

export { schoolMap };
