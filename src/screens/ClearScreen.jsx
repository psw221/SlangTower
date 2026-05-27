export default function ClearScreen({ level, word, isLast, onNext, onHome }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 상단 축하 영역 */}
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-500 px-6 pt-16 pb-12 text-center text-white">
        <div className="text-6xl mb-4">{isLast ? '👑' : '🎉'}</div>
        <h2 className="text-3xl font-extrabold">
          {isLast ? '전체 클리어!' : `Lv.${level} 클리어!`}
        </h2>
        <p className="text-indigo-200 text-sm mt-2">
          {isLast ? '모든 유행어를 정복했어요!' : '정답을 맞혔어요'}
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 -mt-5 pb-8">
        {/* 정답 단어 카드 */}
        {word && (
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">정답</p>
            <p className="text-5xl font-extrabold text-indigo-600">{word}</p>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-2.5 mt-2">
          {!isLast && (
            <button
              onClick={onNext}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              다음 레벨 →
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
