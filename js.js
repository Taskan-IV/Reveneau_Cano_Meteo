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
polygonTemplate.fill = am4core.color("#032B44");
polygonTemplate.propertyFields.fill = "fill";
polygonTemplate.strokeWidth = 0;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#0A3B5B");

// Ici on créé les labels de température qui s'affiche sur la carte
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
var imageSeriesTemplate = imageSeries.mapImages.template;
imageSeriesTemplate.propertyFields.latitude = "lat";
imageSeriesTemplate.propertyFields.longitude = "lng";

// Ici on affiche les labels de température
var label = imageSeriesTemplate.createChild(am4core.Label);
label.text = "{temp}";
label.fontSize = 20;
label.fill = am4core.color("#D38A21");

// Ici on affiche les stations et leur nom et leur icône
var icon = imageSeriesTemplate.createChild(am4core.Image);
icon.width = 25;
icon.height = 25;
icon.horizontalCenter = "middle";
icon.verticalCenter = "middle";
icon.propertyFields.href = "url";
icon.tooltipText = "{ville}";
icon.events.on("hit", function (ev) { afficherStation(ev); });

var lastClickEvent;

// On remplie la liste des jours
var lstJour = document.getElementById("listJour");
for (var i = 1; i <= 28; i++) {
  lstJour.innerHTML += "<option value='" + i + "'>" + i + "</option>";
}
// La on affiche les données du jour 0
updateMap();

/* -----------------------------------------------------------------------*
 * ----------- Les méthodes utiles pour l'affichage des données ----------*
 * -----------------------------------------------------------------------*/

// Cette fonction va chercher toutes les stations pour le jour "jour"
function parseJSONMeteo(jour) {
  var requestURL = './Data/meteo.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    var station = request.response[jour - 1].station;
    var result = station.map(function (ligne) {

      // mise à jour pour pouvoir rappeler après un changement de jour

      if (lastClickEvent !== undefined && ligne.n === lastClickEvent.target.dataItem.dataContext.ville) {
        lastClickEvent.target.dataItem.dataContext = {
          lat: ligne.lat,
          lng: ligne.lng,
          ville: ligne.n,
          temp: (ligne.t / 100).toFixed(2),
          heure: ligne.hours
        };
      }

      var url = (ligne.p <= 1 ? "./style/images/sun.svg" : "./style/images/rain.svg");

      return {
        url: url,
        lat: ligne.lat,
        lng: ligne.lng,
        ville: ligne.n,
        temp: (ligne.t / 100).toFixed(2),
        heure: ligne.hours
      };
    });
    imageSeries.data = result;
    // console.log(result);
    afficherStation(lastClickEvent);
  }
}

// La on met-à-jour la carte (changement de jour par exemple)
function updateMap() {
  var jour = document.getElementById("listJour");
  var val = jour.options[jour.selectedIndex].value;
  parseJSONMeteo(val);


}

// afficher  les détails d'une station
function afficherStation(ev) {

  if (ev === undefined) return;

  lastClickEvent = ev;
  var data = ev.target.dataItem.dataContext;


  console.log(ev);


  console.log("start afficherStation pour la station " + data.ville);

  document.getElementById("details_title").innerHTML = "Détails de la station " + data.ville;

  var result = data.heure.map(function (ligne) {
    return {
      temp: (ligne.t / 100).toFixed(2),
      heure: new Date(1999, 1, document.getElementById("listJour").value, ligne.h),
      pluvio: ligne.p,
      url: ligne.url
    };
  });

  // Use themes
  am4core.useTheme(am4themes_animated);

  // Create chart instance
  var chart = am4core.create("chartStation", am4charts.XYChart);
  chart.data = result;


  var xAxis = chart.xAxes.push(new am4charts.DateAxis());
  // xAxis.startLocation = 0;
  // xAxis.endLocation = 23;
  xAxis.title.text = "Heure";

  // Ordonnée (Température)
  var YAxisT = chart.yAxes.push(new am4charts.ValueAxis());
  YAxisT.title.text = "Température (°C)";
  YAxisT.min = -15;
  YAxisT.max = 50;

  // Ordonnée (Pluviométrie)
  var YAxisP = chart.yAxes.push(new am4charts.ValueAxis());
  YAxisP.title.text = "Pluviométrie (mm)";
  YAxisP.min = -15;
  YAxisP.max = 50; // change
  YAxisP.renderer.opposite = true;

  // Create series
  var temp = chart.series.push(new am4charts.LineSeries());
  temp.name = "Température";
  temp.dataFields.valueY = "temp";
  temp.dataFields.dateX = "heure";
  temp.strokeWidth = 3;
  temp.stroke = am4core.color("#D38A21");
  temp.tooltipText = "{name}: [bold]{valueY}[/]";
  temp.tooltip.getFillFromObject = false;
  temp.tooltip.background.fill = am4core.color("#D38A21");


  var pluvio = chart.series.push(new am4charts.LineSeries());
  pluvio.name = "Pluviométrie";
  pluvio.dataFields.valueY = "pluvio";
  pluvio.dataFields.dateX = "heure";
  pluvio.strokeWidth = 3;
  pluvio.stroke = am4core.color("#046889");
  pluvio.yAxis = YAxisP;
  pluvio.tooltipText = "{name}: [bold]{valueY}[/]";
  pluvio.tooltip.getFillFromObject = false;
  pluvio.tooltip.background.fill = am4core.color("#046889");


  // Ajout de la légende
  chart.legend = new am4charts.Legend();

  // Ajout du curseur
  chart.cursor = new am4charts.XYCursor();

}
