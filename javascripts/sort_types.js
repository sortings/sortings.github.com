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
/* шелла */
Sort.increment = function(inc)
{
  var p1, p2, p3, s;
  p1 = p2 = p3 = 1;
  s = -1;
  do
  {
    if (++s % 2)
    {
      inc[s] = 8*p1 - 6*p2 + 1;
    }
    else
    {
      inc[s] = 9*p1 - 9*p3 + 1;
      p2 *= 2;
      p3 *= 2;
    }
    p1 *= 2;
  }
  while(3*inc[s] < inc.length);

  return s > 0 ? --s : 0;
}
Sort.shell = function(array, sortParams)
{
  var inc, i, j, seq = new Array(array.length);
  var s;

  s = Sort.increment(seq);
  while (s >= 0)
  {
    inc = seq[s--];
    for (i = inc; i < array.length; ++i)
    {
      var temp = array[i];
      for (j = i-inc; (j >= 0) && (array[j] > temp); j -= inc)
        array[j + inc] = array[j];
      array[j] = temp;
    }
  }
  isReady(sortParams);
}
/* быстрая */
Sort.quick = function(input, sortParams) {
  var stack = new Array();
  var pivot;
  var pivotIndex = 0;
  var leftIndex = pivotIndex + 1;
  var rightIndex = input.length - 1;

  stack.push(pivotIndex);
  stack.push(rightIndex);

  var leftIndexOfSubSet, rightIndexOfSubset;

  while (stack.length > 0)
  {
    rightIndexOfSubset = parseInt(stack.pop());
    leftIndexOfSubSet = parseInt(stack.pop());

    leftIndex = leftIndexOfSubSet + 1;
    pivotIndex = leftIndexOfSubSet;
    rightIndex = rightIndexOfSubset;

    pivot = input[pivotIndex];

    if (leftIndex > rightIndex)
      continue;

    while (leftIndex < rightIndex)
    {
      while ((leftIndex <= rightIndex) && (input[leftIndex] <= pivot))
        leftIndex++;

      while ((leftIndex <= rightIndex) && (input[rightIndex] >= pivot))
        rightIndex--;

      if (rightIndex >= leftIndex)
        Sort.swap(input, leftIndex, rightIndex);
    }

    if (pivotIndex <= rightIndex)
      if( input[pivotIndex] > input[rightIndex])
        Sort.swap(input, pivotIndex, rightIndex);

    if (leftIndexOfSubSet < rightIndex)
    {
      stack.push(leftIndexOfSubSet);
      stack.push(rightIndex - 1);
    }

    if (rightIndexOfSubset > rightIndex)
    {
      stack.push(rightIndex + 1);
      stack.push(rightIndexOfSubset);
    }
  }
  isReady(sortParams);
};
Sort.partition = function(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)],
      i       = left,
      j       = right;

  while (i <= j) {

    while (items[i] < pivot) {
      i++;
    }

    while (items[j] > pivot) {
      j--;
    }

    if (i <= j) {
      Sort.swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}
Sort.swap = function(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
Sort.quick_recursive = function(items, sortParams, left, right) {
  var index;

  if (items.length > 1) {

    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? items.length - 1 : right;

    index = Sort.partition(items, left, right);

    if (left < index - 1) {
      Sort.quick_recursive(items, sortParams, left, index - 1);
    }

    if (index < right) {
      Sort.quick_recursive(items, sortParams, index, right);
    }
  }
  if(index == items.length-1)
    isReady(sortParams);
}
/* поразрядная */
Sort.insert = function(arr, i, j)
{
  tmp = arr[i];
  arr.splice(i, 1);
  arr.splice(j, 0, tmp);
}
Sort.radix = function(arr, sortParams)
{
  var bit, end, i, mask;
  bit = 0;
  while(true)
  {
    mask = 1 << bit;
    i = 0;
    end = arr.length;
    while(i < end)
    {
      if(arr[i] & mask)
      {
        Sort.insert(arr, i, arr.length - 1);
        end--;
      }
      else
      {
        i++;
      }
    }
    bit++;
    if(end === arr.length)
    {
      break;
    }
  }
  isReady(sortParams);
}
/* пирамидальная */
Sort.heap = function(a, sortParams)
{
  var n = a.length, i, sh = 0, b = 0;
  while (1)
  {
    b = 0;
    for (i = 0; i < n; ++i)
    {
      if (i*2 + 2 + sh < n)
      {
        if (a[i+sh] > a[i*2 + 1 + sh] || a[i + sh] > a[i*2 + 2 + sh])
        {
          if (a[i*2+1+sh] < a[i*2+2+sh])
          {
            Sort.swap(a, i+sh, i*2+1+sh);
            b = 1;
          }
          else if (a[i*2+2+sh] < a[i*2+1+sh])
          {
            Sort.swap(a, i+sh, i*2+2+sh);
            b = 1;
          }
        }
      }
      else if (i * 2 + 1 + sh < n)
      {
        if (a[i+sh] > a[i*2+1+sh])
        {
          Sort.swap(a, i+sh, i*2+1+sh);
          b = 1;
        }
      }
    }
    if (!b) sh +=1;
    if (sh+2 == n)
      break;
  }
  isReady(sortParams);
}
