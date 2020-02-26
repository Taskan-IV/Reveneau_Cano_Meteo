
function getText(url) {



    // return '[{"name":"John", "age":30, "city":"New York"},{"name":"Smith", "age":40, "city":"LA"}]';













    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = function () {

        // console.log("ready");

        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                // console.log(request.responseText);
                // document.getElementById("demo").innerHTML = request.responseText;
                return request.responseText;
            }
        }
    }
}




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
    YAxisP.max = 500; // change
    // YAxisP.numberFormatter.numberFormat = "#,##";
    YAxisP.renderer.opposite = true;
    YAxisP.renderer.stroke = am4core.color("#046889");



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






    // Create axes
    // var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());



    // chart.dataSource.parser = new am4core.JSONParser();

    // var json = getText('http://127.0.0.1/B3/DataViz/TP3/Reveneau_Cano_Meteo/Data/meteo.json');
    // var data =  getText('http://127.0.0.1/B3/DataViz/TP3/Reveneau_Cano_Meteo/Data/meteo.json', (json) => JSON.parse(json, (data) => parseJSON(data)));

    // var series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.valueY = "value";
    // series.dataFields.valueX = "value";

    // createSeries(t, "Température", data);



    // Create series
    function createSeries(s, name, data) {

        console.log(s);

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = s;
        series.dataFields.dateX = d;
        series.name = name;

        var segment = series.segments.template;
        segment.interactionsEnabled = true;

        var hoverState = segment.states.create("hover");
        hoverState.properties.strokeWidth = 3;

        var dimmed = segment.states.create("dimmed");
        dimmed.properties.stroke = am4core.color("#dadada");

        segment.events.on("over", function (event) {
            processOver(event.target.parent.parent.parent);
        });

        segment.events.on("out", function (event) {
            processOut(event.target.parent.parent.parent);
        });

        var data = [];
        var value = Math.round(Math.random() * 100) + 100;
        for (var i = 1; i < 100; i++) {
            value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5);
            var dataItem = { date: new Date(2018, 0, i) };
            dataItem["value" + s] = value;
            data.push(dataItem);
        }

        series.data = data;
        return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function (event) {
        processOver(event.target.dataItem.dataContext);
    })

    chart.legend.itemContainers.template.events.on("out", function (event) {
        processOut(event.target.dataItem.dataContext);
    })

    function processOver(hoveredSeries) {
        hoveredSeries.toFront();

        hoveredSeries.segments.each(function (segment) {
            segment.setState("hover");
        })

        chart.series.each(function (series) {
            if (series != hoveredSeries) {
                series.segments.each(function (segment) {
                    segment.setState("dimmed");
                })
                series.bulletsContainer.setState("dimmed");
            }
        });
    }

    function processOut(hoveredSeries) {
        chart.series.each(function (series) {
            series.segments.each(function (segment) {
                segment.setState("default");
            })
            series.bulletsContainer.setState("default");
        });
    }

}); // end am4core.ready()