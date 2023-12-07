// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const cardStrengths = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const getType = (cards: string[]) => {
  // get max number of same cards
  let max = 0;
  let maxCard = "";
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let count = cards.filter((d) => d === card || d === "J").length;
    if (count > max) {
      max = count;
      maxCard = card;
    }
  }
  const otherCards = cards.filter((d) => d !== maxCard && d !== "J");
  if (max === 5) {
    return 8;
  }
  if (max === 4) {
    return 7;
  }
  if (max === 3 && otherCards[0] === otherCards[1]) {
    return 6;
  }
  if (max === 3) {
    return 3;
  }
  if (
    max === 2 &&
    (otherCards[0] === otherCards[1] ||
      otherCards[0] === otherCards[2] ||
      otherCards[1] === otherCards[2])
  ) {
    return 2;
  }
  if (max === 2) {
    return 1;
  }
  return 0;
};

const lines = input.split("\n").map((d) => {
  let a = d.split(" ");
  let cards = a[0].split("");
  let type = getType(cards);
  console.log(cards, type);
  return {
    cards,
    bid: parseInt(a[1]),
    type: type,
  };
});

lines.sort((a, b) => {
  let typeA = a.type;
  let typeB = b.type;
  if (typeA !== typeB) {
    return typeA - typeB;
  }
  let i = 0;
  while (i < a.cards.length) {
    let cardA = a.cards[i];
    let cardB = b.cards[i];
    let indexA = cardStrengths.indexOf(cardA);
    let indexB = cardStrengths.indexOf(cardB);
    if (indexA !== indexB) {
      return indexB - indexA;
    }
    i++;
  }
  return 0;
});

// console.log(lines);

lines.forEach((d, i) => {
  console.log(i + 1, d.bid);
  res += d.bid * (i + 1);
});

console.log(res);
