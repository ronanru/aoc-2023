use pathfinding::prelude::dijkstra;
use std::fs;

#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
struct Node {
  x: u32,
  y: u32,
  direction: Direction,
  length: u32,
}

#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
enum Direction {
  Left,
  Right,
  Up,
  Down,
}

fn main() {
  // let file = fs::read_to_string("test.txt").unwrap();
  let file = fs::read_to_string("input.txt").unwrap();

  let lines = file
    .split("\n")
    .map(|line| {
      line
        .chars()
        .map(|c| c.to_digit(10).unwrap())
        .collect::<Vec<u32>>()
    })
    .collect::<Vec<Vec<u32>>>();

  let x_last = (lines[0].len() - 1) as u32;
  let y_last = (lines.len() - 1) as u32;

  let res = dijkstra(
    &Node {
      x: 0,
      y: 0,
      direction: Direction::Up,
      length: 0,
    },
    |node| {
      let mut res = Vec::new();
      if node.direction != Direction::Right
        && node.x > 0
        && !(node.direction == Direction::Left && node.length >= 3)
      {
        res.push(Node {
          x: node.x - 1,
          y: node.y,
          direction: Direction::Left,
          length: if node.direction == Direction::Left {
            node.length + 1
          } else {
            1
          },
        });
      }
      if node.direction != Direction::Left
        && node.x < x_last
        && !(node.direction == Direction::Right && node.length >= 3)
      {
        res.push(Node {
          x: node.x + 1,
          y: node.y,
          direction: Direction::Right,
          length: if node.direction == Direction::Right {
            node.length + 1
          } else {
            1
          },
        });
      }
      if node.direction != Direction::Down
        && node.y > 0
        && !(node.direction == Direction::Up && node.length >= 3)
      {
        res.push(Node {
          x: node.x,
          y: node.y - 1,
          direction: Direction::Up,
          length: if node.direction == Direction::Up {
            node.length + 1
          } else {
            1
          },
        });
      }
      if node.direction != Direction::Up
        && node.y < y_last
        && !(node.direction == Direction::Down && node.length >= 3)
      {
        res.push(Node {
          x: node.x,
          y: node.y + 1,
          direction: Direction::Down,
          length: if node.direction == Direction::Down {
            node.length + 1
          } else {
            1
          },
        });
      }

      let f = res
        .iter()
        .map(|node| (node.clone(), lines[node.y as usize][node.x as usize] as u32));
      return f.collect::<Vec<(Node, u32)>>();
    },
    |node| node.x == x_last && node.y == y_last,
  )
  .unwrap();

  for (y, line) in lines.iter().enumerate() {
    'outer: for x in 0..line.len() {
      for val in res.0.iter() {
        if (val.x == x as u32) && (val.y == y as u32) {
          print!(
            "{}",
            match val.direction {
              Direction::Left => "<",
              Direction::Right => ">",
              Direction::Up => "^",
              Direction::Down => "v",
            }
          );
          continue 'outer;
        }
      }
      print!("{}", line[x]);
    }
    println!();
  }

  println!("{:?}", res.1);
}
