export default function AnswerSlots({ wordData, selected, onDeselect }) {
  const len = wordData.syllables.length
  const nextEmpty = selected.length < len ? selected.length : -1

  return (
    <div className="flex justify-center gap-2.5">
      {Array.from({ length: len }).map((_, i) => {
        const tile = selected[i]
        const isNext = i === nextEmpty
        return (
          <button
            key={i}
            onClick={tile ? onDeselect : undefined}
            className={[
              'w-[60px] h-[60px] rounded-2xl text-2xl font-bold transition-all',
              tile
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 active:scale-95'
                : isNext
                ? 'bg-slate-100 border-2 border-dashed border-indigo-300 animate-pulse text-transparent'
                : 'bg-slate-100 border-2 border-dashed border-slate-200 text-transparent',
            ].join(' ')}
          >
            {tile ? tile.syl : ''}
          </button>
        )
      })}
    </div>
  )
}
