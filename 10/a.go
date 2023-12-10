package main

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

type Point struct {
	x, y int
}

func visit(point Point, visited *[]Point, lines [][]rune) {
	if slices.Contains(*visited, point) {
		return
	}
	*visited = append(*visited, point)
	switch lines[point.y][point.x] {
	case 'F':
		visit(Point{point.x, point.y + 1}, visited, lines)
		visit(Point{point.x + 1, point.y}, visited, lines)
		break
	case 'L':
		visit(Point{point.x + 1, point.y}, visited, lines)
		visit(Point{point.x, point.y - 1}, visited, lines)
		break
	case '-':
		visit(Point{point.x + 1, point.y}, visited, lines)
		visit(Point{point.x - 1, point.y}, visited, lines)
		break
	case '|':
		visit(Point{point.x, point.y + 1}, visited, lines)
		visit(Point{point.x, point.y - 1}, visited, lines)
		break
	case 'J':
		visit(Point{point.x - 1, point.y}, visited, lines)
		visit(Point{point.x, point.y - 1}, visited, lines)
		break
	case '7':
		visit(Point{point.x - 1, point.y}, visited, lines)
		visit(Point{point.x, point.y + 1}, visited, lines)
		break
	}
}

func main() {
	file, _ := os.ReadFile("input.txt")

	startX := 0
	startY := 0

	rawLines := strings.Split(string(file), "\n")
	lines := make([][]rune, len(rawLines))
	for i, line := range rawLines {
		lines[i] = make([]rune, len(line))
		for j, char := range line {
			lines[i][j] = char
		}
		if startX == 0 && startY == 0 {
			for j, char := range lines[i] {
				if char == 'S' {
					startX = j
					startY = i
					break
				}
			}
		}
	}
	leftElements := []rune{'-', '7', 'J'}
	rightElements := []rune{'-', 'L', 'F'}
	upElements := []rune{'|', '7', 'F'}
	lines[startY][startX] = '|'
	if slices.Contains(leftElements, lines[startY][startX+1]) {
		if startX > 0 && slices.Contains(rightElements, lines[startY][startX-1]) {
			lines[startY][startX] = '-'
		} else if startY > 0 && slices.Contains(upElements, lines[startY-1][startX]) {
			lines[startY][startX] = 'L'
		} else {
			lines[startY][startX] = 'F'
		}
	} else if startX > 0 && slices.Contains(rightElements, lines[startY][startX-1]) {
		if startY > 0 && slices.Contains(upElements, lines[startY-1][startX]) {
			lines[startY][startX] = 'J'
		} else {
			lines[startY][startX] = '7'
		}
	}

	visited := make([]Point, 0)

	visit(Point{startX, startY}, &visited, lines)

	fmt.Println(len(visited) / 2)
}
