use rayon::prelude::*;
use std::fs;

#[derive(Debug)]
struct Translation {
  to: u64,
  from: u64,
  length: u64,
}

impl Translation {
  fn new(str: &str) -> Self {
    let mut parts = str.split(" ");
    let to = parts.next().unwrap().parse::<u64>().unwrap();
    let from = parts.next().unwrap().parse::<u64>().unwrap();
    let length = parts.next().unwrap().parse::<u64>().unwrap();
    Self { to, from, length }
  }
}

fn main() {
  let file = fs::read_to_string("input.txt").unwrap();

  let mut blocks = file.split("\n\n");
  let raw_seeds = blocks
    .next()
    .unwrap()
    .strip_prefix("seeds: ")
    .unwrap()
    .split(" ")
    .map(|x| x.parse::<u64>().unwrap())
    .collect::<Vec<u64>>();

  let steps = blocks
    .map(|block| {
      let mut translations = block.lines();
      translations.next();
      translations
        .map(|x| Translation::new(x))
        .collect::<Vec<Translation>>()
    })
    .collect::<Vec<Vec<Translation>>>();

  let res = raw_seeds
    .par_chunks(2)
    .flat_map(|x| {
      (x[0]..(x[0] + x[1])).into_par_iter().map(|mut num| {
        for step in &steps {
          for translation in step {
            if num >= translation.from && num < translation.from + translation.length {
              num = translation.to + (num - translation.from);
              break;
            }
          }
        }
        num
      })
    })
    .min()
    .unwrap();

  println!("{:?}", res);
}
