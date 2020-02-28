am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("1_evol", am4charts.XYChart);

    // on définit la source de données
    chart.dataSource.url = "./Data/meteo.json";

    // https://www.amcharts.com/docs/v4/concepts/data/loading-external-data/#Manipulating_loaded_data
    chart.dataSource.events.on("parseended", function (ev) {
        // parsed data is assigned to data source's `data` property
        var data = ev.target.data;
        for (var i = 0; i < data.length; i++) {
            data[i].t /= 100;
            data[i].p /= data[i].station.length;
            // console.log(data[i].station.length);
        }

    });


    // Axes
    var XAxis = chart.xAxes.push(new am4charts.ValueAxis());
    XAxis.dataFields.category = "d";
    XAxis.title.text = "jour";
    XAxis.renderer.fullWidthTooltip = true;

    var YAxisT = chart.yAxes.push(new am4charts.ValueAxis());
    YAxisT.title.text = "Température (°C)";
    YAxisT.min = 0;
    YAxisT.max = 50; // change
    // YAxisT.numberFormatter.numberFormat = "#,##";

    var YAxisP = chart.yAxes.push(new am4charts.ValueAxis());
    YAxisP.title.text = "Pluviométrie (mm)";
    YAxisP.min = 0;
    YAxisP.max = 50; // change
    // YAxisP.numberFormatter.numberFormat = "#,##";
    YAxisP.renderer.opposite = true;
    // YAxisP.renderer.stroke = am4core.color("#046889");



    // lignes
    var temp = chart.series.push(new am4charts.LineSeries());
    temp.dataFields.valueY = "t";
    temp.dataFields.valueX = "d";
    temp.name = "Temprérature";
    temp.stroke = am4core.color("#DB6300"); // orange
    temp.strokeWidth = 5; // 3px
    temp.tooltipText = "{name}: [bold]{valueY}[/]";



    var pluvio = chart.series.push(new am4charts.LineSeries());
    pluvio.dataFields.valueY = "p";
    pluvio.dataFields.valueX = "d";
    pluvio.name = "Pluviométrie";
    pluvio.yAxis = YAxisP;
    pluvio.stroke = am4core.color("#046889"); // bleu
    pluvio.strokeWidth = 5; // 3px
    pluvio.tooltipText = "{name}: [bold]{valueY}[/]";


    
    chart.cursor = new am4charts.XYCursor();


}); // end am4core.ready()