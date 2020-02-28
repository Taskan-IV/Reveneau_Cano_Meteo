// Au départ on créé la carte de la france sans les données //
// Création de l'instance d'une carte
var chart = am4core.create("chartCarte", am4maps.MapChart);

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

// Ici on affiche les labels de température
var label = imageSeriesTemplate.createChild(am4core.Label);
label.text = "{temp}";
label.fontSize = 20;

// Ici on affiche les station et leur nom
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{ville}";
circle.events.on("hit", function(ev){afficherStation(ev);});

// On remplie la liste des jours
var lstJour = document.getElementById("listJour");
for (var i = 1 ; i <= 28 ; i++) {
  lstJour.innerHTML += "<option value='"+i+"'>"+i+"</option>";
}
// La on affiche les données du jour 0
updateMap();

/* -----------------------------------------------------------------------*
 * ----------- Les méthodes utiles pour l'affichage des données ----------*
 * -----------------------------------------------------------------------*/

 // Cette fonction vas chercher toute les stations pour le jour "jour"
function parseJSONMeteo(jour) {
  var requestURL = 'http://localhost/Reveneau_Cano_Meteo2/Data/meteo.json';
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
        temp : (ligne.t / 100).toFixed(2),
        heure : ligne.hours
      };
    });
    imageSeries.data = result;
  }
}

// La on met-à-jour la carte
function updateMap(){
  var jour = document.getElementById("listJour");
  var val = jour.options[jour.selectedIndex].value;
  parseJSONMeteo(val);
}

function afficherStation(ev) {
  var data = ev.target.dataItem.dataContext;
  console.log("start afficherStation pour la station " + data.ville);

  var result = data.heure.map(function(ligne) {
    return {
      temp : (ligne.t / 100).toFixed(2),
      heure : ligne.h
    };
  });

  // Use themes
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  var chart = am4core.create("chartStation", am4charts.XYChart);
  chart.data = result;
  var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.startLocation = 0;
  xAxis.endLocation = 23;

  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueY = "temp";
  series1.dataFields.valueX = "heure";
  series1.strokeWidth = 3;
  series1.tensionX = 0.8;
  series1.bullets.push(new am4charts.CircleBullet());
  series1.connect = true;
}
