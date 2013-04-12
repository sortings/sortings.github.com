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
          text: 'Нерекурсивная VS рекурсивной'
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
          name: 'Нерекурсивная',
          data: [
                  Sort.averageValues[sortName][100][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][500][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][5000][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName][50000][Sort.selectedArrayType][Sort.selectedElementType]
                ]
      }, {
          name: 'Рекурсивная',
          data: [
                  Sort.averageValues[sortName]["recursive"][100][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][500][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][5000][Sort.selectedArrayType][Sort.selectedElementType],
                  Sort.averageValues[sortName]["recursive"][50000][Sort.selectedArrayType][Sort.selectedElementType]
                ]
      }]
  });
}
