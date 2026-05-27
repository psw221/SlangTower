import { useState, useRef } from 'react'
import { BADGE_DEFS } from '../utils/badges'

const ERA_COLOR = {
  '2000s': 'bg-rose-400',
  '2010s': 'bg-violet-400',
  '2020s': 'bg-indigo-400',
}

import wordsData from '../data/words.json'
const ALL_WORDS = wordsData.words

export default function HomeScreen({ currentLevel, badges = [], isAllClear, completedLevels = [], onStart, onSelectLevel, onRestart }) {
  const earnedIds = new Set(badges.map((b) => b.id))
  const completedSet = new Set(completedLevels)
  const totalLevels = ALL_WORDS.length
  const pct = Math.round(((currentLevel - 1) / totalLevels) * 100)

  const PAGE_SIZE = 10
  const totalPages = Math.ceil(totalLevels / PAGE_SIZE)
  const [page, setPage] = useState(0)
  const pageWords = ALL_WORDS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const swipeStartX = useRef(null)
  function handleTouchStart(e) { swipeStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e) {
    if (swipeStartX.current === null) return
    const dx = swipeStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 40) setPage((p) => Math.min(Math.max(p + (dx > 0 ? 1 : -1), 0), totalPages - 1))
    swipeStartX.current = null
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 그라디언트 헤더 */}
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-500 px-6 pt-14 pb-12 text-center text-white">
        <div className="text-5xl mb-3">🗼</div>
        <h1 className="text-3xl font-extrabold tracking-tight">슬랭타워</h1>
        <p className="text-indigo-200 text-sm mt-1.5">유행어 글자 조각 맞히기 퍼즐</p>
      </div>

      <div className="flex flex-col gap-3 px-4 -mt-5 pb-8">
        {/* 진행 현황 */}
        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">진행 현황</span>
            <span className="text-sm font-bold text-indigo-600">
              {currentLevel - 1} / {totalLevels} 클리어
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {currentLevel === 1
              ? '첫 번째 유행어에 도전해보세요!'
              : `전체의 ${pct}% 달성했어요`}
          </p>
        </div>

        {/* 배지 */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-500 mb-3">나의 배지</p>
          <div className="grid grid-cols-2 gap-2.5">
            {BADGE_DEFS.map((b) => {
              const earned = earnedIds.has(b.id)
              return (
                <div
                  key={b.id}
                  className={[
                    'flex items-center gap-3 rounded-2xl p-3 border transition-all',
                    earned
                      ? 'bg-indigo-50 border-indigo-100'
                      : 'bg-gray-50 border-transparent',
                  ].join(' ')}
                >
                  <span className={`text-2xl leading-none ${earned ? '' : 'grayscale opacity-25'}`}>
                    {b.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${earned ? 'text-indigo-700' : 'text-gray-300'}`}>
                      {b.name}
                    </p>
                    <p className={`text-xs mt-0.5 ${earned ? 'text-indigo-400' : 'text-gray-300'}`}>
                      Lv.{b.level} 달성
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 레벨 선택 */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-500">다시 풀기</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 disabled:opacity-30 active:scale-95 transition-all text-xs"
              >
                ‹
              </button>
              <span className="text-xs text-gray-400">{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 disabled:opacity-30 active:scale-95 transition-all text-xs"
              >
                ›
              </button>
            </div>
          </div>
          <div
            className="grid grid-cols-5 gap-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {pageWords.map((w) => {
              const done = completedSet.has(w.level)
              return (
                <button
                  key={w.level}
                  disabled={!done}
                  onClick={() => onSelectLevel(w.level)}
                  className={[
                    'flex items-center justify-center rounded-xl h-10 font-bold text-sm transition-all active:scale-95',
                    done
                      ? `${ERA_COLOR[w.era] ?? 'bg-indigo-400'} text-white shadow-sm`
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed',
                  ].join(' ')}
                >
                  {w.level}
                </button>
              )
            })}
          </div>
          <div className="flex gap-3 mt-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-400 inline-block" />2000s</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-400 inline-block" />2010s</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-indigo-400 inline-block" />2020s</span>
          </div>
        </div>

        {/* 시작 / 전체 클리어 버튼 영역 */}
        {isAllClear ? (
          <div className="flex flex-col gap-2.5 mt-1">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-1">👑</p>
              <p className="text-sm font-bold text-amber-700">전체 클리어!</p>
              <p className="text-xs text-amber-500 mt-0.5">모든 유행어를 정복했어요</p>
            </div>
            <button
              onClick={onRestart}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              처음부터 다시하기
            </button>
          </div>
        ) : (
          <button
            onClick={onStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all mt-1"
          >
            {currentLevel === 1 ? '게임 시작' : '이어하기'}
          </button>
        )}
      </div>
    </div>
  )
}
