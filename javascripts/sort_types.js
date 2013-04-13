/* пузырьком */
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
/* слиянием */
Sort.merge_recursive = function(items, sortParams) {
  Sort.merge_recursive_help(items);
  isReady(sortParams);
}
Sort.merge_recursive_help = function(items) {
  if (items.length == 1) {
    return items;
  }

  var middle = Math.floor(items.length / 2),
    left = items.slice(0, middle),
    right = items.slice(middle);

  return Sort.merge_help(Sort.merge_recursive_help(left), Sort.merge_recursive_help(right));
}
Sort.merge_help = function(left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
        result.push(left.shift());
    }
    else {
        result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}
Sort.merge = function(items, sortParams) {
  if (items.length == 1) {
    return items;
  }
  var work = [];
  for (var i=0, len=items.length; i < len; i++) {
      work.push([items[i]]);
  }
  work.push([]);

  for (var lim=len; lim > 1; lim = Math.floor((lim+1)/2)) {
    for (var j=0,k=0; k < lim; j++, k+=2) {
        work[j] = Sort.merge_help(work[k], work[k+1]);
    }
    work[j] = [];
  }
  isReady(sortParams);
}
