package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type StarPoint struct {
	y int
	x int
}

func main() {
	file, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(file), "\n")
	lineLength := len(lines[0]) + 2
	for i, line := range lines {
		lines[i] = "." + line + "."
	}
	lines = slices.Insert(lines, 0, strings.Repeat(".", lineLength))
	lines = slices.Insert(lines, len(lines), strings.Repeat(".", lineLength))

	stars := make(map[StarPoint][]int)

	for lineIndex, line := range lines[1 : len(lines)-1] {
		var numberStart *int = nil
		for charIndex, char := range line[0:lineLength] {
			if _, err := strconv.Atoi(string(char)); err == nil {
				if numberStart == nil {
					newNumberStart := charIndex
					numberStart = &newNumberStart
				}
			} else {
				if numberStart != nil {
					number, _ := strconv.Atoi(line[*numberStart:charIndex])
					for y, line := range lines[lineIndex : lineIndex+3] {
						// fmt.Println(line[*numberStart-1 : charIndex+1])
						for x, char := range line[*numberStart-1 : charIndex+1] {
							if char == '*' {
								starPoint := StarPoint{
									x: *numberStart + x,
									y: lineIndex + y,
								}
								if _, ok := stars[starPoint]; !ok {
									stars[starPoint] = make([]int, 0)
								}
								stars[starPoint] = append(stars[starPoint], number)
							}
						}
					}
					// fmt.Println()
				}
				numberStart = nil
			}
		}
	}
	fmt.Println(stars)
	res := 0
	for _, numbers := range stars {
		if len(numbers) == 2 {
			res += numbers[0] * numbers[1]
		}
	}
	fmt.Println(res)
}
