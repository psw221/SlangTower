export const BADGE_DEFS = [
  {
    id: 1,
    level: 5,
    name: '유행어 입문자',
    icon: '🌱',
    desc: 'Lv.5 클리어 — 2010년대 유행어를 알기 시작했어요',
  },
  {
    id: 2,
    level: 10,
    name: '밈 중급자',
    icon: '⚡',
    desc: 'Lv.10 클리어 — 3글자 신조어도 척척 맞히는 실력',
  },
  {
    id: 3,
    level: 15,
    name: '신조어 고인물',
    icon: '🔥',
    desc: 'Lv.15 클리어 — Gen Z 유행어를 완전히 꿰뚫고 있어요',
  },
  {
    id: 4,
    level: 20,
    name: '슬랭타워 마스터',
    icon: '👑',
    desc: 'Lv.20 클리어 — 모든 유행어를 정복한 전설',
  },
]

export function checkBadge(completedLevel) {
  return BADGE_DEFS.find((b) => b.level === completedLevel) ?? null
}
