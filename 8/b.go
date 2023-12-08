package main

import (
	"fmt"
	"os"
	"strings"
)

type Node struct {
	right string
	left  string
}

func gcd(a, b int) int {
	for b == 0 {
		return a
	}
	return gcd(b, a%b)
}

func main() {
	file, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(file), "\n")

	sequence := lines[0]
	nodesMap := make(map[string]Node)
	current := make([]string, 0)
	for i := 2; i < len(lines); i++ {
		key, rawValue, _ := strings.Cut(lines[i], " = ")
		if key[2] == 'A' {
			current = append(current, key)
		}
		nodesMap[key] = Node{left: rawValue[1:4], right: rawValue[6:9]}
	}

	currentLen := len(current)
	previous := make([][]string, 0)
	loops := make([]int, currentLen)

	for i := 0; ; i++ {
		newCurrent := make([]string, currentLen)
		for j := 0; j < currentLen; j++ {
			newCurrent[j] = nodesMap[current[j]].left
			if sequence[i%len(sequence)] == 'R' {
				newCurrent[j] = nodesMap[current[j]].right
			}
		}
		current = newCurrent
		previousLen := len(previous)
		for j := previousLen - 1; j >= 0; j-- {
			for k := 0; k < currentLen; k++ {
				if loops[k] == 0 &&
					current[k][2] == 'Z' &&
					previous[j][k] == current[k] {
					loops[k] = previousLen - j
				}
			}
		}
		isFinished := true
		for _, v := range loops {
			if v == 0 {
				isFinished = false
				break
			}
		}
		if isFinished {
			break
		}
		previous = append(previous, current)

	}
	res := 1
	for _, v := range loops {
		res = res * v / gcd(res, v)
	}
	fmt.Println(res)
}
