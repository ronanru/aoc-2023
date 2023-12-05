package main

import (
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

type Translation struct {
	to     int
	from   int
	length int
}

func main() {
	file, _ := os.ReadFile("input.txt")

	res := math.MaxInt32

	seedsPart, mapPart, _ := strings.Cut(string(file), "\n\n")
	seeds := slices.Delete(strings.Split(seedsPart, " "), 0, 1)
	steps := strings.Split(mapPart, "\n\n")
	translationSteps := make([][]Translation, len(steps))

	for i, step := range steps {
		lines := slices.Delete(strings.Split(step, "\n"), 0, 1)
		translationSteps[i] = make([]Translation, 0, len(lines))
		for _, line := range lines {
			numbers := strings.Split(line, " ")
			to, _ := strconv.Atoi(numbers[0])
			from, _ := strconv.Atoi(numbers[1])
			length, _ := strconv.Atoi(numbers[2])
			translationSteps[i] = append(translationSteps[i], Translation{to, from, length})
		}
	}

	for _, seed := range seeds {
		num, _ := strconv.Atoi(seed)
		for _, step := range translationSteps {
			for _, translation := range step {
				if num >= translation.from && num <= translation.from+translation.length {
					num = translation.to + (num - translation.from)
					break
				}
			}
		}
		// fmt.Println(num, seed)
		if num < res {
			res = num
		}
	}

	fmt.Println(res)
}
