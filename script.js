"use strict";

const player_one_current_score_Ele = document.querySelector(
  ".player-one-current-score"
);
const player_two_current_score_Ele = document.querySelector(
  ".player-two-current-score"
);
const player_one_total_score_Ele = document.querySelector(
  ".player-one-total-score"
);
const player_two_total_score_Ele = document.querySelector(
  ".player-two-total-score"
);
const dice_image_Ele = document.querySelector(".dice-image");
const turn_message_Ele = document.querySelector(".turn-message");
const player_one_Ele = document.querySelector(".player-one");
const player_two_Ele = document.querySelector(".player-two");
const roll_dice_Ele = document.querySelector(".roll-dice");
const hold_Ele = document.querySelector(".hold");

let current_player,
  player_one_current_score,
  player_two_current_score,
  player_one_total_score,
  player_two_total_score;

const init = function () {
  current_player = 1;
  player_one_current_score = 0;
  player_two_current_score = 0;
  player_one_total_score = 0;
  player_two_total_score = 0;

  turn_message_Ele.textContent = "Player 1 Turn....";
  player_one_current_score_Ele.textContent = player_one_current_score;
  player_one_total_score_Ele.textContent = player_one_total_score;
  player_two_current_score_Ele.textContent = player_two_current_score;
  player_two_total_score_Ele.textContent = player_two_total_score;

  dice_image_Ele.classList.add("hidden");
  roll_dice_Ele.classList.remove("hidden");
  hold_Ele.classList.remove("hidden");
};
init();

const toggle = function (player) {
  current_player = player === 1 ? 2 : 1;
  turn_message_Ele.textContent = `Player ${current_player} Turn....`;
  if (current_player === 1) {
    player_one_Ele.style.backgroundColor = "rgb(92, 227, 119)";
    player_two_Ele.style.backgroundColor = "rgb(203, 234, 136)";
  } else if (current_player == 2) {
    player_one_Ele.style.backgroundColor = "rgb(203, 234, 136)";
    player_two_Ele.style.backgroundColor = "rgb(92, 227, 119)";
  }
};

document.querySelector(".roll-dice").addEventListener("click", function () {
  const dice_face = Math.trunc(Math.random() * 6 + 1);
  dice_image_Ele.src = `/images/dice-${dice_face}.png`;
  dice_image_Ele.classList.remove("hidden");

  if (current_player === 1) {
    if (dice_face === 1) {
      player_one_current_score = 0;
      player_one_current_score_Ele.textContent = player_one_current_score;
      toggle(1);
      return;
    }
    player_one_current_score += dice_face;
    player_one_current_score_Ele.textContent = player_one_current_score;
  } else if (current_player === 2) {
    if (dice_face === 1) {
      player_two_current_score = 0;
      player_two_current_score_Ele.textContent = player_two_current_score;
      toggle(2);
      return;
    }
    player_two_current_score += dice_face;
    player_two_current_score_Ele.textContent = player_two_current_score;
  }
});

document.querySelector(".hold").addEventListener("click", function () {
  dice_image_Ele.classList.add("hidden");
  if (current_player === 1) {
    player_one_total_score += player_one_current_score;
    player_one_current_score = 0;
    player_one_current_score_Ele.textContent = player_one_current_score;
    player_one_total_score_Ele.textContent = player_one_total_score;
    if (player_one_total_score >= 25) {
      turn_message_Ele.textContent = "Player 1 WON!!! 🥳";
      roll_dice_Ele.classList.add("hidden");
      hold_Ele.classList.add("hidden");
      return;
    }
    toggle(1);
  } else if (current_player === 2) {
    player_two_total_score += player_two_current_score;
    player_two_current_score = 0;
    player_two_current_score_Ele.textContent = player_two_current_score;
    player_two_total_score_Ele.textContent = player_two_total_score;
    if (player_two_total_score >= 25) {
      turn_message_Ele.textContent = "Player 2 WON!!! 🥳";
      roll_dice_Ele.classList.add("hidden");
      hold_Ele.classList.add("hidden");
      return;
    }
    toggle(2);
  }
});

document.querySelector(".play-again").addEventListener("click", function () {
  init();
});
