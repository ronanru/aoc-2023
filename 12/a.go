package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func calculate(pattern string, numbers []int) int {
	// fmt.Println(pattern, numbers)
	if strings.Contains(pattern, "?") {
		return calculate(strings.Replace(pattern, "?", ".", 1), numbers) + calculate(strings.Replace(pattern, "?", "#", 1), numbers)
	}
	acc := 0
	i := 0
	for _, char := range pattern {
		if char == '#' {
			acc++
		} else {
			if acc > 0 {
				if i >= len(numbers) || numbers[i] != acc {
					return 0
				}
				acc = 0
				i++
			}
		}
	}
	if i == len(numbers) && acc == 0 {
		return 1
	}
	return 0
}

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	lines := strings.Split(string(file), "\n")

	for i, line := range lines {
		if line == "" {
			continue
		}
		pattern, rawNumbers, _ := strings.Cut(line, " ")
		numbers := make([]int, 0)
		for _, rawNumber := range strings.Split(rawNumbers, ",") {
			number, _ := strconv.Atoi(rawNumber)
			numbers = append(numbers, number)
		}
		result := calculate(pattern+".", numbers)
		fmt.Println(i, result)
		res += result
	}

	fmt.Println(res)
}
