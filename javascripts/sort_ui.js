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
