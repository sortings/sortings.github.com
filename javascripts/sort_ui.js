function createComparisonBlock (elem, sort) {
  var content = '<div id="' + sort + '-comparison" class="algo-stat"></div>' +
                '<div class="algo-stat-table-block" style="text-align: center; height: 10px;">' +
                '<select class="elements-type-select">' +
                '<option value="0">Любой (среднее)</option>' +
                '<option value="1">Случайно сгенерированный</option>' +
                '<option value="2">Правильно упорядоченный</option>' +
                '<option value="3">Обратно упорядоченный</option>' +
                '</select>' +
                '<span> массив ёмкостью в </span>' +
                '<select class="array-type-select">' +
                '<option value="100">100</option>' +
                '<option value="500" selected>500</option>' +
                '<option value="5000">5000</option>' +
                '<option value="50000">50000</option>' +
                '</select>' +
                '<span> элементов</span>' +
                '</div>' +
                '<br>';
  elem.append(content);
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
function createExperimentsBlocks() {
  var capacities = [ 100, 500, 5000, 50000 ];
  var experimentsContent = "";
  for (var count in capacities) {
    experimentsContent += '<div class="algo-stat-block">' +
                          '<div id="' + capacities[count] +'_stat" class="algo-stat"></div>' +
                          '<p style="margin-left: 20px;">Более подробные значения</p>' +
                          '<div class="algo-stat-table-block">' +
                          '<h1 class="computing">Вычисление...</h1>' +
                          '<table class="algo-stat-table"></table>' +
                          '</div>' +
                          '<div class="submit">' +
                          '<input class="' + capacities[count] +'_stat" name="commit" type="submit" value="Пересчитать *">' +
                          '</div>' +
                          '<div class="separator"></div>' +
                          '</div>'
  }
  $('#experiments').append(experimentsContent);
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
