package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	for _, line := range strings.Split(string(file), "\n") {
		_, gamesText, _ := strings.Cut(line, ": ")
		cubeCount := map[string]int{
			"red":   0,
			"green": 0,
			"blue":  0,
		}
		for _, game := range strings.Split(gamesText, "; ") {
			for _, inst := range strings.Split(game, ", ") {
				numberStr, color, _ := strings.Cut(inst, " ")
				number, _ := strconv.Atoi(numberStr)
				if number > cubeCount[color] {
					cubeCount[color] = number
				}
			}
		}
		res += cubeCount["red"] * cubeCount["green"] * cubeCount["blue"]
	}
	fmt.Println(res)
}
