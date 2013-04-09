function Sort() {}

Sort.averageValues = {
  bubble : {
    100: { from0to9 : [0.06927695386548294, 0.051316262120963074, 0.07312567352346377], integers : [0.12700774875702336, 0.03335557037644321, 0.06991840714908903], strings : [0.2116795812617056, 0.16677785190404393, 0.18088982399058295], dates: [0.5182942474493757, 0.44516857391863595, 0.4669779853284126] },
    500: { from0to9 : [1.1680864165828097, 1.0930363832449074, 0.8736593626381364], integers : [2.4933288859319873, 0.6234925847966224, 1.1443526453513186], strings : [5.397187868831679, 2.9994355211383663, 3.267562990717124], dates: [17.787499358557397, 10.0053882075008, 11.428131574881263] },
    5000: { from0to9 : [94.76574126340711, 73.38289628984057, 74.13596243649954], integers : [215.6270847231499, 51.23928773028456, 103.75570893415715], strings : [436.88933648073, 306.1451223892873, 311.538461538461], dates: [920.461641094058, 900.5715348693993, 944.4373171858169] },
    50000: { from0to9 : [13994.619489916356, 10785.290834915562, 9891.337814953527], integers : [33637.374275157795, 7726.042361574422, 10309.341484066331], strings : [75275.61387078566, 31336.046466875355, 33318.19546364242], dates: [128401.77297685637, 112474.84348540049, 107867.02288705285] }
  }
}
var readyCount = 0;
Sort.prototype = {
  bindBubble : function() {
    var bubbles = {"100bubble" : 100, "500bubble" : 500, "5000bubble" : 5000, "50000bubble" : 50000};
    for (var bubble in bubbles) {
      draw_chart(bubble, bubbles[bubble], "bubble");
      $('.' + bubble).on('click', function() {
        var id = $(this).attr("class")
        var n = bubbles[id];

        /* сказать пользователю, что приложение все ещё живо */

        setTimeout(function () {
          runTests("bubble", n);
        }, 0);

      });
    }
  }
}
Sort.bubble = function(data)
{
  for (var i = data.length - 1; i > 0; i--)
    for (var j = 0; j < i; j++)
      if (data[j] > data[j+1]) {
          var tmp = data[j];
          data[j] = data[j+1];
          data[j+1] = tmp;
      }
  return data;
};
function runTests(sortName, n)
{
  benchmark(sortName, from0to9_random(n), ["from0to9", 0]);
  benchmark(sortName, int_random(n), ["integers", 0]);
  benchmark(sortName, string_random(n), ["strings", 0]);
  benchmark(sortName, date_random(n), ["dates", 0]);
  benchmark(sortName, from0to9_ordered(n), ["from0to9", 1]);
  benchmark(sortName, int_ordered(n), ["integers", 1]);
  benchmark(sortName, string_ordered(n), ["strings", 1]);
  benchmark(sortName, date_ordered(n), ["dates", 1]);
  benchmark(sortName, from0to9_reversed(n), ["from0to9", 2]);
  benchmark(sortName, int_reversed(n), ["integers", 2]);
  benchmark(sortName, string_reversed(n), ["strings", 2]);
  benchmark(sortName, date_reversed(n), ["dates", 2]);
}
function benchmark(funcName, params, paramsType) {

  setTimeout(function () {
    var start = window.performance.now();
    Sort[funcName](params);

    var end = window.performance.now();
    var time = end - start;
    Sort.averageValues[funcName][params.length][paramsType[0]][paramsType[1]] = time;
    readyCount += 1;
    if(readyCount == 12)
    {
      console.log("ready!")
      readyCount = 0;
      draw_chart(params.length + funcName, params.length, funcName);
      console.log(params.length + ": { from0to9 : [" + Sort.averageValues[funcName][params.length]["from0to9"][0] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][1] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][2] +"], integers : [" + Sort.averageValues[funcName][params.length]["integers"][0] + ", " + Sort.averageValues[funcName][params.length]["integers"][1] + ", " + Sort.averageValues[funcName][params.length]["integers"][2] + "], strings : [" + Sort.averageValues[funcName][params.length]["strings"][0] + ", " + Sort.averageValues[funcName][params.length]["strings"][1] + ", " + Sort.averageValues[funcName][params.length]["strings"][2] + "], dates: [" + Sort.averageValues[funcName][params.length]["dates"][0] + ", " + Sort.averageValues[funcName][params.length]["dates"][1] + ", " + Sort.averageValues[funcName][params.length]["dates"][2] + "] }");
    }
  }, 0);
}

function from0to9_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = Math.floor(Math.random() * 10);
  return data;
}
function from0to9_ordered(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = i%10;
  return data;
}
function from0to9_reversed(n) {
  return from0to9_ordered(n).reverse();
}

function int_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = Math.floor(Math.random()*9007199254740992);
  return data;
}
function int_ordered(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = i;
  return data;
}
function int_reversed(n) {
  return int_ordered(n).reverse();
}

function string_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = make_random_string();
  return data;
}
function make_random_string() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
function string_ordered(n) {
  var possible = "abcdefghijklmnopqrstuvwxyz";
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = possible[i%27];
  return data;
}
function string_reversed(n) {
  return string_ordered(n).reverse();
}

function date_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = make_random_date();
  return data;
}
function make_random_date() {
   return new Date(new Date() + Math.floor(Math.random()*50000))
}
function date_ordered(n) {
  var data =[];
  var date = new Date().getTime();
  for (var i=0;i<n;i++)
    data[i] = new Date(date+i);
  return data;
}
function date_reversed(n) {
  return date_ordered(n).reverse();
}

function draw_chart(id, n, sortName) {
  $('#' + id).highcharts({
      chart: {
          type: 'column'
      },
      title: {
          text: 'Скорость сортировки различных типов массивов на ' + n + ' элементов'
      },
      subtitle: {
          text: 'лалала'
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
