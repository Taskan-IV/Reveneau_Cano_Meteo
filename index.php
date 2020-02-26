<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.min.css">
    <title>Test amCharts</title>
  </head>
  <body>
    <select name="jour" id="jour" onchange="updateMap();">
    	<option value="1" selected="yes" >1</option>
      <option value="2">2</option>
    </select>
    <div id="chartdiv" style="width: 900px; height: 800px;"></div>
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
