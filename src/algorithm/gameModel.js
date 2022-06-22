import Deck from "./deck.js";

//deck
var deck = new Deck();

//stack pile
var pile = [];

//foundation stacks
var spadeStack = [];
var clubStack = [];
var heartStack = [];
var diamondStack = [];

//talon
var talon = [];

// tableau stacks
var tableu1 = [{ suit: "D", value: 11 }];
var tableu2 = [
  { suit: "Empty", value: 0 },
  { suit: "C", value: 5 },
];
var tableu3 = [
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "C", value: 6 },
];
var tableu4 = [
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "D", value: 6 },
];
var tableu5 = [
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "S", value: 12 },
];
var tableu6 = [
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "D", value: 1 },
];
var tableu7 = [
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "Empty", value: 0 },
  { suit: "C", value: 7 },
];

export {
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
};