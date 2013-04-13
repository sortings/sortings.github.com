function from0to9_random(n) {
  var data = [];
  for (var i=0;i<n;i++)
    data[i] = Math.floor(Math.random() * 10);
  return data;
}
function from0to9_ordered(n) {
  var data = [];
  var segment = 0;
  for (var i=0;i<n;i++)
  {
    if(i > n/9 * segment)
      segment += 1;
    data[i] = segment;
  }
  return data;
}
function from0to9_reversed(n) {
  return from0to9_ordered(n).reverse();
}

function integers_random(n) {
  var data = [];
  for (var i=0;i<n;i++)
    data[i] = Math.floor(Math.random()*9007199254740992);
  return data;
}
function integers_ordered(n) {
  var data = [];
  for (var i=0;i<n;i++)
    data[i] = i;
  return data;
}
function integers_reversed(n) {
  return integers_ordered(n).reverse();
}

function strings_random(n) {
  var data = [];
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
function strings_ordered(n) {
  return strings_random(n).sort(); /* soorry no time :( */
}
function strings_reversed(n) {
  return strings_ordered(n).reverse();
}

function dates_random(n) {
  var data = [];
  for (var i=0;i<n;i++)
    data[i] = make_random_date(new Date(2000, 0, 1), new Date());
  return data;
}
function make_random_date(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
function dates_ordered(n) {
  var data = [];
  var date = new Date().getTime();
  for (var i=0;i<n;i++)
    data[i] = new Date(date+i);
  return data;
}
function dates_reversed(n) {
  return dates_ordered(n).reverse();
}
