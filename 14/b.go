package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	rawLines := strings.Split(string(file), "\n")
	lines := make([][]rune, len(rawLines))
	for i, line := range rawLines {
		lines[i] = []rune(line)
	}
	previous := make([][][]rune, 0, 0)
	for c := 0; c < 1000000000; c++ {
		if c%100000 == 0 {
			fmt.Println(c)
		}
		for j := 0; j < len(lines[0]); j++ {
			for i := 0; i < len(lines); i++ {
				if lines[i][j] != '.' {
					continue
				}
				for k := i + 1; k < len(lines); k++ {
					if lines[k][j] == '#' {
						break
					}
					if lines[k][j] == 'O' {
						lines[k][j] = '.'
						lines[i][j] = 'O'
						i++
					}
				}
			}
		}
		for i := 0; i < len(lines); i++ {
			for j := 0; j < len(lines[0]); j++ {
				if lines[i][j] != '.' {
					continue
				}
				for k := j + 1; k < len(lines); k++ {
					if lines[i][k] == '#' {
						break
					}
					if lines[i][k] == 'O' {
						lines[i][k] = '.'
						lines[i][j] = 'O'
						j++
					}
				}
			}
		}
		for j := 0; j < len(lines[0]); j++ {
			for i := len(lines) - 1; i >= 0; i-- {
				if lines[i][j] != '.' {
					continue
				}
				for k := i - 1; k >= 0; k-- {
					if lines[k][j] == '#' {
						break
					}
					if lines[k][j] == 'O' {
						lines[k][j] = '.'
						lines[i][j] = 'O'
						i--
					}
				}
			}
		}
		for i := 0; i < len(lines); i++ {
			for j := len(lines[0]) - 1; j >= 0; j-- {
				if lines[i][j] != '.' {
					continue
				}
				for k := j - 1; k >= 0; k-- {
					if lines[i][k] == '#' {
						break
					}
					if lines[i][k] == 'O' {
						lines[i][k] = '.'
						lines[i][j] = 'O'
						j--
					}
				}
			}
		}
		for i, prev := range previous {
			isSame := true
			for j := 0; j < len(prev); j++ {
				for k := 0; k < len(previous[i][j]); k++ {
					if previous[i][j][k] != lines[j][k] {
						isSame = false
						break
					}
				}
			}
			if isSame {
				fmt.Println("Found", i, c)
				c += (1000000000 - c) / (c - i) * (c - i)
				break
			}
		}
		newLines := make([][]rune, len(lines))
		for i := range lines {
			newLines[i] = make([]rune, len(lines[i]))
			copy(newLines[i], lines[i])
		}
		previous = append(previous, newLines)
	}

	res := 0
	for i, line := range lines {
		for _, char := range line {
			fmt.Print(string(char))
			if char == 'O' {
				res += len(lines) - i
			}
		}
		fmt.Println()
	}

	fmt.Println()

	fmt.Println(res)
}
