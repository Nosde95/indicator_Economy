let date = new Array()
let values = new Array()
const resp = fetch('https://www.econdb.com/api/series/IPUS/?format=json')
    .then(resp => resp.json())
    .then(resp => {
        for (i = 0; i < resp.data.dates.length; i++) {
            date.push([resp.data.dates[i], resp.data.values[i]]);
        }
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            if (date.length > 0) {
                let data = google.visualization.arrayToDataTable([['Datas', 'Valores'], ...date]);
                let options = { title: 'Company Performance', curveType: 'function', legend: { position: 'bottom' } };
                let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
                chart.draw(data, options);
            }
        }
    })