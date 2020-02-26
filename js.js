getJSONMeteo(2);
function createMap(tabMeteo) {
  // Création de l'instance d'une carte
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  // On set le fait que c'est une map de france
  chart.geodata = am4geodata_franceHigh;
  // Set projection
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Make map load polygon (like country names) data from GeoJSON
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#74B266");

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");

  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  var imageSeriesTemplate = imageSeries.mapImages.template;
  var label = imageSeriesTemplate.createChild(am4core.Label);
  label.text = "{t}";

  imageSeriesTemplate.propertyFields.latitude = "lat";
  imageSeriesTemplate.propertyFields.longitude = "lng";
  // Add data
  imageSeries.data = tabMeteo;
  polygonTemplate.propertyFields.fill = "fill";
}


function getJSONMeteo(jour){
  var requestURL = 'http://localhost/Reveneau_Cano_Meteo/Data/meteo.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    createMap(request.response[jour - 1].station);
  }
}
