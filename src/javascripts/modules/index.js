import L from 'leaflet'
import pym from 'pym.js'
import 'datatables.net-responsive-bs'

class Schools {

  render(data) {

  let centerMarker = [28.13013, -83.12256];

  let schoolList = [];

  let options = {
        attributionControl: false,
        center: centerMarker,
        zoom: 6,
        scrollWheelZoom: false,
      };

  let mkrOptions = {
      radius: 7,
      color: '#FFF',
      weight: 1,
      fillOpacity: 0.75,
      fillColor: '#379ad3'
    };

  // Standard leaflet init stuff
  const map = new L.Map('map', options);

  // Snippet that helps you find and use the map center.
  // map.on('click', (e) => {
  //   console.log(`${e.latlng}`);
  // });
  // L.marker(centerMarker).addTo(map);

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWFsYnJpZ2h0LW1oIiwiYSI6ImNqM3ExYTFrbzAwdWoyd3BmOXBsdWlraWoifQ.4ZSAZpc41c39EWcwFhUjoA').addTo(map);

  L.control.attribution({prefix: false})
           .addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, &copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a>')
           .addTo(map);

  // Populates table, markers and popups via a for loop that interates through the JSON file
  data.forEach( (d, i) => {

        $(`tbody`).append(`
        <tr id="school-${i}">
        <td>${d.county}</td>
        <td>${d.name}</td>
        <td>${d.city}</td>
        <td>${d.grade17}</td>
        </tr>
        `);

    let marker = L.circleMarker([d.latitude, d.longitude], mkrOptions).addTo(map);

    if (d.enrollment && d.grade16 && d.grade15) {
      marker.bindPopup(`<p><b>${d.name}</b><br><i>Student population: ${d.enrollment}</i><br><b>Grade:</b><br>2017: ${d.grade17}<br>2016: ${d.grade16}<br>2015: ${d.grade15}</p>`, {closeButton: false});
    }
    else if (d.enrollment && d.grade16) {
      marker.bindPopup(`<p><b>${d.name}</b><br><i>Student population: ${d.enrollment}</i><br><b>Grade:</b><br>2017: ${d.grade17}<br>2016: ${d.grade16}</p>`, {closeButton: false});
    }
    else if (d.enrollment) {
      marker.bindPopup(`<p><b>${d.name}</b><br><i>Student population: ${d.enrollment}</i><br><b>Grade:</b><br>2017: ${d.grade17}</p>`, {closeButton: false});
    }
    else {
      marker.bindPopup(`<p><b>${d.name}</b><br><i>No student population numbers or 2015-16 grades provided</i><br><b>Grade:</b><br>2017: ${d.grade17}</p>`, {closeButton: false});
    }

    schoolList.push({xy: marker.getLatLng(), pop: marker.getPopup()});
  });

  // Adds interactivty to table. On hover (or tap), the map pans and zooms to school location.
  $('tbody tr').click( (e) => {

    let i = e.currentTarget.id;

    i = i.slice(7);

    map.setView(schoolList[i].xy, 9)
       .openPopup(schoolList[i].pop, schoolList[i].pop._source._latlng);
  });

  // Resets map view to orignal zoom and position.
  $('.bar-reset').click( () => {
    map.setView(centerMarker, 6);
  });

  $('table').DataTable({
    paging: false,
    scrollY: 250,
    info: false,
    responsive: true
  });

  }
}

const schoolMap = () => {

  // That pym.js goodness
  let iframeChild = new pym.Child();
  iframeChild.sendHeight();

  // Putting it all together...
  $.getJSON('schools.json', (json) => {
    new Schools().render(json);
  });
}

export { schoolMap }
