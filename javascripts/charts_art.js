function draw_column(id, n, sortName, isComputed) {
  $('#' + id).highcharts({
      chart: {
          type: 'column'
      },
      title: {
          text: 'Скорость сортировки различных типов массивов на ' + n + ' элементов'
      },
      subtitle: {
          text: typeof isComputed !== 'undefined' ? 'При проведении серии испытаний' : 'Лишь единичное испытание для каждого вида (ради демонстрации)'
      },
      xAxis: {
          categories: [
              'Массив цифр (от 0 до 9)',
              'Массив целых чисел',
              'Массив строк',
              'Массив дат'
          ]
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Время сортировки (миллисекунды)'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} мс</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.1,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Cлучайно сгенерированные',
          data: [
                  Sort.averageValues[sortName][n]["from0to9"][0],
                  Sort.averageValues[sortName][n]["integers"][0],
                  Sort.averageValues[sortName][n]["strings"][0],
                  Sort.averageValues[sortName][n]["dates"][0]
                ]

      }, {
          name: 'Правильно упорядоченные',
          data: [
                  Sort.averageValues[sortName][n]["from0to9"][1],
                  Sort.averageValues[sortName][n]["integers"][1],
                  Sort.averageValues[sortName][n]["strings"][1],
                  Sort.averageValues[sortName][n]["dates"][1]
                ]

      }, {
          name: 'Упорядоченные в обратном порядке',
          data: [
                  Sort.averageValues[sortName][n]["from0to9"][2],
                  Sort.averageValues[sortName][n]["integers"][2],
                  Sort.averageValues[sortName][n]["strings"][2],
                  Sort.averageValues[sortName][n]["dates"][2]
                ]

      }]
  });
}
function draw_lines(id, isComputed) {
  Sort.type = document.body.id;
  var sortName = Sort.type;
  $('#' + id).highcharts({
      chart: {
          type: 'line'
      },
      title: {
          text: 'Рекурсивная VS нерекурсивной'
      },
      subtitle: {
          text: typeof isComputed !== 'undefined' ? 'При проведении серии испытаний' : 'Лишь единичное испытание для каждого вида (ради демонстрации)'
      },
      xAxis: {
          categories: ['100', '500', '5000', '50000']
      },
      yAxis: {
          title: {
              text: 'Время (миллисекунды)'
          }
      },
      tooltip: {
          enabled: false,
          formatter: function() {
              return '<b>'+ this.series.name +'</b><br/>'+
                  this.x +': '+ this.y +' мс';
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Рекурсивная',
          data: [
                  Sort.averageValues[sortName][100][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][500][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][5000][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][50000][Sort.selectedArrayType][Sort.selectedElementType]
                ]
      }, {
          name: 'Нерекурсивная',
          data: [
                  Sort.averageValues[sortName]["recursive"][100][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][500][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][5000][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][50000][Sort.selectedArrayType][Sort.selectedElementType]
                ]
      }]
  });
}
function draw_comparison(id, n, sortings) {
  var array_type = id.split('-')[0];
  var elements_type = Sort.humanize_array_elements_type(sortings["elements_type"]);

  $('#' + id).highcharts({
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Скорость сортировки массива ' + Sort.array_types_names[array_type]
      },
      subtitle: {
          text:  n + ' элементов'
      },
      xAxis: {
          categories: sortings["names"],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Время (миллисекунды)',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' миллисекунд(ы)'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -100,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: elements_type,
          data: sortings["values"]
      }]
  });
}
function draw_pie(id, data) {
  Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
      return {
          radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
          stops: [
              [0, color],
              [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
          ]
      };
  });

  $('#' + id).highcharts({
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
      },
      title: {
          text: 'Распределение времени'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        percentageDecimals: 1
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  color: '#000000',
                  connectorColor: '#000000',
                  formatter: function() {
                      return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                  }
              }
          }
      },
      series: [{
          type: 'pie',
          name: 'Использовано времени',
          data: data
      }]
  });
}
