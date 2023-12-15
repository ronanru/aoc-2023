package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	for _, str := range strings.Split(string(file), ",") {
		acc := 0
		for _, char := range str {
			acc += int(char)
			acc *= 17
			acc %= 256
		}
		res += acc
	}

	fmt.Println(res)
}
