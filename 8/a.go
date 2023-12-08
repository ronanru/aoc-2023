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

func main() {
	file, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(file), "\n")

	sequence := lines[0]
	nodesMap := make(map[string]Node)
	for i := 2; i < len(lines); i++ {
		key, rawValue, _ := strings.Cut(lines[i], " = ")
		nodesMap[key] = Node{left: rawValue[1:4], right: rawValue[6:9]}
	}

	i := 0
	current := "AAA"

	for {
		newCurrent := nodesMap[current].left
		if sequence[i%len(sequence)] == 'R' {
			newCurrent = nodesMap[current].right
		}
		current = newCurrent
		i++
		if current == "ZZZ" {
			break
		}
	}

	fmt.Println(i)
}
