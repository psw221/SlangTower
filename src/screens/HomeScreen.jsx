import { BADGE_DEFS } from '../utils/badges'

export default function HomeScreen({ currentLevel, badges = [], onStart }) {
  const earnedIds = new Set(badges.map((b) => b.id))
  const totalLevels = 20
  const pct = Math.round(((currentLevel - 1) / totalLevels) * 100)

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

        {/* 시작 버튼 */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all mt-1"
        >
          {currentLevel === 1 ? '게임 시작' : '이어하기'}
        </button>
      </div>
    </div>
  )
}
