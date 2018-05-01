var TILE_SIZE = 60;

var W = 1920, H = 1080;

$(function() {
  console.log('hi',W,H,TILE_SIZE);
  var p = $("#parent");
  var x, y, newDiv;
  for (y= 0; y < H; y+=TILE_SIZE) {
    newDiv = []; //['<div class="row">'];
    for (x = 0; x < W; x+=TILE_SIZE) {
      newDiv.push('<div class="box test2" style="top: '+y+'px; left: '+x+'px"></div>');
    }
    //newDiv.push("</div>");
    p.append(newDiv.join(''));
  }
})

