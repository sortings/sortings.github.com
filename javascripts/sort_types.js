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
/* слиянием */
Sort.merge = function(items, sortParams) {
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
Sort.merge_recursive = function(items, sortParams) {
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
Sort.quick_recursive = function(input, sortParams) {
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
Sort.quick = function(items, sortParams, left, right) {
  var index;

  if (items.length > 1) {

    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? items.length - 1 : right;

    index = Sort.partition(items, left, right);

    if (left < index - 1) {
      Sort.quick(items, sortParams, left, index - 1);
    }

    if (index < right) {
      Sort.quick(items, sortParams, index, right);
    }
  }
  if(index == items.length-1)
    isReady(sortParams);
}
/* поразрядная */
Sort.insert = function(arr, i, j)
{
  var tmp = arr[i];
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
Sort.SiftDown = function(heap, i, n)
{
  var nMax = i;
  var value = heap[i];
  while ( true )
  {
    var childN = i*2+1;
    if ( ( childN < n ) && ( heap[childN] > value      ) )
        nMax = childN;

    ++childN;
    if ( ( childN < n ) && ( heap[childN] > heap[nMax] ) )
        nMax = childN;
    if ( nMax == i ) break;
    heap[i] = heap[nMax]; heap[nMax] = value;
    i = nMax;
  };
}
Sort.heap = function(heap, sortParams)
{
  var n = heap.length;
  for(var i = n/2-1; i>=0; --i) Sort.SiftDown(heap, i, n);

  while( n > 1 )
  {
    --n;

    var firstElem = heap[0];
    heap[0] = heap[n];
    heap[n] = firstElem;

    Sort.SiftDown(heap, 0, n);
  }
  isReady(sortParams);
}
