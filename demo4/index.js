var TILE_SIZE = 40;

var W = 1920, H = 1080;

var FALL_RATE = 10;

var tiles = [];
var usedTiles = [];

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

function cyaTile() {
  for (var x = 0; x < 5; x++) {
  if (usedTiles.length == 0) {
    console.log('cya');
    clearInterval(tileInterval);
    setTimeout(resetAll, 5000);
    return;
  }

  var tile = usedTiles.pop();
  $(".x"+tile.x+".y"+tile.y).addClass('cya').on('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
        e.target.style.display = 'none';
  });
  }
}

function reverse() {
  shuffle(usedTiles);
  tileInterval = setInterval(cyaTile, 1000/FALL_RATE);
}

function stopUnstable() {
  $(".unstable").on('animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration', function(e) {
    $(e.target).removeClass('unstable').removeClass('unstable');
  });
}

function newTile() {
  for (var x = 0; x < 5; x++) {
  if (tiles.length == 0) {
    clearInterval(tileInterval);
    console.log('fill complete');
    //setTimeout(stopUnstable, 20000);
    setTimeout(reverse, 3000);
    return;
  }
  // get a random tile from tiles
  var tile = tiles.pop();
  usedTiles.push(tile);
  // add it to parent


  $("#parent").append('<div class="box test2 x'+tile.x+' y'+tile.y+'" style="background-image: url(\''+tile.image+'\'); background-color: '+tile.color+'; top: '+tile.y+'px; left: '+tile.x+'px"></div>');

  $(".x"+tile.x+".y"+tile.y).one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
    $(e.target).removeClass('test2');
  });
  /*
  $(".x"+tile.x+".y"+tile.y).one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
    $(e.target).removeClass('rotateIn').addClass('rotateOut').one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
      $(e.target).removeClass('rotateOut').addClass('test2').one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
        $(e.target).removeClass('test2');
      });
    });
  });
  */
  /*
  $(".x"+tile.x+".y"+tile.y).one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
    $(e.target).removeClass('rotateIn').addClass('rotateOut').one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
      $(e.target).removeClass('rotateOut').addClass('test2').one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function(e) {
        $(e.target).removeClass('rotateOut').addClass('unstable').removeClass('test2');
      });
    });
  });
*/
  }
}

var resetAll = function() {
  var W2 = W / 2, H2 = H / 2, WH2 = W*H;
  console.log('hi',W,H,TILE_SIZE);
  tiles = [];
  var p = $("#parent");
  p.off('click','.box');
  p.on('click','.box', function(e) {
    $(e.target).toggleClass('click-box')
  })
  p.empty();
  var x, y, newDiv;
  var i = 0;
  for (y= 0; y < H; y+=TILE_SIZE) {
    for (x = 0; x < W; x+=TILE_SIZE) {
      tiles.push({image: 'img/tile'+i+'.png', x: x, y: y, color: rgb(Math.round(255*Math.abs((WH2-x*y)/WH2)), Math.round(255*Math.abs((W2-x)/W2)), Math.round(255*Math.abs((H2-y)/H2)) )});
      i++;
      if (i > 576) {
        i = 0;
      }
    }
  }
  console.log(tiles.length);
  shuffle(tiles);
  tileInterval = setInterval(newTile, Math.round(1000/FALL_RATE));
}

$(resetAll);