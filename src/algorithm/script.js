//import { isEmptyObject } from "jquery";
import {
  deck,
  pile,
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

//setInitialStacks();

//log all stacks
console.log("Foundation: ");
console.log(spadeStack);
console.log(clubStack);
console.log(heartStack);
console.log(diamondStack);
console.log("Pile: ");
console.log(pile);
console.log("Talon: ");
console.log(talon);
console.log("Tableu rows: ");
console.log(tableu1);
console.log(tableu2);
console.log(tableu3);
console.log(tableu4);
console.log(tableu5);
console.log(tableu6);
console.log(tableu7);
console.log(getMatchSuit(tableu7));
console.log(tableu7);

//test logs

export function getMatchTableu(arr) {
  let matchArray = [];
  var suitMatch;
  var valueMatch;
  var Card;
  var carVal;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      /*
      const EmptyCard = { suit: "EmptyCard", value: 0 };
      matchArray.push(EmptyCard);
      */
      console.log("tried to push emptycard");
      console.log(i);
    } else if (arr[i].suit === "S" || arr[i].suit === "C") {
      suitMatch = "Red";
      valueMatch = arr[i].value + 1;
      Card = { suit: suitMatch, value: valueMatch };
      carVal = Card.value;
    } else if (arr[i].suit === "H" || arr[i].suit === "D") {
      suitMatch = "Black";
      valueMatch = arr[i].value + 1;
      Card = { suit: suitMatch, value: valueMatch };
      carVal = Card.value;
    }
    console.log(matchArray);
  }
  return matchArray;
}

export function getMatchSuit(arr) {
  var matchArray = [];
  var valueMatch;
  var suitMatch;
  for (var i = 0; i < arr.length; i++) {
    suitMatch = arr[i].suit;
    valueMatch = arr[i].value - 1;
    const Card = { suit: suitMatch, value: valueMatch };
    matchArray.push(Card);
  }
  return matchArray;
}

export function getSuitRowFromIndex(index) {
  switch (index) {
    case 0:
      return spadeStack;
    case 1:
      return clubStack;
    case 2:
      return heartStack;
    case 3:
      return diamondStack;
  }
}

export function getTableuRowFromIndex(index) {
  switch (index) {
    case 0:
      return tableu1;
    case 1:
      return tableu2;
    case 2:
      return tableu3;
    case 3:
      return tableu4;
    case 4:
      return tableu5;
    case 5:
      return tableu6;
    case 6:
      return tableu7;
  }
}

// checks if an array has identical card in last Tableu
export function isMatchInTableu(arr) {
  var match = false;
  var array = determineColorOfCard(arr);
  for (var i = 0; i < arr.length; i++) {
    var lastTableu = determineColorOfCard(getLastTableu());
    console.log(arr);
    console.log(lastTableu);
    for (var j = 0; j < lastTableu.length; j++) {
      if (
        arr[i].suit === lastTableu[j].suit &&
        arr[i].value === lastTableu[j].value
      ) {
        match = true;
      }
    }
  }
  return match;
}

// returns what tableu row contains arr match.
export function getMatchTableuRow(arr) {
  var from;
  var to;
  for (var i = 0; i < arr.length; i++) {
    var lastTableu = determineColorOfCard(getLastTableu());
    for (var j = 0; j < lastTableu.length; j++) {
      if (
        arr[i].suit === lastTableu[j].suit &&
        arr[i].value === lastTableu[j].value
      ) {
        console.log("Match Found");
        from = i;
        to = j;
      }
    }
  }
  console.log(from);
  console.log(to);
  console.log(arr);
  console.log(lastTableu);
  return { from, to };
}

export function getMatchIndex(arr) {
  var index;
  for (var i = 0; i < arr.length; i++) {
    var lastTableu = getLastTableu();
    for (var j = 0; j < lastTableu.length; j++) {
      if (arr[i] == lastTableu[j]) {
        index = i;
      }
    }
  }
  return index;
}

export function isMatchInSuit(arr) {
  var match = false;
  for (var i = 0; i < arr.length; i++) {
    var lastTableu = getLastSuit();
    for (var j = 0; j < lastTableu.length; j++) {
      if (arr[i] == lastTableu[j]) {
        match = true;
      }
    }
  }
  return match;
}

export function getMatchSuitRow(arr) {
  for (var i = 0; i < arr.length; i++) {
    var lastTableu = getLastSuit();
    for (var j = 0; j < lastTableu.length; j++) {
      if (arr[i] == lastTableu[j]) {
        var from = i;
        var to = j;
      }
    }
  }
  return { from, to };
}

// returns index of first card with given value from given array
export function getCardIndex(arr, value) {
  if (value != null) {
    const index = arr.map((e) => e.value).indexOf(value);
    return index;
  } else return;
}

export function getIndexOfFirstTableuCard(arr) {
  var index;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value !== 0) {
      index = i;
    }
  }
  return index;
}

// moves cards from array to array
export function moveCard(fromArray, fromIndex, toArray) {
  const removedCards = fromArray.splice(fromIndex);
  for (var i = 0; i < removedCards.length; i++) {
    toArray.push(removedCards[i]);
  }
  console.log(toArray);
}

function insertEmptyCards(arr, amount) {
  let card = { suit: "Empty", value: 0 };
  for (var i = 0; i < amount; i++) {
    arr.push(card);
  }
}

function setInitialStacks() {
  insertEmptyCards(tableu2, 1);
  insertEmptyCards(tableu3, 2);
  insertEmptyCards(tableu4, 3);
  insertEmptyCards(tableu5, 4);
  insertEmptyCards(tableu6, 5);
  insertEmptyCards(tableu7, 6);
}

export function getLastTableu() {
  var arrayOfLastTableu = [];
  let tableu1LastElement = tableu1[tableu1.length - 1];
  let tableu2LastElement = tableu2[tableu2.length - 1];
  let tableu3LastElement = tableu3[tableu3.length - 1];
  let tableu4LastElement = tableu4[tableu4.length - 1];
  let tableu5LastElement = tableu5[tableu5.length - 1];
  let tableu6LastElement = tableu6[tableu6.length - 1];
  let tableu7LastElement = tableu7[tableu7.length - 1];

  arrayOfLastTableu.push(
    tableu1LastElement,
    tableu2LastElement,
    tableu3LastElement,
    tableu4LastElement,
    tableu5LastElement,
    tableu6LastElement,
    tableu7LastElement
  );

  return arrayOfLastTableu;
}

export function getFirstTableu() {
  var arrayOfFirstTableu = [];
  let tableu1FirstElement = tableu1[getIndexOfFirstTableuCard(tableu1)];
  let tableu2FirstElement = tableu2[getIndexOfFirstTableuCard(tableu2)];
  let tableu3FirstElement = tableu3[getIndexOfFirstTableuCard(tableu3)];
  let tableu4FirstElement = tableu4[getIndexOfFirstTableuCard(tableu4)];
  let tableu5FirstElement = tableu5[getIndexOfFirstTableuCard(tableu5)];
  let tableu6FirstElement = tableu6[getIndexOfFirstTableuCard(tableu6)];
  let tableu7FirstElement = tableu7[getIndexOfFirstTableuCard(tableu7)];

  arrayOfFirstTableu.push(
    tableu1FirstElement,
    tableu2FirstElement,
    tableu3FirstElement,
    tableu4FirstElement,
    tableu5FirstElement,
    tableu6FirstElement,
    tableu7FirstElement
  );

  return arrayOfFirstTableu;
}

export function determineOppositeColorOfCard(arr) {
  let matchArray = [];
  var suitMatch;
  var card;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      const emptyCard = { suit: "EmptyCard", value: 0 };
      matchArray.push(emptyCard);
    } else if (arr[i].suit === "S" || arr[i].suit === "C") {
      suitMatch = "Red";
      card = { suit: suitMatch, value: arr[i].value };
      matchArray.push(card);
    } else if (arr[i].suit === "H" || arr[i].suit === "D") {
      suitMatch = "Black";
      card = { suit: suitMatch, value: arr[i].value };
      matchArray.push(card);
    }
  }
  return matchArray;
}

export function determineColorOfCard(arr) {
  let matchArray = [];
  var suitMatch;
  var card;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      const emptyCard = { suit: "EmptyCard", value: 0 };
      matchArray.push(emptyCard);
    } else if (arr[i].suit === "S" || arr[i].suit === "C") {
      suitMatch = "Black";
      card = { suit: suitMatch, value: arr[i].value };
      matchArray.push(card);
    } else if (arr[i].suit === "H" || arr[i].suit === "D") {
      suitMatch = "Red";
      card = { suit: suitMatch, value: arr[i].value };
      matchArray.push(card);
    }
  }
  return matchArray;
}

export function getLastSuit() {
  var arrayOfLastSuit = [];
  let spadeStackLastElement = spadeStack[spadeStack.length - 1];
  let clubStackLastElement = clubStack[clubStack.length - 1];
  let heartStackLastElement = heartStack[heartStack.length - 1];
  let diamondStackLastElement = diamondStack[diamondStack.length - 1];

  arrayOfLastSuit.push(
    spadeStackLastElement,
    clubStackLastElement,
    heartStackLastElement,
    diamondStackLastElement
  );

  return arrayOfLastSuit;
}

export function insertCardToArray(arr, card) {
  arr.push(card);
  console.log(card);
}
