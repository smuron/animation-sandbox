var TILE_SIZE = 60;

var W = 1920, H = 1080;

var FALL_RATE = 200;

var tiles = [];

var tileInterval = null;

function shuffle(array) {
    var counter = array.length, temp, index;

    // Fisher-Yates
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function rgb(r,g,b) {
  return "rgb("+r+","+g+","+b+")";
}

function newTile() {
  if (tiles.length == 0) {
    clearInterval(tileInterval);
    return;
  }
  // get a random tile from tiles
  var tile = tiles.pop();

  // add it to parent

  $("#parent").append('<div class="box test2" style="background-image: url(\''+tile.image+'\'); background-color: '+tile.color+'; top: '+tile.y+'px; left: '+tile.x+'px"></div>');
}

$(function() {
  var W2 = W / 2, H2 = H / 2, WH2 = W*H;
  console.log('hi',W,H,TILE_SIZE);
  var p = $("#parent");
  var x, y, newDiv;
  var i = 0;
  for (y= 0; y < H; y+=TILE_SIZE) {
    for (x = 0; x < W; x+=TILE_SIZE) {
      tiles.push({image: 'img/tile'+i+'.png', x: x, y: y, color: rgb(Math.round(255*Math.abs((WH2-x*y)/WH2)), Math.round(255*Math.abs((W2-x)/W2)), Math.round(255*Math.abs((H2-y)/H2)) )});
      i++;
    }
  }

  shuffle(tiles);
  setInterval(newTile, 1000/FALL_RATE);
});

