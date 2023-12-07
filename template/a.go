package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	lines := strings.Split(string(file), "\n")

	fmt.Println(res)
}
