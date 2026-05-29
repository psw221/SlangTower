const TIERS = [
  { maxLen: 2, label: '초급', color: 'bg-green-100 text-green-700', stars: 1 },
  { maxLen: 3, label: '중급', color: 'bg-yellow-100 text-yellow-700', stars: 2 },
  { maxLen: 4, label: '고급', color: 'bg-orange-100 text-orange-700', stars: 3 },
  { maxLen: Infinity, label: '전문가', color: 'bg-red-100 text-red-700', stars: 4 },
]

export function getDifficulty(syllableCount) {
  return TIERS.find((t) => syllableCount <= t.maxLen)
}

export function getStars(syllableCount) {
  return getDifficulty(syllableCount)?.stars ?? 1
}
