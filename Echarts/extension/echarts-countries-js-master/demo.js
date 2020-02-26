function make_map(cityname, dom_id) {
	achart = echarts.init(document.getElementById(dom_id));

	// Récupérer les données
	


	// Configurer la carte
	var option = {
		"title": [
			{
				"textStyle": {
					"color": "#000",
					"fontSize": 18
				},
				"subtext": "",
				"text": cityname,
				"top": "auto",
				"subtextStyle": {
					"color": "#aaa",
					"fontSize": 12
				},
				"left": "auto"
			}
		],
		"legend": [
			{
				"selectedMode": "multiple",
				"top": "top",
				"orient": "horizontal",
				"data": [
					""
				],
				"left": "center",
				"show": true
			}
		],
		"backgroundColor": "#fff",
		"series": [
			{
				"type": "map",
				"mapType": cityname,
				"data": [{lat:}],
				"name": "",
				"symbol": "circle",
				"roam": true
			}
		]
	};
	console.log(achart);
	achart.setOption(option);
}
