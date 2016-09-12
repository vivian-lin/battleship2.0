//used to model the gameboard
var board = [];
//used to count how many shots user has fired
var torpedoCounter = 35;
//used when making more than 1 of a ship type
var shipBlocks = 0;
//used when counting number of shipblocks hit
var shipsHit = 0;
//used to hold all the ship "coordinates"
var answerKey = [];

$(document).ready(function(){
  initializeBoard();
  initializeTable();
  placeShips();

  $("#torpedosLeft").text(shoot());
  $("#shipsSunk").text(shipsHit);

  //when user clicks on td
  $("td").on("click", function(){
    $(this).addClass("miss").off("click");
    $("#torpedosLeft").text(shoot());
    //lost
    if (shipsHit<shipBlocks && torpedoCounter===-1){
      $("td").off("click");
      $("#notification").text("can't touch my battleships");
      $("#revealShips").show();
    }
    //win
    if (shipsHit===shipBlocks && torpedoCounter>= -1){
      $("#notification").text("winner, winner, chicken dinner");
      $("td").off("click");
    }
    //hitting a ship
    var boxId = $(this).attr("id");
    if ( 1 === (board[boxId[0]][boxId[1]])){
      $(this).addClass("hit");
      $("#shipsSunk").text(shipsHit = shipsHit+1);
    }
  });

  //hidden "reveal" button
  $("#revealShips").hide().on("click", function(){
    idCreator(0,1);
  });
});

//reduces torpedo count, called in $document.ready
function shoot(){
  return torpedoCounter--;
}

//creates board model, called in $document.ready
function initializeBoard(){
  for (var i = 0; i < 10; i++){
    var y = [];
    board.push(y);
    for (var j = 0; j < 10; j++){
      var x = 0;
      y.push(x);
    }
  }
}

//creates table view, called in $document.ready
function initializeTable(){
  for (var rowIndex = 0; rowIndex < 10; rowIndex++){
    $("#table").append("<tr></tr>");
    for (var columnIndex = 0; columnIndex < 10; columnIndex++){
      $("tr").last().append("<td></td>")
      $("td").last().attr("id", rowIndex.toString() + columnIndex.toString());
    }
  }
}

//places ship on model, called in $document.ready
function placeShips(){
  fiveBlock();
  fourBlock();
  threeBlock();
  twoBlock();
  oneBlock();
}

//creates one 5 block ship on model, called in placeShips()
function fiveBlock(){
  var x = Math.floor((Math.random()*10));
  var y = Math.floor((Math.random()*10));
  var randomDirection = Math.floor(Math.random()*2);
  //creates horizontal 5 block ship in model + puts ship coordinate in answerKey[]
  if(randomDirection === 0){
    while(x>=6){
      x = Math.floor((Math.random()*10));
    }
    pushHorizontalBlocks(y,x,5);
  }
  //creates vertical 5 block ship in model + puts ship coordinate in answerKey[]
  if(randomDirection === 1){
    while(y>=6){
      y = Math.floor((Math.random()*10));
    }
    pushVerticalBlocks(y,x,5);
  }
}

//creates two 4 block ships on model, called in placeShips()
function fourBlock(){
  var deployedShips = 0;
  do {
    var x = Math.floor((Math.random()*10));
    var y = Math.floor((Math.random()*10));
    var randomDirection = Math.floor((Math.random()*2));
    if (randomDirection === 0){
      while (x>6){
        x = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,4,randomDirection)){
        pushHorizontalBlocks(y,x,4);
        deployedShips++;
      }
    }
    if (randomDirection === 1){
      while (y>6){
        y = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,4,randomDirection)){
        pushVerticalBlocks(y,x,4);
        deployedShips++;
      }
    }
  } while (deployedShips < 2);
}

//creates two 3 block ships on model, called in placeShips()
function threeBlock(){
  var deployedShips = 0;
  do {
    var x = Math.floor((Math.random()*10));
    var y = Math.floor((Math.random()*10));
    var randomDirection = Math.floor((Math.random()*2));
    if (randomDirection === 0){
      while (x>7){
        x = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,3,randomDirection)){
        pushHorizontalBlocks(y,x,3);
        deployedShips++;
      }
    }
    if (randomDirection === 1){
      while (y>7){
        y = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,3,randomDirection)){
        pushVerticalBlocks(y,x,3);
        deployedShips++;
      }
    }
  } while (deployedShips < 2);
}

//creates two 2 block ships on model, called in placeShips()
function twoBlock(){
  var deployedShips = 0;
  do {
    var x = Math.floor((Math.random()*10));
    var y = Math.floor((Math.random()*10));
    var randomDirection = Math.floor((Math.random()*2));
    if (randomDirection === 0){
      while (x>8){
        x = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,2,randomDirection)){
        pushHorizontalBlocks(y,x,2);
        deployedShips++;
      }
    }
    if (randomDirection === 1){
      while (y>8){
        y = Math.floor((Math.random()*10));
      }
      if (spaceAvailable(y,x,2,randomDirection)){
        pushVerticalBlocks(y,x,2);
        deployedShips++;
      }
    }
  } while (deployedShips < 2);
}

//creates one 1 block ship on model, called in placeShips()
function oneBlock(){
  var deployedShips = 0;
  do {
    var x = Math.floor((Math.random()*10));
    var y = Math.floor((Math.random()*10));
    if (spaceAvailable(y,x,1,0)){
      pushHorizontalBlocks(y,x,1);
      deployedShips++;
    }
  } while (deployedShips < 1);
}

//pushes horizontal ships into model and ship coordinates into answerKey[]
function pushHorizontalBlocks(y,x,shipLength){
  for (var i = 0; i < shipLength; i++){
    board[y][x+i] = 1;
    answerKey.push(y,(x+i));
    shipBlocks++;
  }
}

//pushes vertical ships into model and ship coordinates into answerKey[]
function pushVerticalBlocks(y,x,shipLength){
  for (var j = 0; j < shipLength; j++){
    board[y+j][x] = 1;
    answerKey.push((y+j),x);
    shipBlocks++;
  }
}

//checks in the model if all spaces needed for ships are available
function spaceAvailable(y,x,shipLength,randomDirection){
  if (randomDirection === 0){
    for (var i = 0; i < shipLength; i++) {
      if (isCoordinateOccupied(y,x+i) || areAdjacentCoordinatesOccupied(y,x+i)){
        return false;
      }
    }
    return true;
  }
  if (randomDirection === 1){
    for (var j = 0; j < shipLength; j++) {
      if (isCoordinateOccupied(y+j,x) || areAdjacentCoordinatesOccupied(y+j,x)){
        return false;
      }
    }
    return true;
  }
}

//ensures that we only check coordinates that exist
function isCoordinateOccupied(y,x){
  if (!(y >= 0 && y <= 9)) {
    return false;
  }
  if (!(x >= 0 && x <= 9)) {
    return false;
  }
  return (board[y][x] === 1);
}

//checks surrounding coordinates
function areAdjacentCoordinatesOccupied(y,x){
  return (isCoordinateOccupied(y-1,x) || isCoordinateOccupied(y+1,x) || isCoordinateOccupied(y,x-1) || isCoordinateOccupied(y,x+1) || isCoordinateOccupied(y-1,x-1) || isCoordinateOccupied(y+1,x+1) || isCoordinateOccupied(y-1,x+1) || isCoordinateOccupied(y+1,x-1));
}

//adds class "hit" to "coordinates" in answerKey[]
function idCreator(y,x){
  for (var i = 0; i < ((answerKey.length)/2); i++) {
    var shipId = "#"+answerKey[y]+answerKey[x];
    $(shipId).addClass("missedShips");
    y = y + 2;
    x = x + 2;
  }
}
