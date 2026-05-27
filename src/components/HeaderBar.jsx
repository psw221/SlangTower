import { getDifficulty } from '../utils/difficulty'
import { BADGE_DEFS } from '../utils/badges'

export default function HeaderBar({ level, syllableCount, earnedBadges = [] }) {
  const diff = getDifficulty(syllableCount)
  const earnedIds = new Set(earnedBadges.map((b) => b.id))

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-indigo-600">
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

        <span className="text-white text-sm font-bold">Lv.{level}</span>
      </div>
    </div>
  )
}
