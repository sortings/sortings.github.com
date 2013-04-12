function Sort() {}

Sort.readyCount = 0;
Sort.selectedElementType = 0;
Sort.selectedArrayType = "integers";
Sort.prototype = {
  bindBubble : function() {
    var bubbles = {"100bubble" : 100, "500bubble" : 500, "5000bubble" : 5000, "50000bubble" : 50000};
    for (var bubble in bubbles) {
      draw_column(bubble, bubbles[bubble], "bubble", true);
      draw_lines("recursive-comparison", true);
      createStatTable(bubble, bubbles[bubble], "bubble");
      $('.' + bubble).on('click', function() {
        var id = $(this).attr("class")
        var n = bubbles[id];

        setTimeout(function () {
          hideStatTable(id);
          runTests("bubble", n);
        }, 0);

      });
    }
    $('.recursive-comparison').on('click', function() {
        setTimeout(function () {
          hideStatTable('recursive-comparison');
          compareRecursion("bubble");
        }, 0);
    });
    $('.elements-type-select, .array-type-select').on('change', function (){
      Sort.selectedElementType = $('.elements-type-select').val();
      Sort.selectedArrayType = $('.array-type-select').val();
      draw_lines("recursive-comparison", true);
    });
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
};
Sort.bubble_recursive = function(data)
{
  for (var i=0;i<data.length-1;i++) {
    if (data[i] > data[i+1] ) {
      var tmp = data[i];
      data[i] = data[i+1];
      data[i+1] = tmp;
      return Sort.bubble_recursive(data);
    }
  }
};
function compareRecursion(sortName)
{
  Sort.readyCount = 8;
  var arrayGenMethod = Sort.selectedArrayType + "_";

  switch (Sort.selectedElementType) {
    case 0:
      arrayGenMethod += "random";
      break
    case 1:
      arrayGenMethod += "ordered";
      break
    case 2:
      arrayGenMethod += "reversed";
      break
  }

  benchmark(sortName, this[arrayGenMethod](100), [Sort.selectedArrayType, Sort.selectedElementType]);
  benchmark(sortName, this[arrayGenMethod](500), [Sort.selectedArrayType, Sort.selectedElementType]);
  benchmark(sortName, this[arrayGenMethod](5000), [Sort.selectedArrayType, Sort.selectedElementType]);
  //benchmark(sortName, this[arrayGenMethod](50000), [Sort.selectedArrayType, Sort.selectedElementType]);

  benchmark(sortName, this[arrayGenMethod](100), [Sort.selectedArrayType, Sort.selectedElementType], true);
  benchmark(sortName, this[arrayGenMethod](500), [Sort.selectedArrayType, Sort.selectedElementType], true);
  benchmark(sortName, this[arrayGenMethod](5000), [Sort.selectedArrayType, Sort.selectedElementType], true);
  //benchmark(sortName, this[arrayGenMethod](50000), [Sort.selectedArrayType, Sort.selectedElementType], true);
}
function runTests(sortName, n)
{
  Sort.readyCount = 12;
  benchmark(sortName, from0to9_random(n), ["from0to9", 0]);
  benchmark(sortName, integers_random(n), ["integers", 0]);
  benchmark(sortName, strings_random(n), ["strings", 0]);
  benchmark(sortName, dates_random(n), ["dates", 0]);
  benchmark(sortName, from0to9_ordered(n), ["from0to9", 1]);
  benchmark(sortName, integers_ordered(n), ["integers", 1]);
  benchmark(sortName, strings_ordered(n), ["strings", 1]);
  benchmark(sortName, dates_ordered(n), ["dates", 1]);
  benchmark(sortName, from0to9_reversed(n), ["from0to9", 2]);
  benchmark(sortName, integers_reversed(n), ["integers", 2]);
  benchmark(sortName, strings_reversed(n), ["strings", 2]);
  benchmark(sortName, dates_reversed(n), ["dates", 2]);
}
function benchmark(funcName, params, paramsType, isRecursive) {

  setTimeout(function () {
    var start = window.performance.now();

    if (typeof isRecursive == 'undefined')
      Sort[funcName](params);
    else
      Sort[funcName + "_recursive"](params);

    var end = window.performance.now();
    var time = end - start;

    if (typeof isRecursive == 'undefined')
      Sort.averageValues[funcName][params.length][paramsType[0]][paramsType[1]] = time;
    else
      Sort.averageValues[funcName]["recursive"][params.length][paramsType[0]][paramsType[1]] = time;

    Sort.readyCount -= 1;
    if(Sort.readyCount == 0)
    {
      console.log("ready!")
      draw_column(params.length + funcName, params.length, funcName);
      updateStatTable(params.length + funcName, params.length, funcName);
      console.log(params.length + ": { from0to9 : [" + Sort.averageValues[funcName][params.length]["from0to9"][0] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][1] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][2] +"], integers : [" + Sort.averageValues[funcName][params.length]["integers"][0] + ", " + Sort.averageValues[funcName][params.length]["integers"][1] + ", " + Sort.averageValues[funcName][params.length]["integers"][2] + "], strings : [" + Sort.averageValues[funcName][params.length]["strings"][0] + ", " + Sort.averageValues[funcName][params.length]["strings"][1] + ", " + Sort.averageValues[funcName][params.length]["strings"][2] + "], dates: [" + Sort.averageValues[funcName][params.length]["dates"][0] + ", " + Sort.averageValues[funcName][params.length]["dates"][1] + ", " + Sort.averageValues[funcName][params.length]["dates"][2] + "] }");
    }
  }, 0);
}
function createStatTable(id, n, sortName) {
  var $statTable = $('#' + id).siblings('.algo-stat-table-block').find('table');
  $statTable.append('<tr><th>Массив цифр (от 0 до 9)</th><th>Массив целых чисел</th><th>Массив строк</th><th>Массив дат</th></tr>');

  var statTypes = Sort.averageValues[sortName][n];
  for(var type in statTypes) {
    var stItemCount = 0;
    for(var val in statTypes[type]) {

      var $stItem = $statTable.find('.st-item' + stItemCount);
      if($stItem.length)
        $stItem.append('<td>' + statTypes[type][val] +'</td>');
      else
        $statTable.append('<tr class="st-item' + stItemCount +'"><td>' + statTypes[type][val] + '</td><tr>')
      stItemCount += 1;
    }
  }
  showStatTable(id);
}
function showStatTable(id) {
  var $isComputing = $('#' + id).siblings('.algo-stat-table-block').find('h1');
  $isComputing.hide();

  var $statTable = $('#' + id).siblings('.algo-stat-table-block').find('table');
  $statTable.show();
}
function hideStatTable(id) {
  var $statTable = $('#' + id).siblings('.algo-stat-table-block').find('h1');
  $statTable.show();

  var $isComputing = $('#' + id).siblings('.algo-stat-table-block').find('table');
  $isComputing.hide();
}
function updateStatTable(id, n, sortName) {
  var $statTableRows = $('#' + id).siblings('.algo-stat-table-block').find('table tr');
  $statTableRows.remove();
  createStatTable(id, n, sortName);
}

