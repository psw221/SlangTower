import { useState, useEffect } from 'react'

const AD_DURATION = 5 // 실제 광고 연동 시 15~30초로 교체

export default function AdModal({ onComplete, onClose }) {
  const [timeLeft, setTimeLeft] = useState(AD_DURATION)
  const done = timeLeft === 0

  useEffect(() => {
    if (done) return
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [done])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md pb-8 pt-5 px-5 shadow-2xl">
        {/* 핸들 바 */}
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-gray-700">
            첫 글자 힌트 얻기
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors text-sm"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 광고 영역 */}
        <div className="bg-slate-50 rounded-2xl flex flex-col items-center justify-center h-40 mb-5 border border-slate-100">
          {done ? (
            <div className="text-center space-y-1">
              <div className="text-4xl">🎉</div>
              <p className="text-sm font-bold text-gray-600">시청 완료!</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-300 uppercase tracking-widest font-semibold">광고 영역</p>
              <p className="text-5xl font-extrabold text-slate-200">{timeLeft}</p>
              <p className="text-xs text-gray-400">{timeLeft}초 후 건너뛸 수 있습니다</p>
            </div>
          )}
        </div>

        {/* 버튼 */}
        {done ? (
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-md shadow-indigo-200 active:scale-95 transition-all"
          >
            첫 글자 공개 →
          </button>
        ) : (
          <button
            disabled
            className="w-full py-4 rounded-2xl bg-slate-100 text-slate-300 font-bold text-base cursor-not-allowed"
          >
            건너뛰기 ({timeLeft})
          </button>
        )}
      </div>
    </div>
  )
}
