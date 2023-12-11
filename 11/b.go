package main

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

type Star struct {
	x, y int
}

func main() {
	file, _ := os.ReadFile("input.txt")
	lines := strings.Split(string(file), "\n")

	emptyRows := make([]int, 0)
	emptyColumns := make([]int, len(lines[0]))
	for i := 0; i < len(lines[0]); i++ {
		emptyColumns[i] = i
	}
	stars := make([]Star, 0)
	for i, line := range lines {
		if line == "" {
			continue
		}
		isRowEmpty := true
		for j, char := range line {
			if char == '#' {
				isRowEmpty = false
				jIndex := slices.Index(emptyColumns, j)
				if jIndex != -1 {
					emptyColumns = slices.Delete(emptyColumns, jIndex, jIndex+1)
				}
				stars = append(stars, Star{x: j, y: i})
			}
		}
		if isRowEmpty {
			emptyRows = append(emptyRows, i)
		}
	}

	for i := 0; i < len(stars); i++ {
		addX := 0
		addY := 0
		for j := 0; j < len(emptyRows); j++ {
			if stars[i].y > emptyRows[j] {
				addY += 999999
			} else {
				break
			}
		}
		for j := 0; j < len(emptyColumns); j++ {
			if stars[i].x > emptyColumns[j] {
				addX += 999999
			} else {
				break
			}
		}
		stars[i].x += addX
		stars[i].y += addY
	}

	res := 0
	for i := 1; i < len(stars); i++ {
		for j := 0; j < i; j++ {
			dx := stars[i].x - stars[j].x
			dy := stars[i].y - stars[j].y
			if dx < 0 {
				dx = -dx
			}
			if dy < 0 {
				dy = -dy
			}
			res += dx + dy
		}
	}

	fmt.Println(res)
}
