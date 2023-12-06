package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(file), "\n")
	gTime := ""
	for _, time := range slices.Delete(strings.Split(lines[0], " "), 0, 1) {
		if time != "" {
			gTime += time
		}
	}
	gDistance := ""
	for _, distance := range slices.Delete(strings.Split(lines[1], " "), 0, 1) {
		if distance != "" {
			gDistance += distance
		}
	}

	time, _ := strconv.Atoi(gTime)
	distance, _ := strconv.Atoi(gDistance)

	wins := 0
	for j := 1; j < time; j++ {
		if (time-j)*j > distance {
			wins++
		}
	}

	fmt.Println(wins)
}
