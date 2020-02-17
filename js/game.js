const numDivs = 36;
const maxHits = 10;
let miss = 0;
let hits = 0;
let result;
let firstHitTime = 0;
$('.game-field').hide();
$("#button-reload").hide();


function round() {
  $('.game-field').show();
  $("#game-header").show();
  $("#button-reload").show();
  $("#button-start").hide();
  $("#game-text").text("");
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === 1) { 
    firstHitTime = getTimestamp(); 
  }
  if (hits === maxHits) {
    checkResult();
  }
}

function checkResult(){
  if (hits >= miss){
    endGame()
  }
  else{
    lose();
  }
}

function endGame() {
  $('.game-field').hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  result = hits - miss;
  $("#miss-click").text(miss);
  $("#result").text(result);
  $("#win-message").removeClass("d-none");
}

function lose(){
  $('.game-field').hide();
  $("#lose-message").removeClass("d-none");
}

function handleClick(event) {
  let target = $(event.target);
  if ($(event.target).hasClass("target")) {
    hits++;
    $(event.target).text("");
    round();
  }
  else { $(event.target).addClass('miss');
    miss++;
  } 
}

function init() {
  $("#button-start").click(round);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
