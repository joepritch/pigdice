function Game(){
  this.turn=1;
  this.playerArray=[];
  this.rollArray=[];
}

function Player(name){
  this.name=name;
  this.score=0;
}

Game.prototype.turnChanger=function(){
  this.rollArray=[];
  if(this.turn<this.playerArray.length){
    this.turn++
  } else{
    this.turn=1;
  }
}

Game.prototype.addPlayer=function(playerName){
  this.playerArray.push(new Player(playerName));
}

Game.prototype.rollDice=function(){
  var rollResult = Math.ceil(Math.random()*6);
  console.log("Roll Dice Hit "+ rollResult)
  if(rollResult===1){
    this.turnChanger();
  } else {
    this.rollArray.push(rollResult);
  }
  return rollResult
}

Game.prototype.addScore=function(){
  var roundScore=0;
  this.rollArray.forEach(function(roll){
    roundScore+=roll;
  });
  this.playerArray[this.turn-1].score+=roundScore;
  this.turnChanger();
}

Game.prototype.checkVictory=function(){
  this.playerArray.forEach(function(player){
    if(player.score>=100){
      alert(player.name + " Is the Winner!");
    }
  })
}



$(document).ready(function(){
  var newGame = new Game();

  function displayPlayers(){
    $(".player").hide();
    newGame.playerArray.forEach(function(player){
      var appendString="<div class='card player'><h3>"+player.name+"</h3><p>"+player.score+"</p></div>"
      $("#playerDisplay").append(appendString);
    })
  };

  function displayRoll(){
    var rollString= newGame.rollArray.join(", ");
    $("#rollDisplay").text(rollString);
  };

  function displayTurn(){
    $("#turnDisplay").text(newGame.playerArray[newGame.turn-1].name)
  };

  $('#nameForm').submit(function(event){
    event.preventDefault();
    var playerName= $("#nameInput").val();
    if(playerName){
      $("#nameInput").removeClass("is-invalid");
      newGame.addPlayer(playerName);
      displayPlayers();
    } else {
      $("#nameInput").addClass("is-invalid");
    }
  });

  $("#startGame").click(function(){
    $("#titleDisplay").hide();
    $("#gameDisplay").show();

  });
  $("#rollBtn").click(function(){
    var diceResult= newGame.rollDice();
    displayRoll();
    $("#diceDisplay img").hide();

    if(diceResult===1){
      $("#grin").show();
    }
    if(diceResult===2){
      $("#two").show();
    }
    if(diceResult===3){
      $("#three").show();
    }
    if(diceResult===4){
      $("#four").show();
    }
    if(diceResult===5){
      $("#five").show();
    }
    if(diceResult===6){
      $("#six").show();
    }
  });
  $("#scoreBtn").click(function(){
    newGame.addScore();

    $("#diceDisplay img").hide();
  })
  $("button").click(function(){
    displayRoll();
    displayPlayers();
    newGame.checkVictory();
    displayTurn();
  })

});
