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

//var suitStack = talonMatchInSuit().suitStack
//moveCard(talon, 0, suitStack)
//console.log(talonMatchInSuit())

export function talonMatchInTableu() {
  var talonArray = reformatCardArray(talon);
  var talonCard = talonArray[0];
  var lastTableu = reformatCardArray(getLastTableu());
  var isMatch = false;
  var toIndex;
  var toArray;
  for (var i = 0; i < lastTableu.length; i++) {
    if (talonCard != undefined && lastTableu != undefined) {
      if (
        talonCard.value == lastTableu[i].value - 1 &&
        talonCard.suit !== lastTableu[i].suit
      ) {
        isMatch = true;
        toArray = getTableuRowFromIndex(i);
        toIndex = i + 1;
      }
    }
  }
  return { isMatch, toArray, toIndex };
}

// checks if an array has identical card in last Tableu
export function tableuMatchInSuit() {
  var lastTableu = getLastTableu();
  var suitCards = getLastSuit();
  var fromArray;
  var toArray;
  var isMatch = false;
  for (var i = 0; i < lastTableu.length; i++) {
    for (var j = 0; j < suitCards.length; j++) {
      if (lastTableu != undefined) {
        if (
          lastTableu[i].value == suitCards[j].value + 1 &&
          lastTableu[i].suit == suitCards[j].suit
        ) {
          isMatch = true;
          fromArray = getTableuRowFromIndex(i);
          toArray = getSuitRowFromIndex(j);
        }
      }
    }
  }
  return { isMatch, fromArray, toArray };
}

export function talonMatchInSuit() {
  var talonCard = talon[0];
  var suitCards = getLastSuit();
  var isMatch = false;
  var suitStack;
  for (var i = 0; i < suitCards.length; i++) {
    if (talonCard != undefined) {
      if (
        talonCard.value == suitCards[i].value + 1 &&
        talonCard.suit == suitCards[i].suit
      ) {
        isMatch = true;
        suitStack = getSuitRowFromIndex(i);
      }
    }
  }
  return { isMatch, suitStack };
}

export function matchInTableu() {
  var firstTableu = reformatCardArray(getFirstTableu());
  var lastTableu = reformatCardArray(getLastTableu());
  var fromArray;
  var toArray;
  var toIndex;
  var isMatch = false;
  for (var i = 0; i < firstTableu.length; i++) {
    for (var j = 0; j < lastTableu.length; j++) {
      if (firstTableu !== undefined && lastTableu !== undefined) {
        if (
          firstTableu[i].value == lastTableu[j].value - 1 &&
          firstTableu[i].suit !== lastTableu[j].suit &&
          i !== j
        ) {
          isMatch = true;
          fromArray = getTableuRowFromIndex(i);
          toIndex = j + 1;
          toArray = getTableuRowFromIndex(j);
        }
      }
    }
  }
  var fromIndex;
  if (isMatch == true) {
    for (var i = 0; i < fromArray.length; i++) {
      for (var j = 0; j < toArray.length; j++) {
        if (fromArray !== undefined && toArray !== undefined) {
          if (
            fromArray[i].value == toArray[j].value - 1 &&
            fromArray[i].suit !== toArray[j].suit
          ) {
            fromIndex = i;
          }
        }
      }
    }
  }
  return { isMatch, fromArray, fromIndex, toArray, toIndex };
  /*
  var firstTableu = reformatCardArray(getFirstTableu())
  var lastTableu = reformatCardArray(getLastTableu()) 
  var fromArray
  var toArray
  var index
  var isMatch = false
  for(var i = 0; i < firstTableu.length; i++) {
      for(var j = 0; j < lastTableu.length; j++) {
          if (firstTableu[i].value == lastTableu[j].value - 1 &&
              firstTableu[i].suit !== lastTableu[j].suit &&
              i !== j) {
              index = i
              fromArray = getTableuRowFromIndex(i)
              toArray = getTableuRowFromIndex(j)
              isMatch = true
          }
      }
  }
  var fromIndex
  if (isMatch == true) {
      for(var i = 0; i < fromArray.length; i++) {
          for(var j = 0; j < toArray.length; j++) {
              if (fromArray[i].value == toArray[j].value - 1 &&
                  fromArray[i].suit !== toArray[j].suit) {
                  fromIndex = i
              }
          }
      }
  }
  return {isMatch, fromArray, fromIndex, toArray, index}
  */
}

export function getTableuOrder(arr) {
  let tableu1 = arr.map((e) => e.value).indexOf(getFirstTableu()[6]);
  return tableu1;
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

export function reformatCardArray(arr) {
  let array = [];
  var suit;
  var value;
  var card;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      return;
    } else if (arr[i].value === -1) {
      suit = "Empty";
      value = arr[i].value;
    } else if (arr[i].suit === "S" || arr[i].suit === "C") {
      suit = "Black";
      value = arr[i].value;
    } else if (arr[i].suit === "H" || arr[i].suit === "D") {
      value = arr[i].value;
      suit = "Red";
    }
    card = { suit: suit, value: value };
    array.push(card);
  }
  return array;
}

// returns what tableu row contains arr match.
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
    if (arr[i].value !== -1) {
      index = i;
      return index;
    }
  }
  return 0;
}

// moves cards from array to array
export function moveCard(fromArray, fromIndex, toArray) {
  const removedCards = fromArray.splice(fromIndex);
  for (var i = 0; i < removedCards.length; i++) {
    toArray.push(removedCards[i]);
  }
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
  let emptyArrayCard = { suit: "EmptyArray", value: -1 };

  if (tableu1LastElement !== undefined) {
    arrayOfLastTableu.push(tableu1LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu2LastElement !== undefined) {
    arrayOfLastTableu.push(tableu2LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu3LastElement !== undefined) {
    arrayOfLastTableu.push(tableu3LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu4LastElement !== undefined) {
    arrayOfLastTableu.push(tableu4LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu5LastElement !== undefined) {
    arrayOfLastTableu.push(tableu5LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu6LastElement !== undefined) {
    arrayOfLastTableu.push(tableu6LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

  if (tableu7LastElement !== undefined) {
    arrayOfLastTableu.push(tableu7LastElement);
  } else {
    arrayOfLastTableu.push(emptyArrayCard);
  }

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
  let emptyArrayCard = { suit: "EmptyArray", value: -1 };

  if (tableu1FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu1FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu2FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu2FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu3FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu3FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu4FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu4FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu5FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu5FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu6FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu6FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  if (tableu7FirstElement !== undefined) {
    arrayOfFirstTableu.push(tableu7FirstElement);
  } else {
    arrayOfFirstTableu.push(emptyArrayCard);
  }

  return arrayOfFirstTableu;
}

export function getLastSuit() {
  var arrayOfLastSuit = [];
  let spadeStackLastElement = spadeStack[spadeStack.length - 1];
  let clubStackLastElement = clubStack[clubStack.length - 1];
  let heartStackLastElement = heartStack[heartStack.length - 1];
  let diamondStackLastElement = diamondStack[diamondStack.length - 1];
  let emptyArrayCard = { suit: "EmptyArray", value: -1 };

  if (spadeStackLastElement !== undefined) {
    arrayOfLastSuit.push(spadeStackLastElement);
  } else {
    arrayOfLastSuit.push(emptyArrayCard);
  }

  if (clubStackLastElement !== undefined) {
    arrayOfLastSuit.push(clubStackLastElement);
  } else {
    arrayOfLastSuit.push(emptyArrayCard);
  }

  if (heartStackLastElement !== undefined) {
    arrayOfLastSuit.push(heartStackLastElement);
  } else {
    arrayOfLastSuit.push(emptyArrayCard);
  }

  if (diamondStackLastElement !== undefined) {
    arrayOfLastSuit.push(diamondStackLastElement);
  } else {
    arrayOfLastSuit.push(emptyArrayCard);
  }

  return arrayOfLastSuit;
}

export function talonKingMatchInTableu() {
  var talonCard = talon[0];
  var lastTableu = getLastTableu();
  var isMatch = false;
  var toArray;
  var tableuRow;
  for (var i = 0; i < lastTableu.length; i++) {
    if (
      talonCard.value == lastTableu[i].value + 14 &&
      talonCard.suit !== lastTableu[i].suit
    ) {
      isMatch = true;
      tableuRow = i + 1;
      toArray = getTableuRowFromIndex(i);
    }
  }
  return { isMatch, toArray, tableuRow };
}

export function tableuKingMatchInTableu() {
  var firstTableu = getFirstTableu();
  var lastTableu = getLastTableu();
  var fromArray;
  var toArray;
  var toIndex;
  var isMatch = false;
  for (var i = 0; i < firstTableu.length; i++) {
    for (var j = 0; j < lastTableu.length; j++) {
      if (firstTableu !== undefined && lastTableu !== undefined) {
        if (firstTableu[i].value == 13 && lastTableu[j].suit == "Empty") {
          fromArray = getTableuRowFromIndex(i);
          toArray = getTableuRowFromIndex(j);
          if (fromArray[0].value !== 13) {
            isMatch = true;
            toIndex = j + 1;
          }
        }
      }
    }
  }
  var fromIndex;
  if (isMatch == true) {
    for (var i = 0; i < fromArray.length; i++) {
      if (fromArray !== undefined) {
        if (fromArray[i].value == 13) {
          fromIndex = i;
        }
      }
    }
  }
  return { isMatch, fromArray, fromIndex, toArray, toIndex };
}

export function insertCardToArray(arr, card) {
  arr.push(card);
  console.log(card);
}

export function insertCardToTalon(arr, card) {
  arr.splice(0, 1, card);
  console.log(card);
}
