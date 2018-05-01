
var request = require('request');

var fs = require('fs');


var i = 0
function doLoop() {
  if (i > 600) {
    clearInterval(loop);
    console.log('done');
    return;
  }
  request('http://lorempixel.com/60/60/').pipe(fs.createWriteStream('img/tile'+i+'.png'));
  console.log('requested '+i);
  i++;
}

var loop = setInterval(doLoop, 125);
