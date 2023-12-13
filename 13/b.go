package main

import (
	"fmt"
	"os"
	"strings"
)

func transpose(block []string) []string {
	res := make([]string, len(block[0]))
	for i := range res {
		res[i] = ""
	}
	for _, row := range block {
		for j, val := range row {
			res[j] += string(val)
		}
	}
	return res
}

func calcBlock(block []string) int {
	for i := 1; i < len(block); i++ {
		before := block[0:i]
		after := block[i:]
		errors := 0
		for j := 0; ; j++ {
			if j >= len(before) || j >= len(after) {
				break
			}
			str1 := before[len(before)-1-j]
			str2 := after[j]
			for k := 0; k < len(str1); k++ {
				if str1[k] != str2[k] {
					errors++
					if errors > 1 {
						break
					}
				}
			}

		}
		if errors == 1 {
			return i
		}
	}
	return 0
}

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	blocks := strings.Split(string(file), "\n\n")
	for _, rawBlock := range blocks {
		block := strings.Split(rawBlock, "\n")
		res += calcBlock(block) * 100
		res += calcBlock(transpose(block))
	}

	fmt.Println(res)
}
