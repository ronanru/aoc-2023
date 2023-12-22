use std::{collections::HashSet, fs};

use pathfinding::grid;

#[derive(Debug, Hash, Eq, PartialEq)]
struct Coord(i64, i64);

impl Coord {
  fn neighbours(&self) -> Vec<Self> {
    vec![
      Coord(self.0 + 1, self.1),
      Coord(self.0 - 1, self.1),
      Coord(self.0, self.1 + 1),
      Coord(self.0, self.1 - 1),
    ]
  }
}

fn main() {
  let file = fs::read_to_string("input.txt").unwrap();
  let mut start = Coord(0, 0);
  let board = file
    .lines()
    .enumerate()
    .map(|(y, line)| {
      line
        .chars()
        .enumerate()
        .map(|(x, char)| {
          if char == 'S' {
            start = Coord(x as i64, y as i64);
          }
          return char == '#';
        })
        .collect::<Vec<bool>>()
    })
    .collect::<Vec<Vec<bool>>>();

  let mut can_reach = HashSet::new();
  can_reach.insert(start);

  let mut res = Vec::new();

  for step in 1.. {
    println!("{} {}", step, can_reach.len());
    let mut new_can_reach = HashSet::new();
    for coord in can_reach.iter() {
      for n in coord.neighbours().into_iter().filter(|pos| {
        let y = pos.1.rem_euclid(board.len() as i64) as usize;
        let x = pos.0.rem_euclid(board.len() as i64) as usize;
        !board[y][x]
      }) {
        new_can_reach.insert(n);
      }
    }
    can_reach = new_can_reach;
    if step == board.len() / 2 + board.len() * res.len() {
      res.push(can_reach.len());
      if res.len() == 3 {
        break;
      };
    }
  }
  let n = 26501365 / board.len();

  let b0 = res[0];
  let b1 = res[1] - res[0];
  let b2 = res[2] - res[1];

  println!("{}", b0 + b1 * n + (n * (n - 1) / 2) * (b2 - b1))
}
