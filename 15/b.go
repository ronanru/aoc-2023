package main

import (
	"fmt"
	"os"
	"slices"
	"strings"
)

type Lens struct {
	label       string
	focalLength int
}

func main() {
	file, _ := os.ReadFile("input.txt")

	boxes := make(map[int][]Lens)

	for _, str := range strings.Split(string(file), ",") {
		hash := 0
		label := ""
		isFocalLength := false
		focalLength := 0
		for _, char := range str {
			if char == '-' {
				if boxes[hash] == nil {
					boxes[hash] = make([]Lens, 0)
				}
				for i, lens := range boxes[hash] {
					if lens.label == label {
						boxes[hash] = slices.Delete(boxes[hash], i, i+1)
						break
					}
				}
				break
			}
			if char == '=' {
				isFocalLength = true
				continue
			}
			if isFocalLength {
				focalLength = focalLength*10 + int(char-'0')
				continue
			}
			label += string(char)
			hash += int(char)
			hash *= 17
			hash %= 256
		}
		if !isFocalLength {
			continue
		}
		lens := Lens{label, focalLength}
		foundDuplicate := false
		for i, l := range boxes[hash] {
			if l.label == label {
				boxes[hash][i] = lens
				foundDuplicate = true
				break
			}
		}
		if !foundDuplicate {
			boxes[hash] = append(boxes[hash], lens)
		}
		// fmt.Println(boxes)
	}

	res := 0
	for i, lenses := range boxes {
		for j, lens := range lenses {
			res += lens.focalLength * (i + 1) * (j + 1)
		}
	}

	fmt.Println(res)
}
