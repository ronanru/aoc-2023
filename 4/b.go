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

	res := 0

	var queue []string
	lines := strings.Split(string(file), "\n")

	for {
		if len(queue) == 0 && len(lines) == 0 {
			break
		}
		res++
		slice := &queue
		if len(*slice) == 0 {
			slice = &lines
		}
		line := (*slice)[0]
		*slice = (*slice)[1:]
		metadata, data, _ := strings.Cut(line, ": ")
		rawWinning, rawMine, _ := strings.Cut(data, " | ")
		winning := strings.Split(rawWinning, " ")
		my := strings.Split(rawMine, " ")

		metaSlice := strings.Split(metadata, " ")
		gameNumber, _ := strconv.Atoi(metaSlice[len(metaSlice)-1])

		for _, number := range my {
			if number == "" {
				continue
			}

			if slices.Contains(winning, number) {
				gameNumber++
				for _, line := range lines {
					meta, _, _ := strings.Cut(line, ": ")
					metaSlice := strings.Split(meta, " ")
					if metaSlice[len(metaSlice)-1] == strconv.Itoa(gameNumber) {
						queue = append(queue, line)
						break
					}
				}
			}
		}
	}

	fmt.Println(res)
}
