const getPrizeIndex = (rank: number) => {
  const rankLevel = [1, 2, 3, 23, 123]
  for (let i = 0; i < rankLevel.length; i++) {
    if (rank <= rankLevel[i]) {
      return i
    }
  }
  return rankLevel.length
}

export const getPrizeByRank = (rank: number) => {
  if (rank === 0) {
    return 0
  }
  const prizeLevel = [500, 300, 200, 20, 10, 0]
  const userPrizeIndex = getPrizeIndex(rank)
  return prizeLevel[userPrizeIndex]
}
