export default function HintPanel({ wordData, hint1Visible, firstSylRevealed, onHint1, onHint2 }) {
  return (
    <div className="space-y-3">
      {/* 힌트1 텍스트 */}
      {hint1Visible && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-sm text-amber-900 leading-relaxed">
          <span className="font-bold text-amber-500 mr-1">💡</span>
          {wordData.hint1}
        </div>
      )}

      <div className="flex gap-2.5">
        <button
          onClick={onHint1}
          disabled={hint1Visible}
          className={[
            'flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95',
            hint1Visible
              ? 'bg-amber-50 text-amber-300 cursor-default'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200',
          ].join(' ')}
        >
          {hint1Visible ? '💡 힌트 확인됨' : '💡 힌트 보기'}
        </button>

        <button
          onClick={onHint2}
          disabled={firstSylRevealed}
          className={[
            'flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95',
            firstSylRevealed
              ? 'bg-green-50 text-green-300 cursor-default'
              : 'bg-green-100 text-green-700 hover:bg-green-200',
          ].join(' ')}
        >
          {firstSylRevealed ? '📺 첫 글자 공개됨' : '📺 광고 보고 첫 글자'}
        </button>
      </div>
    </div>
  )
}
