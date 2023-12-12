package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func calculate(pattern string, numbers []int, acc int, cache *map[string]int) int {
	key := pattern + " " + strconv.Itoa(acc) + ""
	for _, number := range numbers {
		key += strconv.Itoa(number) + ","
	}
	if value, ok := (*cache)[key]; ok {
		return value
	}
	value := calculateInner(pattern, numbers, acc, cache)
	(*cache)[key] = value
	return value
}

func calculateInner(pattern string, numbers []int, acc int, cache *map[string]int) int {
	if len(pattern) == 0 {
		if len(numbers) == 0 && acc == 0 {
			return 1
		}
		if len(numbers) == 1 && numbers[0] == acc {
			return 1
		}
		return 0
	}
	if acc > 0 && len(numbers) == 0 {
		return 0
	}
	res := 0
	if pattern[0] == '.' && acc > 0 {
		if acc == numbers[0] {
			res += calculate(pattern[1:], numbers[1:], 0, cache)
		} else {
			return 0
		}
	}
	if pattern[0] == '?' && acc > 0 && acc == numbers[0] {
		res += calculate(pattern[1:], numbers[1:], 0, cache)
	}
	if pattern[0] == '#' || pattern[0] == '?' {
		res += calculate(pattern[1:], numbers, acc+1, cache)
	}
	if (pattern[0] == '.' || pattern[0] == '?') && acc == 0 {
		res += calculate(pattern[1:], numbers, 0, cache)
	}
	return res
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
		realPattern := ""
		realNumbers := make([]int, 0)
		for i := 0; i < 5; i++ {
			realPattern += pattern
			if i < 4 {
				realPattern += "?"
			}
			for _, number := range numbers {
				realNumbers = append(realNumbers, number)
			}
		}
		cache := make(map[string]int)
		result := calculate(realPattern+".", realNumbers, 0, &cache)
		fmt.Println(i, result)
		res += result
	}

	fmt.Println(res)
}
