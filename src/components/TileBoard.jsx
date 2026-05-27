export default function TileBoard({ cells, cols, selected, onSelect, firstSylRevealed }) {
  return (
    <div
      className="grid gap-2 mx-auto"
      style={{ gridTemplateColumns: `repeat(${cols}, 64px)` }}
    >
      {cells.map((tile) => {
        const isSelected = !!selected.find((t) => t.id === tile.id)
        const isRevealed = firstSylRevealed && tile.id === 0
        return (
          <button
            key={tile.id}
            disabled={isSelected}
            onClick={() => onSelect(tile)}
            className={[
              'w-16 h-16 rounded-2xl text-xl font-bold transition-all active:scale-95',
              isSelected
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : isRevealed
                ? 'bg-amber-400 text-white shadow-md shadow-amber-200 ring-2 ring-amber-300'
                : 'bg-white text-indigo-700 shadow-md shadow-slate-200 ring-1 ring-slate-100 hover:ring-indigo-200',
            ].join(' ')}
          >
            {tile.syl}
          </button>
        )
      })}
    </div>
  )
}
