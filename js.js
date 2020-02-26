parseJSONMeteo(1);

function createMap(tabMeteo) {
  // Création de l'instance d'une carte
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  // On set le fait que c'est une carte de france
  chart.geodata = am4geodata_franceHigh;
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;

  // Configure series
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#74B266");
  polygonTemplate.propertyFields.fill = "fill";

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");

  // Ici on créé les labels de température qui s'affiche sur la carte
  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  var imageSeriesTemplate = imageSeries.mapImages.template;
  imageSeriesTemplate.propertyFields.latitude = "lat";
  imageSeriesTemplate.propertyFields.longitude = "lng";

  var label = imageSeriesTemplate.createChild(am4core.Label);
  label.text = "{temp}";
  imageSeries.data = tabMeteo;
  label.fontSize = 20;
}

function parseJSONMeteo(jour) {
  var requestURL = 'http://localhost/Reveneau_Cano_Meteo/Data/meteo.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var station = request.response[jour - 1].station;
    var result = station.map(function(ligne) {
      return {
        lat : ligne.lat,
        lng : ligne.lng,
        ville : ligne.n,
        temp : (ligne.t / 100).toFixed(2)
      };
    });
    createMap(result);
  }
}

function updateMap(){
  var jour = document.getElementById("formControlRange");
  var val = jour.value;
  parseJSONMeteo(val);
}
