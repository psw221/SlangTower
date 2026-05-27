export default function ClearScreen({ word, hint1, isEraClear, eraLabel, isLast, onNext, onHome }) {
  const title = isLast
    ? '전체 클리어!'
    : isEraClear
    ? `${eraLabel} 클리어!`
    : '정답!'

  const subtitle = isLast
    ? '모든 유행어를 정복했어요!'
    : isEraClear
    ? `${eraLabel} 유행어를 모두 정복했어요!`
    : '정답을 맞혔어요'

  const emoji = isLast ? '👑' : isEraClear ? '🎊' : '🎉'

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-500 px-6 pt-16 pb-14 text-center text-white">
        <div className="text-6xl mb-4 animate-bounce">{emoji}</div>
        <h2 className="text-3xl font-extrabold">{title}</h2>
        <p className="text-indigo-200 text-sm mt-2">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3 px-4 -mt-5 pb-8">
        {/* 정답 카드 */}
        {word && (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4 text-center border-b border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">정답</p>
              <p className="text-5xl font-extrabold text-indigo-600">{word}</p>
            </div>
            {hint1 && (
              <div className="px-6 py-4">
                <p className="text-sm text-gray-500 leading-relaxed text-center">{hint1}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {!isLast && (
            <button
              onClick={onNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              {isEraClear ? '다음 스테이지 →' : '다음 문제 →'}
            </button>
          )}
          <button
            onClick={onHome}
            className="w-full py-4 rounded-2xl bg-white text-gray-500 font-bold text-base shadow-sm active:scale-[0.98] transition-all"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  )
}
