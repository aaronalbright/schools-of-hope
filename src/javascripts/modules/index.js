import L from 'leaflet';
import * as pym from 'pym.js';

class Schools {

  render(data) {

  let centerMarker = [25.86008, -80.27762];

  let schoolList = [];

  let options = {
        attributionControl: false,
        center: centerMarker,
        zoom: 9,
        scrollWheelZoom: false,
        zoomControl: false,
        dragging: false
      };

  const map = new L.Map('map', options);

  // map.on('click', (e) => {
  //   console.log(`${e.latlng}`);
  // });

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png').addTo(map);

  L.control.attribution({prefix: false})
           .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>')
           .addTo(map);

  //  L.marker(centerMarker).addTo(map);

  data.forEach( (d, i) => {

    $(`.table`).append(
      `<tr>
      <td class="school ${i}">${d.Name}</td>
      </tr>`);

    let options = {
      radius: 7,
      color: '#FFF',
      weight: 1,
      fillOpacity: 1,
      fillColor: '#379ad3'
    }

    const marker = L.circleMarker([d.Latitude, d.Longitude], options).addTo(map);

    marker.bindPopup(`<b>${d.Name}</b>`, {closeButton: false});

    schoolList.push({xy : marker.getLatLng(), pop : marker.getPopup()});

  });


  $('.school').hover(function(){

    let i = this.classList[1];

    map.setView(schoolList[i].xy, 12)
       .openPopup(schoolList[i].pop, schoolList[i].pop._source._latlng);

     });

  $('.bar-reset').click( () => {
    map.setView(centerMarker, 9);
  })

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
