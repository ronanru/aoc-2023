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
		isOk := true
		for j := 0; ; j++ {
			if j >= len(before) || j >= len(after) {
				break
			}
			str1 := before[len(before)-1-j]
			str2 := after[j]
			if str1 != str2 {
				isOk = false
				break
			}
		}
		if isOk {
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
