package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Hand struct {
	cards       string
	bid         int
	combination int
}

func main() {
	file, _ := os.ReadFile("input.txt")

	res := 0

	lines := strings.Split(string(file), "\n")

	hands := make([]Hand, len(lines))

	cardStrengths := "J23456789TQKA"
	for i, line := range lines {
		rawCards, rawBid, _ := strings.Cut(line, " ")
		cardCount := make(map[rune]int)
		jockers := 0
		combination := 0
		for _, card := range rawCards {
			if card == 'J' {
				jockers++
				continue
			}
			cardCount[card]++
		}
		counts := make([]int, 1, len(cardCount)+1)
		for _, count := range cardCount {
			counts = append(counts, count)
		}
		sort.Ints(counts)
		counts[len(counts)-1] += jockers
		for _, count := range counts {
			combination += count * count
		}

		bid, _ := strconv.Atoi(rawBid)

		hands[i] = Hand{rawCards, bid, combination}
	}

	sort.Slice(hands, func(i, j int) bool {
		if hands[i].combination != hands[j].combination {
			return hands[i].combination < hands[j].combination
		}
		for k := 0; k < 5; k++ {
			if hands[i].cards[k] != hands[j].cards[k] {
				indexI := strings.IndexRune(cardStrengths, rune(hands[i].cards[k]))
				indexJ := strings.IndexRune(cardStrengths, rune(hands[j].cards[k]))
				return indexI < indexJ
			}
		}
		return false
	})

	for i, hand := range hands {
		res += hand.bid * (i + 1)
	}

	fmt.Println(res)
}
