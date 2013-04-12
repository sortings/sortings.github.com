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

function integers_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = Math.floor(Math.random()*9007199254740992);
  return data;
}
function integers_ordered(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = i;
  return data;
}
function integers_reversed(n) {
  return integers_ordered(n).reverse();
}

function strings_random(n) {
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
function strings_ordered(n) {
  var possible = "abcdefghijklmnopqrstuvwxyz";
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = possible[i%27];
  return data;
}
function strings_reversed(n) {
  return strings_ordered(n).reverse();
}

function dates_random(n) {
  var data =[];
  for (var i=0;i<n;i++)
    data[i] = make_random_date();
  return data;
}
function make_random_date() {
   return new Date(new Date() + Math.floor(Math.random()*50000))
}
function dates_ordered(n) {
  var data =[];
  var date = new Date().getTime();
  for (var i=0;i<n;i++)
    data[i] = new Date(date+i);
  return data;
}
function dates_reversed(n) {
  return dates_ordered(n).reverse();
}
