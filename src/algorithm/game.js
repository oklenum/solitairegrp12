var talon = [];
var spadeStack = [];
var clubStack = [];
var heartStack = [];
var diamondStack = [];
var foundation = [];
var tableau1 = [];
var tableau2 = [];
var tableau3 = [];
var tableau4 = [];
var tableau5 = [];
var tableau6 = [];
var tableau7 = [];

export function moveCard(fromArray, toArray) {
  var lastElement;
  lastElement = fromArray[fromArray.length - 1];
  fromArray.pop();
  toArray.push(lastElement);
  console.log(toArray);
}

export function validTableauMove(sourceArr, desArr) {
  var sourceArrKey;
  var sourceArrVal;
  var desArrKey;
  var desArrVal;
  sourceArrKey = Object.keys(sourceArr).pop();
  sourceArrVal = Object.values(sourceArr).pop();
  desArrKey = Object.keys(desArr).pop();
  desArrVal = Object.values(desArr).pop();

  if (sourceArrVal === desArrVal - 1) {
    if (sourceArrKey.toString != "Spade" || sourceArrKey.toString != "Club") {
      if (desArrKey.toString === "Diamond" || desArrKey.toString === "Heart") {
        moveCard(sourceArr, desArr);
      }
    }
  }

  if (sourceArrVal === desArrVal - 1) {
    if (
      sourceArrKey.toString != "Diamond" ||
      sourceArrKey.toString != "Heart"
    ) {
      if (desArrKey.toString === "Club" || desArrKey.toString === "Spade") {
        moveCard(sourceArr, desArr);
      }
    }
  }
}

export function insertCardToArray(arr, card) {
  arr.push(card);
  console.log(card);
}
