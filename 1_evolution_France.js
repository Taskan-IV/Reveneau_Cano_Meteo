am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("global_evol", am4charts.XYChart);

    // on définit la source de données
    chart.dataSource.url = "./Data/meteo.json";

    // https://www.amcharts.com/docs/v4/concepts/data/loading-external-data/#Manipulating_loaded_data
    chart.dataSource.events.on("parseended", function (ev) {
        // parsed data is assigned to data source's `data` property
        var data = ev.target.data;
        for (var i = 0; i < data.length; i++) {
            data[i].t /= 100;
            data[i].p /= data[i].station.length;
            data[i].d = new Date(1999, 1, data[i].d);
            // console.log(data[i].station.length);
        }

    });


    // Axes

    // Abscisse (Jour)
    var XAxis = chart.xAxes.push(new am4charts.DateAxis());
    XAxis.dataFields.category = "d";
    XAxis.title.text = "Jour";
    XAxis.renderer.fullWidthTooltip = true;
    // XAxis.min = 1;

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
    // YAxisP.renderer.stroke = am4core.color("#046889");



    // lignes
    // Température
    var temp = chart.series.push(new am4charts.LineSeries());
    temp.dataFields.valueY = "t";
    temp.dataFields.dateX = "d";
    temp.name = "Temprérature";
    temp.stroke = am4core.color("#DB6300"); // orange
    temp.strokeWidth = 5;
    temp.tooltipText = "{name}: [bold]{valueY}[/]";


    // Pluviométrie
    var pluvio = chart.series.push(new am4charts.LineSeries());
    pluvio.dataFields.valueY = "p";
    pluvio.dataFields.dateX = "d";
    pluvio.name = "Pluviométrie";
    pluvio.yAxis = YAxisP;
    pluvio.stroke = am4core.color("#046889"); // bleu
    pluvio.strokeWidth = 5;
    pluvio.tooltipText = "{name}: [bold]{valueY}[/]";

    // Création de la légende
    chart.legend = new am4charts.Legend();
    
    // Ajout du curseur
    chart.cursor = new am4charts.XYCursor();


}); // end am4core.ready()