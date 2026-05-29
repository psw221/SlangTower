export const BADGE_DEFS = [
  {
    id: 1,
    era: '2000s',
    name: '2000년대 마스터',
    icon: '📼',
    desc: '2000년대 유행어를 모두 정복했어요',
  },
  {
    id: 2,
    era: '2010s',
    name: '2010년대 마스터',
    icon: '📱',
    desc: '2010년대 신조어를 모두 꿰뚫고 있어요',
  },
  {
    id: 3,
    era: '2020s',
    name: '2020년대 마스터',
    icon: '🤳',
    desc: 'Gen Z 유행어를 완전히 정복했어요',
  },
  {
    id: 4,
    era: null,
    name: '슬랭 레전드',
    icon: '👑',
    desc: '모든 연대 유행어를 정복한 전설',
  },
]

export function checkBadge(completedWordIds, allWords, earnedBadgeIds = []) {
  const completedSet = new Set(completedWordIds)
  const earnedSet = new Set(earnedBadgeIds)

  for (const badge of BADGE_DEFS) {
    if (earnedSet.has(badge.id)) continue
    if (badge.era === null) {
      const allDone = allWords.every((w) => completedSet.has(w.id))
      if (allDone) return badge
    } else {
      const eraWords = allWords.filter((w) => w.era === badge.era)
      const eraDone = eraWords.length > 0 && eraWords.every((w) => completedSet.has(w.id))
      if (eraDone) return badge
    }
  }
  return null
}
