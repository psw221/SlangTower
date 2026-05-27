export default function ResultModal({ result, wordData, onNext, onRetry }) {
  if (!result) return null

  const isCorrect = result === 'correct'

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-3xl p-7 w-full max-w-sm shadow-2xl text-center space-y-5">
        <div className="text-6xl">{isCorrect ? '🎉' : '😅'}</div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold text-gray-800">
            {isCorrect ? '정답!' : '오답!'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isCorrect ? `"${wordData.word}" 맞았어요!` : '다시 한번 도전해보세요!'}
          </p>
        </div>

        {isCorrect ? (
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-md shadow-indigo-200 active:scale-95 transition-all"
          >
            다음 문제 →
          </button>
        ) : (
          <button
            onClick={onRetry}
            className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-600 font-bold text-base active:scale-95 transition-all"
          >
            다시 도전
          </button>
        )}
      </div>
    </div>
  )
}
