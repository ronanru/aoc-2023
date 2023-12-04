package main

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	for _, line := range strings.Split(string(file), "\n") {
		_, data, _ := strings.Cut(line, ": ")
		rawWinning, rawMine, _ := strings.Cut(data, " | ")
		winning := strings.Split(rawWinning, " ")
		my := strings.Split(rawMine, " ")

		score := 0

		for _, number := range my {
			if number == "" {
				continue
			}
			if slices.Contains(winning, number) {
				if score == 0 {
					score = 1
				} else {
					score *= 2
				}
			}
		}
		res += score
	}

	fmt.Println(res)
}
