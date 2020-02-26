<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.min.css">
    <title>Test amCharts</title>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navigation</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="">Carte de température par jour</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  </head>
  <body>
    <div id="chartdiv" style="width: 900px; height: 700px; margin: auto;"></div>
    <p style="text-align: center; font-size: 150%;">Jour</p>
    <input style="width: 50%; margin: auto;" type="range" class="form-control-range" id="formControlRange" step="1" min="1" max="28" value="1" onchange="updateMap();">
  </body>
  <footer>
    <script src="./lib/amcharts4/core.js"></script>
    <script src="./lib/amcharts4/charts.js"></script>
    <script src="./lib/amcharts4/maps.js"></script>
    <script src="./lib/amcharts4/geodata/franceHigh.js"></script>
    <script src="./lib/jquery.js"></script>
    <script src="./js.js"></script>
    <script src="./lib/bootstrap/js/bootstrap.min.js"></script>
  </footer>
</html>
