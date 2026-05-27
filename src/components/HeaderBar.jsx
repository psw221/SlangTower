import { getDifficulty } from '../utils/difficulty'
import { BADGE_DEFS } from '../utils/badges'

const ERA_GRADIENT = {
  '2000s': 'bg-gradient-to-r from-rose-600 to-pink-500',
  '2010s': 'bg-gradient-to-r from-violet-700 to-purple-500',
  '2020s': 'bg-gradient-to-r from-indigo-700 to-blue-600',
}

export default function HeaderBar({ eraLabel, posInEra, totalInEra, syllableCount, earnedBadges = [], era }) {
  const diff = getDifficulty(syllableCount)
  const earnedIds = new Set(earnedBadges.map((b) => b.id))
  const headerBg = ERA_GRADIENT[era] ?? 'bg-indigo-600'

  return (
    <div className={`flex items-center justify-between px-4 py-3 ${headerBg}`}>
      <span className="text-white font-extrabold tracking-tight">슬랭타워</span>

      <div className="flex items-center gap-2">
        {/* 배지 아이콘들 */}
        <div className="flex gap-0.5">
          {BADGE_DEFS.map((b) => (
            <span
              key={b.id}
              title={b.name}
              className={`text-sm leading-none transition-opacity ${earnedIds.has(b.id) ? 'opacity-100' : 'opacity-20'}`}
            >
              {b.icon}
            </span>
          ))}
        </div>

        {/* 난이도 뱃지 */}
        {diff && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${diff.color}`}>
            {diff.label}
          </span>
        )}

        <span className="text-white text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">
          {posInEra}/{totalInEra}
        </span>
      </div>
    </div>
  )
}
