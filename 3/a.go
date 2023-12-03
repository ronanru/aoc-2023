package main

import (
	"fmt"
	"github.com/fatih/color"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	printRed := color.New(color.FgRed).PrintFunc()
	printGreen := color.New(color.FgGreen).PrintFunc()
	printBlue := color.New(color.FgBlue).PrintFunc()

	lines := strings.Split(string(file), "\n")
	lineLength := len(lines[0]) + 2
	for i, line := range lines {
		lines[i] = "." + line + "."
	}
	lines = slices.Insert(lines, 0, strings.Repeat(".", lineLength))
	lines = slices.Insert(lines, len(lines), strings.Repeat(".", lineLength))

	fmt.Println(lines)

	for lineIndex, line := range lines[1 : len(lines)-1] {
		var numberStart *int = nil
		for charIndex, char := range line[0:lineLength] {
			if _, err := strconv.Atoi(string(char)); err == nil {
				if numberStart == nil {
					newNumberStart := charIndex
					numberStart = &newNumberStart
				}
			} else {
				if numberStart != nil {
					isOk := false
					if line[*numberStart-1] != '.' {
						isOk = true
					}
					if line[charIndex] != '.' {
						isOk = true
					}
					for _, char := range lines[lineIndex][*numberStart-1 : charIndex+1] {
						if char != '.' {
							isOk = true
						}
					}
					for _, char := range lines[lineIndex+2][*numberStart-1 : charIndex+1] {
						if char != '.' {
							isOk = true
						}
					}
					rawNumber := line[*numberStart:charIndex]
					if isOk {
						printGreen(rawNumber)
						number, _ := strconv.Atoi(rawNumber)
						res += number
					} else {
						printRed(rawNumber)
					}
				}
				if char == '.' {
					fmt.Print(".")
				} else {
					printBlue(string(char))
				}
				numberStart = nil
			}
		}
		fmt.Println()
	}
	fmt.Println(res)
}
