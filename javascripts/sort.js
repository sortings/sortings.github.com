function Sort() {}

Sort.prototype = {
  bindBubble : function() {
    var bubbles = {"50Bubble" : 50, "500Bubble" : 500, "5000Bubble" : 5000, "50000Bubble" : 50000};
    for (var bubble in bubbles) {
      $('.' + bubble).on('click', function() {

        bubble = $(this).attr("class")
        var n = bubbles[bubble]*10;
        /* */
        $('#' + bubble).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Скорость сортировки различных типов массивов на 50 элементов'
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
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Cлучайно сгенерированные',
                data: [
                        benchmark("bubble", from0to9_random(n)),
                        benchmark("bubble", int_random(n)),
                        benchmark("bubble", string_random(n)),
                        benchmark("bubble", date_random(n))
                      ]

            }, {
                name: 'Правильно упорядоченные',
                data: [
                        benchmark("bubble", from0to9_ordered(n)),
                        benchmark("bubble", int_ordered(n)),
                        benchmark("bubble", string_ordered(n)),
                        benchmark("bubble", date_ordered(n))
                      ]

            }, {
                name: 'Упорядоченные в обратном порядке',
                data: [
                        benchmark("bubble", from0to9_reversed(n)),
                        benchmark("bubble", int_reversed(n)),
                        benchmark("bubble", string_reversed(n)),
                        benchmark("bubble", date_reversed(n))
                      ]

            }]
        });
        /* */
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

function benchmark(funcName, params) {
  var start = new Date().getMilliseconds();

  Sort[funcName](params);

  var end = new Date().getMilliseconds();
  var time = end - start;

  return time;
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
