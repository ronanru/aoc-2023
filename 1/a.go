package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(file), "\n")
	acc := 0
	for _, line := range lines {
		first := -1
		last := -1
		for _, char := range line {
			number, err := strconv.Atoi(string(char))
			if err == nil {
				if first == -1 {
					first = number
				}
				last = number
			}
		}
		if first == -1 {
			continue
		}
		fmt.Println(first, last)
		acc += first*10 + last
	}
	fmt.Println(acc)
}

