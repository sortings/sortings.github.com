function Sort() {}

Sort.readyCount = 0;
Sort.selectedElementType = 0;
Sort.selectedArrayType = "from0to9";

Sort.prototype = {
  bindSortStat : function() {
    Sort.type = document.body.id;
    createExperimentsBlocks();
    var capacities = [ 100, 500, 5000, 50000 ];
    for (var count in capacities) {

      draw_column(capacities[count] + "_stat", capacities[count], Sort.type, true);
      if ($('#recursive-comparison').length)
        draw_lines('recursive-comparison', true);
      createStatTable(capacities[count] + "_stat", capacities[count], Sort.type);

      $('.' + capacities[count] + "_stat").on('click', function() {
        var n = $(this).attr("class").split('_')[0];
        /* блокируем все кнопки пересчета */
        setTimeout(function () {
          hideStatTable(n + "_stat");
          capacityTests(Sort.type, n);
        }, 0);
      });
    }
    $('.recursive-comparison').on('click', function() {
        setTimeout(function () {
          /* блокируем все кнопки пересчета */
          hideStatTable('recursive-comparison');
          recursionTests(Sort.type);
        }, 0);
    });
    $('.elements-type-select, .array-type-select').on('change', function (){
      Sort.selectedElementType = $('.elements-type-select').val();
      Sort.selectedArrayType = $('.array-type-select').val();
      draw_lines("recursive-comparison", true);
    });
  }
}
function isReady(sortParams) {
  var end = window.performance.now();
  var time = end - sortParams["start"];
  time += (time == 0) ? Math.random() : 0;

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
      draw_column(sortParams["n"] + "_stat", sortParams["n"], sortParams["func_name"]);
      updateStatTable(sortParams["n"] + "_stat", sortParams["n"], sortParams["func_name"]);
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

  Sort.readyCount = 0;

  var array100 = this[arrayGenMethod](100);
  var array500 = this[arrayGenMethod](500);
  var array5000 = this[arrayGenMethod](5000);
  var array50000 = this[arrayGenMethod](50000);

  var array100_2 = array100.slice(0);
  var array500_2 = array500.slice(0);
  var array5000_2 = array5000.slice(0);
  var array50000_2 = array50000.slice(0);

  if ($('#recursion-capacity-100').is(':checked'))
  {
    Sort.readyCount += 2;
    benchmark(sortName, array100_2, [Sort.selectedArrayType, Sort.selectedElementType]);
    benchmark(sortName, array100, [Sort.selectedArrayType, Sort.selectedElementType], true);
  }
  if ($('#recursion-capacity-500').is(':checked'))
  {
    Sort.readyCount += 2;
    benchmark(sortName, array500_2, [Sort.selectedArrayType, Sort.selectedElementType]);
    benchmark(sortName, array500, [Sort.selectedArrayType, Sort.selectedElementType], true);
  }
  if ($('#recursion-capacity-5000').is(':checked'))
  {
    Sort.readyCount += 2;
    benchmark(sortName, array5000_2, [Sort.selectedArrayType, Sort.selectedElementType]);
    benchmark(sortName, array5000, [Sort.selectedArrayType, Sort.selectedElementType], true);
  }
  if ($('#recursion-capacity-50000').is(':checked'))
  {
    Sort.readyCount += 2;
    benchmark(sortName, array50000_2, [Sort.selectedArrayType, Sort.selectedElementType]);
    benchmark(sortName, array50000, [Sort.selectedArrayType, Sort.selectedElementType], true);
  }
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
