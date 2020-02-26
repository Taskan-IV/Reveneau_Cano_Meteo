
function getText(url){



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

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // on définit la source de données
    chart.dataSource.url = "./data/meteo.json";
    chart.dataSource.parser = new am4core.JSONParser();

    // var json = getText('http://127.0.0.1/B3/DataViz/TP3/Reveneau_Cano_Meteo/Data/meteo.json');
    // var data =  getText('http://127.0.0.1/B3/DataViz/TP3/Reveneau_Cano_Meteo/Data/meteo.json', (json) => JSON.parse(json, (data) => parseJSON(data)));
    
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.valueX = "value";

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