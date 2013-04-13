function Sort() {}

Sort.readyCount = 0;
Sort.selectedElementType = 0;
Sort.selectedArrayType = "from0to9";

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

        /* блокируем все кнопки пересчета */

        setTimeout(function () {
          hideStatTable(id);
          capacityTests("bubble", n);
        }, 0);

      });
    }
    $('.recursive-comparison').on('click', function() {
        setTimeout(function () {
          hideStatTable('recursive-comparison');
          recursionTests("bubble");
        }, 0);
    });
    $('.elements-type-select, .array-type-select').on('change', function (){
      Sort.selectedElementType = $('.elements-type-select').val();
      Sort.selectedArrayType = $('.array-type-select').val();
      draw_lines("recursive-comparison", true);
    });
  }
}
Sort.bubble = function(data, sortParams)
{
  for (var i = data.length - 1; i > 0; i--)
    for (var j = 0; j < i; j++)
      if (data[j] > data[j+1]) {
          var tmp = data[j];
          data[j] = data[j+1];
          data[j+1] = tmp;
      }
  isReady(sortParams);
};
Sort.bubble_recursive = function(data, sortParams)
{
  for (var i=0;i<data.length-1;i++) {
    if (data[i] > data[i+1] ) {
      var tmp = data[i];
      data[i] = data[i+1];
      data[i+1] = tmp;
      setTimeout(Sort.bubble_recursive, 0, data, sortParams);
      return;
    }
  }
  isReady(sortParams);
};
function isReady(sortParams) {
  var end = window.performance.now();
  var time = end - sortParams["start"];
  time += (time == 0) ? 0.000012 : 0;

  if (typeof sortParams["is_recursive"] == 'undefined')
    Sort.averageValues[ sortParams["func_name"] ][ sortParams["n"] ][ sortParams["array_type"] ][ sortParams["elements_type"] ] = time;
  else
    Sort.averageValues[ sortParams["func_name"] ][ "recursive" ][ sortParams["n"] ][ sortParams["array_type"] ][ sortParams["elements_type"] ] = time;

  Sort.readyCount -= 1;
  console.log(time)
  if(Sort.readyCount == 0)
  {
    console.log("ready!")
    console.log(JSON.stringify(Sort.averageValues))
    if (typeof sortParams["is_recursive"] == 'undefined') {
      draw_column(sortParams["n"] + sortParams["func_name"], sortParams["n"], sortParams["func_name"]);
      updateStatTable(sortParams["n"] + sortParams["func_name"], sortParams["n"], sortParams["func_name"]);
      //console.log(sortParams["n"] + ": { from0to9 : [" + Sort.averageValues[funcName][params.length]["from0to9"][0] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][1] + ", " + Sort.averageValues[funcName][params.length]["from0to9"][2] +"], integers : [" + Sort.averageValues[funcName][params.length]["integers"][0] + ", " + Sort.averageValues[funcName][params.length]["integers"][1] + ", " + Sort.averageValues[funcName][params.length]["integers"][2] + "], strings : [" + Sort.averageValues[funcName][params.length]["strings"][0] + ", " + Sort.averageValues[funcName][params.length]["strings"][1] + ", " + Sort.averageValues[funcName][params.length]["strings"][2] + "], dates: [" + Sort.averageValues[funcName][params.length]["dates"][0] + ", " + Sort.averageValues[funcName][params.length]["dates"][1] + ", " + Sort.averageValues[funcName][params.length]["dates"][2] + "] }");
    }
    else {
      draw_lines('recursive-comparison');
      showStatTable('recursive-comparison');
    }
  }
}
function recursionTests(sortName)
{
  Sort.readyCount = 8;
  var arrayGenMethod = Sort.selectedArrayType + "_";

  switch (parseInt(Sort.selectedElementType)) {
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

  var array100 = this[arrayGenMethod](100);
  var array500 = this[arrayGenMethod](500);
  var array5000 = this[arrayGenMethod](5000);
  var array50000 = this[arrayGenMethod](50000);

  var array100_2 = array100.slice(0);
  var array500_2 = array500.slice(0);
  var array5000_2 = array5000.slice(0);
  var array50000_2 = array50000.slice(0);

  benchmark(sortName, array100_2, [Sort.selectedArrayType, Sort.selectedElementType]);
  benchmark(sortName, array500_2, [Sort.selectedArrayType, Sort.selectedElementType]);
  benchmark(sortName, array5000_2, [Sort.selectedArrayType, Sort.selectedElementType]);
  benchmark(sortName, array50000_2, [Sort.selectedArrayType, Sort.selectedElementType]);

  benchmark(sortName, array100, [Sort.selectedArrayType, Sort.selectedElementType], true);
  benchmark(sortName, array500, [Sort.selectedArrayType, Sort.selectedElementType], true);
  benchmark(sortName, array5000, [Sort.selectedArrayType, Sort.selectedElementType], true);
  benchmark(sortName, array50000, [Sort.selectedArrayType, Sort.selectedElementType], true);

}
function capacityTests(sortName, n)
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
      Sort[funcName](params, { "start" : start, "func_name" : funcName, "n" : params.length, "array_type" : paramsType[0], "elements_type" : paramsType[1] });
    else
      Sort[funcName + "_recursive"](params, { "start" : start, "func_name" : funcName, "is_recursive" : true, "n" : params.length, "array_type" : paramsType[0], "elements_type" : paramsType[1] });

  }, 0);
}
