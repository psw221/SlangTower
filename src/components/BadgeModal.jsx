export default function BadgeModal({ badge, onConfirm }) {
  if (!badge) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center space-y-5 animate-pop-in">
        {/* 배지 아이콘 */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-amber-50 ring-4 ring-amber-200 flex items-center justify-center">
            <span className="text-5xl animate-bounce">{badge.icon}</span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
            새 배지 획득!
          </span>
        </div>

        {/* 배지 정보 */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-800">{badge.name}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{badge.desc}</p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-md shadow-indigo-200 active:scale-95 transition-all"
        >
          확인
        </button>
      </div>
    </div>
  )
}
