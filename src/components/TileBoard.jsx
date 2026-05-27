export default function TileBoard({ tiles, selected, onSelect, firstSylRevealed }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {tiles.map((tile) => {
        const isSelected = !!selected.find((t) => t.id === tile.id)
        const isRevealed = firstSylRevealed && tile.id === 0
        return (
          <button
            key={tile.id}
            disabled={isSelected}
            onClick={() => onSelect(tile)}
            className={[
              'w-[60px] h-[60px] rounded-2xl text-2xl font-bold transition-all active:scale-95',
              isSelected
                ? 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed'
                : isRevealed
                ? 'bg-amber-400 text-white shadow-md shadow-amber-200 ring-2 ring-amber-300'
                : 'bg-white text-indigo-700 shadow-md shadow-slate-200 ring-1 ring-slate-100 hover:ring-indigo-200 hover:shadow-indigo-100',
            ].join(' ')}
          >
            {tile.syl}
          </button>
        )
      })}
    </div>
  )
}
