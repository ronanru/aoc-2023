package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	lines := strings.Split(string(file), "\n")

	res := 0

	for _, line := range lines {
		steps := make([][]int, 1)
		for _, step := range strings.Split(line, " ") {
			num, _ := strconv.Atoi(step)
			steps[0] = append(steps[0], num)
		}
		for i := 0; ; i++ {
			steps = append(steps, make([]int, len(steps[i])-1))
			isFinished := true
			for j := 0; j < len(steps[i])-1; j++ {
				steps[i+1][j] = steps[i][j+1] - steps[i][j]
				if steps[i+1][j] != 0 {
					isFinished = false
				}
			}
			if isFinished {
				break
			}
		}
		num := 0
		for i := len(steps) - 1; i >= 0; i-- {
			num = steps[i][0] - num
		}
		res += num
	}
	fmt.Println(res)
}
