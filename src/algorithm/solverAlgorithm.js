//Best Move Decider:

import {
  tableu1,
  tableu2,
  tableu3,
  tableu4,
  tableu5,
  tableu6,
  tableu7,
  spadeStack,
  clubStack,
  heartStack,
  diamondStack,
  talon,
} from "./gameModel.js";

import {
  getMatchTableu,
  getMatchSuit,
  getSuitRowFromIndex,
  getTableuRowFromIndex,
  isMatchInTableu,
  getMatchTableuRow,
  getMatchIndex,
  isMatchInSuit,
  getMatchSuitRow,
  getCardIndex,
  getIndexOfFirstTableuCard,
  moveCard,
  getLastTableu,
  getFirstTableu,
  getLastSuit,
} from "./script.js";

// PRIORITY 1
// Talon card is an ace!
if (talon[0].suit == 1) {
  switch (talon[0].suit) {
    case "S":
      moveCard(talon, 0, spadeStack);
      break;

    case "C":
      moveCard(talon, 0, clubStack);
      break;

    case "H":
      moveCard(talon, 0, heartStack);
      break;

    case "D":
      moveCard(talon, 0, diamondStack);
      break;
  }
}

// PRIORITY 2
// Top tableu card matches bottom tableu card of another tableu row!
if (isMatchInTableu(getFirstTableu.getTableuMatch())) {
  var fromArray = getTableuRowFromIndex(
    getMatchTableuRow(getFirstTableu()).from
  );
  var toArray = getTableuRowFromIndex(getMatchTableuRow(getFirstTableu()).to);

  switch (fromArray) {
    case tableu1:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu1), toArray);
      break;
    case tableu2:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu2), toArray);
      break;
    case tableu3:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu3), toArray);
      break;
    case tableu4:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu4), toArray);
      break;
    case tableu5:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu5), toArray);
      break;
    case tableu6:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu6), toArray);
      break;
    case tableu7:
      moveCard(fromArray, getIndexOfFirstTableuCard(tableu7), toArray);
      break;
  }
}

//PRIORITY 3
// Talon card matches a suitStack!
else if (suitMoveToCards.includes(getMatchSuit(talon))) {
  switch (talon[0]) {
    case "S":
      moveCard(talon, 0, spadeStack);
      break;

    case "C":
      moveCard(talon, 0, clubStack);
      break;

    case "H":
      moveCard(talon, 0, heartStack);
      break;

    case "D":
      moveCard(talon, 0, diamondStack);
      break;
  }
}

//PRIORITY 4
// Bottom tableu card matches a suitStack!
if (isMatchInSuit(getLastTableu.getSuitMatch())) {
  var fromArray = getTableuRowFromIndex(getMatchSuitRow(getLastTableu()).from);
  var toArray = getSuitRowFromIndex(getMatchSuitRow(getLastTableu()).to);

  switch (fromArray) {
    case 0:
      moveCard(fromArray, tableu1.length - 1, toArray);
      break;
    case 1:
      moveCard(fromArray, tableu2.length - 1, toArray);
      break;
    case 2:
      moveCard(fromArray, tableu3.length - 1, toArray);
      break;
    case 3:
      moveCard(fromArray, tableu4.length - 1, toArray);
      break;
    case 4:
      moveCard(fromArray, tableu5.length - 1, toArray);
      break;
    case 5:
      moveCard(fromArray, tableu6.length - 1, toArray);
      break;
    case 6:
      moveCard(fromArray, tableu7.length - 1, toArray);
      break;
  }

  //PRIORITY 5
  // if talon contains a king and a tableu is empty, then move the king to that tableau
  if (talon[0].value == 13) {
    if (tableu1.length == 0) {
      moveCard(talon, 0, tableu1);
    } else if (tableu2.length == 0) {
      moveCard(talon, 0, tableu2);
    } else if (tableu3.length == 0) {
      moveCard(talon, 0, tableu3);
    } else if (tableu4.length == 0) {
      moveCard(talon, 0, tableu4);
    } else if (tableu5.length == 0) {
      moveCard(talon, 0, tableu5);
    } else if (tableu6.length == 0) {
      moveCard(talon, 0, tableu6);
    } else if (tableu7.length == 0) {
      moveCard(talon, 0, tableu7);
    }
  }

  //PRIORITY 6
  // Talon card matches bottom tableu card!
} else if (getLastTableu().includes(talon[0].getMatchTableu())) {
  if (talo[0].getMatchTableu() == tableu1[tableu1.length - 1]) {
    moveCard(talon, 0, tableu1);
  }
  if (talo.card.getMatchTableu() == tableu2[tableu2.length - 1]) {
    moveCard(talon, 0, tableu2);
  }
  if (talo.card.getMatchTableu() == tableu3[tableu3.length - 1]) {
    moveCard(talon, 0, tableu3);
  }
  if (talo.card.getMatchTableu() == tableu4[tableu4.length - 1]) {
    moveCard(talon, 0, tableu4);
  }
  if (talo.card.getMatchTableu() == tableu5[tableu5.length - 1]) {
    moveCard(talon, 0, tableu5);
  }
  if (talo.card.getMatchTableu() == tableu6[tableu6.length - 1]) {
    moveCard(talon, 0, tableu6);
  }
  if (talo.card.getMatchTableu() == tableu7[tableu7.length - 1]) {
    moveCard(talon, 0, tableu7);
  }

  //PRIORITY 7
  // get new talon card!
} else {
  talon.scanNewCard();
}
