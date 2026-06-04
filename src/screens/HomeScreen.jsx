import { BADGE_DEFS } from '../utils/badges'
import wordsData from '../data/words.json'

const ALL_WORDS = wordsData.words

const ERAS = [
  { key: '2000s', label: '2000년대', icon: '📼', color: 'rose' },
  { key: '2010s', label: '2010년대', icon: '📱', color: 'violet' },
  { key: '2020s', label: '2020년대', icon: '🤳', color: 'indigo' },
]

const ERA_LABEL = { '2000s': '2000년대', '2010s': '2010년대', '2020s': '2020년대' }

const C = {
  rose: {
    border: 'border-l-4 border-rose-400',
    iconBg: 'bg-rose-100',
    bar: 'bg-rose-400',
    btn: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-200',
    pct: 'text-rose-500',
    statusDone: 'text-rose-500',
  },
  violet: {
    border: 'border-l-4 border-violet-400',
    iconBg: 'bg-violet-100',
    bar: 'bg-violet-400',
    btn: 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-violet-200',
    pct: 'text-violet-500',
    statusDone: 'text-violet-500',
  },
  indigo: {
    border: 'border-l-4 border-indigo-400',
    iconBg: 'bg-indigo-100',
    bar: 'bg-indigo-400',
    btn: 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200',
    pct: 'text-indigo-500',
    statusDone: 'text-indigo-500',
  },
}

function getEraWords(era) {
  return ALL_WORDS
    .filter((w) => w.era === era)
    .sort((a, b) => a.syllables.length - b.syllables.length)
}

export default function HomeScreen({ completedWordIds = [], badges = [], isAllClear, onOpenStage, onRestart }) {
  const earnedIds = new Set(badges.map((b) => b.id))
  const completedSet = new Set(completedWordIds)
  const totalWords = ALL_WORDS.length
  const totalDone = completedWordIds.length
  const totalPct = Math.round((totalDone / totalWords) * 100)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-500 px-6 pt-14 pb-16 text-center text-white">
        <div className="text-5xl mb-2">🗼</div>
        <h1 className="text-3xl font-extrabold tracking-tight">슬랭타워</h1>
        <p className="text-indigo-200 text-sm mt-1">유행어 글자 조각 맞히기 퍼즐</p>
        <div className="mt-5 mx-2">
          <div className="flex justify-between text-xs text-indigo-200 mb-1.5">
            <span>⚔️ 정복한 단어</span>
            <span className="font-bold">{totalDone} / {totalWords}</span>
          </div>
          <div className="h-2 bg-indigo-400/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/70 rounded-full transition-all duration-700"
              style={{ width: `${totalPct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 -mt-5 pb-8">

        {/* 스테이지 카드 */}
        {ERAS.map(({ key, label, icon, color }) => {
          const eraWords = getEraWords(key)
          const total = eraWords.length
          const done = eraWords.filter((w) => completedSet.has(w.id)).length
          const pct = Math.round((done / total) * 100)
          const isEraDone = done === total
          const hasStarted = done > 0
          const c = C[color]

          return (
            <div
              key={key}
              className={`bg-white rounded-3xl shadow-sm overflow-hidden animate-scale-in ${c.border}`}
              style={{ animationDelay: `${ERAS.findIndex((e) => e.key === key) * 80}ms` }}
            >
              <div className="p-5 flex flex-col gap-3">
                {/* 카드 헤더 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center text-xl`}>
                      {icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-none">{label}</p>
                      <p className={`text-xs font-semibold mt-0.5 ${isEraDone ? c.statusDone : 'text-gray-400'}`}>
                        {isEraDone
                          ? '🏆 전부 정복!'
                          : hasStarted
                          ? `⚔️ ${done} / ${total} 정복 중`
                          : `🔒 ${total}개 도전 대기`}
                      </p>
                    </div>
                  </div>
                  <span className={`text-lg font-extrabold ${c.pct}`}>{pct}%</span>
                </div>

                {/* 진행 바 */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.bar} rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* 스테이지 진입 버튼 */}
                <button
                  onClick={() => onOpenStage(key)}
                  className={`w-full py-3 rounded-2xl ${c.btn} text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all`}
                >
                  {!hasStarted ? '도전 시작 →' : isEraDone ? '스테이지 보기 →' : '계속 도전 →'}
                </button>
              </div>
            </div>
          )
        })}

        {/* 전체 클리어 배너 */}
        {isAllClear && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-5 text-center text-white shadow-lg shadow-amber-200">
            <p className="text-3xl mb-1">👑</p>
            <p className="font-extrabold text-lg">슬랭타워 정복!</p>
            <p className="text-amber-100 text-xs mt-0.5">모든 유행어를 정복한 레전드</p>
            <button
              onClick={onRestart}
              className="mt-3 px-6 py-2 rounded-xl bg-white/20 text-white font-bold text-sm active:scale-95 transition-all"
            >
              처음부터 다시 도전
            </button>
          </div>
        )}

        {/* 배지 */}
        <div className="bg-white rounded-3xl shadow-sm p-5">
          <p className="text-sm font-semibold text-gray-500 mb-3">🎖️ 획득 배지</p>
          <div className="grid grid-cols-2 gap-2">
            {BADGE_DEFS.map((b) => {
              const earned = earnedIds.has(b.id)
              return (
                <div
                  key={b.id}
                  className={[
                    'flex items-center gap-2.5 rounded-2xl p-3 border transition-all',
                    earned ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 border-transparent',
                  ].join(' ')}
                >
                  <span className={`text-2xl leading-none flex-shrink-0 ${earned ? '' : 'grayscale opacity-20'}`}>
                    {b.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${earned ? 'text-gray-700' : 'text-gray-300'}`}>
                      {b.name}
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate ${earned ? 'text-amber-500' : 'text-gray-300'}`}>
                      {earned
                        ? '🏆 획득!'
                        : b.era
                        ? `${ERA_LABEL[b.era]} 정복 시 획득`
                        : '전체 정복 시 획득'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
