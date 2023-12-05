package main

import (
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
	"sync"
)

var res int = math.MaxInt64

type Translation struct {
	to     int
	from   int
	length int
}

func applyTranslations(num int, steps [][]Translation, wg *sync.WaitGroup) {
	for _, translations := range steps {
		for _, translation := range translations {
			if num >= translation.from && num <= translation.from+translation.length {
				num = translation.to + (num - translation.from)
				break
			}
		}
	}
	if num < res {
		res = num
	}
	wg.Done()
}

func main() {
	file, _ := os.ReadFile("input.txt")

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

	var wg sync.WaitGroup

	for len(seeds) > 0 {
		from, _ := strconv.Atoi(seeds[0])
		length, _ := strconv.Atoi(seeds[1])
		for i := from; i < from+length; i++ {
			wg.Add(1)
			go applyTranslations(i, translationSteps, &wg)
		}
		seeds = slices.Delete(seeds, 0, 2)
	}
	wg.Wait()

	fmt.Println(res)
}
