import { useState, useCallback, useMemo } from 'react'
import { buildGrid } from '../utils/gridLayout'

export function useGameLogic(wordData) {
  const { cells, cols, rows } = useMemo(
    () => buildGrid(wordData),
    [wordData.id]
  )

  const [selected, setSelected] = useState([])
  const [result, setResult] = useState(null) // 'correct' | 'wrong' | null
  const [hint1Visible, setHint1Visible] = useState(false)
  const [firstSylRevealed, setFirstSylRevealed] = useState(false)

  const selectTile = useCallback((tile) => {
    if (result) return
    setSelected((prev) => {
      if (prev.find((t) => t.id === tile.id)) return prev
      const next = [...prev, tile]
      if (next.length === wordData.syllables.length) {
        const answer = next.map((t) => t.syl).join('')
        setResult(answer === wordData.word ? 'correct' : 'wrong')
      }
      return next
    })
  }, [result, wordData])

  const deselectLast = useCallback(() => {
    if (result) return
    setSelected((prev) => prev.slice(0, -1))
  }, [result])

  const reset = useCallback(() => {
    setSelected([])
    setResult(null)
    setHint1Visible(false)
    setFirstSylRevealed(false)
  }, [])

  return {
    cells,
    cols,
    rows,
    selected,
    result,
    hint1Visible,
    firstSylRevealed,
    selectTile,
    deselectLast,
    reset,
    showHint1: () => setHint1Visible(true),
    revealFirstSyl: () => setFirstSylRevealed(true),
  }
}
