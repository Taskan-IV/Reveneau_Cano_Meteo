<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.min.css">
  <title>Test amCharts</title>
  <link type="text/css" rel="stylesheet" href="./style/main.css" />
</head>


<body>
  <header>
    La météo
  </header>

  <div id="corpse">
    <h2>Évolution de la température et de la pluviométrie en France de février 1999</h2>
    <div id="global_evol"></div>
    <h2>
      Carte météo du 
      <select id="listJour" onchange="updateMap();"></select>
      février 1999
    </h2>

    <div id="container">
      <div id="chartCarte"></div>
      <div id="details">
        <div id="details_title"></div>
        <div id="chartStation"></div>
      </div>
    </div>
  </div>




  <script src="./lib/amcharts4/core.js"></script>
  <script src="./lib/amcharts4/charts.js"></script>
  <script src="./lib/amcharts4/maps.js"></script>
  <script src="./lib/amcharts4/geodata/franceHigh.js"></script>

  <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
  <script src="./lib/jquery.js"></script>
  <script src="./js.js"></script>
  <!-- <script src="./lib/bootstrap/js/bootstrap.min.js"></script> -->
  <script src="./1_evolution_France.js"></script>
</body>

</html>
