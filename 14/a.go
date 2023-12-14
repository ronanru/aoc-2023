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

	res := 0
	for i := 0; i < len(lines); i++ {
		for j := 0; j < len(lines[0]); j++ {
			if lines[i][j] == 'O' {
				res += len(lines) - i
			}
		}
	}

	fmt.Println(res)
}
