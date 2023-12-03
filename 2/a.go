package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	cubeCount := map[string]int{
		"red":   12,
		"green": 13,
		"blue":  14,
	}

	file, _ := os.ReadFile("input.txt")

	res := 0

Main:
	for i, line := range strings.Split(string(file), "\n") {
		_, gamesText, _ := strings.Cut(line, ": ")
		for _, game := range strings.Split(gamesText, "; ") {
			for _, inst := range strings.Split(game, ", ") {
				numberStr, color, _ := strings.Cut(inst, " ")
				number, _ := strconv.Atoi(numberStr)
				if cubeCount[color] < number {
					continue Main
				}
			}
		}
		res += 1 + i
	}
	fmt.Println(res)
}
