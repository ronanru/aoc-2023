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

	res := 1

	lines := strings.Split(string(file), "\n")
	times := make([]int, 0)
	for _, time := range slices.Delete(strings.Split(lines[0], " "), 0, 1) {
		if time != "" {
			fmt.Println(time)
			num, _ := strconv.Atoi(time)
			times = append(times, num)
		}
	}
	distances := make([]int, 0)
	for _, distance := range slices.Delete(strings.Split(lines[1], " "), 0, 1) {
		if distance != "" {
			num, _ := strconv.Atoi(distance)
			distances = append(distances, num)
		}
	}

	for i := 0; i < len(times); i++ {
		wins := 0
		for j := 1; j < times[i]; j++ {

			if (times[i]-j)*j > distances[i] {
				wins++
			}
		}
		res *= wins
	}

	fmt.Println(res)
}
